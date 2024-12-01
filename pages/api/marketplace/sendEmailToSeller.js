// /pages/api/marketplace/sendEmailToSeller.js

import nodemailer from "nodemailer"; // Import Nodemailer for sending emails

export default async function handler(req, res) {
  // Check if the HTTP method is POST
  if (req.method === "POST") {
    const { buyerEmail, sellerEmail, itemTitle } = req.body; // Extract buyer email, seller email, and item title

    // Validate required fields
    if (!buyerEmail || !sellerEmail || !itemTitle) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    try {
      // Create a Nodemailer transporter using Gmail SMTP
      const transporter = nodemailer.createTransport({
        service: "gmail", // Use Gmail as the email service
        auth: {
          user: process.env.GMAIL_USER, // Your Gmail address
          pass: process.env.GMAIL_PASS, // Your Gmail app password
        },
      });

      // Define the email options
      const mailOptions = {
        from: `"Marketplace" <${process.env.GMAIL_USER}>`, // Sender's email and name
        to: sellerEmail, // Recipient's email
        subject: `Interest in Your Item: ${itemTitle}`, // Email subject
        text: `Hello,\n\nUser (${buyerEmail}) is interested in your item "${itemTitle}". Please contact them to proceed.\n\nThank you!`, // Email content
      };

      // Send the email
      await transporter.sendMail(mailOptions);

      // Respond with success if the email was sent
      res.status(200).json({ success: true });
    } catch (error) {
      console.error("Error sending email:", error.message); // Log error
      res.status(500).json({ error: "Failed to send email" }); // Respond with error
    }
  } else {
    res.setHeader("Allow", ["POST"]); // Allow only POST requests
    res.status(405).end(`Method ${req.method} Not Allowed`); // Respond with 405 if not POST
  }
}