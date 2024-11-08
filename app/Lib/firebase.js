// Used perplexity AI for reference but the code was written myself
// /app/Lib/firebase.js
import { initializeApp, getApps, getApp } from "firebase/app"; // Import functions to initialize and manage Firebase apps
import { getAuth, setPersistence, browserLocalPersistence } from "firebase/auth"; // Import Firebase Auth functions
import { getFirestore } from "firebase/firestore"; // Import Firestore for database operations

// Firebase configuration object containing keys and identifiers for the project
const firebaseConfig = {
  apiKey: "AIzaSyBcKV8lKtS5jSauRp-9NJsDEdoHUbQ4mbI",
  authDomain: "venus-consulting-master-22cb2.firebaseapp.com",
  projectId: "venus-consulting-master-22cb2",
  storageBucket: "venus-consulting-master-22cb2.appspot.com",
  messagingSenderId: "986107956769",
  appId: "1:986107956769:web:25afb6b0e933166e8e1d60",
  measurementId: "G-QBFVJD5H94"
};

// Declare variables for the app, authentication, and database instances
let app, auth, db;

// Check if the code is running in a browser environment (client-side)
if (typeof window !== 'undefined') {
  // Check if there are already initialized Firebase apps
  if (!getApps().length) {
    // Initialize the Firebase app with the configuration
    app = initializeApp(firebaseConfig);
  } else {
    // If an app is already initialized, use the existing instance
    app = getApp();
  }
  // Initialize Firebase Authentication and Firestore for the app
  auth = getAuth(app);
  db = getFirestore(app);

  // Set persistence for the authentication session to browser local storage
  setPersistence(auth, browserLocalPersistence)
    .then(() => {
      console.log("Persistence set successfully"); // Log success message
    })
    .catch((error) => {
      console.error("Error setting persistence:", error); // Log error if setting persistence fails
    });
}

// Export the initialized auth and db instances for use in other parts of the app
export { auth, db };