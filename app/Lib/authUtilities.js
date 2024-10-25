//Use perplexity AI for reference but the code was written myself
// app/Lib/authUtilities.js
import { auth, db } from "./firebase";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail as firebaseSendPasswordResetEmail,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";

// Register a new user
export const registerUser = async (username, email, password, isAdmin = false) => {
  if (!username || !email || !password) {
    throw new Error("All fields (username, email, password) are required.");
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await updateProfile(user, {
      displayName: username,
    });

    const role = isAdmin ? "admin" : "user";
    await setDoc(doc(db, "users", user.uid), {
      email: user.email,
      username: username,
      role: role,
    });

    return user;
  } catch (error) {
    console.error("Registration Error:", error.message);
    throw new Error("Registration failed. Please try again.");
  }
};

// Log in a user
export const loginUser = async (email, password) => {
  if (!email || !password) {
    throw new Error("Email and password are required.");
  }

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    const userDoc = await getDoc(doc(db, "users", user.uid));
    if (!userDoc.exists()) {
      throw new Error("User data not found.");
    }

    const userData = userDoc.data();
    const role = userData.role;

    return { user, role };
  } catch (error) {
    console.error("Login Error:", error.message);
    throw new Error("Login failed. Please check your credentials and try again.");
  }
};

// Log out the user
export const logOutUser = async () => {
  try {
    await signOut(auth);
    return true;
  } catch (error) {
    console.error("Logout Error:", error.message);
    throw new Error("Logout failed. Please try again.");
  }
};

// Send a password reset email
export const sendPasswordResetEmail = async (email) => {
  if (!email) {
    throw new Error("Email is required.");
  }

  try {
    await firebaseSendPasswordResetEmail(auth, email);
    return true; // Optionally return a success message or value
  } catch (error) {
    console.error("Password Reset Error:", error.message);
    throw new Error("Failed to send password reset email. Please try again.");
  }
};