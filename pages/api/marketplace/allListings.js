// /pages/api/marketplace/allListings.js
import { adminDb } from "@/actions/firebase-admin"; // Use Firebase Admin for server-side operations

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const listingsRef = adminDb.collection("marketItems");
      const snapshot = await listingsRef.get();

      // Map each document to include its ID
      const listings = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

      res.status(200).json({ listings });
    } catch (error) {
      console.error("Error fetching listings:", error.message);
      res.status(500).json({ error: "Error fetching listings" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}