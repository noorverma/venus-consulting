//use perplexity AI for reference

"use client";

import { Login } from '@/actions/authServer';
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { auth, db } from '../Lib/firebase';
import { getDoc, doc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function SignIn() {
  const router = useRouter();  
  const [error, setError] = useState(null);

  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
  
      const userDoc = await getDoc(doc(db, "Users", user.uid)); // Use "Users" collection
  
      if (userDoc.exists()) {
        const userData = userDoc.data();
        if (userData.isAdmin) {
          router.push('/Admin');
        } else {
          router.push('/Main');
        }
      } else {
        await signOut(auth);
        setError("Google account not registered. Please use a registered account.");
      }
    } catch (error) {
      console.error('Google sign-in error:', error);
      setError('An error occurred during Google sign-in.');
    }
  };
  

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError(null);
    const email = e.target.email.value;
    const password = e.target.password.value;
    try {
      const result = await Login({ email, password });
      if (result.error) {
        setError(result.error);
      } else if (result.success) {
        if (result.role === 'admin') {
          router.push('/Admin');
        } else {
          router.push('/Main');
        }
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <>
      <Head>
        <title>Sign In</title>
      </Head>
      <div className="bg-[url('/login-background.jpeg')] bg-cover bg-center min-h-screen flex items-center justify-center">
        <div>
          <img src="/logo.png" alt="Logo" className="h-14 absolute top-5 left-5" />
          <img src="/name.png" alt="Electrical Consulting" className="h-8 absolute top-9 left-20" />
        </div>
        <div className="flex items-center justify-center min-h-screen">
          <div className="w-full max-w-md p-8 space-y-8 bg-gray-800 rounded-md shadow-md border-t-4 border-orange-500">
            <h2 className="text-2xl font-bold text-center text-orange-500">Sign in to your account</h2>
            <form className="mt-8 space-y-6" onSubmit={handleSignIn}>
              <div className="space-y-4">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="relative block w-full px-3 py-3 text-white border-gray-700 rounded-md bg-gray-900 placeholder-gray-400 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Email address"
                />
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="relative block w-full px-3 py-3 text-white border-gray-700 rounded-md bg-gray-900 placeholder-gray-400 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Password"
                />
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}  

              <button type="submit" className="w-full px-4 py-2 mt-4 text-sm text-white bg-orange-600 rounded-md hover:bg-orange-700 focus:ring-orange-500">
                Sign In
              </button>
              <button type="button" className="w-full px-4 py-2 mt-4 text-sm text-white bg-orange-600 rounded-md hover:bg-orange-700 focus:ring-orange-500" onClick={handleGoogleSignIn}>
                Sign in with Google
              </button>
            </form>
            <p className="text-sm text-center text-gray-300">
              Don't have an account? <Link href="/SignUp" className="font-bold text-orange-500 hover:underline">Sign up</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
