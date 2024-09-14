"use client"; // mark as a use client

import { useState } from 'react';
import { registerUser } from '../Lib/authUtilities';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router'; // Import useRouter for navigation

export default function SignUp() {
  const [username, setUsername] = useState(''); // New state for username
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const router = useRouter(); // Initialize useRouter for redirection

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError(null); // Reset error state
    try {
      const user = await registerUser(username, email, password); // Pass username to registerUser
      console.log('User registered successfully:', user);
      router.push('/SignIn'); // Redirect to /SignIn after successful registration
    } catch (err) {
      setError(err.message); // Display error message
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
            <div>
              <h2 className="text-2xl font-bold text-center text-orange-500">Create an Account</h2>
            </div>
            <form className="mt-8 space-y-6" onSubmit={handleSignUp}>
              <div className="space-y-4 rounded-md shadow-sm">
                <div>
                  <label htmlFor="username" className="sr-only">Username</label>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-700 rounded-md bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                    placeholder="Your username"
                  />
                </div>
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
                    placeholder="Your email"
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
              {error && <p className="text-red-500 text-sm">{error}</p>} {/* Error message */}
              <div>
                <button
                  type="submit"
                  className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-orange-600 border border-transparent rounded-md group hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                >
                  Sign Up
                </button>
              </div>
            </form>
            <div className="text-sm text-center text-gray-300">
              <Link href="/SignIn" className="font-medium text-orange-500 hover:text-orange-400">
                Already have an account? <span className="font-bold">Sign In</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
