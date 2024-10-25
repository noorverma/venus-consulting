import { Prisma } from "@prisma/client"; // Adjust the path if necessary

console.log('Prisma client:', Prisma);

export default async function ProductDetail({ params }) {
  const { id } = params;

  // Fetch the product details from the database
  const product = await prisma.product.findUnique({
    where: {
      id: parseInt(id),
    },
  });

  if (!product) {
    return <div>Product not found!</div>;
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'Poppins, Arial, sans-serif' }}>
      <h1>{product.name}</h1>
      <img src={product.image} alt={product.name} style={{ width: '300px', height: '300px', objectFit: 'cover' }} />
      <p>{product.description}</p>
      <p style={{ fontWeight: 'bold' }}>${product.price}</p>
    </div>
  );
}
