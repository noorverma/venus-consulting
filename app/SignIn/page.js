"use client";  // Mark this file as a Client Component

import { useState } from 'react';
import { loginUser } from '../Lib/authUtilities';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../Lib/firebase';
import { useRouter } from 'next/navigation';  // Import useRouter hook from Next.js
import Head from 'next/head';
import Link from 'next/link';

export default function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const router = useRouter();  // Initialize the useRouter hook

    const handleSignIn = async (e) => {
        e.preventDefault();
        setError(null);  // Reset error state
        try {
            await loginUser(email, password);  // Try to login
            router.push('/Main');  // Redirect to /Main after successful sign-in
        } catch (err) {
            setError('Incorrect email or password');  // Display error message
        }
    };

    const handleGoogleSignIn = async (e) => {
        e.preventDefault(); // Prevent default form behavior
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);  // Perform Google sign-in
            router.push('/Main');  // Redirect to /Main after successful sign-in
        } catch (error) {
            console.error('Google sign-in error:', error);
            setError('Google sign-in failed');  // Handle error
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
              <div>
                <h2 className="text-2xl font-bold text-center text-orange-500">Sign in to your account</h2>
              </div>
              <form className="mt-8 space-y-6" onSubmit={handleSignIn}>
                <div className="space-y-4 rounded-md shadow-sm">
                  <div>
                    <label htmlFor="email" className="sr-only">Email address</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-700 rounded-md bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                      placeholder="Email address"
                    />
                  </div>
                  <div>
                    <label htmlFor="password" className="sr-only">Password</label>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-700 rounded-md bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                      placeholder="Password"
                    />
                  </div>
                </div>
                {error && <p className="text-red-500 text-sm">{error}</p>} {/* Display error message */}
                <div>
                  <button
                    type="submit"
                    className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-orange-600 border border-transparent rounded-md group hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                  >
                    Sign In
                  </button>
                </div>
              </form>
              <div className="text-center text-gray-300"> {/* Add a link to the Sign-Up page */}
                <Link href="/SignUp" className="font-medium text-orange-500 hover:text-orange-400">
                  Don't have an account? <span className="font-bold">Sign Up</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </>
    );
}
