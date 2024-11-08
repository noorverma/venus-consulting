import prisma from "@/app/Lib/prisma";

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, description, price, image } = req.body;

    try {
      const newProduct = await prisma.product.create({
        data: {
          name,
          description,
          price,
          image,
        },
      });
      res.status(201).json(newProduct);
    } catch (error) {
      console.error('Error adding product:', error);
      res.status(500).json({ error: 'Failed to add product' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
