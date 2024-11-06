import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const Marketplace = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(''); // Search input state
  const [filteredResults, setFilteredResults] = useState([]); // Filtered listings state

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await fetch('/api/marketplace/allListings');
        const data = await response.json();
        setListings(data.listings);
        setFilteredResults(data.listings); // Initialize filtered results
        setLoading(false);
      } catch (error) {
        console.error('Error fetching listings:', error);
        setLoading(false);
      }
    };

    fetchListings();
  }, []);

  // Filter listings based on the search query
  useEffect(() => {
    const filtered = listings.filter((listing) =>
      listing.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredResults(filtered);
  }, [searchQuery, listings]);

  return (
    <div>
      {/* Navbar with orange color and "Want to Sell Your Product" button */}
      <nav style={navbarStyle}>
        <h1 style={{ color: '#fff' }}>Marketplace</h1>
        <Link href="/marketplace/createListing">
          <button style={sellButtonStyle}>Want to Sell Your Product?</button>
        </Link>
      </nav>

      {/* Search Bar */}
      <div style={searchContainerStyle}>
        <input
          type="text"
          placeholder="Search for items, e.g., 'tiffin'"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={searchInputStyle}
        />
      </div>

      {/* Listings Section */}
      <div style={listingContainerStyle}>
        {loading ? (
          <p>Loading listings...</p>
        ) : filteredResults.length > 0 ? (
          filteredResults.map((listing) => (
            <div key={listing.id} style={listingCardStyle}>
              <div style={imageContainerStyle}>
                <img src={listing.imageUrl} alt={listing.title} style={imageStyle} />
                <h3 style={titleOverlayStyle}>{listing.title}</h3>
              </div>
              <div style={descriptionStyle}>
                <p>{listing.description}</p>
                <p style={priceStyle}>${listing.price}</p>
                <Link href={`/marketplace/${listing.id}`}>
                  <button style={askButtonStyle}>Ask if it’s Available</button>
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

// Styles for the search bar
const searchContainerStyle = {
  padding: '10px 20px',
  textAlign: 'center',
};

const searchInputStyle = {
  padding: '10px',
  width: '100%',
  maxWidth: '400px',
  fontSize: '16px',
  borderRadius: '5px',
  border: '1px solid #ccc',
};

// Existing styles for components
const navbarStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: '#FB923C',
  padding: '15px 20px',
};

const sellButtonStyle = {
  padding: '10px 20px',
  backgroundColor: '#fff',
  color: '#FB923C',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
};

const listingContainerStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '20px',
  padding: '20px',
  justifyContent: 'center',
};

const listingCardStyle = {
  width: '250px',
  backgroundColor: '#f5f5f5',
  borderRadius: '10px',
  overflow: 'hidden',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
};

const imageContainerStyle = {
  position: 'relative',
};

const imageStyle = {
  width: '100%',
  height: '200px',
  objectFit: 'cover',
};

const titleOverlayStyle = {
  position: 'absolute',
  top: '10px',
  left: '10px',
  color: '#fff',
  backgroundColor: 'rgba(0, 0, 0, 0.6)',
  padding: '5px 10px',
  borderRadius: '5px',
};

const descriptionStyle = {
  padding: '15px',
};

const priceStyle = {
  fontWeight: 'bold',
  color: '#FB923C',
  marginTop: '10px',
};

const askButtonStyle = {
  marginTop: '10px',
  padding: '10px',
  width: '100%',
  backgroundColor: '#FB923C',
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
};

export default Marketplace;
