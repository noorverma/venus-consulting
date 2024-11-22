"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Importing useRouter for navigation
import { getCart, removeFromCart } from "@/app/Lib/cart"; // Import cart logic
import { useUserAuth } from "../Lib/auth-context"; // Import authentication context

const CartPage = () => {
  const { user, authLoading } = useUserAuth(); // Access user and loading state from authentication context
  const router = useRouter(); // Initialize router for navigation

  // Redirect unauthenticated users to the SignIn page
  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/SignIn"); // Redirect to SignIn if user is not logged in
    }
  }, [user, authLoading, router]);

  // Show loading message if authentication is being checked
  if (authLoading || !user) {
    return <div>Loading...</div>;
  }

  const [cartItems, setCartItems] = useState([]);

  // Load cart items from localStorage on component mount
  useEffect(() => {
    const items = getCart(); // Fetch the cart items from localStorage
    setCartItems(items);
  }, []);

  // Function to calculate total price
  const calculateTotal = () => {
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);
  };

  // Function to handle removing items from the cart
  const handleRemoveFromCart = (id) => {
    removeFromCart(id); // Remove item from cart in localStorage
    setCartItems(getCart()); // Update the state after removal
  };

  // Function to handle checkout
  const handleCheckout = () => {
    const totalAmount = calculateTotal();
    // Navigate to the payment page with the total amount as a query parameter
    router.push(`/payment?amount=${totalAmount}`);
  };

  return (
    <main className="max-w-4xl mx-auto p-10 text-center bg-gray-100 rounded-lg shadow-lg mt-10">
      <h1 className="text-4xl font-bold mb-10">Your Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-2xl text-gray-700">Your cart is empty.</p>
      ) : (
        <div className="space-y-6">
          {cartItems.map((item) => (
            <div key={item.id} className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm">
              <div className="flex items-center">
                <img src={item.image} alt={item.name} className="h-16 w-16 object-cover rounded-lg mr-4" />
                <div className="text-left">
                  <h2 className="text-xl font-semibold">{item.name}</h2>
                  <p className="text-gray-500">Quantity: {item.quantity}</p>
                </div>
              </div>
              <div className="flex items-center">
                <p className="text-lg font-bold text-orange-500 mr-4">${(item.price * item.quantity).toFixed(2)}</p>
                <button
                  onClick={() => handleRemoveFromCart(item.id)}
                  className="text-white bg-red-500 hover:bg-red-600 rounded-lg px-4 py-2 transition duration-300"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          {/* Cart total section */}
          <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm">
            <p className="text-xl font-bold">Total:</p>
            <p className="text-xl font-bold text-orange-500">${calculateTotal()}</p>
          </div>

          {/* Checkout button */}
          <button
            onClick={handleCheckout}
            className="bg-orange-500 text-white text-lg font-bold py-3 px-8 rounded-lg hover:bg-orange-600 transition duration-300"
          >
            Proceed to Checkout
          </button>
        </div>
      )}
    </main>
  );
};

export default CartPage;