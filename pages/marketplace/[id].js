import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const ListingDetail = () => {
  const router = useRouter();
  const { id } = router.query;

  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const fetchListing = async () => {
        try {
          const response = await fetch(`/api/marketplace/${id}`);
          const data = await response.json();
          setListing(data.listing);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching listing:', error);
          setLoading(false);
        }
      };

      fetchListing();
    }
  }, [id]);

  if (loading) return <p>Loading...</p>;

  return listing ? (
    <div style={{ padding: '20px' }}>
      <h1>{listing.title}</h1>
      <img src={listing.image} alt={listing.title} style={{ maxWidth: '100%' }} />
      <p>{listing.description}</p>
      <p>${listing.price}</p>
    </div>
  ) : (
    <p>Listing not found.</p>
  );
};

export default ListingDetail;
