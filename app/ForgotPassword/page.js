//Used perlexity AI for instructions and references but wrote the code myself
// This is a client-side component for handling the forgot password feature for users forgetting their password.
// It uses Firebase for authentication and sending password reset emails.
"use client";

import { useState } from 'react'; 
import { useRouter } from 'next/navigation'; 
import { auth } from '../Lib/firebase'; 
import { sendPasswordResetEmail } from 'firebase/auth'; 
import Head from 'next/head'; 
import Link from 'next/link'; 

export default function ForgotPassword() {
    const router = useRouter(); // Router instance for navigating between pages.
    const [email, setEmail] = useState(''); // State to store the email input.
    const [error, setError] = useState(null); // State to store any error that occurs.
    const [success, setSuccess] = useState(false); // State to track if the email was sent successfully.

    // perplexity AI told me to call on firebase authentication services to send a password to the user's inputed email provided they have an account recorded in our system
    // Function that handles the password reset logic
    const handleForgotPassword = async (e) => {
        e.preventDefault(); // Prevents form submission from refreshing the page.
        setError(null); // Clear previous errors before processing.
        setSuccess(false); // Clear any previous success message.

        try {
            // Sends a password reset email using Firebase's authentication service.
            await sendPasswordResetEmail(auth, email);
            setSuccess(true); // If successful, display success message.
        } catch (err) {
            // If there's an error, display a relevant message to the user.
            setError('An error occurred while sending the password reset email. Please try again.');
        }
    };

    return (
        <>
            {/* Set the page title */}
            <Head>
                <title>Forgot Password</title>
            </Head>

            {/* Main page layout and background */}
            <div className="bg-[url('/login-background.jpeg')] bg-cover bg-center min-h-screen flex items-center justify-center">
                {/* Branding with logo and company name */}
                <div>
                    <img src="/logo.png" alt="Logo" className="h-14 absolute top-5 left-5" />
                    <img src="/name.png" alt="Electrical Consulting" className="h-8 absolute top-9 left-20" />
                </div>

                {/* Password reset form */}
                <div className="flex items-center justify-center min-h-screen">
                    <div className="w-full max-w-md p-8 space-y-8 bg-gray-800 rounded-md shadow-md border-t-4 border-orange-500">
                        <h2 className="text-2xl font-bold text-center text-orange-500">Reset Your Password</h2>

                        {/* Form that collects user's email */}
                        <form className="mt-8 space-y-6" onSubmit={handleForgotPassword}>
                            {/* Input for email */}
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                className="relative block w-full px-3 py-3 text-white border-gray-700 rounded-md bg-gray-900 placeholder-gray-400 focus:ring-orange-500 focus:border-orange-500"
                                placeholder="Email address"
                                value={email} // Bound to email state.
                                onChange={(e) => setEmail(e.target.value)} // Update state on input change.
                            />

                            {/* Error message shown if there's an error */}
                            {error && <p className="text-red-500 text-sm">{error}</p>}

                            {/* Success message shown if the reset email is sent */}
                            {success && <p className="text-green-500 text-sm">Password reset email sent! Check your inbox.</p>}

                            {/* Submit button */}
                            <button type="submit" className="w-full px-4 py-2 text-sm font-medium text-white bg-orange-600 rounded-md hover:bg-orange-700 focus:outline-none focus:ring focus:ring-orange-500">
                                Send Password Reset Email
                            </button>

                            {/* Link to sign-in page if the user remembers their password */}
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