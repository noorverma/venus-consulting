//Use perplexity AI for reference but the code was written myself
// app/SignUp/page.js
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth, db } from '../Lib/firebase';
import { registerUser } from '../Lib/authUtilities'; // Import the register function
import Head from 'next/head';
import Link from 'next/link';
import { doc, setDoc } from 'firebase/firestore';
import Image from 'next/image'; // Import Image component for optimized images

export default function SignUp() {
  const router = useRouter(); 
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  // Handle sign-up with email and password
  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await registerUser(username, email, password); // No isAdmin parameter needed here.
      router.push('/SignIn');
    } catch (err) {
      console.error('Registration error:', err.message);
      setError(err.message); // Set error message for display.
    }
  };

  // Handle sign-up with Google account.
  const handleGoogleSignUp = async (e) => {
    e.preventDefault();
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        username: user.displayName,
        role: "user", // Default role for Google sign-ups.
      }, { merge: true }); // Use "users" collection and merge to prevent overwriting

      router.push('/SignIn');
    } catch (error) {
      console.error('Google sign-up error:', error.message);
      if (error.code === 'auth/popup-closed-by-user') {
        alert('The sign-up popup was closed. Please try again.');
      } else if (error.code === 'auth/network-request-failed') {
        alert('Network error. Please check your connection and try again.');
      } else {
        alert('An error occurred during Google sign-up.');
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

              <button type="submit" className="flex justify-center items-center w-full px-4 py-2 mt-4 text-sm text-white bg-orange-600 rounded-md hover:bg-orange-700 focus:ring-orange-500">
                Create Account
              </button>
              <button type="button" className="flex justify-center items-center w-full px-4 py-2 mt-4 text-sm text-white bg-orange-600 rounded-md hover:bg-orange-700 focus:ring-orange-500" onClick={handleGoogleSignUp}>
                <Image src="/GoogleIcon.svg" alt="Google Icon" width={20} height={20} className="mr-2"/> 
                Sign up with Google
              </button>
            </form>
            <p className="text-sm text-center text-gray-300">
              Already have an account? <Link href="/SignIn" className='font-bold text-orange-500 hover:underline'>Sign in</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}