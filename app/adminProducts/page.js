"use client";
import AdminNavbar from '../components/AdminNavbar';
import { useState, useEffect } from 'react';

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');

  // Fetch existing products on page load
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('/api/products');
      const data = await response.json();
      setProducts(data);
    };
    fetchProducts();
  }, []);

  // Add new product to the database
  const handleAddProduct = async (e) => {
    e.preventDefault();
    const newProduct = { name, description, price: parseFloat(price), image };

    try {
      const response = await fetch('api/addProducts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct),
      });

      if (response.ok) {
        const addedProduct = await response.json();
        setProducts([...products, addedProduct]);
        setName('');
        setDescription('');
        setPrice('');
        setImage('');
      } else {
        console.error('Failed to add product');
      }
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Poppins, Arial, sans-serif' }}>
      <AdminNavbar />
      <h1>Admin Products</h1>

      {/* Add New Product Form */}
      <form onSubmit={handleAddProduct} style={{ marginBottom: '20px' }}>
        <h2>Add New Product</h2>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Price:</label>
          <input
            type="number"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Image URL:</label>
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Product</button>
      </form>

      {/* Product List */}
      <h2>Existing Products</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id} style={{ marginBottom: '10px' }}>
            <strong>{product.name}</strong> - ${product.price}
            <p>{product.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
