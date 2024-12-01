"use client";

import React, { useEffect } from "react";
import Navbar from "../components/navbar"; // Import Navbar
import Link from "next/link"; // Next.js Link for navigation
import { useUserAuth } from "../Lib/auth-context"; // Import auth context
import { useRouter } from "next/navigation"; // Import router
import { motion } from "framer-motion"; // For animations
import "@fortawesome/fontawesome-free/css/all.min.css";

export default function About() {
  const { user, authLoading } = useUserAuth();
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/SignIn");
    }
  }, [user, authLoading, router]);

  if (authLoading || !user) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <div className="relative w-full h-[70vh]">
        {/* Background Image */}
        <img
          src="/About.jpg" // Replace with your actual image URL
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Darkened Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>

        {/* Content Wrapper */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
          {/* About Us Title */}
          <motion.h1
            className="text-5xl font-bold text-white max-w-screen-lg mx-auto"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            About Us
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-lg text-gray-200 max-w-screen-md mx-auto mt-4"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            Discover who we are and the values that drive our passion for
            delivering exceptional solutions.
          </motion.p>

          {/* Icons on the Hero Section */}
          <div className="flex space-x-6 mt-8">
            <div className="w-16 h-16 bg-orange-400 text-white rounded-full flex items-center justify-center shadow-lg">
              <i className="fas fa-bolt text-3xl"></i>
            </div>
            <div className="w-16 h-16 bg-orange-500 text-white rounded-full flex items-center justify-center shadow-lg">
              <i className="fas fa-tools text-3xl"></i>
            </div>
            <div className="w-16 h-16 bg-orange-600 text-white rounded-full flex items-center justify-center shadow-lg">
              <i className="fas fa-lightbulb text-3xl"></i>
            </div>
          </div>
        </div>
      </div>

      {/* Paragraph Section with Heading */}
      <section className="py-12 px-6 bg-gray-100 text-center">
        <div className="max-w-screen-lg mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-orange-500">
            Our Commitment to Excellence
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            At VENUS Electrical Consulting, we excel in power design, delivering
            tailored and comprehensive solutions to meet the specific demands of
            your project. Our expertise spans from initial concept design
            through to final implementation, ensuring that each project is
            optimized for efficiency, safety, and reliability.
          </p>
        </div>
      </section>

      {/* Images with Text Descriptions */}
      <section className="py-12 px-6 bg-white text-center">
        <h2 className="text-3xl font-bold mb-6 text-orange-500">
          Values Driving Our Culture
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-screen-lg mx-auto">
          <div className="flex flex-col items-center text-center">
            <img
              src="/First.png" // Replace with your image URL
              alt="Serving Others"
              className="w-20 h-20 mb-4"
            />
            <h3 className="text-xl font-bold text-orange-500">Serving Others</h3>
            <p className="text-gray-600 mt-2">
              We are committed to serving our customers and team members
              through honesty, integrity, and respect.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <img
              src="/Second.png" // Replace with your image URL
              alt="Improving Continually"
              className="w-20 h-20 mb-4"
            />
            <h3 className="text-xl font-bold text-orange-500">
              Improving Continually
            </h3>
            <p className="text-gray-600 mt-2">
              We strive for continual development and improving industry
              standards.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <img
              src="/Third.png" // Replace with your image URL
              alt="Enriching Environment"
              className="w-20 h-20 mb-4"
            />
            <h3 className="text-xl font-bold text-orange-500">
              Enriching Environment
            </h3>
            <p className="text-gray-600 mt-2">
              We foster a dynamic and enriching work environment, encouraging
              innovation and recognition.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <img
              src="/Fourth.png" // Replace with your image URL
              alt="Quality Results"
              className="w-20 h-20 mb-4"
            />
            <h3 className="text-xl font-bold text-orange-500">Quality Results</h3>
            <p className="text-gray-600 mt-2">
              We deliver high-quality results, ensuring long-term partnerships
              with our clients.
            </p>
          </div>
        </div>
      </section>

      {/* Open Positions Section */}
      <section className="py-16 px-6 bg-gradient-to-br from-orange-100 via-white to-orange-200 text-center">
        <h2 className="text-4xl font-bold text-orange-600 mb-6">
          Want to Join Our Team?
        </h2>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-8">
          We have exciting opportunities for talented individuals. Explore the
          roles we offer and become part of our dynamic team.
        </p>
        <Link
          href="/positions"
          className="inline-block bg-orange-500 text-white font-semibold py-3 px-8 rounded-lg shadow-lg hover:bg-orange-600 transition duration-300"
        >
          Open Positions
        </Link>
      </section>
    </>
  );
}
