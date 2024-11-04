//actions/products.js
'use server'
import { db } from "@/app/Lib/firebase";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";

export async function fetchAllProducts() {
  try {
    const productsRef = collection(db, "products");
    const snapshot = await getDocs(productsRef);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export async function fetchProductById(id) {
  try {
    const productRef = doc(db, "products", id);
    const snapshot = await getDoc(productRef);
    return snapshot.exists() ? { id: snapshot.id, ...snapshot.data() } : null;
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    return null;
  }
}
