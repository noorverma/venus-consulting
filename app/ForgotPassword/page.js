//Used perlexity AI for reference but wrote the code myself

"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '../Lib/firebase';
import { sendPasswordResetEmail } from 'firebase/auth';
import Head from 'next/head';
import Link from 'next/link';

export default function ForgotPassword() {
    const router = useRouter();  
    const [email, setEmail] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleForgotPassword = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(false);
        
        try {
            await sendPasswordResetEmail(auth, email);
            setSuccess(true);
        } catch (err) {
            console.error('Forgot password error:', err);
            setError('An error occurred while sending the password reset email. Please try again.');
        }
    };

    return (
        <>
            <Head>
                <title>Forgot Password</title>
            </Head>
            <div className="bg-[url('/login-background.jpeg')] bg-cover bg-center min-h-screen flex items-center justify-center">
                <div>
                    <img src="/logo.png" alt="Logo" className="h-14 absolute top-5 left-5" />
                    <img src="/name.png" alt="Electrical Consulting" className="h-8 absolute top-9 left-20" />
                </div>
                <div className="flex items-center justify-center min-h-screen">
                    <div className="w-full max-w-md p-8 space-y-8 bg-gray-800 rounded-md shadow-md border-t-4 border-orange-500">
                        <h2 className="text-2xl font-bold text-center text-orange-500">Reset Your Password</h2>
                        <form className="mt-8 space-y-6" onSubmit={handleForgotPassword}>
                            <div className="space-y-4">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    className="relative block w-full px-3 py-3 text-white border-gray-700 rounded-md bg-gray-900 placeholder-gray-400 focus:ring-orange-500 focus:border-orange-500"
                                    placeholder="Email address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            {error && <p className="text-red-500 text-sm">{error}</p>}
                            {success && <p className="text-green-500 text-sm">Password reset email sent! Check your inbox.</p>}
                            
                            <button type="submit" className="w-full px-4 py-2 text-sm font-medium text-white bg-orange-600 rounded-md hover:bg-orange-700 focus:outline-none focus:ring focus:ring-orange-500">
                                Send Password Reset Email
                            </button>

                            <div className="text-sm text-center">
                                <Link href="/SignIn" className="font-medium text-orange-500 hover:text-orange-400">Remembered your password? Sign in</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
