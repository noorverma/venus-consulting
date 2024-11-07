import prisma from "@/app/Lib/prisma";

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      if (id) {
        // Fetch a single product by ID
        const product = await prisma.product.findUnique({
          where: {
            id: parseInt(id),
          },
        });

        if (!product) {
          return res.status(404).json({ error: 'Product not found' });
        }

        res.status(200).json(product);
      } else {
        // Fetch all products if no ID is provided
        const products = await prisma.product.findMany();
        res.status(200).json(products);
      }
    } catch (error) {
      console.error('Detailed Prisma error:', error.message);
      console.error('Full error details:', error);
      res.status(500).json({ error: 'Failed to fetch products' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
