"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth, db } from '../Lib/firebase';
import Head from 'next/head';
import Link from 'next/link';
import { Register } from '@/actions/authServer';

export default function SignUp() {
  const router = useRouter(); 
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setError] = useState(null);

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const result = await Register({ username, email, password, isAdmin });
      if (result.error) {
        setError(result.error);
      } else if (result.success) {
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

      // Store Google user data in Firestore
      await setDoc(doc(db, "Users", user.uid), {
        email: user.email,
        username: user.displayName,
        isAdmin: false // Google signup default as user
      });

      router.push('/Main');
    } catch (error) {
      console.error('Google sign-up error:', error);
      setError('An error occurred during Google sign-up.');
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

                <div className="flex items-center">
                  <input
                    id="isAdmin"
                    name="isAdmin"
                    type="checkbox"
                    className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                    onChange={(e) => setIsAdmin(e.target.checked)}
                  />
                  <label htmlFor="isAdmin" className="ml-2 block text-sm text-white">
                    Register as Admin
                  </label>
                </div>
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