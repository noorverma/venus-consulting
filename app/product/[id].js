import { useRouter } from 'next/router';
import { useCart } from '../../context/CartContext'; // Assuming you're using the CartContext for cart functionality

const ProductDetails = () => {
  const router = useRouter();
  const { id } = router.query; // Fetch the product ID from the URL
  const { addToCart } = useCart(); // Access the cart context to add products to the cart

  // Example product data (replace this with actual data fetching or state)
  const products = [
    {
      id: '1',
      name: 'Voltage Tester',
      description: 'A high-quality voltage tester for safe electrical inspections.',
      price: 25.99,
      image: '/voltagetester.png',
    },
    {
      id: '2',
      name: 'Insulated Gloves',
      description: 'Electrical safety gloves with high insulation protection.',
      price: 15.50,
      image: '/insulatedgloves.jpeg',
    },
    {
      id: '3',
      name: 'Circuit Breaker Finder',
      description: 'Accurate circuit breaker finder for quick electrical testing.',
      price: 40.00,
      image: '/circuitbreakerfinder.png',
    },
  ];

  // Find the product based on the ID in the URL
  const product = products.find((product) => product.id === id);

  if (!product) {
    return <p>Product not found.</p>;
  }

  return (
    <main className="max-w-4xl mx-auto p-10 bg-white rounded-lg shadow-lg mt-10">
      <div className="flex">
        <img src={product.image} alt={product.name} className="w-1/2 h-auto object-cover rounded-lg" />
        <div className="ml-10">
          <h1 className="text-4xl font-bold text-orange-500">{product.name}</h1>
          <p className="text-gray-600 mt-4">{product.description}</p>
          <p className="text-2xl font-bold mt-4 text-orange-500">${product.price}</p>
          
          <button 
            onClick={() => addToCart(product)} // Add product to the cart
            className="mt-6 bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </main>
  );
};

export default ProductDetails;
