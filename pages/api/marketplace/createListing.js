// /pages/api/marketplace/createListing.js
import { adminDb, adminStorage } from "@/actions/firebase-admin"; // Firebase Admin utilities
import { v4 as uuidv4 } from "uuid"; // Unique ID generator for file naming

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { title, description, price, imageUrl, userId } = req.body;

    try {
      // Generate a unique filename for the image
      const fileName = `marketItems/${uuidv4()}.png`;

      // Upload the image to Firebase Storage
      const bucket = adminStorage.bucket();
      const file = bucket.file(fileName);
      const buffer = Buffer.from(imageUrl.split(",")[1], "base64"); // Decode Base64 image
      await file.save(buffer, { metadata: { contentType: "image/png" } });

      // Generate a public URL for the uploaded file
      const publicUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`;

      // Create the listing document in Firestore
      const newListing = {
        title,
        description,
        price: parseFloat(price),
        sellerId: userId,
        imageURL: publicUrl,
        imagePath: fileName, // Save the file path for proxy usage
      };

      const docRef = await adminDb.collection("marketItems").add(newListing);
      res.status(201).json({ success: true, id: docRef.id, listing: newListing });
    } catch (error) {
      console.error("Error creating listing:", error.message);
      res.status(500).json({ success: false, message: "Error creating listing" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}