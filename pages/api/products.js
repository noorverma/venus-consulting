import prisma from "@/app/Lib/prisma";

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const products = await prisma.product.findMany(); // Fetch products from the database
      res.status(200).json(products);
    } catch (error) {
      console.error('Detailed Prisma error:', error.message);  // Log error message
      console.error('Full error details:', error);  // Log full error object
      res.status(500).json({ error: 'Failed to fetch products' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
