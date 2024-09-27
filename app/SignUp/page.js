//Use perplexity AI for reference but the code was written myself

"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth, db } from '../Lib/firebase';
import { setDoc, doc } from 'firebase/firestore'; // Import setDoc and doc for Firestore operations
import Head from 'next/head';
import Link from 'next/link';
import { Register } from '@/actions/authServer';

export default function SignUp() {
  const router = useRouter(); 
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const result = await Register({ username, email, password });
      if (result.error) {
        setError(result.error);
      } else if (result.success) {
        // Redirect to sign-in page after successful registration
        router.push('/SignIn');
      }
    } catch (err) {
      console.error('Registration error:', err);
      setError('An unexpected error occurred. Please try again.');
    }
  };

  const handleGoogleSignUp = async (e) => {
    e.preventDefault();
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const userRef = doc(db, "Users", user.uid);
      

      await setDoc(userRef, {
        email: user.email,
        username: user.displayName,
        isAdmin: false 
      }, { merge: true }); 


      router.push('/SignIn');
    } catch (error) {
      console.error('Google sign-up error:', error);
      
      
      if (error.code === 'auth/popup-closed-by-user') {
        setError('The sign-up popup was closed. Please try again.');
      } else if (error.code === 'auth/network-request-failed') {
        setError('Network error. Please check your connection and try again.');
      } else {
        setError('An error occurred during Google sign-up.');
      }
    }
  };

  return (
    <>
      <Head>
        <title>Create an Account</title>
      </Head>
      <div className="bg-[url('/login-background.jpeg')] bg-cover bg-center min-h-screen flex items-center justify-center">
        <div>
          <img src="/logo.png" alt="Logo" className="h-14 absolute top-5 left-5" />
          <img src="/name.png" alt="Electrical Consulting" className="h-8 absolute top-9 left-20" />
        </div>
        <div className="flex items-center justify-center min-h-screen w-1/4">
          <div className="w-full max-w-md p-8 space-y-8 bg-gray-800 rounded-md shadow-md border-t-4 border-orange-500">
            <h2 className="text-2xl font-bold text-center text-orange-500">Create an Account</h2>
            <form className="mt-8 space-y-6" onSubmit={handleSignUp}>
              <div className="space-y-4">
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  className="relative block w-full px-3 py-3 text-white border-gray-700 rounded-md bg-gray-900 placeholder-gray-400 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="relative block w-full px-3 py-3 text-white border-gray-700 rounded-md bg-gray-900 placeholder-gray-400 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="relative block w-full px-3 py-3 text-white border-gray-700 rounded-md bg-gray-900 placeholder-gray-400 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}  

              <button type="submit" className="w-full px-4 py-2 mt-4 text-sm text-white bg-orange-600 rounded-md hover:bg-orange-700 focus:ring-orange-500">
                Create Account
              </button>
              <button type="button" className="w-full px-4 py-2 mt-4 text-sm text-white bg-orange-600 rounded-md hover:bg-orange-700 focus:ring-orange-500" onClick={handleGoogleSignUp}>
                Sign up with Google
              </button>
            </form>
            <p className="text-sm text-center text-gray-300">
              Already have an account? <Link href="/SignIn" className="font-bold text-orange-500 hover:underline">Sign in</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
