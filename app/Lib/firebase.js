// Used perplexity AI for reference but the code was written myself
// /app/Lib/firebase.js

// Import necessary Firebase SDK functions for client-side operations
import { initializeApp, getApps, getApp } from "firebase/app"; // Firebase App SDK
import { getAuth, setPersistence, browserLocalPersistence } from "firebase/auth"; // Firebase Authentication
import { getFirestore } from "firebase/firestore"; // Firestore database
import { getStorage } from "firebase/storage"; // Firebase Storage for file uploads and downloads

// Firebase configuration object containing keys and identifiers for the project.
// These values should match the Firebase project settings in the Firebase Console.
const firebaseConfig = {
  apiKey: "AIzaSyBcKV8lKtS5jSauRp-9NJsDEdoHUbQ4mbI",
  authDomain: "venus-consulting-master-22cb2.firebaseapp.com",
  projectId: "venus-consulting-master-22cb2",
  storageBucket: "venus-consulting-master-22cb2.appspot.com",
  messagingSenderId: "986107956769",
  appId: "1:986107956769:web:25afb6b0e933166e8e1d60",
  measurementId: "G-QBFVJD5H94",
};

// Declare variables for Firebase services to ensure consistency across initialization
let app, auth, db, storage;

// Initialize Firebase app (ensures no duplicate initialization)
if (!getApps().length) {
  app = initializeApp(firebaseConfig); // Initialize Firebase app with config
  console.log("Firebase initialized successfully.");
} else {
  app = getApp(); // Use existing Firebase app instance
  console.log("Using existing Firebase app instance.");
}

// Initialize Firebase services
auth = getAuth(app); // Firebase Authentication instance for managing user sessions
db = getFirestore(app); // Firestore instance for database operations
storage = getStorage(app); // Firebase Storage instance for file uploads and downloads

// Enable authentication session persistence in the browser (client-side only)
if (typeof window !== "undefined") {
  setPersistence(auth, browserLocalPersistence)
    .then(() => {
      console.log("Authentication persistence set to browser local storage.");
    })
    .catch((error) => {
      console.error("Error setting authentication persistence:", error);
    });
} else {
  console.log("Not in a browser environment; persistence is not set.");
}

// Export the initialized Firebase services for use throughout the application.
// `auth` handles user authentication for functionalities like login, change password, etc.
// `db` handles Firestore database operations for profile and marketplace features.
// `storage` handles file uploads and downloads for marketplace images.
export { auth, db, storage, app };