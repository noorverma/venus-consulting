import { auth } from "./firebase";
import { createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword, signOut } from "firebase/auth";

// Register a new user
export const registerUser = async (username, email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Update the user profile with the username
    await updateProfile(user, {
      displayName: username
    });

    return user; // Return the user object
  } catch (error) {
    throw error; // Throw the original error
  }
};

// Log in an existing user
export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    return user; // Return the user object
  } catch (error) {
    throw error; // Throw the original error
  }
};

// Log out the current user
export const logOutUser = async () => {
  try {
    await signOut(auth);
    return true; // Return true when logged out successfully
  } catch (error) {
    throw error; // Throw the original error
  }
};
