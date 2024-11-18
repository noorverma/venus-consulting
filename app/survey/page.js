// used Perplexity AI for reference
// /survey/page.js
'use client'; // Declares that this module is for client-side rendering

import React, { useState, useEffect } from 'react'; // Import React and necessary hooks
import Survey from '../components/survey'; // Import the Survey component for rendering the survey form
import Navbar from '../components/navbar'; // Import Navbar component for navigation
import { auth, db } from '../Lib/firebase'; // Import Firebase authentication and Firestore database instances
import { onAuthStateChanged } from 'firebase/auth'; // Import Firebase auth listener for tracking user state changes
import { doc, getDoc } from 'firebase/firestore'; // Import Firestore functions for document operations

// Main component for the survey page
export default function SurveyPage() {
  const [points, setPoints] = useState(0); // State variable to store user points; initialized to 0
  const [userId, setUserId] = useState(null); // State variable to store authenticated user's UID (null if not authenticated)

  // useEffect hook to set up an authentication listener that updates userId
  useEffect(() => {
    // Listen for changes in authentication status
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid); // If the user is authenticated, set userId to their UID
      } else {
        console.log('User is not authenticated');
      }
    });
    return () => unsubscribe(); // Clean up the listener when component unmounts
  }, []);

  // Function to fetch the user's points from Firestore
  const fetchUserPoints = async () => {
    if (userId) { // Only proceed if a userId is available
      try {
        // Reference to the userPoints document in Firestore for the specific user
        const docRef = doc(db, 'userPoints', userId);
        const docSnap = await getDoc(docRef); // Fetch the document from Firestore

        if (docSnap.exists()) { // Check if the document exists
          const data = docSnap.data(); // Retrieve the document data
          setPoints(data.points || 0); // Update points state with the user's points (default to 0 if undefined)
        } else {
          console.log('No points data found'); // Log if no points data exists for the user
        }
      } catch (error) {
        console.error('Error fetching points:', error); // Log any errors that occur during fetching
      }
    }
  };

  // useEffect hook to fetch user points whenever userId changes
  useEffect(() => {
    fetchUserPoints(); // Call the function to fetch user points from Firestore
  }, [userId]); // Runs only when userId changes

  // Handler to refresh user points after survey completion
  const handleSurveyCompleted = async () => {
    await fetchUserPoints(); // Re-fetch points to display updated value after survey submission
  };

  return (
    <div>
      <Navbar /> {/* Render the Navbar component */}
      <div className="flex flex-col items-center pt-32 p-6 min-h-screen bg-gray-100">
        {/* Display user points in a styled container */}
        <p className="text-lg text-gray-700 font-semibold bg-white py-2 px-4 rounded shadow-md mb-6">
          <span className="text-orange-500">Your Points:</span> {points} {/* Display the points variable */}
        </p>
        
        {userId ? ( // Conditional rendering based on userId
          // If user is authenticated, render the Survey component and pass in necessary props
          <Survey onSurveyCompleted={handleSurveyCompleted} userId={userId} />
        ) : (
          // If user is not authenticated, prompt them to log in
          <p className="text-red-500">Please log in to complete the survey.</p>
        )}
      </div>
    </div>
  );
}
