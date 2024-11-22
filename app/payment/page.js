// code referenced from https://www.youtube.com/watch?v=fgbEwVWlpsI
// the code used in the video above used TypeScript and ChatGPT was used to change it to JavaScript
// Prompt: check the following code from any TypeScript components and change it to JavaScript if any found

'use client';

import CheckoutPage from "../components/CheckoutPage";
import convertToSubcurrency from "../Lib/convertToSubcurrency";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useSearchParams } from "next/navigation";
import Navbar from "../components/navbar";
import { useUserAuth } from "../Lib/auth-context"; // Import authentication context
import { useRouter } from "next/navigation"; // Import Next.js router
import { useEffect } from "react";

// Ensure the Stripe publishable key is set in the environment variables
if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
    throw new Error("NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is not defined");
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function Payment() {
    const { user, authLoading } = useUserAuth(); // Access user and loading state from authentication context
    const router = useRouter(); // Initialize router for navigation
    const searchParams = useSearchParams();
    const amount = searchParams.get("amount") || 49.99;

    // Redirect unauthenticated users to the SignIn page
    useEffect(() => {
        if (!authLoading && !user) {
            router.push("/SignIn"); // Redirect to SignIn if user is not logged in
        }
    }, [user, authLoading, router]);

    // Show loading message if authentication is being checked
    if (authLoading || !user) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Navbar />
            <main className="max-w-4xl mx-auto p-10 text-center bg-white rounded-lg shadow-lg mt-28">
                {/* Increased "mt-28" for more space below the navbar */}
                <div className="mb-10">
                    <h1 className="text-4xl font-extrabold mb-2 text-orange-500">Payment Request</h1>
                    <h2 className="text-2xl font-medium text-gray-700">
                        You have been requested to pay
                        <span className="font-bold text-black"> ${amount}</span>
                    </h2>
                </div>

                <Elements
                    stripe={stripePromise}
                    options={{
                        mode: "payment",
                        amount: convertToSubcurrency(amount), // Convert the amount to subcurrency
                        currency: "usd", // Set currency to USD
                    }}
                >
                    <CheckoutPage amount={amount} />
                </Elements>
            </main>
        </>
    );
}