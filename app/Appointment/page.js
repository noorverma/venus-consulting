"use client";

import React, { useEffect, useState } from "react"; // Import React hooks
import Navbar from "../components/navbar"; // Import Navbar component
import { createAppointment } from "@/actions/appointments"; // Import the createAppointment function
import { useUserAuth } from "../Lib/auth-context"; // Import authentication context
import { useRouter } from "next/navigation"; // Import Next.js router
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";


export default function Appointment() {
  const { user, authLoading } = useUserAuth(); // Get user and loading state from authentication context
  const router = useRouter(); // Initialize router for navigation

  // Redirect unauthenticated users to the SignIn page
  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/SignIn"); // Redirect to SignIn if user is not logged in
    }
  }, [user, authLoading, router]);

  // State management for form fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [reason, setReason] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [message, setMessage] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);
  const { width, height } = useWindowSize();
  // Predefined time slots for appointment booking
  const timeSlots = ["9:45 AM", "10:45 AM", "12:00 PM", "4:00 PM", "5:00 PM"];

  // State management for product data
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch product data when the component mounts
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products"); // Fetch data from API
        const data = await response.json();
        setProducts(data); // Set fetched products
        setLoading(false); // Stop loading
      } catch (error) {
        console.error("Error fetching products:", error); // Log error if fetch fails
        setLoading(false); // Stop loading
      }
    };

    fetchProducts(); // Call fetch function
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setMessage("");

    // Collect form data
    const formData = {
      name,
      email,
      phone,
      reason,
      date,
      time,
      userId: user?.uid || "Unknown", // Use the logged-in user's UID
    };

    try {
      const result = await createAppointment(formData); // Send form data to API
      if (result.success) {
        setMessage("Appointment booked successfully!");
        setShowConfetti(true); //trigger confetti 
        // Reset form fields
        setName("");
        setEmail("");
        setPhone("");
        setReason("");
        setDate("");
        setTime("");
         // Hide confetti after 5 seconds
         setTimeout(() => setShowConfetti(false), 5000);
      } else {
        setMessage("Failed to book appointment. Please try again.");
      }
    } catch (error) {
      setMessage("An unexpected error occurred. Please try again.");
    }
  };

  // Handle "Learn More" button click
  const handleLearnMore = (productId) => {
    router.push(`/product/${productId}`); // Navigate to product details page
  };

  // Show loading message if authentication is being checked
  if (authLoading || !user) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {/* Navbar */}
      <Navbar />
      <div style={{ fontFamily: "Poppins, Arial, sans-serif" }}>
        {/* Header Section */}
        <div style={{ position: "relative", width: "100%", textAlign: "center", marginBottom: "20px" }}>
          <img
            src="/Consulting.png"
            alt="Appointment Page"
            style={{ width: "100%", height: "auto", objectFit: "cover" }}
          />
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(105, 105, 105, 0.7)", // Dark grey overlay
            }}
          ></div>
          <h2
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              color: "#fff",
              fontSize: "3rem",
              fontWeight: "bold",
            }}
          >
            Book an Appointment
          </h2>
        </div>

        {/* Main Content */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "0 10%",
            alignItems: "flex-start",
            marginTop: "20px",
          }}
        >
          {/* Form Section */}
          <div
            style={{
              position: "relative",
              width: "60%",
              padding: "20px",
              borderRadius: "10px",
              boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
              backgroundColor: "#fff",
            }}
          >
            {showConfetti && (
              <Confetti
              width={width * 0.6}
              height={height * 0.8}
              recycle={false}
              style={{ position: "absolute", top: 0, left: 0 }}
            />
            )}
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column" }}>
              {/* Form Fields */}
              <label>Reason for Visit</label>
              <input type="text" value={reason} onChange={(e) => setReason(e.target.value)} placeholder="Reason for visit" style={inputStyle} required />

              <label>Name</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your name" style={inputStyle} required />

              <label>Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" style={inputStyle} required />

              <label>Phone Number</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="000-000-0000"
                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                title="Phone number should be in the format: 123-456-7890"
                style={inputStyle}
                required
              />

              <label>Select Appointment Date</label>
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} style={inputStyle} required />

              <label>Select Time</label>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
                {timeSlots.map((slot, index) => (
                  <button
                    key={index}
                    type="button"
                    style={{
                      padding: "10px 20px",
                      borderRadius: "5px",
                      border: "none",
                      cursor: "pointer",
                      backgroundColor: time === slot ? "#FB923C" : "#f0f0f0",
                      color: time === slot ? "#fff" : "#000",
                    }}
                    onClick={() => setTime(slot)}
                  >
                    {slot}
                  </button>
                ))}
              </div>

              <button type="submit" style={submitButtonStyle}>
                Book Now
              </button>
            </form>

            {/* Message */}
            {message && (
              <p style={{ color: message.includes("Failed") || message.includes("error") ? "red" : "green", fontSize: "1.5rem", textAlign: "center", marginTop: "20px" }}>
                {message}
              </p>
            )}
          </div>

          {/* Product Section */}
          <div style={{ width: "35%" }}>
            <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "10px" }}>Explore Our Equipment</h2>
            {loading ? (
              <p>Loading products...</p>
            ) : (
              <div style={{ display: "flex", overflowX: "scroll", gap: "10px" }}>
                {products.map((product) => (
                  <div key={product.id} style={{ width: "200px", padding: "10px", borderRadius: "10px", boxShadow: "0px 0px 10px rgba(0,0,0,0.1)", backgroundColor: "#fff" }}>
                    <img src={product.image} alt={product.name} style={{ width: "100%", borderRadius: "10px" }} />
                    <h3 style={{ fontSize: "1rem", fontWeight: "bold", marginTop: "10px" }}>{product.name}</h3>
                    <p style={{ fontSize: "0.9rem", color: "#555" }}>{product.description}</p>
                    <p style={{ fontWeight: "bold", marginTop: "10px" }}>${product.price}</p>
                    <button
                      onClick={() => handleLearnMore(product.id)}
                      style={{
                        marginTop: "10px",
                        padding: "10px",
                        backgroundColor: "#FB923C",
                        color: "#fff",
                        borderRadius: "5px",
                        border: "none",
                        cursor: "pointer",
                      }}
                    >
                      Learn More
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

// Common styles for input fields
const inputStyle = {
  padding: "10px",
  marginBottom: "20px",
  fontSize: "16px",
  borderRadius: "5px",
  border: "1px solid #ccc",
};

// Common style for the submit button
const submitButtonStyle = {
  padding: "15px",
  backgroundColor: "#FB923C",
  color: "#fff",
  fontSize: "16px",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};