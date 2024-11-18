// Used perplexity AI for reference but the code was written myself
// /app/Lib/firebase.js
import { initializeApp, getApps, getApp } from "firebase/app"; // Import functions to initialize and manage Firebase apps
import { getAuth, setPersistence, browserLocalPersistence } from "firebase/auth"; // Import Firebase Auth functions
import { getFirestore } from "firebase/firestore"; // Import Firestore for database operations
import { getStorage } from "firebase/storage"; // Import Firebase Storage for file storage operations

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

// Declare variables for the app, authentication, Firestore database, and storage instances
let app, auth, db, storage;

// Initialize Firebase app if it hasn’t been initialized already
if (!getApps().length) {
  app = initializeApp(firebaseConfig); // Initialize the Firebase app with the configuration
} else {
  app = getApp(); // If an app is already initialized, use the existing instance
}

// Initialize Firebase services
auth = getAuth(app); // Initialize Firebase Authentication
db = getFirestore(app); // Initialize Firestore database
storage = getStorage(app); // Initialize Firebase Storage

// Enable persistence for authentication sessions in the browser (client-side)
if (typeof window !== 'undefined') {
  setPersistence(auth, browserLocalPersistence)
    .then(() => {
      console.log("Authentication persistence set to browser local storage."); // Log success
    })
    .catch((error) => {
      console.error("Error setting authentication persistence:", error); // Log any errors
    });
}

// Export the initialized instances for use in other parts of the app
export { auth, db, storage };