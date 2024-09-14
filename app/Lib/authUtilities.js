import { auth } from "./firebase";
import { createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword, signOut } from "firebase/auth";

// Register a new user
export const registerUser = async (username, email, password) => {
  if (!username || !email || !password) {
    throw new Error("All fields (username, email, password) are required.");
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Update the user profile with the username
    await updateProfile(user, {
      displayName: username
    });

    return user; // Return the user object
  } catch (error) {
    console.error("Registration Error:", error.message); // Log error message
    throw new Error("Registration failed. Please try again."); // Return a user-friendly error
  }
};

// Log in an existing user
export const loginUser = async (email, password) => {
  if (!email || !password) {
    throw new Error("Email and password are required.");
  }

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    return user; // Return the user object
  } catch (error) {
    console.error("Login Error:", error.message); // Log error message
    throw new Error("Login failed. Please check your credentials and try again."); // Return a user-friendly error
  }
};

// Log out the current user
export const logOutUser = async () => {
  try {
    await signOut(auth);
    return true; // Return true when logged out successfully
  } catch (error) {
    console.error("Logout Error:", error.message); // Log error message
    throw new Error("Logout failed. Please try again."); // Return a user-friendly error
  }
};
