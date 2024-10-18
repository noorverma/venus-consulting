'use client';
import { useState } from 'react';

const CartPage = () => {
  // Using the provided product information as the initial cart items
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Voltage Tester',
      price: 25.99,
      quantity: 2,
      image: '/voltagetester.png',
    },
    {
      id: 2,
      name: 'Insulated Gloves',
      price: 15.50,
      quantity: 1,
      image: '/insulatedgloves.jpeg',
    },
    {
      id: 3,
      name: 'Circuit Breaker Finder',
      price: 40.00,
      quantity: 1,
      image: '/circuitbreakerfinder.png',
    },
  ]);

  // Function to calculate total price
  const calculateTotal = () => {
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);
  };

  // Function to handle removing items from the cart
  const removeFromCart = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
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
                  onClick={() => removeFromCart(item.id)} 
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
