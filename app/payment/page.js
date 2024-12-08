"use client";

import CheckoutPage from "../components/CheckoutPage";
import convertToSubcurrency from "../Lib/convertToSubcurrency";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Navbar from "../components/navbar";
import { useUserAuth } from "../Lib/auth-context";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// Ensure the Stripe publishable key is set in the environment variables
if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
  console.error("NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is not defined. Check your environment variables.");
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function PaymentPage() {
  const { user, authLoading } = useUserAuth(); // Access user and loading state from authentication context
  const router = useRouter(); // Initialize router for navigation

  const [amount, setAmount] = useState(49.99); // Default amount
  const [shippingInfo, setShippingInfo] = useState({
    fullName: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  });

  // Handle input change for shipping information
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo({ ...shippingInfo, [name]: value });
  };

  // Retrieve amount from search parameters in a client-safe way
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const queryAmount = queryParams.get("amount");
    if (queryAmount) {
      setAmount(parseFloat(queryAmount));
    }
  }, []);

  // Redirect unauthenticated users to the SignIn page
  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/SignIn"); // Redirect to SignIn if user is not logged in
    }
  }, [user, authLoading, router]);

  // Show loading message if authentication is being checked
  if (authLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>Redirecting to login...</div>;
  }

  return (
    <>
      <Navbar />
      <main className="max-w-6xl mx-auto p-10 bg-white rounded-lg shadow-lg mt-28">
        <div className="flex flex-col md:flex-row gap-10">
          {/* Shipping Information Section */}
          <div className="md:w-1/2 text-left">
            <h3 className="text-2xl font-semibold mb-4">Shipping Information</h3>
            <div className="space-y-4">
              {["fullName", "address", "city", "state", "zip", "country"].map((field) => (
                <input
                  key={field}
                  type="text"
                  name={field}
                  placeholder={field.replace(/^\w/, (c) => c.toUpperCase())}
                  value={shippingInfo[field]}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
              ))}
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
