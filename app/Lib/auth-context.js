//Use perplexity AI for reference but the code was written myself
// app/Lib/auth-context.js
'use client';
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
import { auth, db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [authLoading, setAuthLoading] = useState(true); 
  const router = useRouter();

  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    await setPersistence(auth, browserLocalPersistence); 
    const result = await signInWithPopup(auth, provider);
    const userDoc = await getDoc(doc(db, "users", result.user.uid));
    setRole(userDoc.exists() ? userDoc.data().role : "user");
    setUser(result.user);
    return { user: result.user, role: userDoc.data().role };
  };

  const emailSignIn = async (email, password) => {
    await setPersistence(auth, browserLocalPersistence);  
    const result = await signInWithEmailAndPassword(auth, email, password);
    const userDoc = await getDoc(doc(db, "users", result.user.uid));
    setRole(userDoc.exists() ? userDoc.data().role : "user");
    setUser(result.user);
    return { user: result.user, role: userDoc.data().role };
  };

  const firebaseSignOut = () => {
    return signOut(auth).then(() => {
      setUser(null);
      setRole(null); 
      router.push('/SignIn'); 
    });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const userDoc = await getDoc(doc(db, "users", currentUser.uid));
        setRole(userDoc.exists() ? userDoc.data().role : "user");
        setUser(currentUser);
      } else {
        setUser(null);
        setRole(null);
      }
      setAuthLoading(false); 
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, role, googleSignIn, emailSignIn, firebaseSignOut, authLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useUserAuth = () => {
  return useContext(AuthContext);
};