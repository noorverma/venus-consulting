// code referenced from https://www.youtube.com/watch?v=fgbEwVWlpsI
// the code used in the video above used TypeScript and ChatGPT was used to change it to JavaScript
// Prompt: check the following code from any TypeScript components and change it to JavaScript if any found
'use client'
import CheckoutPage from "../components/CheckoutPage";
import convertToSubcurrency from "../Lib/convertToSubcurrency";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
    throw new Error("NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is not defined");
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function Home() {
    const amount = 49.99;

    return(
        <main className="max-w-4xl mx-auto p-10 text-center bg-white rounded-lg shadow-lg mt-10">
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
                    amount: convertToSubcurrency(amount),
                    currency: "usd",
                }}
            >
                <CheckoutPage amount={amount} />
            </Elements>
        </main>
    );
}