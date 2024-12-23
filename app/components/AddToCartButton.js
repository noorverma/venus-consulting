'use client';  // This tells Next.js it's a Client Component

import { addToCart } from "../Lib/cart";  // Import cart logic

const AddToCartButton = ({ product, quantity }) => {
  const handleAddToCart = () => {
    addToCart(product, quantity);  // Pass product and quantity to addToCart
    alert(`${quantity} of ${product.name} added to cart!`);
  };

  return (
    <button
      onClick={handleAddToCart}
      style={{
        padding: '10px 20px',
        backgroundColor: '#fff',
        color: '#FB923C',
        border: '2px solid #FB923C',
        borderRadius: '5px',
        cursor: 'pointer',
        marginTop: '20px',
      }}
    >
      <b>Add to Cart</b>
    </button>
  );
};

export default AddToCartButton;