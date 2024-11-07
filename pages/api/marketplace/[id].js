// pages/api/marketplace/[id].js
import prisma from "@/app/Lib/prisma";

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'GET') {
    // Fetch single listing details
    try {
      const listing = await prisma.marketplaceListing.findUnique({
        where: { id: parseInt(id) },
        include: { messages: true }, // Include related messages if they exist
      });

      if (!listing) {
        return res.status(404).json({ error: 'Listing not found' });
      }

      res.status(200).json({ listing });
    } catch (error) {
      console.error('Error fetching listing:', error);
      res.status(500).json({ error: 'Failed to fetch listing' });
    }
  } else if (req.method === 'POST') {
    // Handle message creation
    const { message } = req.body;
    try {
      const newMessage = await prisma.marketplaceMessage.create({
        data: {
          content: message,
          listingId: parseInt(id),
          createdAt: new Date(),
        },
      });
      res.status(201).json({ success: true, message: newMessage });
    } catch (error) {
      console.error('Error creating message:', error);
      res.status(500).json({ success: false, error: 'Failed to send message' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
