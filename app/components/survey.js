// used Perplexity AI for reference
// components/survey.js
'use client'; // Declares that this component runs on the client side

import React, { useState, useEffect } from 'react'; // Import React and necessary hooks
import { auth } from '../Lib/firebase'; // Import Firebase client-side authentication instance
import { submitSurvey } from '@/actions/surveyActions'; // Import submitSurvey function for form submission

// Survey component that lets authenticated users fill and submit a survey form
export default function Survey({ onSurveyCompleted, userId }) {
  const [responses, setResponses] = useState({}); // useState hook to store survey responses as an object
  const [submitted, setSubmitted] = useState(false); // useState hook to track if the survey was submitted
  const [user, setUser] = useState(null); // useState hook to store the authenticated user information
  const [error, setError] = useState(null); // useState hook to store error messages for display

  // useEffect hook to run on component mount and listen for changes in authentication state
  useEffect(() => {
    // Set up a listener to detect authentication changes
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user); // If user is authenticated, set user state
      } else {
        setUser(null); // If user logs out or is unauthenticated, set user to null
      }
    });
    return () => unsubscribe(); // Clean up listener on component unmount
  }, []);

  // Function to handle input changes in survey form, taking questionId and value
  const handleChange = (questionId, value) => {
    // Update the responses state by merging the new response with the existing ones
    setResponses((prev) => ({ ...prev, [questionId]: value }));
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents default form submission behavior (page reload)
    setError(null); // Clear any existing errors

    if (!user) { // Check if the user is authenticated
      setError("User is not authenticated. Please log in.");
      return;
    }

    try {
      // Get the ID token of the authenticated user from Firebase for secure submission
      const idToken = await user.getIdToken();

      // Submit survey responses and check result
      const result = await submitSurvey(responses, user.uid, idToken);
      if (result.success) { // If submission is successful
        setSubmitted(true); // Set submitted state to true
        onSurveyCompleted(); // Call parent function to notify completion
      } else {
        setError(result.message || "Error submitting survey"); // Set error message if submission fails
      }
    } catch (error) {
      console.error("Error submitting survey:", error);
      setError("An error occurred while submitting the survey. Please try again."); // Set error message
    }
  };

  // Conditional rendering based on user authentication status and submission state
  if (!user) { // Display login prompt if the user is not authenticated
    return <p>Please log in to complete the survey.</p>;
  }

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-orange-500 mb-4">Complete this survey and earn points!</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>} {/* Display error message if present */}
      {!submitted ? ( // If the survey hasn't been submitted, show the form
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700">How satisfied are you with the overall app experience?</label>
            <select className="w-full p-2 border border-gray-300 rounded mt-1" onChange={(e) => handleChange("experienceRating", e.target.value)}>
              <option value="">Select...</option>
              <option value="Very Satisfied">Very Satisfied</option>
              <option value="Satisfied">Satisfied</option>
              <option value="Neutral">Neutral</option>
              <option value="Dissatisfied">Dissatisfied</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700">What features do you find most useful?</label>
            <input type="text" className="w-full p-2 border border-gray-300 rounded mt-1" onChange={(e) => handleChange("usefulFeatures", e.target.value)} />
          </div>
          <div>
            <label className="block text-gray-700">Do you have any suggestions for improvement?</label>
            <input type="text" className="w-full p-2 border border-gray-300 rounded mt-1" onChange={(e) => handleChange("improvementSuggestions", e.target.value)} />
          </div>
          <div>
            <label className="block text-gray-700">Please share any additional comments or feedback:</label>
            <textarea className="w-full p-2 border border-gray-300 rounded mt-1" rows="3" onChange={(e) => handleChange("additionalComments", e.target.value)} />
          </div>
          <button type="submit" className="w-full bg-orange-500 text-white p-3 rounded mt-4 font-bold hover:bg-orange-600">
            Submit Survey
          </button>
        </form>
      ) : ( // If survey was submitted, show a thank-you message
        <p className="text-green-500 font-semibold text-center mt-4">Thank you! You have earned points for completing the survey.</p>
      )}
    </div>
  );
}
