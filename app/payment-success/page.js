// code referenced from https://www.youtube.com/watch?v=fgbEwVWlpsI
// the code used in the video above used TypeScript and ChatGPT was used to change it to JavaScript
// Prompt: check the following code from any TypeScript components and change it to JavaScript if any found
"use client";

import { useEffect } from "react";
import { useUserAuth } from "../Lib/auth-context"; // Import authentication context
import { useRouter } from "next/navigation"; // Import Next.js router

export default function PaymentSuccess({ searchParams }) {
  const { user, authLoading } = useUserAuth(); // Access user and loading state from authentication context
  const router = useRouter(); // Initialize router for navigation

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

  const { amount } = searchParams;

  return (
    <main className="max-w-6xl mx-auto p-10 text-white text-center border m-10 rounded-md bg-gradient-to-tr from-blue-500 to-purple-500">
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold mb-2">Thank you!</h1>
        <h2 className="text-2xl">You successfully sent</h2>
        <div className="bg-white p-2 rounded-md text-purple-500 mt-5 text-4xl font-bold">
          ${amount}
        </div>
      </div>
    </main>
  );
}
