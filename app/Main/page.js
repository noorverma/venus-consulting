"use client";
import { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import ChatWithAdmin from "../components/chatWithAdmin";
import "@fortawesome/fontawesome-free/css/all.min.css";

const slideImages = [
  "/backgroundMain.jpg",
  "/slide2.jpg",
  "/slide3.jpg",
  "/slide4.jpg",
  "/slide5.jpg",
];

const MainPage = () => {
  const userId = "user123";
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slideImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-full overflow-x-hidden">
      <Navbar />

      {/* Slideshow Section */}
      <div className="h-screen relative overflow-hidden">
        <div className="absolute inset-0">
          {slideImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                currentIndex === index ? "opacity-100" : "opacity-0"
              }`}
              style={{
                backgroundImage: `url(${image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>
          ))}
        </div>

        <div className="absolute inset-0 bg-black opacity-60"></div>

        <div className="relative z-10 h-full flex flex-col items-center justify-center">
          <div className="text-center px-4 space-y-6">
            <h1 className="text-5xl font-bold text-white mb-4">
              Your Vision Wired to Perfection
            </h1>
            <p className="text-white mb-8 text-xl font-light">
              Delivering Advanced Electrical Engineering Solutions to Power
              your Success
            </p>
            <div className="flex justify-center space-x-4 mb-12">
              <a
                href="/Appointment"
                className="rounded-lg bg-orange-500 px-10 py-3 text-base font-medium text-white 
                shadow-lg hover:scale-105 transition-transform duration-300 hover:bg-white hover:text-orange-500"
              >
                Book an Appointment
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Marketplace Section */}
      <div className="h-screen grid grid-cols-2 gap-10 items-center bg-white px-8">
        {/* Left Content */}
        <div>
          <h2 className="text-5xl font-bold text-gray-800 mb-6 animate-slideUp">
            Explore the <span className="text-orange-500">Marketplace</span>
          </h2>
          <p className="text-lg text-gray-600 mb-6 animate-fadeIn">
            Discover innovative solutions, services, and products to take your
            business to the next level.
          </p>
          <a
            href="/marketplace"
            className="bg-orange-500 text-white font-semibold py-3 px-8 rounded-lg shadow-lg hover:shadow-xl hover:scale-110 transition-transform duration-300 hover:bg-orange-600 animate-wind"
          >
            Visit the Marketplace
          </a>
        </div>

        {/* Right Content */}
        <div className="flex flex-col items-center space-y-8 relative">
          {/* Decorative Circle */}
          <div
            className="absolute top-0 right-0 w-64 h-64 bg-orange-200 rounded-full opacity-30"
            style={{
              transform: "translate(50%, -50%)",
              maxWidth: "100%",
              overflow: "hidden",
            }}
          ></div>

          {/* Icon Section */}
          <div className="grid grid-cols-2 gap-8">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-orange-500 text-white rounded-full flex items-center justify-center">
                <i className="fas fa-bolt text-2xl"></i>
              </div>
              <p className="text-gray-600 mt-2 text-center">
                Electrical Services
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-blue-500 text-white rounded-full flex items-center justify-center">
                <i className="fas fa-tools text-2xl"></i>
              </div>
              <p className="text-gray-600 mt-2 text-center">
                Maintenance Tools
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-green-500 text-white rounded-full flex items-center justify-center">
                <i className="fas fa-lightbulb text-2xl"></i>
              </div>
              <p className="text-gray-600 mt-2 text-center">
                Innovative Ideas
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-purple-500 text-white rounded-full flex items-center justify-center">
                <i className="fas fa-cogs text-2xl"></i>
              </div>
              <p className="text-gray-600 mt-2 text-center">
                Custom Solutions
              </p>
            </div>
          </div>

          {/* Testimonial or Stats Section */}
          <div className="text-center">
            <h3 className="text-3xl font-semibold text-gray-800">
              Trusted by Clients Worldwide
            </h3>
            <div className="flex space-x-8 mt-4">
              <div>
                <h4 className="text-4xl font-bold text-orange-500">1,000+</h4>
                <p className="text-gray-600">Satisfied Clients</p>
              </div>
              <div>
                <h4 className="text-4xl font-bold text-blue-500">500+</h4>
                <p className="text-gray-600">Projects Delivered</p>
              </div>
              <div>
                <h4 className="text-4xl font-bold text-green-500">250+</h4>
                <p className="text-gray-600">Awards Won</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Component */}
      <div className="relative z-10">
        <ChatWithAdmin userId={userId} />
      </div>
    </div>
  );
};

export default MainPage;
