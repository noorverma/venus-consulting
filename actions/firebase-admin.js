// /actions/firebase-admin.js

// Import Firebase Admin SDK for server-side operations
import { initializeApp, cert, getApps, getApp } from "firebase-admin/app"; // Firebase Admin App initialization
import { getFirestore } from "firebase-admin/firestore"; // Firestore Admin for secure database operations
import { getStorage } from "firebase-admin/storage"; // Storage Admin for secure file management

// Import the service account key from environment variables
// This key is used for authenticating server-side Firebase Admin operations.
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);

// Check if any Firebase Admin app instances have already been initialized.
// This ensures that Firebase Admin initialization is not repeated, which would cause errors.
const adminApp = !getApps().length
  ? initializeApp({
      credential: cert(serviceAccount), // Use the service account for server-side authentication
      storageBucket: "venus-consulting-master-22cb2.appspot.com", // Set the default storage bucket
    })
  : getApp();

// Initialize Firebase Admin services for server-side operations
const adminDb = getFirestore(adminApp); // Firestore instance for secure server-side database operations
const adminStorage = getStorage(adminApp); // Firebase Storage instance for secure server-side file management

// Export the initialized Firebase Admin services for server-side use.
export { adminApp, adminDb, adminStorage };
