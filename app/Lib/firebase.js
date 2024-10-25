// app/Lib/firebase.js
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, setPersistence, browserLocalPersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBcKV8lKtS5jSauRp-9NJsDEdoHUbQ4mbI",
  authDomain: "venus-consulting-master-22cb2.firebaseapp.com",
  projectId: "venus-consulting-master-22cb2",
  storageBucket: "venus-consulting-master-22cb2.appspot.com",
  messagingSenderId: "986107956769",
  appId: "1:986107956769:web:25afb6b0e933166e8e1d60",
  measurementId: "G-QBFVJD5H94"
};

let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

const auth = getAuth(app);
const db = getFirestore(app);

setPersistence(auth, browserLocalPersistence)
  .then(() => {
    console.log("Persistence set successfully");
  })
  .catch((error) => {
    console.error("Error setting persistence:", error);
  });

export { auth, db };