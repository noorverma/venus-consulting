import prisma from "@/app/Lib/prisma";

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { productId, rating, comment } = req.body;

    // Check for required fields
    if (!productId || !rating) {
      console.error('Missing productId or rating:', { productId, rating });
      return res.status(400).json({ error: 'Product ID and rating are required' });
    }

    try {
      const newReview = await prisma.review.create({
        data: {
          productId: parseInt(productId),  // Ensure productId is an integer
          rating: parseInt(rating),        // Ensure rating is an integer
          comment: comment || null,
        },
      });
      res.status(201).json(newReview);
    } catch (error) {
      console.error('Error adding review to database:', error);
      res.status(500).json({ error: 'Failed to add review' });
    }
  } else if (req.method === 'GET') {
    const { id } = req.query;

    try {
      const reviews = await prisma.review.findMany({
        where: { productId: parseInt(id) },
        orderBy: { createdAt: 'desc' },
      });
      res.status(200).json(reviews);
    } catch (error) {
      console.error('Error fetching reviews from database:', error);
      res.status(500).json({ error: 'Failed to fetch reviews' });
    }
  } else {
    res.setHeader('Allow', ['POST', 'GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
