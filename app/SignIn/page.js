'use client';

import { useUserAuth } from '../Lib/auth-context';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';

// Add the Spinner component at the top
const Spinner = () => (
  <motion.div 
    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    <motion.div 
      className="h-16 w-16 border-4 border-t-orange-500 border-r-transparent border-b-orange-500 border-l-transparent rounded-full"
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
    />
  </motion.div>
);

const shakeAnimation = {
  x: [0, -10, 10, -10, 10, 0],
  transition: { duration: 0.4 }
};

const FloatingLabelInput = ({ id, name, type, label, isInvalid }) => {
  return (
    <motion.div 
      className="relative" 
      initial={{ scale: 1 }} 
      whileFocus={{ scale: 1.05 }}
      animate={isInvalid ? shakeAnimation : {}}
    >
      <motion.input
        id={id}
        name={name}
        type={type}
        required
        className={`peer relative block w-full px-3 py-3 text-white border-gray-700 rounded-md bg-gray-900 placeholder-gray-400 focus:ring-orange-500 focus:border-orange-500 focus:bg-gray-800 transition-all duration-200 ${isInvalid ? 'border-red-500' : ''}`}
        placeholder=" "
      />
      <motion.label
        htmlFor={id}
        className="absolute text-sm text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-orange-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
        initial={{ y: 0 }}
        animate={{ y: -24 }}
        transition={{ duration: 0.2 }}
      >
        {label}
      </motion.label>
    </motion.div>
  );
};

export default function SignIn() {
  const router = useRouter();
  const { emailSignIn, googleSignIn } = useUserAuth();
  const [error, setError] = useState(null);
  const [isEmailInvalid, setIsEmailInvalid] = useState(false);
  const [isPasswordInvalid, setIsPasswordInvalid] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Add loading state

  const handleEmailSignIn = async (e) => {
    e.preventDefault();
    setError(null);
    setIsEmailInvalid(false);
    setIsPasswordInvalid(false);
    setIsLoading(true); // Start loading
    const email = e.target.email.value;
    const password = e.target.password.value;
    try {
      const { role } = await emailSignIn(email, password);  
      router.push(role === "admin" ? '/Admin' : '/Main'); 
    } catch (err) {
      console.error('Login error:', err);
      setError('Invalid email or password.');
      setIsEmailInvalid(true);
      setIsPasswordInvalid(true);
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Start loading
    try {
      const { role } = await googleSignIn(); 
      router.push(role === "admin" ? '/Admin' : '/Main');  
    } catch (error) {
      console.error('Google sign-in error:', error);
      setError('An error occurred during Google sign-in.');
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <>
      <Head>
        <title>Sign In</title>
      </Head>
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('/login-background.jpeg')] bg-cover bg-center" />
          <div className="absolute inset-0 bg-black/10" />
        </div>
        {isLoading && <Spinner />} {/* Add spinner when loading */}
        <motion.div 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-center min-h-screen relative z-10"
        >
          <div className="w-full max-w-md p-8 space-y-8 bg-gray-800/95 backdrop-blur-sm rounded-md shadow-md border-t-4 border-orange-500">
            <motion.h2 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-2xl font-bold text-center text-orange-500"
            >
              Sign in to your account
            </motion.h2>
            <form className="mt-8 space-y-6" onSubmit={handleEmailSignIn}>
              <div className="space-y-4">
                <FloatingLabelInput 
                  id="email" 
                  name="email" 
                  type="email" 
                  label="Email address" 
                  isInvalid={isEmailInvalid}
                />
                <FloatingLabelInput 
                  id="password" 
                  name="password" 
                  type="password" 
                  label="Password" 
                  isInvalid={isPasswordInvalid}
                />
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <div className="flex items-center justify-between">
                <label className="flex items-center text-sm text-gray-300">
                  <input type="checkbox" className="mr-2 w-4 h-4 text-orange-600 bg-gray-800 border-gray-700 rounded focus:ring-orange-500" />
                  Remember me
                </label>
                <Link href="/ForgotPassword" className="text-orange-500 hover:text-orange-400 text-sm">
                  Forgot password?
                </Link>
              </div>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit" 
                disabled={isLoading}
                className={`w-full px-4 py-2 mt-4 text-sm font-medium text-white bg-orange-600 rounded-md hover:bg-orange-700 focus:outline-none focus:ring focus:ring-orange-500 transition-all duration-200 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isLoading ? 'Signing in...' : 'Sign in'}
              </motion.button>
              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-700"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-gray-800 text-gray-400">Or continue with</span>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="button"
                disabled={isLoading}
                className={`w-full px-4 py-2 text-sm font-medium text-white bg-orange-600 rounded-md hover:bg-orange-700 focus:outline-none focus:ring focus:ring-orange-500 transition-all duration-200 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                onClick={handleGoogleSignIn}
              >
                {isLoading ? 'Signing in...' : 'Sign in with Google'}
              </motion.button>
            </form>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-sm text-center text-gray-300"
            >
              <Link href="/SignUp" className="font-medium text-orange-500 hover:text-orange-400">Do not have an account? Sign up</Link>
            </motion.p>
          </div>
        </motion.div>
      </div>
    </>
  );
}