// /pages/marketplace/[id].js
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

const ListingDetail = () => {
  const router = useRouter();
  const { id } = router.query;

  // State to hold listing details
  const [listing, setListing] = useState(null);
  // State for loading indicator
  const [loading, setLoading] = useState(true);

  // Fetch the listing details when the ID is available
  useEffect(() => {
    if (id) {
      const fetchListing = async () => {
        try {
          // API call to fetch listing details
          const response = await fetch(`/api/marketplace/${id}`);
          const data = await response.json();
          if (!response.ok) throw new Error(data.error || "Failed to fetch listing");
          // Update state with fetched listing
          setListing(data.listing);
        } catch (error) {
          // Log any errors
          console.error("Error fetching listing:", error.message);
        } finally {
          setLoading(false);
        }
      };

      fetchListing();
    }
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!listing) return <p>Listing not found.</p>;

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>{listing.title}</h1>
      <img
        src={listing.imageURL} // Use the imageURL directly from the listing
        alt={listing.title}
        style={imageStyle}
        onError={(e) => (e.target.src = "/default-placeholder.png")} // Fallback image
      />
      <p style={descriptionStyle}>{listing.description}</p>
      <p style={priceStyle}>
        <strong>Price:</strong> ${listing.price}
      </p>
      <p style={emailStyle}>
        <strong>Seller Email:</strong> {listing.sellerEmail}
      </p>
    </div>
  );
};

// Styling for the container
const containerStyle = {
  maxWidth: "800px",
  margin: "0 auto",
  padding: "20px",
};

// Styling for the title
const titleStyle = {
  fontSize: "24px",
  color: "#333",
  marginBottom: "20px",
};

// Styling for the image
const imageStyle = {
  maxWidth: "100%",
  height: "auto",
  borderRadius: "10px",
  marginBottom: "20px",
};

// Styling for the description
const descriptionStyle = {
  fontSize: "16px",
  lineHeight: "1.6",
  color: "#666",
  marginBottom: "20px",
};

// Styling for the price
const priceStyle = {
  fontSize: "18px",
  color: "#FB923C",
  marginBottom: "10px",
};

// Styling for the email
const emailStyle = {
  fontSize: "16px",
  color: "#333",
};

export default ListingDetail;
