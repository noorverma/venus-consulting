import { useState } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";

export default function CreateListing() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imageBase64, setImageBase64] = useState(null);
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImageBase64(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    const formData = {
      title,
      description,
      price: parseFloat(price),
      imageUrl: imageBase64,
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
    <motion.div
      style={containerStyle}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Animated Header */}
      <motion.h1
        style={headerStyle}
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          duration: 1,
          type: "spring",
          stiffness: 50,
        }}
      >
        Create Your Listing
      </motion.h1>

      {/* Form Container */}
      <motion.div
        style={formContainerStyle}
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
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
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            style={submitButtonStyle}
          >
            Create Listing
          </motion.button>
        </form>

        {message && (
          <motion.p
            style={messageStyle}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {message}
          </motion.p>
        )}
      </motion.div>
    </motion.div>
  );
}

// Styles
const containerStyle = {
  fontFamily: "Arial, sans-serif",
  minHeight: "100vh",
  background: "linear-gradient(to bottom right, #FFF8E7, #FFDAB9)", // Light orange gradient
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: "20px",
};

const headerStyle = {
  fontSize: "48px",
  fontWeight: "bold",
  color: "#FC7303",
  marginBottom: "30px",
  textAlign: "center",
  textShadow: "2px 2px 5px rgba(0, 0, 0, 0.2)",
};

const formContainerStyle = {
  width: "100%",
  maxWidth: "600px",
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
  color: "#28a745",
  textAlign: "center",
  fontSize: "16px",
};

