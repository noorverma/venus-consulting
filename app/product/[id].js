//product/[id].js
//used perlexity AI and chatGPT for reference
"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { db } from '@/app/Lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

export default function ProductDetails() {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        try {
          const docRef = doc(db, 'products', id);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setProduct(docSnap.data());
          } else {
            console.log('No such product!');
          }
        } catch (error) {
          console.error('Error fetching product:', error);
        } finally {
          setLoading(false);
        }
      };
      fetchProduct();
    }
  }, [id]);

  if (loading) {
    return <p>Loading product details...</p>;
  }

  if (!product) {
    return <p>Product not found.</p>;
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'Poppins, Arial, sans-serif' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>{product.name}</h1>
      <img src={product.imageUrl} alt={product.name} style={{ width: '100%', height: 'auto', borderRadius: '10px' }} />
      <p style={{ marginTop: '20px', color: '#555' }}>{product.description}</p>
      <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#FB923C', marginTop: '20px' }}>${product.price.toFixed(2)}</p>
    </div>
  );
}
