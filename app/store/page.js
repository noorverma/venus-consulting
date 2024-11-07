"use client";

import { useState, useEffect } from 'react';
import Navbar from '@/app/components/navbar'; // Adjust the path if needed

export default function ProductsPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <>
      <Navbar /> {/* Add Navbar at the top of the page */}
      <div style={{ padding: '20px', paddingTop: '100px', fontFamily: 'Poppins, Arial, sans-serif' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Our Products</h1>
        
        {/* Product Grid */}
        <div style={gridStyle}>
          {products.map((product) => (
            <div key={product.id} style={cardStyle}>
              <img src={product.image} alt={product.name} style={imageStyle} />
              <h2 style={nameStyle}>{product.name}</h2>
              <p style={priceStyle}>${product.price}</p>
              <button style={buttonStyle} onClick={() => window.location.href = `/product/${product.id}`}>
                View Details
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

// Styles
const gridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
  gap: '20px',
};

const cardStyle = {
  border: '1px solid #ddd',
  borderRadius: '8px',
  overflow: 'hidden',
  padding: '10px',
  textAlign: 'center',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
};

const imageStyle = {
  width: '100%',
  height: '200px',
  objectFit: 'cover',
  marginBottom: '10px',
};

const nameStyle = {
  fontSize: '1.2rem',
  fontWeight: 'bold',
  margin: '10px 0',
};

const priceStyle = {
  fontSize: '1rem',
  color: '#FB923C',
  marginBottom: '10px',
};

const buttonStyle = {
  padding: '10px 20px',
  backgroundColor: '#FB923C',
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  transition: 'background-color 0.3s ease',
};
