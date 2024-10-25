//used Perplexity AI for instructions and references

'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { signOut } from 'firebase/auth'; 
import { auth } from '../Lib/firebase';
import { FaShoppingCart } from 'react-icons/fa';
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

  // perplexity AI told me to call on firebase's in built signOut function
  // handleLogout function: logs the user out using Firebase signOut method
  const handleLogout = async () => {
    try {
      // signOut method from Firebase to log out the current user
      await signOut(auth); 
      
      // After successful logout, redirect user to the SignIn page
      router.push('/SignIn');
    } catch (error) {
      // If there is an error during logout, log it to the console
      console.error('Logout failed:', error);
    }
  };

  return (
    <nav className="bg-orange-500 p-4 fixed top-0 left-0 w-full z-50 shadow-xl font-custom">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <img src="/logo.png" alt="Logo" className="h-16 w-16 mr-2 shadow-xl" />
          <span className="text-white text-2xl font-bold"> Electrical Consulting </span>
        </div>

        {/* Navigation links for Home, About, Projects, and Contact Us */}
        <div className="space-x-8 flex items-center">
          <a href="/Main" className="text-white text-xl font-bold hover:bg-white hover:text-orange-500 hover:rounded-lg hover:p-2 transition-all duration-300">Home</a>
          <a href="/About" className="text-white text-xl font-bold hover:bg-white hover:text-orange-500 hover:rounded-lg hover:p-2 transition-all duration-300">About</a>
          <a href="/projects" className="text-white text-xl font-bold hover:bg-white hover:text-orange-500 hover:rounded-lg hover:p-2 transition-all duration-300">Projects</a>
          <a href="/contact" className="text-white text-xl font-bold hover:bg-white hover:text-orange-500 hover:rounded-lg hover:p-2 transition-all duration-300">Contact Us</a>

          {/* ChstGPT used for the cart button */}
          {/* Cart Icon */}
          <a href="/cart" className="relative text-white text-xl font-bold hover:bg-white hover:text-orange-500 hover:rounded-lg p-2 transition-all duration-300">
            <FaShoppingCart className="text-3xl" />
            {/* Display the dynamic number of items in the cart */}
            <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-black text-orange-500 rounded-full px-2 py-1 text-xs font-bold">
              {cartCount}
            </span>
          </a>

          {/* Log out button that triggers handleLogout */}
          <button 
            onClick={handleLogout} 
            className="text-orange-500 text-xl font-bold bg-white hover:bg-white hover:rounded-lg p-2 transition-all duration-300"
          >
            Log out
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;