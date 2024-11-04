//Use perplexity AI for reference but the code was written myself
// app/Lib/auth-context.js
'use client'; // Enables client-side rendering in Next.js

// Importing necessary React, Firebase, and Next.js hooks and functions
import { useContext, createContext, useState, useEffect } from "react";
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  setPersistence,
  browserLocalPersistence,
  signInWithEmailAndPassword
} from "firebase/auth";
import { auth, db } from "./firebase"; // Importing Firebase auth and Firestore database
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation"; // Provides navigation functionality in Next.js

// Creating the AuthContext, which will hold authentication state and functions
const AuthContext = createContext();

// This component provides authentication context to all children components
export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Stores the currently logged-in user
  const [role, setRole] = useState(null); // Stores the user's role (e.g., "user" or "admin")
  const [authLoading, setAuthLoading] = useState(true); // Indicates if auth state is loading
  const router = useRouter();

  // Function to handle Google sign-in
  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider(); // Creates a Google Auth provider
    await setPersistence(auth, browserLocalPersistence); // Sets persistence to keep user logged in across sessions
    const result = await signInWithPopup(auth, provider); // Opens a Google sign-in popup
    const userDoc = await getDoc(doc(db, "users", result.user.uid)); // Fetches the user's role from Firestore
    setRole(userDoc.exists() ? userDoc.data().role : "user"); // Sets role if it exists, defaults to "user"
    setUser(result.user); // Sets the authenticated user
    return { user: result.user, role: userDoc.data().role }; // Returns user and role
  };

  // Function to handle email/password sign-in
  const emailSignIn = async (email, password) => {
    await setPersistence(auth, browserLocalPersistence); // Sets persistence for session
    const result = await signInWithEmailAndPassword(auth, email, password); // Signs in using email and password
    const userDoc = await getDoc(doc(db, "users", result.user.uid)); // Fetches role from Firestore
    setRole(userDoc.exists() ? userDoc.data().role : "user"); // Sets role or defaults to "user"
    setUser(result.user); // Sets the authenticated user
    return { user: result.user, role: userDoc.data().role }; // Returns user and role
  };

  // Function to sign out the user
  const firebaseSignOut = () => {
    return signOut(auth).then(() => {
      setUser(null); // Clears user state
      setRole(null); // Clears role state
      router.push('/SignIn'); // Redirects to SignIn page after sign-out
    });
  };

  // Effect to monitor Firebase auth state and update the user and role
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const userDoc = await getDoc(doc(db, "users", currentUser.uid)); // Fetches role if user is logged in
        setRole(userDoc.exists() ? userDoc.data().role : "user"); // Sets role or defaults to "user"
        setUser(currentUser); // Sets the logged-in user
      } else {
        setUser(null); // Clears user state if no user is logged in
        setRole(null); // Clears role state
      }
      setAuthLoading(false); // Sets loading state to false once auth state is updated
    });
    return () => unsubscribe(); // Cleans up the subscription when component unmounts
  }, []);

  return (
    // Provides user, role, auth functions, and loading state to children components
    <AuthContext.Provider value={{ user, role, googleSignIn, emailSignIn, firebaseSignOut, authLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to access AuthContext values in other components
export const useUserAuth = () => {
  return useContext(AuthContext);
};