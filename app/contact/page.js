"use client";

import { useEffect } from "react";
import Navbar from "../components/navbar";
import ContactForm from "../components/contact-form";
import { useUserAuth } from "../Lib/auth-context"; // Import authentication context
import { useRouter } from "next/navigation"; // Import Next.js router

export default function Contact() {
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

  return (
    <div>
      <Navbar />
      <ContactForm />
    </div>
  );
}
