//used Perplexity AI for instructions and references
// app/components/navbar.js
'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { signOut } from 'firebase/auth'; 
import { auth } from '../Lib/firebase';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import Image from 'next/image';
import { useUserAuth } from '../Lib/auth-context';
import { getCart } from '../Lib/cart';

const Navbar = () => {
  const router = useRouter();
  const [cartCount, setCartCount] = useState(0);

  // Fetch the cart items and update the count
  useEffect(() => {
    const fetchCartCount = () => {
      const cartItems = getCart();  // Fetch cart items from localStorage
      const itemCount = cartItems.reduce((count, item) => count + item.quantity, 0); // Sum the quantity of items in the cart
      setCartCount(itemCount);  // Update cart count state
    };

    fetchCartCount();  // Initial fetch

    // Optionally, listen for changes in localStorage and update the count
    // You could use a custom event or useContext for global state management if the cart updates elsewhere
  }, []);

  const { user, firebaseSignOut, authLoading } = useUserAuth();

  // Check if it's still loading
  if (authLoading) {
    return (
      <nav className="bg-orange-500 p-4 fixed top-0 left-0 w-full z-50 shadow-xl font-custom">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <img src="/logo.png" alt="Logo" className="h-16 w-16 mr-2 shadow-xl" />
            <span className="text-white text-2xl font-bold">Electrical Consulting</span>
          </div>
          <div className="space-x-8 flex items-center">
            <div className="text-white text-xl font-bold">Loading...</div> {/* Loading state */}
          </div>
        </div>
      </nav>
    );
  }

  // If the user is not logged in or still loading, fallback to a generic navbar
  return (
    <nav className="bg-orange-500 p-4 fixed top-0 left-0 w-full z-50 shadow-xl font-custom">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <img src="/logo.png" alt="Logo" className="h-16 w-16 mr-2 shadow-xl" />
          <span className="text-white text-2xl font-bold">Electrical Consulting</span>
        </div>

        <div className="space-x-8 flex items-center">
          <a href="/Main" className="text-white text-xl font-bold hover:bg-white hover:text-orange-500 hover:rounded-lg hover:p-2 transition-all duration-300">Home</a>
          <a href="/About" className="text-white text-xl font-bold hover:bg-white hover:text-orange-500 hover:rounded-lg hover:p-2 transition-all duration-300">About</a>
          <a href="/projects" className="text-white text-xl font-bold hover:bg-white hover:text-orange-500 hover:rounded-lg hover:p-2 transition-all duration-300">Projects</a>
          <a href="/contact" className="text-white text-xl font-bold hover:bg-white hover:text-orange-500 hover:rounded-lg hover:p-2 transition-all duration-300">Contact Us</a>
          <a href="/marketplace" className="text-white text-xl font-bold hover:bg-white hover:text-orange-500 hover:rounded-lg hover:p-2 transition-all duration-300">Marketplace</a>
          <a href="/cart" className="relative text-white text-xl font-bold hover:bg-white hover:text-orange-500 hover:rounded-lg p-2 transition-all duration-300">
            <FaShoppingCart className="text-3xl" />
            {/* Display the dynamic number of items in the cart */}
            <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-black text-orange-500 rounded-full px-2 py-1 text-xs font-bold">
              {cartCount}
            </span>
          </a>

          {user ? (
            <>
              <a href="/profile" className="flex items-center text-white text-xl font-bold hover:bg-white hover:text-orange-500 hover:rounded-lg hover:p-2 transition-all duration-300">
                {/* Check if user has a photoURL, otherwise use default user icon */}
                {user.photoURL ? (
                  <Image
                    src={user.photoURL}
                    alt="Profile"
                    width={32}
                    height={32}
                    className="rounded-full mr-2"
                  />
                ) : (
                  <FaUser className="mr-2" />
                )}
                {user.displayName || user.email.split('@')[0]} {/* Use displayName or part of email */}
              </a>
              <button 
                onClick={firebaseSignOut}  // Updated to handle proper sign out
                className="text-orange-500 text-xl font-bold bg-white hover:bg-white hover:rounded-lg p-2 transition-all duration-300"
              >
                Log out
              </button>
          </>
          ) : (
            <a href="/SignIn" className="text-white text-xl font-bold hover:bg-white hover:text-orange-500 hover:rounded-lg hover:p-2 transition-all duration-300">
              Profile
            </a>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;