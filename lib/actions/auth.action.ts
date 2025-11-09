'use server';
import { auth, db } from "@/firebase/admin";
import { FirebaseError } from "firebase/app";
import { cookies } from "next/headers";

// Session duration (1 week)
const SESSION_DURATION = 60 * 60 * 24 * 7;

// Set session cookie
export async function setSessionCookie(idToken: string) {
  const cookieStore = await cookies();

  // Create session cookie
  const sessionCookie = await auth.createSessionCookie(idToken, {
    expiresIn: SESSION_DURATION * 1000, // milliseconds
  });

  // Set cookie in the browser
  cookieStore.set("session", sessionCookie, {
    maxAge: SESSION_DURATION,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    sameSite: "lax",
  });
}

export async function SignUp(params: SignUpParams) {
  const { uid, fullname, email } = params;

  try {
    // Check if user exists in DB
    const userRecord = await db.collection("users").doc(uid).get();
    if (userRecord.exists) {
      return {
        success: false,
        message: "User  already exists. Please sign in.",
      };
    }

    // Save user to DB
    await db.collection("users").doc(uid).set({
      fullname, 
      email,
    });

    return {
      success: true,
      message: "Account created successfully. Please sign in.",
    };
  } catch (error) {
    console.error("Error creating user:", error);

    // Handle Firebase specific errors
    if (error instanceof FirebaseError && error.code === "auth/email-already-exists") {
      return {
        success: false,
        message: "This email is already in use",
      };
    }

    return {
      success: false,
      message: "Failed to create account. Please try again.",
    };
  }
}

export async function SignIn(params: SignInParams) {
  const { email, idToken } = params;

  try {
    const userRecord = await auth.getUserByEmail(email);
    if (!userRecord) {
      return {
        success: false,
        message: "User  does not exist. Create an account.",
      };
    }

    // Set session cookie
    await setSessionCookie(idToken);
    return { success: true }; // Return success if everything is fine
  } catch (error) {
    console.error("Error signing in user:", error);

    // Handle specific Firebase errors
    if (error instanceof FirebaseError) {
      if (error.code === "auth/user-not-found") {
        return {
          success: false,
          message: "User  does not exist. Create an account.",
        };
      }
      if (error.code === "auth/wrong-password") {
        return {
          success: false,
          message: "Incorrect password. Please try again.",
        };
      }
    }

    return {
      success: false,
      message: "Failed to log into account. Please try again.",
    };
  }
}

// Sign out user by clearing the session cookie
export async function SignOut() {
  const cookieStore = await cookies();
  cookieStore.delete("session");
}

// Get current user from session cookie
export async function getCurrentUser(): Promise<User | null> {
  const cookieStore = await cookies();

  const sessionCookie = cookieStore.get("session")?.value;
  if (!sessionCookie) return null;

  try {
    const decodedClaims = await auth.verifySessionCookie(sessionCookie, true);

    // get user info from db
    const userRecord = await db
      .collection("users")
      .doc(decodedClaims.uid)
      .get();
    if (!userRecord.exists) return null;

    return {
      ...userRecord.data(),
      id: userRecord.id,
    } as User;
  } catch (error) {
    console.log(error);

    // Invalid or expired session
    return null;
  }
}

// Check if user is authenticated
export async function isAuthenticated() {
  const user = await getCurrentUser ();
  return !!user;
}



export async function getInterviewById(userId: string): Promise<Interview[] | null> {
  const interview = await db.collection("interviews")
        .where("userId", "==", userId)
        .orderBy("createdAt", "desc")
        .get();
  return interview.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }) ) as Interview[];
}

export async function logout(): Promise<{ ok: boolean; message?: string }> {
  try {
    const res = await fetch('/api/auth/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    });

    if (!res.ok) {
      const body = await res.text().catch(() => null);
      return { ok: false, message: body ?? 'Logout failed' };
    }

    return { ok: true };
  } catch (err) {
    console.error('logout error', err);
    return { ok: false, message: (err as Error).message };
  }
}
