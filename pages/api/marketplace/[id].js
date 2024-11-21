// pages/api/marketplace/[id].js
import { adminDb } from "@/actions/firebase-admin"; // Use Firebase Admin for server-side operations

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === "GET") {
    try {
      console.log("Fetching document with ID:", id);

      // Fetch the listing from the `marketItems` collection using Firebase Admin SDK
      const docRef = adminDb.collection("marketItems").doc(id);
      const marketItemDoc = await docRef.get();

      if (!marketItemDoc.exists) {
        console.error(`Listing with ID ${id} not found.`);
        return res.status(404).json({ error: "Listing not found" });
      }

      const listing = marketItemDoc.data();
      console.log("Listing found:", listing);

      // Fetch the seller's information from the `users` collection
      const sellerRef = adminDb.collection("users").doc(listing.sellerId); // Use sellerId as the document ID
      const sellerDoc = await sellerRef.get();

      if (!sellerDoc.exists) {
        console.error(`Seller with ID ${listing.sellerId} not found.`);
        return res.status(406).json({ error: "Seller not found" });
      }

      const sellerData = sellerDoc.data();
      console.log("Seller data retrieved:", sellerData);

      // Include seller's email in the response
      const sellerEmail = sellerData.email;

      res.status(200).json({ listing: { ...listing, sellerEmail } });
    } catch (error) {
      console.error("Error fetching listing:", error.message);
      res.status(500).json({ error: "Failed to fetch listing" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
