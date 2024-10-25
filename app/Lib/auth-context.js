//Use perplexity AI for reference but the code was written myself
// app/Lib/auth-context.js
'use client';
import { useContext, createContext, useState, useEffect } from "react";
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  GithubAuthProvider,
  GoogleAuthProvider,
  setPersistence,
  browserLocalPersistence,
  signInWithEmailAndPassword
} from "firebase/auth";
import { auth } from "./firebase";
import { useRouter } from "next/navigation";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true); 
  const router = useRouter();

  const gitHubSignIn = async () => {
    const provider = new GithubAuthProvider();
    await setPersistence(auth, browserLocalPersistence);  // Ensuring session persistence
    return signInWithPopup(auth, provider);
  };

  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    await setPersistence(auth, browserLocalPersistence);  // Ensuring session persistence
    return signInWithPopup(auth, provider);
  };

  const emailSignIn = async (email, password) => {
    await setPersistence(auth, browserLocalPersistence);  // Ensuring session persistence
    return signInWithEmailAndPassword(auth, email, password);
  };

  const firebaseSignOut = () => {
    return signOut(auth).then(() => {
      setUser(null); 
      router.push('/SignIn'); 
    });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);  // Set the user when authenticated
      } else {
        setUser(null);  // Clear user when signed out or not authenticated
      }
      setAuthLoading(false);  // Done loading
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, googleSignIn, gitHubSignIn, emailSignIn, firebaseSignOut, authLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useUserAuth = () => {
  return useContext(AuthContext);
};