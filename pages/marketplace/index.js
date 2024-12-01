"use client"
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion"; // Importing Framer Motion for animations

const Marketplace = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await fetch("/api/marketplace/allListings");
        const data = await response.json();
        setListings(data.listings || []);
      } catch (error) {
        console.error("Error fetching listings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, []);

  return (
    <div style={pageStyle}>
      {/* Navbar */}
      <nav style={navbarStyle}>
        <div style={buttonContainerStyle}>
          <Link href="/Main">
            <button style={backButtonStyle}>Back to Home</button>
          </Link>
          <Link href="/marketplace/createListing">
            <button style={sellButtonStyle}>Want to Sell Your Product?</button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={heroStyle}>
        <motion.h2
          style={heroTitleStyle}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Explore Unique Listings
        </motion.h2>
        <motion.p
          style={heroSubtitleStyle}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        >
          Find the best deals and post your items for sale!
        </motion.p>
      </section>

      {/* Listings Section */}
      <div style={listingContainerStyle}>
        {loading ? (
          <p style={loadingStyle}>Loading listings...</p>
        ) : listings.length > 0 ? (
          listings.map((listing) => (
            <div key={listing.id} style={listingCardStyle}>
              <div style={imageContainerStyle}>
                <img
                  src={listing.imageURL}
                  alt={listing.title}
                  style={imageStyle}
                  onError={(e) => (e.target.src = "/default-placeholder.png")}
                />
                <h3 style={titleOverlayStyle}>{listing.title}</h3>
              </div>
              <div style={descriptionStyle}>
                <p>{listing.description}</p>
                <p style={priceStyle}>${listing.price}</p>
                <Link href={`/marketplace/${listing.id}`}>
                  <button style={askButtonStyle}>Ask if it's Available</button>
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p>No listings found.</p>
        )}
      </div>
    </div>
  );
};

/* Page Styles */
const pageStyle = {
  fontFamily: "Arial, sans-serif",
  backgroundColor: "#f8f8f8",
  minHeight: "100vh",
};

/* Navbar Styles */
const navbarStyle = {
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
  backgroundColor: "#FB923C", // Same orange color as your navbar
  padding: "15px 30px",
  color: "#fff",
  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
};

const buttonContainerStyle = {
  display: "flex",
  gap: "15px",
};

const backButtonStyle = {
  padding: "10px 20px",
  backgroundColor: "#fff",
  color: "#FB923C",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  transition: "all 0.3s ease",
};

const sellButtonStyle = {
  padding: "10px 20px",
  backgroundColor: "#fff",
  color: "#FB923C",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  transition: "all 0.3s ease",
};

backButtonStyle["&:hover"] = sellButtonStyle["&:hover"] = {
  backgroundColor: "#FFD1A9",
  transform: "scale(1.05)",
};

/* Hero Section Styles */
const heroStyle = {
  textAlign: "center",
  padding: "50px 20px",
  background: "linear-gradient(to bottom, #FB923C, #FFD1A9)", // Darker orange to lighter gradient
  color: "#fff",
  marginBottom: "30px",
};

const heroTitleStyle = {
  fontSize: "4rem", // Larger font size
  marginBottom: "10px",
};

const heroSubtitleStyle = {
  fontSize: "1.5rem",
  fontWeight: "300",
};

/* Listing Container Styles */
const listingContainerStyle = {
  display: "flex",
  flexWrap: "wrap",
  gap: "20px",
  padding: "20px",
  justifyContent: "center",
};

/* Individual Listing Card Styles */
const listingCardStyle = {
  width: "250px",
  backgroundColor: "#fff",
  borderRadius: "10px",
  overflow: "hidden",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  minHeight: "400px",
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
};

const imageContainerStyle = {
  position: "relative",
};

const imageStyle = {
  width: "100%",
  height: "200px",
  objectFit: "cover",
};

const titleOverlayStyle = {
  position: "absolute",
  top: "10px",
  left: "10px",
  color: "#fff",
  backgroundColor: "rgba(0, 0, 0, 0.6)",
  padding: "5px 10px",
  borderRadius: "5px",
  fontSize: "1rem",
};

/* Description and Button Styles */
const descriptionStyle = {
  padding: "15px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  height: "100%",
};

const priceStyle = {
  fontWeight: "bold",
  color: "#FB923C",
  marginTop: "10px",
  fontSize: "1.2rem",
};

const askButtonStyle = {
  marginTop: "10px",
  padding: "10px",
  backgroundColor: "#FB923C",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  width: "100%",
  transition: "all 0.3s ease",
};

askButtonStyle["&:hover"] = {
  backgroundColor: "#FF8F62",
  transform: "scale(1.05)",
};

/* Loading Text */
const loadingStyle = {
  fontSize: "1.5rem",
  color: "#FB923C",
  textAlign: "center",
};

export default Marketplace;
