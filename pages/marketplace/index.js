// /pages/marketplace/index.js
import React, { useEffect, useState } from "react";
import Link from "next/link";

const Marketplace = () => {
  // State to hold fetched listings
  const [listings, setListings] = useState([]);
  // State to manage loading state
  const [loading, setLoading] = useState(true);

  // Fetch all listings from the backend API when the component mounts
  useEffect(() => {
    const fetchListings = async () => {
      try {
        // API endpoint to fetch all listings
        const response = await fetch("/api/marketplace/allListings");
        const data = await response.json();
        // Update state with the fetched listings
        setListings(data.listings || []);
      } catch (error) {
        // Log any errors
        console.error("Error fetching listings:", error);
      } finally {
        // Set loading to false once data is fetched or an error occurs
        setLoading(false);
      }
    };

    fetchListings();
  }, []);

  return (
    <div>
      {/* Navbar with buttons aligned to the right */}
      <nav style={navbarStyle}>
        <div style={buttonContainerStyle}>
          {/* Back to Main Button */}
          <Link href="/Main">
            <button style={backButtonStyle}>Back to Home</button>
          </Link>

          {/* Want to Sell Button */}
          <Link href="/marketplace/createListing">
            <button style={sellButtonStyle}>Want to Sell Your Product?</button>
          </Link>
        </div>
      </nav>

      {/* Container to display all listings */}
      <div style={listingContainerStyle}>
        {loading ? (
          <p>Loading listings...</p>
        ) : listings.length > 0 ? (
          listings.map((listing) => (
            <div key={listing.id} style={listingCardStyle}>
              <div style={imageContainerStyle}>
                <img
                  src={listing.imageURL} // Use the imageURL directly from the listing
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
                  <button style={askButtonStyle}>Ask if it is Available</button>
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

// Styling for the navbar
const navbarStyle = {
  display: "flex",
  justifyContent: "flex-end", // Align all items to the right
  alignItems: "center",
  backgroundColor: "#FB923C",
  padding: "15px 20px",
};

// Styling for the button container to group the buttons on the right
const buttonContainerStyle = {
  display: "flex",
  gap: "10px", // Add space between buttons
};

// Styling for the "Back to Main" button
const backButtonStyle = {
  padding: "10px 20px",
  backgroundColor: "#fff",
  color: "#FB923C",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

// Styling for the "Sell Your Product" button
const sellButtonStyle = {
  padding: "10px 20px",
  backgroundColor: "#fff",
  color: "#FB923C",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

// Styling for the container holding all listings
const listingContainerStyle = {
  display: "flex",
  flexWrap: "wrap",
  gap: "20px",
  padding: "20px",
  justifyContent: "center",
};

// Styling for individual listing cards
const listingCardStyle = {
  width: "250px",
  backgroundColor: "#f5f5f5",
  borderRadius: "10px",
  overflow: "hidden",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  minHeight: "400px",
};

// Styling for the container holding the image
const imageContainerStyle = {
  position: "relative",
};

// Styling for the image within each listing card
const imageStyle = {
  width: "100%",
  height: "200px",
  objectFit: "cover",
};

// Styling for the title overlay on the image
const titleOverlayStyle = {
  position: "absolute",
  top: "10px",
  left: "10px",
  color: "#fff",
  backgroundColor: "rgba(0, 0, 0, 0.6)",
  padding: "5px 10px",
  borderRadius: "5px",
};

// Styling for the description and price section
const descriptionStyle = {
  padding: "15px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  height: "100%",
};

// Styling for the price text
const priceStyle = {
  fontWeight: "bold",
  color: "#FB923C",
  marginTop: "10px",
};

// Styling for the "Ask if Available" button
const askButtonStyle = {
  marginTop: "10px",
  padding: "10px",
  backgroundColor: "#FB923C",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  width: "100%",
};

export default Marketplace;