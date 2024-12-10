import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { FaShieldAlt, FaTags, FaHandHoldingUsd } from "react-icons/fa"; // React Icons for icons

const ListingDetail = () => {
  const router = useRouter();
  const { id } = router.query;

  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [buyerEmail, setBuyerEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [emailError, setEmailError] = useState(false);

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
    setEmailSent(false);
    setEmailError(false);

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
        setEmailError(true);
      }
    } catch (error) {
      console.error("Error sending email:", error);
      setEmailError(true);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!listing) return <p>Listing not found.</p>;

  return (
    <motion.div
      style={containerStyle}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Back Button */}
      <motion.button
        onClick={() => router.push("/marketplace")}
        style={backButtonStyle}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        ⬅ Back to Marketplace
      </motion.button>

      <div style={contentWrapperStyle}>
        {/* Sidebar for Images */}
        <motion.div
          style={sidebarStyle}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <img
            src={listing.imageURL}
            alt={listing.title}
            style={mainImageStyle}
            onError={(e) => (e.target.src = "/default-placeholder.png")}
          />
        </motion.div>

        {/* Main Details */}
        <div style={detailsStyle}>
          <h1 style={titleStyle}>{listing.title}</h1>
          <p style={priceStyle}>${listing.price}</p>
          <p style={descriptionStyle}>{listing.description}</p>

          {/* Seller Information */}
          <div style={sellerDetailsStyle}>
            <h3 style={sellerHeadingStyle}>Seller Information</h3>
            <p style={sellerInfoStyle}>
              <strong>Email:</strong> {listing.sellerEmail}
            </p>
            <p style={sellerInfoStyle}>
              <strong>Location:</strong> {listing.sellerLocation || "Not provided"}
            </p>
          </div>

          {/* Contact Form */}
          <div style={contactSellerStyle}>
            <h3 style={sectionTitleStyle}>Contact the Seller</h3>
            <input
              type="email"
              placeholder="Enter your email"
              value={buyerEmail}
              onChange={(e) => setBuyerEmail(e.target.value)}
              style={emailInputStyle}
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={handleContactSeller}
              style={contactButtonStyle}
            >
              Contact Seller
            </motion.button>
            {emailSent && (
              <motion.p
                style={successMessageStyle}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                Email sent successfully!
              </motion.p>
            )}
            {emailError && (
              <motion.p
                style={errorMessageStyle}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                Failed to send email.
              </motion.p>
            )}
          </div>
        </div>
      </div>

      {/* Featured Benefits Section */}
      <motion.div
        style={featuredBenefitsStyle}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 1 }}
      >
        <h2 style={benefitsHeadingStyle}>Why Choose Our Marketplace?</h2>
        <ul style={benefitsListStyle}>
          <motion.li whileHover={{ scale: 1.1 }} style={benefitItemStyle}>
            <div style={iconTextStyle}>
              <FaShieldAlt style={iconStyle} />
              <span>Secure Transactions</span>
            </div>
          </motion.li>
          <motion.li whileHover={{ scale: 1.1 }} style={benefitItemStyle}>
            <div style={iconTextStyle}>
              <FaTags style={iconStyle} />
              <span>Wide Variety of Listings</span>
            </div>
          </motion.li>
          <motion.li whileHover={{ scale: 1.1 }} style={benefitItemStyle}>
            <div style={iconTextStyle}>
              <FaHandHoldingUsd style={iconStyle} />
              <span>Easy-to-Use Platform</span>
            </div>
          </motion.li>
        </ul>
      </motion.div>
    </motion.div>
  );
};

// Styles
const containerStyle = {
  fontFamily: "Arial, sans-serif",
  maxWidth: "1200px",
  margin: "0 auto",
  padding: "20px",
};

const backButtonStyle = {
  backgroundColor: "#FC7303",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  padding: "10px 15px",
  cursor: "pointer",
  marginBottom: "20px",
};

const contentWrapperStyle = {
  display: "flex",
  gap: "20px",
};

const sidebarStyle = {
  flex: "2",
  textAlign: "center",
};

const mainImageStyle = {
  width: "100%",
  height: "500px",
  borderRadius: "10px",
  objectFit: "cover",
  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
};

const detailsStyle = {
  flex: "3",
  backgroundColor: "#fff",
  borderRadius: "10px",
  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
  padding: "20px",
};

const titleStyle = {
  fontSize: "28px",
  color: "#333",
  marginBottom: "10px",
};

const priceStyle = {
  fontSize: "24px",
  color: "#FC7303",
  fontWeight: "bold",
  marginBottom: "10px",
};

const descriptionStyle = {
  fontSize: "16px",
  lineHeight: "1.6",
  color: "#666",
  marginBottom: "20px",
};

const sellerDetailsStyle = {
  marginTop: "20px",
  padding: "20px",
  borderRadius: "10px",
  border: "1px solid #ddd",
  backgroundColor: "#f9f9f9",
};

const sellerHeadingStyle = {
  fontSize: "18px",
  color: "#333",
  marginBottom: "10px",
};

const sellerInfoStyle = {
  fontSize: "16px",
  color: "#666",
  marginBottom: "10px",
};

const contactSellerStyle = {
  marginTop: "20px",
  padding: "20px",
  borderRadius: "10px",
  border: "1px solid #ddd",
  backgroundColor: "#f9f9f9",
};

const sectionTitleStyle = {
  fontSize: "18px",
  color: "#333",
  marginBottom: "10px",
};

const emailInputStyle = {
  width: "100%",
  padding: "10px",
  marginBottom: "10px",
  border: "1px solid #ccc",
  borderRadius: "5px",
};

const contactButtonStyle = {
  width: "100%",
  padding: "10px",
  backgroundColor: "#FC7303",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

const featuredBenefitsStyle = {
  marginTop: "40px",
  padding: "20px",
  backgroundColor: "#FCF5E9",
  borderRadius: "10px",
  textAlign: "center",
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
};

const benefitsHeadingStyle = {
  fontSize: "22px",
  marginBottom: "20px",
};

const benefitsListStyle = {
  listStyleType: "none",
  padding: "0",
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
};

const benefitItemStyle = {
  fontSize: "18px",
  color: "#666",
  textAlign: "center",
};

const iconTextStyle = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: "10px",
};

const iconStyle = {
  fontSize: "36px",
  color: "#FC7303",
};

export default ListingDetail;
