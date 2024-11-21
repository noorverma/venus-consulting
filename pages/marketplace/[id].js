// /pages/marketplace/[id].js
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

const ListingDetail = () => {
  const router = useRouter();
  const { id } = router.query;

  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [buyerEmail, setBuyerEmail] = useState(""); // State for buyer's email
  const [emailSent, setEmailSent] = useState(false); // State for email status

  useEffect(() => {
    if (id) {
      const fetchListing = async () => {
        try {
          const response = await fetch(`/api/marketplace/${id}`);
          const data = await response.json();
          if (!response.ok) throw new Error(data.error || "Failed to fetch listing");
          setListing(data.listing);
        } catch (error) {
          console.error("Error fetching listing:", error.message);
        } finally {
          setLoading(false);
        }
      };
      fetchListing();
    }
  }, [id]);

  const handleContactSeller = async () => {
    if (!buyerEmail) {
      alert("Please enter your email to contact the seller.");
      return;
    }

    try {
      const response = await fetch("/api/marketplace/sendEmailToSeller", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          buyerEmail,
          sellerEmail: listing.sellerEmail,
          itemTitle: listing.title,
        }),
      });

      if (response.ok) {
        setEmailSent(true);
      } else {
        alert("Failed to send email. Please try again later.");
      }
    } catch (error) {
      console.error("Error sending email:", error);
      alert("An error occurred while trying to contact the seller.");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!listing) return <p>Listing not found.</p>;

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>{listing.title}</h1>
      <img
        src={listing.imageURL}
        alt={listing.title}
        style={imageStyle}
        onError={(e) => (e.target.src = "/default-placeholder.png")}
      />
      <p style={descriptionStyle}>{listing.description}</p>
      <p style={priceStyle}>
        <strong>Price:</strong> ${listing.price}
      </p>
      <p style={emailStyle}>
        <strong>Seller Email:</strong> {listing.sellerEmail}
      </p>

      {/* Contact Seller Section */}
      <div style={contactSellerStyle}>
        <h3 style={sectionTitleStyle}>Contact the Seller</h3>
        <input
          type="email"
          placeholder="Enter your email"
          value={buyerEmail}
          onChange={(e) => setBuyerEmail(e.target.value)}
          style={emailInputStyle}
        />
        <button onClick={handleContactSeller} style={contactButtonStyle}>
          Contact Seller
        </button>
        {emailSent && <p style={successMessageStyle}>Email sent successfully!</p>}
      </div>
    </div>
  );
};

// Styles
const containerStyle = {
  maxWidth: "800px",
  margin: "0 auto",
  padding: "20px",
};

const titleStyle = {
  fontSize: "24px",
  color: "#333",
  marginBottom: "20px",
};

const imageStyle = {
  maxWidth: "100%",
  height: "auto",
  borderRadius: "10px",
  marginBottom: "20px",
};

const descriptionStyle = {
  fontSize: "16px",
  lineHeight: "1.6",
  color: "#666",
  marginBottom: "20px",
};

const priceStyle = {
  fontSize: "18px",
  color: "#FB923C",
  marginBottom: "10px",
};

const emailStyle = {
  fontSize: "16px",
  color: "#333",
};

const contactSellerStyle = {
  marginTop: "30px",
  padding: "20px",
  border: "1px solid #ddd",
  borderRadius: "10px",
  backgroundColor: "#f9f9f9",
};

const sectionTitleStyle = {
  fontSize: "18px",
  fontWeight: "bold",
  marginBottom: "10px",
};

const emailInputStyle = {
  width: "100%",
  padding: "10px",
  marginBottom: "10px",
  border: "1px solid #ddd",
  borderRadius: "5px",
};

const contactButtonStyle = {
  width: "100%",
  padding: "10px",
  backgroundColor: "#FB923C",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

const successMessageStyle = {
  marginTop: "10px",
  color: "green",
};

export default ListingDetail;