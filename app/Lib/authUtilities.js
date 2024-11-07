//Use perplexity AI for reference but the code was written myself
// app/Lib/authUtilities.js
import { auth, db } from "./firebase"; // Import Firebase Authentication and Firestore instances from your firebase configuration
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail as firebaseSendPasswordResetEmail, // Rename the password reset function for clarity
} from "firebase/auth"; // Import Firebase Authentication methods
import { doc, setDoc, getDoc } from "firebase/firestore"; // Import Firestore methods for document operations

// Register a new user
export const registerUser = async (username, email, password, isAdmin = false) => {
  // Check if all required fields are provided
  if (!username || !email || !password) {
    throw new Error("All fields (username, email, password) are required."); // Throw an error if any field is missing
  }

  try {
    // Create a new user with email and password
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user; // Extract the user object from the result

    // Update the user's profile with the provided username
    await updateProfile(user, {
      displayName: username,
    });

    // Set the user's role in Firestore (admin or user)
    const role = isAdmin ? "admin" : "user";
    await setDoc(doc(db, "users", user.uid), {
      email: user.email, // Store the user's email in Firestore
      username: username, // Store the username
      role: role, // Store the role (admin or user)
    });

    return user; // Return the created user object
  } catch (error) {
    // Log the error to the console and throw a custom error message
    console.error("Registration Error:", error.message);
    throw new Error("Registration failed. Please try again.");
  }
};

// Log in a user
export const loginUser = async (email, password) => {
  // Check if both email and password are provided
  if (!email || !password) {
    throw new Error("Email and password are required."); // Throw an error if either field is missing
  }

  try {
    // Sign in the user with email and password
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user; // Extract the user object from the result

    // Retrieve the user's data from Firestore
    const userDoc = await getDoc(doc(db, "users", user.uid));
    if (!userDoc.exists()) {
      throw new Error("User data not found."); // Throw an error if the user's data does not exist in Firestore
    }

    const userData = userDoc.data(); // Extract the data from the Firestore document
    const role = userData.role; // Get the user's role (admin or user)

    return { user, role }; // Return the user object and role
  } catch (error) {
    // Log the error to the console and throw a custom error message
    console.error("Login Error:", error.message);
    throw new Error("Login failed. Please check your credentials and try again.");
  }
};

// Log out the user
export const logOutUser = async () => {
  try {
    // Sign out the current user
    await signOut(auth);
    return true; // Return true to indicate successful logout
  } catch (error) {
    // Log the error to the console and throw a custom error message
    console.error("Logout Error:", error.message);
    throw new Error("Logout failed. Please try again.");
  }
};

// Send a password reset email
export const sendPasswordResetEmail = async (email) => {
  // Check if the email is provided
  if (!email) {
    throw new Error("Email is required."); // Throw an error if the email field is missing
  }

  try {
    // Send a password reset email using Firebase Authentication
    await firebaseSendPasswordResetEmail(auth, email);
    return true; // Optionally return true to indicate success
  } catch (error) {
    // Log the error to the console and throw a custom error message
    console.error("Password Reset Error:", error.message);
    throw new Error("Failed to send password reset email. Please try again.");
  }
};