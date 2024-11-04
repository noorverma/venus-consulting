// Used perplexity AI for reference but the code was written myself
// app/Lib/firebase.js
import { initializeApp, getApps, getApp } from "firebase/app"; // Import functions to initialize Firebase app and manage app instances
import { getAuth, setPersistence, browserLocalPersistence } from "firebase/auth"; // Import Firebase Authentication functions and persistence options
import { getFirestore } from "firebase/firestore"; // Import Firestore to use Firestore database

// Configuration object for Firebase, containing keys and identifiers for your Firebase project
const firebaseConfig = {
  apiKey: "AIzaSyBcKV8lKtS5jSauRp-9NJsDEdoHUbQ4mbI", // API key for authentication and other Firebase services
  authDomain: "venus-consulting-master-22cb2.firebaseapp.com", // Domain for authentication
  projectId: "venus-consulting-master-22cb2", // Project ID for Firestore and other Firebase services
  storageBucket: "venus-consulting-master-22cb2.appspot.com", // Storage bucket for Firebase Storage
  messagingSenderId: "986107956769", // Sender ID for Firebase Cloud Messaging
  appId: "1:986107956769:web:25afb6b0e933166e8e1d60", // App ID for your Firebase project
  measurementId: "G-QBFVJD5H94" // Measurement ID for Google Analytics (if used)
};

let app;
// Check if any Firebase apps have already been initialized
if (!getApps().length) {
  app = initializeApp(firebaseConfig); // Initialize a new Firebase app if none exist
} else {
  app = getApp(); // Use the existing Firebase app
}

const auth = getAuth(app); // Initialize Firebase Authentication with the app instance
const db = getFirestore(app); // Initialize Firestore with the app instance

// Set the authentication persistence to "local," so the user stays logged in even after closing the browser
setPersistence(auth, browserLocalPersistence)
  .then(() => {
    console.log("Persistence set successfully"); // Log a success message if persistence is set successfully
  })
  .catch((error) => {
    console.error("Error setting persistence:", error); // Log an error message if there's an issue setting persistence
  });

export { auth, db }; // Export the initialized auth and db instances for use in other parts of the app