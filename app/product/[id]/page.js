import prisma from '@/app/Lib/prisma';  // Adjust path to prisma
import AddToCartButton from '@/app/components/AddToCartButton';  // Import the Client Component
import Navbar from '@/app/components/navbar';  // Import the Navbar component

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
    <>
      {/* Add Navbar component at the top */}
      <Navbar />

      {/* Add margin-top or padding-top to push content below the navbar */}
      <div style={{ padding: '20px', fontFamily: 'Poppins, Arial, sans-serif', marginTop: '90px' }}>
        <h1 style={{ fontWeight: 'bold', fontSize: '26px' }}>{product.name}</h1>
        <img src={product.image} alt={product.name} style={{ width: '300px', height: '300px', objectFit: 'cover' }} />
        <p>{product.description}</p>
        <p style={{ fontWeight: 'bold' }}>${product.price}</p>

        {/* AddToCartButton is a Client Component */}
        <AddToCartButton product={product} />
      </div>
    </>
  );
}
