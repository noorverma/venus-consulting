// used perplexity AI for reference but the code was written myself
// actions/surveyActions.js
'use server'; // Declares that this module should run on the server side

import { getFirestore } from 'firebase-admin/firestore'; // Import Firestore for database operations
import { getAuth } from 'firebase-admin/auth'; // Import Firebase authentication for user verification
import { initializeApp, getApps, cert } from 'firebase-admin/app'; // Import Firebase app initialization functions

// Initialize Firebase Admin SDK only if it hasn’t been initialized yet
if (!getApps().length) { // getApps() returns an array of initialized apps; checks if it's empty
  try {
    // Retrieve Firebase service account key from environment variables
    const serviceAccountString = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
    if (!serviceAccountString) { // Checks if the environment variable exists
      throw new Error('FIREBASE_SERVICE_ACCOUNT_KEY is not defined in environment variables');
    }

    // Parse the service account string to JSON
    const serviceAccount = JSON.parse(serviceAccountString);

    // Initialize the Firebase Admin SDK with the parsed credentials
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

// Function to submit a survey and update user points
export async function submitSurvey(responses, userId, idToken) {
  try {
    // Verify the ID token to confirm the user's identity
    await auth.verifyIdToken(idToken);

    // Create a reference to the user's surveyResponses document in Firestore
    const surveyDocRef = db.collection('surveyResponses').doc(userId);
    await surveyDocRef.set({
      responses, // Save the survey responses provided by the user
      completedAt: new Date(), // Record the current date as completion time
    });

    // Reference to the userPoints document to check and update user points
    const userPointsRef = db.collection('userPoints').doc(userId);
    const userPointsDoc = await userPointsRef.get(); // Get current points document if it exists

    // If the document exists, update points by adding 100; otherwise, initialize with 10 points
    if (userPointsDoc.exists) {
      await userPointsRef.update({
        points: userPointsDoc.data().points + 100
      });
    } else {
      await userPointsRef.set({ points: 10 });
    }

    return { success: true, message: 'Survey submitted and points updated' }; // Return success message
  } catch (error) {
    console.error('Error submitting survey:', error); // Log error details for debugging
    return { success: false, message: 'Error submitting survey' }; // Return failure message
  }
}