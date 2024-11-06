"use client";  // This tells Next.js it's a Client Component

import { useState, useEffect } from 'react';
import AddToCartButton from '@/app/components/AddToCartButton';
import Navbar from '@/app/components/navbar';

export default function ProductDetail({ params }) {
  const { id } = params;

  // State to store product data and quantity
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  // Fetch product data from the existing API route
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products?id=${id}`);
        if (response.ok) {
          const data = await response.json();
          setProduct(data);
        } else {
          console.error('Failed to load product data');
        }
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };
    fetchProduct();
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar /> {/* Add Navbar back to the top of the page */}

      <div style={{ padding: '20px', fontFamily: 'Poppins, Arial, sans-serif', marginTop: '90px' }}>
        <h1 style={{ fontWeight: 'bold', fontSize: '26px' }}>{product.name}</h1>
        <img src={product.image} alt={product.name} style={{ width: '300px', height: '300px', objectFit: 'cover' }} />
        <p>{product.description}</p>
        <p style={{ fontWeight: 'bold' }}>${product.price}</p>

        {/* Quantity Selector */}
        <div style={{ margin: '10px 0' }}>
          <label htmlFor="quantity">Quantity: </label>
          <input
            type="number"
            id="quantity"
            value={quantity}
            min="1"
            onChange={(e) => setQuantity(parseInt(e.target.value))}
            style={{ width: '60px', textAlign: 'center' }}
          />
        </div>

        {/* Pass quantity to AddToCartButton */}
        <AddToCartButton product={product} quantity={quantity} />
      </div>
    </>
  );
}
