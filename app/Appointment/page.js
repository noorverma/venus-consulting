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

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products"); // Fetch data from the products API
        const data = await response.json();
        setProducts(data); // Set the fetched products
        setLoading(false); // Stop loading
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false); // Stop loading in case of error
      }
    };

    fetchProducts(); // Call the fetch function
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

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
      const result = await createAppointment(formData);
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

  // Redirect unauthenticated users to SignIn page
  if (authLoading || !user) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {/* Navbar at the top */}
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
              backgroundColor: "rgba(105, 105, 105, 0.7)", // Dark grey with 70% opacity
            }}
          ></div>
          {/* Text on top of the image */}
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

        <h2
          style={{
            fontWeight: "bold",
            textAlign: "left",
            fontSize: "2rem",
            margin: "20px 0 0 20%",
          }}
        >
          Fill in your details
        </h2>

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
              <label>Reason for Visit</label>
              <input
                type="text"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Reason for visit"
                style={inputStyle}
                required
              />

              <label>Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                style={inputStyle}
                required
              />

              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                style={inputStyle}
                required
              />

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
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                style={inputStyle}
                required
              />

              <label>Select Time</label>
              <p style={{ color: "#555", fontSize: "14px", marginBottom: "10px" }}>
                *You can only book from the available times below*:
              </p>
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
            {message && (
              <p
                style={{
                  color: message.includes("Failed") || message.includes("error") ? "red" : "green",
                  fontSize: "1.5rem",
                  textAlign: "center",
                  marginTop: "20px",
                }}
              >
                {message}
              </p>
            )}
          </div>

          {/* Product and Contact Info Section */}
          <div style={{ width: "35%" }}>
            {/* Product List */}
            <div>
              <h2 className="text-2xl font-bold mb-4">Explore Our Equipment</h2>
              {loading ? (
                <p>Loading products...</p>
              ) : (
                <div className="flex overflow-x-scroll space-x-6 pb-6">
                  {products.map((product) => (
                    <div
                      key={product.id}
                      className="w-64 bg-white rounded-lg shadow-lg p-4 flex-shrink-0 flex flex-col justify-between"
                    >
                      <img src={product.image} alt={product.name} className="w-full h-30 object-cover rounded-t-lg" />
                      <div>
                        <h3 className="text-lg font-semibold mt-4">{product.name}</h3>
                        <p className="text-gray-600 mt-2">{product.description}</p>
                        <p className="font-bold mt-2">${product.price}</p>
                      </div>
                      <button className="mt-4 bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600">
                        <a href={`/product/${product.id}`}>View Details</a>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Contact Info Section */}
            <div
              style={{
                padding: "20px",
                backgroundColor: "#f9f9f9",
                borderRadius: "10px",
                boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
                marginTop: "10px",
                marginBottom: "20px",
              }}
            >
              <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "10px" }}>VENUS Electrical Consulting</h2>
              <h3 style={{ fontSize: "1.2rem", fontWeight: "bold", marginBottom: "10px" }}>Headquarters</h3>
              <p>2308 Centre a St NE#107</p>
              <p>Calgary, AB</p>
              <p>T2E 2T7</p>
              <p>
                <strong>Phone:</strong> <span style={{ color: "orange" }}>(403) 603-0639</span>
              </p>
            </div>
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

// Common style for submit button
const submitButtonStyle = {
  padding: "15px",
  backgroundColor: "#FB923C",
  color: "#fff",
  fontSize: "16px",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};
