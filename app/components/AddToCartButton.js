'use client';  // This tells Next.js it's a Client Component

import { addToCart } from "../Lib/cart";  // Import cart logic

const AddToCartButton = ({ product }) => {
  const handleAddToCart = () => {
    addToCart(product);  // Add the product to the cart
    alert(`${product.name} added to cart!`);
  };

  return (
    <button
      onClick={handleAddToCart}
      style={{
        padding: '10px 20px',
        backgroundColor: '#FB923C',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        marginTop: '20px',
      }}
    >
      Add to Cart
    </button>
  );
};

export default AddToCartButton;
