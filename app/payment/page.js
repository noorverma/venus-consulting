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
import { useEffect, useState } from "react";

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

    // State for shipping information
    const [shippingInfo, setShippingInfo] = useState({
        fullName: "",
        address: "",
        city: "",
        state: "",
        zip: "",
        country: ""
    });

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

    // Handle input change for shipping information
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setShippingInfo({ ...shippingInfo, [name]: value });
    };

    return (
        <>
            <Navbar />
            <main className="max-w-6xl mx-auto p-10 bg-white rounded-lg shadow-lg mt-28">
                {/* Increased "mt-28" for more space below the navbar */}
                <div className="flex flex-col md:flex-row gap-10">
                    {/* Shipping Information Section */}
                    <div className="md:w-1/2 text-left">
                        <h3 className="text-2xl font-semibold mb-4">Shipping Information</h3>
                        <div className="space-y-4">
                            <input
                                type="text"
                                name="fullName"
                                placeholder="Full Name"
                                value={shippingInfo.fullName}
                                onChange={handleInputChange}
                                className="w-full p-3 border border-gray-300 rounded-lg"
                            />
                            <input
                                type="text"
                                name="address"
                                placeholder="Address"
                                value={shippingInfo.address}
                                onChange={handleInputChange}
                                className="w-full p-3 border border-gray-300 rounded-lg"
                            />
                            <input
                                type="text"
                                name="city"
                                placeholder="City"
                                value={shippingInfo.city}
                                onChange={handleInputChange}
                                className="w-full p-3 border border-gray-300 rounded-lg"
                            />
                            <input
                                type="text"
                                name="state"
                                placeholder="State"
                                value={shippingInfo.state}
                                onChange={handleInputChange}
                                className="w-full p-3 border border-gray-300 rounded-lg"
                            />
                            <input
                                type="text"
                                name="zip"
                                placeholder="ZIP Code"
                                value={shippingInfo.zip}
                                onChange={handleInputChange}
                                className="w-full p-3 border border-gray-300 rounded-lg"
                            />
                            <input
                                type="text"
                                name="country"
                                placeholder="Country"
                                value={shippingInfo.country}
                                onChange={handleInputChange}
                                className="w-full p-3 border border-gray-300 rounded-lg"
                            />
                        </div>
                    </div>

                    {/* Payment Section */}
                    <div className="md:w-1/2">
                        <div className="mb-0">
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
                            <CheckoutPage amount={amount} shippingInfo={shippingInfo} />
                        </Elements>
                    </div>
                </div>
            </main>
        </>
    );
}
