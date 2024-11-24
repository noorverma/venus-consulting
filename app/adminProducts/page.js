// used Perplexity AI for reference but code was manually written
// app/adminProducts/page.js
"use client";

import { useState, useEffect } from "react";
import AdminNavbar from "../components/AdminNavbar";
import { useUserAuth } from "../Lib/auth-context"; // Import authentication context
import { useRouter } from "next/navigation"; // Import Next.js router
import { doc, getDoc } from "firebase/firestore"; // Import Firestore methods
import { db } from "../Lib/firebase"; // Firestore instance

export default function AdminProducts() {
  const { user, authLoading } = useUserAuth(); // Access user and loading state from authentication context
  const router = useRouter(); // Initialize router for navigation
  const [isAuthorized, setIsAuthorized] = useState(false); // State to track admin authorization
  const [products, setProducts] = useState([]); // State for products
  const [name, setName] = useState(""); // State for new product name
  const [description, setDescription] = useState(""); // State for new product description
  const [price, setPrice] = useState(""); // State for new product price
  const [image, setImage] = useState(""); // State for new product image

  // Check user role and authorization
  useEffect(() => {
    const checkAuthorization = async () => {
      if (!authLoading && user) {
        try {
          const userDocRef = doc(db, "users", user.uid); // Reference to the user's document in Firestore
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists() && userDoc.data().role === "admin") {
            setIsAuthorized(true); // Grant access if the user is an admin
          } else {
            router.push("/Main"); // Redirect to Main if the user is not an admin
          }
        } catch (error) {
          console.error("Error checking user role:", error);
          router.push("/Main"); // Redirect to Main on error
        }
      } else if (!authLoading && !user) {
        router.push("/SignIn"); // Redirect to SignIn if user is not logged in
      }
    };

    checkAuthorization();
  }, [user, authLoading, router]);

  // Fetch existing products on page load
  useEffect(() => {
    const fetchProducts = async () => {
      if (isAuthorized) {
        try {
          const response = await fetch("/api/products");
          const data = await response.json();
          setProducts(data);
        } catch (error) {
          console.error("Failed to fetch products:", error);
        }
      }
    };

    fetchProducts();
  }, [isAuthorized]);

  // Add new product to the database
  const handleAddProduct = async (e) => {
    e.preventDefault();
    const newProduct = { name, description, price: parseFloat(price), image };

    try {
      const response = await fetch("api/addProducts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });

      if (response.ok) {
        const addedProduct = await response.json();
        setProducts([...products, addedProduct]);
        setName("");
        setDescription("");
        setPrice("");
        setImage("");
      } else {
        console.error("Failed to add product");
      }
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  // Show loading message if authentication or authorization is being checked
  if (authLoading || (!user && !isAuthorized)) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminNavbar />
      <div className="max-w-4xl mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold text-orange-500 mb-8 text-center">
          Admin Products
        </h1>

        {/* Add New Product Form */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Add New Product
          </h2>
          <form onSubmit={handleAddProduct} className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-orange-500 focus:border-orange-500"
              />
            </div>
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-orange-500 focus:border-orange-500"
              />
            </div>
            <div>
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-700"
              >
                Price
              </label>
              <input
                id="price"
                type="number"
                step="0.01"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-orange-500 focus:border-orange-500"
              />
            </div>
            <div>
              <label
                htmlFor="image"
                className="block text-sm font-medium text-gray-700"
              >
                Image URL
              </label>
              <input
                id="image"
                type="text"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                required
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-orange-500 focus:border-orange-500"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-orange-500 text-white font-medium py-2 px-4 rounded-lg shadow-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
            >
              Add Product
            </button>
          </form>
        </div>

        {/* Product List */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Existing Products
          </h2>
          {products.length > 0 ? (
            <ul className="space-y-4">
              {products.map((product) => (
                <li
                  key={product.id}
                  className="p-4 border border-gray-300 rounded-lg bg-gray-50"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-orange-500">
                      {product.name}
                    </h3>
                    <span className="text-lg font-semibold text-gray-700">
                      ${product.price.toFixed(2)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    {product.description}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No products found.</p>
          )}
        </div>
      </div>
    </div>
  );
}