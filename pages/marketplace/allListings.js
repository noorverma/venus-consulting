// pages/marketplace/allListings.js
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AllListings() {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    async function fetchListings() {
      const response = await fetch('/api/marketplace/allListings');
      const data = await response.json();
      setListings(data.listings || []);
    }
    fetchListings();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>All Listings</h1>
      {listings.length === 0 ? (
        <p>No listings found.</p>
      ) : (
        <ul>
          {listings.map(listing => (
            <li key={listing.id}>
              <Link href={`/marketplace/${listing.id}`}>
                <a>{listing.title}</a>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
