// AuthForm.tsx
'use client';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Mail, Lock, User } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BorderBeam } from './magicui/border-beam';
import { InputActernity } from './ui/inputActernity';
import Image from 'next/image';
import LockSvg from '@/assets/lock.svg';
import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { createUserWithEmailAndPassword, fetchSignInMethodsForEmail, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/firebase/client';
import { SignIn, SignUp } from '@/lib/actions/auth.action';
import Link from 'next/link';
import { FirebaseError } from 'firebase/app';

// Dynamic schema based on type
const getSchema = (type: "sign-in" | "sign-up") =>
  z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    fullName: type === "sign-up" 
      ? z.string().min(3, "Full name must be at least 3 characters") 
      : z.optional(z.string()),
    resume: type === "sign-up" 
      ? z.instanceof(File, { message: "Resume is required" }) 
      : z.optional(z.any()),
  });

export default function AuthForm({ type }: { type: "sign-in" | "sign-up" }) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const formSchema = getSchema(type);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      fullName: "",
      resume: undefined,
    },
  });

  const onDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setSelectedFile(acceptedFiles[0]);
      form.setValue("resume", acceptedFiles[0]);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "application/pdf": [".pdf"] },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
  
    try {
      if (type === 'sign-up') {
        const { fullName, email, password } = values;
  
        const signInMethods = await fetchSignInMethodsForEmail(auth, email);
        if (signInMethods.length > 0) {
          toast.error("This email is already in use. Try signing in instead. ❌");
          return;
        }
  
        const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
        const result = await SignUp({
          uid: userCredentials.user.uid,
          fullname: fullName!,
          email,
          password,
        });
  
        if (!result?.success) {
          toast.error(result?.message || "Error creating a user account");
          return;
        }
  
        toast.success("Account created successfully! Please sign in. 🎉");
        router.push('/sign-in');
  
      } else {
        const { email, password } = values;
  
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const idToken = await userCredential.user.getIdToken();
  
        toast.success("Signed in successfully! 🎉");
        router.push('/dashboard');
      }
  
      form.reset();
      setSelectedFile(null);
  
    } catch (error) {
      if (error instanceof FirebaseError) {
        if (type === 'sign-up') {
          // 🔥 Specific sign-up error handling
          switch (error.code) {
            case "auth/email-already-in-use":
              toast.error("This email is already in use. Try signing in. ❌");
              break;
            case "auth/invalid-email":
              toast.error("Invalid email address. Please check and try again. ❌");
              break;
            case "auth/weak-password":
              toast.error("Password is too weak. Try a stronger one. ❌");
              break;
            default:
              toast.error("Error creating account. Please try again. ❌");
          }
        } else {
          // 🔥 Specific sign-in error handling
          switch (error.code) {
            case "auth/user-not-found":
              toast.error("User not found. Please sign up first. ❌");
              break;
            case "auth/wrong-password":
              toast.error("Incorrect password. Please try again. ❌");
              break;
            case "auth/invalid-email":
              toast.error("Invalid email address. Please check and try again. ❌");
              break;
            default:
              toast.error("Authentication error. Please try again. ❌");
          }
        }
      } else {
        toast.error("Something went wrong! Please try again. ❌");
      }
    } finally {
      setLoading(false);
    }
  }
  

  const isSignIn = type === "sign-in";

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md relative">
        <Card className="border border-white/20 bg-gradient-to-b from-black/90 to-[#191021] shadow-[0_0_25px_rgba(255,255,255,0.1)] mx-4 relative">
          <BorderBeam duration={13} size={100} />
          <CardHeader className="pb-0">
            <div className="flex justify-center mb-5">
              <div className="w-16 h-16 rounded-full shadow-[0_0_40px_rgba(156,64,255,0.3)] bg-[#171717] flex items-center justify-center">
                <Image src={LockSvg} alt="Logo" width={44} height={44} />
              </div>
            </div>
            <div className="text-center mb-5">
              <h1 className="text-xl text-white font-medium">Join us and take control of</h1>
              <p className="text-xl text-purple-400 font-medium">your financial journey.</p>
            </div>
          </CardHeader>

          <CardContent>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {!isSignIn && (
                <div className="relative">
                  <User  className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
                  <InputActernity
                    id="fullName"
                    placeholder="Enter your full name"
                    type="text"
                    {...form.register("fullName")}
                    className="pl-10 bg-[#0F0F0F] text-gray-300"
                  />
                  {form.formState.errors.fullName && (
                    <p className="text-red-500 text-sm mt-1">{form.formState.errors.fullName.message}</p>
                  )}
                </div>
              )}

              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
                <InputActernity
                  id="email"
                  placeholder="Enter your email"
                  type="email"
                  {...form.register("email")}
                  className="pl-10 bg-[#0F0F0F] text-gray-300"
                />
                {form.formState.errors.email && (
                  <p className="text-red-500 text-sm mt-1">{form.formState.errors.email.message}</p>
                )}
              </div>

              <div className="relative pb-5">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
                <InputActernity
                  id="password"
                  placeholder="Enter your password"
                  type="password"
                  {...form.register("password")}
                  className="pl-10 bg-[#0F0F0F] text-gray-300"
                />
                {form.formState.errors.password && (
                  <p className="text-red-500 text-sm mt-1">{form.formState.errors.password.message}</p>
                )}
              </div>

              {!isSignIn && (
                <div className="relative">
                  <div {...getRootProps()} className="p-4 border border-dashed border-gray-400 text-gray-300 text-center cursor-pointer bg-[#0F0F0F] rounded-lg">
                    <input {...getInputProps()} />
                    {selectedFile ? (
                      <p className="text-green-400">{selectedFile.name}</p>
                    ) : (
                      <p>Drag & drop your resume (PDF) or click to upload</p>
                    )}
                  </div>
                  {form.formState.errors.resume && (
                    <p className="text-red-500 text-sm mt-1">form.formState.errors.resume.message</p>
                  )}
                </div>
              )}

              <Button type="submit" className="w-full py-5 bg-[#382C44] border-2 border-[#8051B7] shadow-md hover:bg-purple-700 text-white font-medium rounded-full" disabled={loading}>
                {loading ? "Loading..." : (isSignIn ? "Sign in" : "Create an account")}
              </Button>
            </form>

            <div className="text-center mt-4">
              <span className='text-sm text-gray-400'>
                No Account yet?
                <Link href={isSignIn ? "/sign-up" : "/sign-in"} className="text-sm text-gray-400 font-bold hover:text-purple-400">
                  {isSignIn ? " Sign up" : " Sign in"}
                </Link>
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

