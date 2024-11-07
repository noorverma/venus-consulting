//Asked Chatgpt and prompt is" I want to make a marketplace in my website, how can i do that?"//
import React, { useEffect, useState } from 'react';//Importing React, useState and useEffect from react.
import Link from 'next/link'; //Importing Link to navigate Client-side navigation//
//Asked Chatgpt " I am getting the error while initializing, can you fix that error for me?"//
const Marketplace = () => {
  const [listings, setListings] = useState([]); //setting up the listing//
  const [loading, setLoading] = useState(true); //To store loading data//
//Did by myself but checked chatgpt code for reference as it provided me code in the beginning"//
  useEffect(() => {
    const fetchListings = async () => { //Defining async feature//
      try {
        const response = await fetch('/api/marketplace/allListings');
        const data = await response.json(); //Parsing json response data./
        setListings(data.listings);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching listings:', error);
        setLoading(false);
      }
    };

    fetchListings();
  }, []);

  return ( //Done by me//
    <div>
      <nav style={navbarStyle}>
        <h1 style={{ color: '#fff' }}>Marketplace</h1>
        <Link href="/marketplace/createListing">
          <button style={sellButtonStyle}>Want to Sell Your Product?</button>
        </Link>
      </nav>

      <div style={listingContainerStyle}> 
        {loading ? (
          <p>Loading listings...</p> //Asked chatgpt "Can you add CSS styling in my code"?
        ) : listings.length > 0 ? (
          listings.map((listing) => (
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

//Used Tailwind CSS for styling"//
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
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between', // Ensures button is aligned at the bottom
  minHeight: '400px', // Sets a minimum height for consistent layout
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
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between', // Ensures the content and button are spaced correctly
  height: '100%',
};

const priceStyle = {
  fontWeight: 'bold',
  color: '#FB923C',
  marginTop: '10px',
};

const askButtonStyle = {
  marginTop: '10px',
  padding: '10px',
  backgroundColor: '#FB923C',
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  width: '100%',
};

export default Marketplace;
