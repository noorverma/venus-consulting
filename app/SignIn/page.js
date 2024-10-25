//use perplexity AI for reference
// app/SignIn/page.js
'use client';

import { useUserAuth } from '../Lib/auth-context';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function SignIn() {
  const router = useRouter();
  const { emailSignIn, googleSignIn } = useUserAuth();
  const [error, setError] = useState(null);

  const handleEmailSignIn = async (e) => {
    e.preventDefault();
    setError(null);
    const email = e.target.email.value;
    const password = e.target.password.value;
    try {
      await emailSignIn(email, password);  // Use emailSignIn method from auth-context
      router.push('/Main');
    } catch (err) {
      console.error('Login error:', err);
      setError('Invalid email or password.');
    }
  };

  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    try {
      await googleSignIn();
      router.push('/Main');
    } catch (error) {
      console.error('Google sign-in error:', error);
      setError('An error occurred during Google sign-in.');
    }
  };

  return (
    <>
      <Head>
        <title>Sign In</title>
      </Head>
      <div className="bg-[url('/login-background.jpeg')] bg-cover bg-center min-h-screen flex items-center justify-center">
        <div className="flex items-center justify-center min-h-screen">
          <div className="w-full max-w-md p-8 space-y-8 bg-gray-800 rounded-md shadow-md border-t-4 border-orange-500">
            <h2 className="text-2xl font-bold text-center text-orange-500">Sign in to your account</h2>
            <form className="mt-8 space-y-6" onSubmit={handleEmailSignIn}>
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
              <button type="submit" className="w-full px-4 py-2 mt-4 text-sm font-medium text-white bg-orange-600 rounded-md hover:bg-orange-700 focus:outline-none focus:ring focus:ring-orange-500">
                Sign in
              </button>
              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-700"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-gray-800 text-gray-400">Or continue with</span>
                </div>
              </div>
              <button
                type="button"
                className="w-full px-4 py-2 text-sm font-medium text-white bg-orange-600 rounded-md hover:bg-orange-700 focus:outline-none focus:ring focus:ring-orange-500"
                onClick={handleGoogleSignIn}
              >
                Sign in with Google
              </button>
            </form>
            <p className="text-sm text-center text-gray-300">
              <Link href="/SignUp" className="font-medium text-orange-500 hover:text-orange-400">Don't have an account? Sign up</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}