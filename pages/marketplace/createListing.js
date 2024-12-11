// /pages/marketplace/createListing.js
import { useState } from "react";
import { useRouter } from "next/router";
import { auth } from "@/app/Lib/firebase"; // Ensure auth is correctly imported from your Firebase setup

export default function CreateListing() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imageBase64, setImageBase64] = useState(null);
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleImageChange = (e) => {
    const file = e.target.files?.[0]; // Safely access the first file
    if (!file) {
      console.error("No file selected");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImageBase64(reader.result); // Set Base64 image string
    };
    reader.readAsDataURL(file); // Convert image to Base64
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    const user = auth.currentUser; // Use the initialized Firebase Auth instance
    if (!user) {
      setMessage("You must be logged in to create a listing.");
      return;
    }

    const formData = {
      title,
      description,
      price: parseFloat(price),
      imageUrl: imageBase64,
      userId: user.uid, // Use the authenticated user's UID
    };

    try {
      const response = await fetch("/api/marketplace/createListing", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok && result.success) {
        setMessage("Listing created successfully!");
        router.push("/marketplace");
      } else {
        setMessage(`Failed to create listing: ${result.message || "Unknown error"}`);
      }
    } catch (error) {
      console.error("An error occurred:", error);
      setMessage("An error occurred while creating the listing. Please try again.");
    }
  };

  return (
    <div style={containerStyle}>
      <div style={headerContainerStyle}>
        <h1 style={headerStyle}>Create Your Listing</h1>
      </div>
      <div style={formContainerStyle}>
        <form onSubmit={handleSubmit} style={formStyle}>
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Title:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              style={inputStyle}
              placeholder="Enter the title of your item"
            />
          </div>
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Description:</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              style={{ ...inputStyle, height: "100px" }}
              placeholder="Provide a detailed description"
            />
          </div>
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Price:</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              style={inputStyle}
              placeholder="Enter the price"
            />
          </div>
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Image:</label>
            <input
              type="file"
              onChange={handleImageChange}
              required
              style={inputStyle}
              accept="image/*"
            />
          </div>
          <button type="submit" style={submitButtonStyle}>
            Create Listing
          </button>
        </form>
        {message && <p style={messageStyle}>{message}</p>}
      </div>
    </div>
  );
}

// Styles
const containerStyle = {
  fontFamily: "Arial, sans-serif",
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  background: "linear-gradient(120deg, #FFF8E7, #FFD3A4)", // Animated gradient background
  padding: "20px",
};

const headerContainerStyle = {
  width: "100%",
  textAlign: "center",
  marginBottom: "30px",
};

const headerStyle = {
  fontSize: "48px",
  fontWeight: "bold",
  color: "#FC7303",
  textShadow: "2px 2px 5px rgba(0, 0, 0, 0.2)",
};

const formContainerStyle = {
  width: "100%",
  maxWidth: "500px",
  backgroundColor: "#fff",
  padding: "30px",
  borderRadius: "10px",
  boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
};

const formStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "15px",
};

const inputGroupStyle = {
  display: "flex",
  flexDirection: "column",
};

const labelStyle = {
  fontSize: "16px",
  color: "#333",
  fontWeight: "bold",
  marginBottom: "5px",
};

const inputStyle = {
  padding: "10px",
  fontSize: "16px",
  borderRadius: "5px",
  border: "1px solid #ddd",
};

const submitButtonStyle = {
  padding: "12px 20px",
  backgroundColor: "#FC7303",
  color: "#fff",
  fontSize: "18px",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  marginTop: "10px",
};

const messageStyle = {
  marginTop: "20px",
  color: "green",
  textAlign: "center",
  fontSize: "16px",
};
