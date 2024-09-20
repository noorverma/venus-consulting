// Import the functions I need from the SDKs I need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Add this line

// My web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBcKV8lKtS5jSauRp-9NJsDEdoHUbQ4mbI",
  authDomain: "venus-consulting-master-22cb2.firebaseapp.com",
  projectId: "venus-consulting-master-22cb2",
  storageBucket: "venus-consulting-master-22cb2.appspot.com",
  messagingSenderId: "986107956769",
  appId: "1:986107956769:web:25afb6b0e933166e8e1d60",
  measurementId: "G-QBFVJD5H94"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app); // Initialize Firestore
export default app;