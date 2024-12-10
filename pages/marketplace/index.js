import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaHome } from "react-icons/fa";

const Marketplace = () => {
  const [listings, setListings] = useState([]);
  const [filteredListings, setFilteredListings] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await fetch("/api/marketplace/allListings");
        const data = await response.json();
        setListings(data.listings || []);
        setFilteredListings(data.listings || []);
      } catch (error) {
        console.error("Error fetching listings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, []);

  // Handle search and filter listings
  useEffect(() => {
    let updatedListings = [...listings];

    // Filter based on search query
    if (searchQuery) {
      updatedListings = updatedListings.filter((listing) =>
        listing.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply sorting if needed
    if (sortOption === "price") {
      updatedListings.sort((a, b) => a.price - b.price); // Sort by price (low to high)
    } else if (sortOption === "alphabetical") {
      updatedListings.sort((a, b) => a.title.localeCompare(b.title)); // Sort A-Z
    }

    setFilteredListings(updatedListings);
  }, [searchQuery, sortOption, listings]);

  return (
    <div style={pageStyle}>
      {/* Home Icon */}
      <Link href="/Main">
        <div style={homeIconStyle}>
          <FaHome size={30} />
        </div>
      </Link>

      {/* Hero Section */}
      <motion.h1
        style={heroTitleStyle}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Find your best deal and post your items for sale!
      </motion.h1>

      {/* Search Bar */}
      <div style={searchContainerStyle}>
        <input
          type="text"
          placeholder="What are you looking for?"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={searchInputStyle}
        />
        <button style={searchButtonStyle} onClick={() => {}}>
          Search
        </button>
      </div>

      {/* Sort Dropdown */}
      <div style={sortContainerStyle}>
        <select
          style={sortDropdownStyle}
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="">Sort By</option>
          <option value="price">Price</option>
          <option value="alphabetical">A-Z</option>
        </select>
      </div>

      {/* Listings Section */}
      <div style={listingContainerStyle}>
        {loading ? (
          <p style={loadingStyle}>Loading listings...</p>
        ) : filteredListings.length > 0 ? (
          filteredListings.map((listing) => (
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
              <div style={descriptionContainerStyle}>
                <div style={descriptionStyle}>
                  <p>{listing.description}</p>
                  <p style={priceStyle}>${listing.price}</p>
                </div>
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

      {/* Floating Action Button */}
      <motion.div
        style={fabStyle}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => (window.location.href = "/marketplace/createListing")}
      >
        Want to Sell an Item?
      </motion.div>
    </div>
  );
};

/* Styles */
const pageStyle = {
  fontFamily: "Arial, sans-serif",
  minHeight: "100vh",
  padding: "20px",
  animation: "backgroundAnimation 10s infinite linear",
  backgroundSize: "200% 200%",
};

const homeIconStyle = {
  position: "absolute",
  top: "20px",
  left: "20px",
  backgroundColor: "#FC7303",
  color: "#fff",
  borderRadius: "50%",
  padding: "10px",
  cursor: "pointer",
  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
};

const heroTitleStyle = {
  fontSize: "3rem",
  textAlign: "center",
  marginBottom: "30px",
  color: "#FC7303",
};

const searchContainerStyle = {
  display: "flex",
  justifyContent: "center",
  marginBottom: "20px",
};

const searchInputStyle = {
  width: "50%",
  padding: "10px",
  fontSize: "16px",
  borderRadius: "5px 0 0 5px",
  border: "1px solid #ccc",
};

const searchButtonStyle = {
  padding: "10px 20px",
  backgroundColor: "#FC7303",
  color: "#fff",
  border: "none",
  borderRadius: "0 5px 5px 0",
  cursor: "pointer",
};

const sortContainerStyle = {
  textAlign: "right",
  marginBottom: "20px",
  marginRight: "10px",
};

const sortDropdownStyle = {
  padding: "10px",
  fontSize: "16px",
  borderRadius: "5px",
  border: "1px solid #ccc",
  backgroundColor: "#fff",
  cursor: "pointer",
};

const listingContainerStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(5, 1fr)", // 5 items per row
  gap: "20px",
  padding: "20px",
};

const listingCardStyle = {
  backgroundColor: "#fff",
  borderRadius: "10px",
  overflow: "hidden",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
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
};

const descriptionContainerStyle = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  height: "100%",
  padding: "15px",
};

const descriptionStyle = {
  marginBottom: "10px",
};

const priceStyle = {
  fontWeight: "bold",
  color: "#FC7303",
};

const askButtonStyle = {
  padding: "10px",
  backgroundColor: "#FC7303",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  width: "100%",
};

const fabStyle = {
  position: "fixed",
  bottom: "20px",
  right: "20px",
  backgroundColor: "#FC7303",
  color: "#fff",
  padding: "15px 25px",
  borderRadius: "50px",
  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
  cursor: "pointer",
  fontSize: "1rem",
  textAlign: "center",
};

const loadingStyle = {
  textAlign: "center",
  color: "#FC7303",
  fontSize: "1.5rem",
};

const animationCSS = `
  @keyframes backgroundAnimation {
    0% { background-color: #FFF5E6; }
    50% { background-color: #FFE4CC; }
    100% { background-color: #FFF5E6; }
  }
`;

if (typeof window !== "undefined") {
  const style = document.createElement("style");
  style.textContent = animationCSS;
  document.head.appendChild(style);
}

export default Marketplace;
