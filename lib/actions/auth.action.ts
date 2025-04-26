'use server';

import { auth, db } from "@/firebase/admin";
import { FirebaseError } from "firebase/app";
import { cookies } from "next/headers";

export async function SignUp(params: SignUpParams) {
  const { uid, fullname, email } = params;

  try {
    const userRecord = await db.collection('users').doc(uid).get();

    if (userRecord.exists) {
      return { success: false, message: "User already exists" };
    }

    await db.collection('users').doc(uid).set({
      fullname, email
    });

    return { success: true, message: "Account created successfully" };

  } catch (error: unknown) {
    // TypeScript requires us to handle the error properly
    if (error instanceof FirebaseError && error.code === 'auth/email-already-in-use') {
      return { success: false, message: "Email already in use" };
    }
    return { success: false, message: "Error creating a user account" };
  }
}

export async function SignIn(params: SignInParams) {
  const { email, idToken } = params;

  try {
    const userRecord = await auth.getUserByEmail(email);
    await SessionCookies(idToken);
  } catch (error) {
    return { success: false, message: "User does not exist" };
  }
}

const MAX_AGE_ONE_WEEK = 60 * 60 * 24 * 7;

export async function SessionCookies(idToken: string) {
  const cookiestore = await cookies();

  const sessioncookies = await auth.createSessionCookie(idToken, {
    expiresIn: MAX_AGE_ONE_WEEK * 1000,
  });

  cookiestore.set('session', sessioncookies, {
    maxAge: MAX_AGE_ONE_WEEK,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    sameSite: 'lax',
  });
}

export async function getCurrentUser(): Promise<User | null> {
  const cookieStore = await cookies();

  const sessionCookie = cookieStore.get('session')?.value

  if(!sessionCookie) return null;

  try {
    const decodedClaims = await auth.verifySessionCookie(sessionCookie, true);
    const userRecord = await db.collection('users').doc(decodedClaims.uid).get();

    if (!userRecord.exists) return null;
    
    return {
      ...userRecord.data(),
      id: userRecord.id,
    } as User;

  } catch (error) {
    return null;
  }
} 

export async function isAuthenticated() {
  const user = await getCurrentUser();
  return !!user;
}
