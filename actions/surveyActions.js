// used perplexity AI for reference but the code was written myself
// actions/surveyActions.js
'use server'; // Declares that this module should run on the server side

import { getFirestore } from 'firebase-admin/firestore'; // Import Firestore for database operations
import { getAuth } from 'firebase-admin/auth'; // Import Firebase authentication for user verification
import { initializeApp, getApps, cert } from 'firebase-admin/app'; // Import Firebase app initialization functions

// Initialize Firebase Admin SDK only if it hasn’t been initialized yet
if (!getApps().length) { // getApps() returns an array of initialized apps; checks if it's empty
  try {
    // Load Firebase service account key from environment variables
    const serviceAccountString = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
    if (!serviceAccountString) { // Checks if the environment variable exists
      throw new Error('FIREBASE_SERVICE_ACCOUNT_KEY is not defined in environment variables');
    }

    // Parse the service account string to JSON
    const serviceAccount = JSON.parse(serviceAccountString);

    // Initialize Firebase Admin SDK with the service account credentials
    initializeApp({
      credential: cert(serviceAccount) // Authenticate using the service account
    });
  } catch (error) {
    console.error('Error initializing Firebase Admin SDK:', error); // Log error if initialization fails
    throw new Error('Failed to initialize Firebase Admin SDK');
  }
}

// Create instances of Firestore (db) and Firebase Auth (auth) for database and authentication operations
const db = getFirestore();
const auth = getAuth();

// Helper function to get the start of the current month
function getStartOfMonth() {
  const now = new Date(); // Get the current date
  return new Date(now.getFullYear(), now.getMonth(), 1); // Return a new date for the first day of the current month
}

// Function to submit a survey and update user points
export async function submitSurvey(responses, userId, idToken) {
  try {
    // Verify the ID token to confirm the user's identity
    await auth.verifyIdToken(idToken);

    // Reference to user's surveyResponses collection with a filter for submissions in the current month
    const userSurveysRef = db.collection('surveyResponses')
                              .where('userId', '==', userId)
                              .where('completedAt', '>=', getStartOfMonth()); // Only include surveys completed since start of the month
    const userSurveysSnapshot = await userSurveysRef.get(); // Get the filtered results

    // Check if the user has already completed 2 surveys this month
    if (userSurveysSnapshot.size >= 2) { // If 2 or more surveys exist in this month
      return { success: false, message: 'Survey limit reached for this month.' }; // Return a message indicating limit reached
    }

    // Create a new document in the surveyResponses collection
    const surveyDocRef = db.collection('surveyResponses').doc();
    await surveyDocRef.set({
      userId, // Store the user ID
      responses, // Store the survey responses
      completedAt: new Date(), // Store the current date and time as the completion timestamp
    });

    // Reference to userPoints document in Firestore
    const userPointsRef = db.collection('userPoints').doc(userId);
    const userPointsDoc = await userPointsRef.get(); // Get the user's points document if it exists

    // Update points if document exists, otherwise initialize with 10 points
    if (userPointsDoc.exists) {
      await userPointsRef.update({
        points: userPointsDoc.data().points + 100 // Add 100 points to the user's current points
      });
    } else {
      await userPointsRef.set({ points: 10 }); // Initialize with 10 points if the document doesn’t exist
    }

    return { success: true, message: 'Survey submitted and points updated' }; // Return a success message if submission succeeds
  } catch (error) {
    console.error('Error submitting survey:', error); // Log any errors that occur
    return { success: false, message: 'Error submitting survey' }; // Return an error message if submission fails
  }
}