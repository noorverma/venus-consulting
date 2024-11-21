// /actions/marketProxyServer.js
// /actions/marketProxyServer.js
import { generateSignedUrl } from "@/actions/firebase-admin"; // Import the signed URL generator function
import axios from "axios"; // Import Axios for HTTP requests

// This function serves as a proxy to fetch and return the binary data of a file stored in Firebase Storage.
// It takes a `filePath` as a query parameter, generates a signed URL for secure access, and fetches the file data.
export default async function handler(req, res) {
  const { filePath } = req.query; // Get file path from the query parameter

  if (!filePath) {
    console.error("No filePath provided in query.");
    return res.status(400).json({ error: "File path is required." }); // Return 400 error if no filePath is provided
  }

  try {
    const decodedPath = decodeURIComponent(filePath); // Decode the filePath if it is URL-encoded
    console.log("Decoded filePath:", decodedPath);

    // Use the `generateSignedUrl` function to get a secure signed URL
    const signedURL = await generateSignedUrl(decodedPath); // Fetch the signed URL
    console.log("Signed URL:", signedURL);

    // Fetch the image data using the signed URL
    const response = await axios.get(signedURL, { responseType: "arraybuffer" }); // Ensure binary data is preserved

    // Return the image data with appropriate headers
    res.setHeader("Content-Type", response.headers["content-type"]); // Preserve the original content type
    res.status(200).send(response.data); // Send the image binary data
  } catch (error) {
    console.error("Error fetching image from storage:", error.message); // Log the error for debugging
    res.status(500).json({ error: "Failed to fetch image from storage." }); // Return 500 error if something goes wrong
  }
}