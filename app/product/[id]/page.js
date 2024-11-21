// app/components/AddToCartButton.js
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
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProductAndReviews = async () => {
      try {
        const productRes = await fetch(`/api/products?id=${id}`);
        const productData = await productRes.json();
        setProduct(productData);

        const reviewRes = await fetch(`/api/reviews?id=${id}`);
        const reviewData = await reviewRes.json();
        setReviews(reviewData);
      } catch (error) {
        console.error('Error fetching product or reviews:', error);
      }
    };
    fetchProductAndReviews();
  }, [id]);

  // Calculate average rating
  const averageRating = reviews.length
    ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
    : 0;

  // Number of ratings
  const ratingCount = reviews.length;

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

  const handleStarClick = (starValue) => {
    setRating(starValue);
  };

  const handleStarHover = (starValue) => {
    setHoverRating(starValue);
  };

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
        
        {/* Display Average Rating */}
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
          <span style={{ fontSize: '1.2rem', marginRight: '10px' }}>Average Rating:</span>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {[1, 2, 3, 4, 5].map((star) => {
              const fillPercentage = Math.min(Math.max(averageRating - star + 1, 0), 1) * 100;
              return <Star key={star} filled={fillPercentage > 0} fillPercentage={fillPercentage} />;
            })}
          </div>
          <span style={{ marginLeft: '10px', fontSize: '1.2rem', color: '#FB923C' }}>
            {ratingCount > 0 ? `${averageRating.toFixed(1)} / 5 (${ratingCount} ratings)` : 'No ratings yet'}
          </span>
        </div>

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
