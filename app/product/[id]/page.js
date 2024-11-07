"use client";

import { useState, useEffect } from 'react';
import AddToCartButton from '@/app/components/AddToCartButton';
import Navbar from '@/app/components/navbar';
import Star from '@/app/components/star';

export default function ProductDetail({ params }) {
  const { id } = params;

  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(1);
  const [hoverRating, setHoverRating] = useState(0); // New hover rating state
  const [comment, setComment] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProductAndReviews = async () => {
      const productRes = await fetch(`/api/products?id=${id}`);
      const productData = await productRes.json();
      setProduct(productData);

      const reviewRes = await fetch(`/api/reviews?id=${id}`);
      const reviewData = await reviewRes.json();
      setReviews(reviewData);
    };
    fetchProductAndReviews();
  }, [id]);

  const handleReviewSubmit = async () => {
    try {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId: parseInt(id), rating, comment }),
      });

      if (response.ok) {
        const newReview = await response.json();
        setReviews([newReview, ...reviews]);
        setRating(1);
        setComment("");
      } else {
        console.error('Failed to submit review');
      }
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  // Handle star click
  const handleStarClick = (starValue) => {
    setRating(starValue);
  };

  // Handle star hover
  const handleStarHover = (starValue) => {
    setHoverRating(starValue);
  };

  // Reset hover rating when mouse leaves
  const handleStarHoverLeave = () => {
    setHoverRating(0);
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar />

      <div style={{ padding: '20px', fontFamily: 'Poppins, Arial, sans-serif', marginTop: '90px' }}>
        <h1 style={{ fontWeight: 'bold', fontSize: '26px' }}>{product.name}</h1>
        <img src={product.image} alt={product.name} style={{ width: '300px', height: '300px', objectFit: 'cover' }} />
        <p>{product.description}</p>
        <p style={{ fontWeight: 'bold' }}>${product.price}</p>

        <div style={{ margin: '10px 0' }}>
          <label htmlFor="quantity">Quantity: </label>
          <input
            type="number"
            id="quantity"
            value={quantity}
            min="1"
            onChange={(e) => setQuantity(parseInt(e.target.value))}
            style={{ width: '60px', textAlign: 'center' }}
          />
        </div>

        <AddToCartButton product={product} quantity={quantity} />

        {/* Review Form */}
        <div style={{ marginTop: '40px' }}>
          <h3>Leave a Review</h3>
          <div style={{ display: 'flex', gap: '5px' }}>
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                filled={star <= (hoverRating || rating)} // Use hoverRating if it exists, otherwise use rating
                onClick={() => handleStarClick(star)}
                onMouseEnter={() => handleStarHover(star)}
                onMouseLeave={handleStarHoverLeave}
              />
            ))}
          </div>
          <textarea
            placeholder="Leave a comment (optional)"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            style={{ width: '100%', height: '80px', marginTop: '10px' }}
          />
          <button onClick={handleReviewSubmit} style={{ marginTop: '10px' }}>
            Submit Review
          </button>
        </div>

        {/* Display Reviews */}
        <div style={{ marginTop: '40px' }}>
          <h3>Reviews</h3>
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <div key={review.id} style={{ borderBottom: '1px solid #ddd', padding: '10px 0' }}>
                <div style={{ display: 'flex', gap: '5px' }}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} filled={star <= review.rating} />
                  ))}
                </div>
                {review.comment && <p>{review.comment}</p>}
              </div>
            ))
          ) : (
            <p>No reviews yet.</p>
          )}
        </div>
      </div>
    </>
  );
}
