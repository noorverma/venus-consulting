// /pages/api/marketplace/allListings.js
import prisma from "@/app/Lib/prisma";

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { userId } = req.query; // Optional userId query parameter

    try {
      // Fetch listings, filtering by userId if provided
      const listings = await prisma.marketplaceListing.findMany({
        where: userId ? { sellerId: userId } : {}, // Filter by userId if present
        include: { seller: true },
      });

      res.status(200).json({ listings });
    } catch (error) {
      console.error('Error fetching listings:', error);
      res.status(500).json({ error: 'Error fetching listings' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}