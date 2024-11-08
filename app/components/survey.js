// used Perplexity AI for reference
// components/survey.js
'use client'; // Declares that this component should run on the client side

import React, { useState, useEffect } from 'react'; // Import React and necessary hooks
import { auth } from '../Lib/firebase'; // Import Firebase client-side authentication instance
import { submitSurvey } from '@/actions/surveyActions'; // Import submitSurvey function for form submission

// Survey component for submitting survey responses and earning points
export default function Survey({ onSurveyCompleted, userId }) {
  const [responses, setResponses] = useState({}); // State to store survey responses
  const [submitted, setSubmitted] = useState(false); // State to track if survey was successfully submitted
  const [user, setUser] = useState(null); // State to store authenticated user information
  const [error, setError] = useState(null); // State to store error messages
  const [isSubmitting, setIsSubmitting] = useState(false); // New state to track if submission is in progress
  const [surveyLimitReached, setSurveyLimitReached] = useState(false); // New state to track if the survey limit has been reached

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

  // Handle input changes in the survey form, storing responses with question IDs as keys
  const handleChange = (questionId, value) => {
    setResponses((prev) => ({ ...prev, [questionId]: value })); // Update responses state by adding or updating the specified question
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior (page reload)
    setError(null); // Clear previous errors
    setIsSubmitting(true); // Set isSubmitting to true to disable the submit button

    if (!user) { // Check if user is authenticated
      setError("User is not authenticated. Please log in."); // Show error if user is not logged in
      setIsSubmitting(false); // Re-enable submit button if authentication fails
      return;
    }

    try {
      // Retrieve the ID token from the authenticated user
      const idToken = await user.getIdToken();

      // Submit the survey responses and check the result
      const result = await submitSurvey(responses, user.uid, idToken);
      if (result.success) { // If submission is successful
        setSubmitted(true); // Mark survey as submitted
        onSurveyCompleted(); // Notify parent component of completion
      } else if (result.message === 'Survey limit reached for this month.') {
        setSurveyLimitReached(true); // Set surveyLimitReached if monthly limit is hit
      } else {
        setError(result.message || "Error submitting survey"); // Display error message if submission fails
      }
    } catch (error) {
      console.error("Error submitting survey:", error);
      setError("An error occurred while submitting the survey. Please try again."); // Set error message
    } finally {
      setIsSubmitting(false); // Reset isSubmitting to false, re-enabling the submit button
    }
  };

  // Display login prompt if the user is not authenticated
  if (!user) {
    return <p>Please log in to complete the survey.</p>;
  }

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-orange-500 mb-4">Complete this survey and earn points!</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>} {/* Display error message if present */}
      {surveyLimitReached ? ( // Display message if survey limit is reached
        <p className="text-red-500 font-semibold text-center mt-4">You have reached the survey limit for this month.</p>
      ) : !submitted ? ( // Render form if survey hasn't been submitted
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
          <button
            type="submit"
            className={`w-full bg-orange-500 text-white p-3 rounded mt-4 font-bold hover:bg-orange-600 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`} // Disable button styling
            disabled={isSubmitting} // Disable button if submission is in progress
          >
            {isSubmitting ? 'Submitting...' : 'Submit Survey'} {/* Change button text based on submission status */}
          </button>
        </form>
      ) : ( // If survey was submitted, show a thank-you message
        <p className="text-green-500 font-semibold text-center mt-4">Thank you! You have earned points for completing the survey.</p>
      )}
    </div>
  );
}