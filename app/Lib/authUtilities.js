import { auth, db } from "./firebase";
import { createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";

export const registerUser = async (username, email, password, isAdmin = false) => {
  if (!username || !email || !password) {
    throw new Error("All fields (username, email, password) are required.");
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await updateProfile(user, {
      displayName: username
    });

    const role = isAdmin ? "admin" : "user";
    await setDoc(doc(db, "users", user.uid), {
      email: user.email,
      username: username,
      role: role
    });

    return user;
  } catch (error) {
    console.error("Registration Error:", error.message);
    throw new Error("Registration failed. Please try again.");
  }
};

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

export const logOutUser = async () => {
  try {
    await signOut(auth);
    return true;
  } catch (error) {
    console.error("Logout Error:", error.message);
    throw new Error("Logout failed. Please try again.");
  }
};