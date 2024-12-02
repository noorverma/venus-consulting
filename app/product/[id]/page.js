"use client";

import { useState, useEffect } from 'react';
import AddToCartButton from '@/app/components/AddToCartButton';
import Navbar from '@/app/components/navbar';
import Star from '@/app/components/star';
import { useRouter } from 'next/navigation';

export default function ProductDetail({ params }) {
  const { id } = params;
  const router = useRouter();

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

  const handleBuyNow = () => {
    const totalAmount = (product.price * quantity).toFixed(2);
    router.push(`/payment?amount=${totalAmount}&productId=${id}&quantity=${quantity}`);
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar />

      <div style={{ padding: '20px 55px', fontFamily: 'Poppins, Arial, sans-serif', marginTop: '90px', display: 'flex', gap: '40px' }}>
        {/* Left Column: Product Image */}
        <div style={{ flex: 1 }}>
          <img src={product.image} alt={product.name} style={{ width: '100%', maxWidth: '400px', height: 'auto', objectFit: 'cover' }} />
        </div>

        {/* Right Column: Product Details */}
        <div style={{ flex: 1 }}>
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

          <p>{product.description}</p>
          <p style={{ fontWeight: 'bold', fontSize: '24px' }}>${product.price}</p>

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

          <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
            <button onClick={handleBuyNow}
              style={{ padding: '10px 20px',
                      backgroundColor: '#FB923C',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '5px',
                      cursor: 'pointer',
                      marginTop: '20px' }}>
              <b>Buy Now</b>
            </button>
            <AddToCartButton product={product} quantity={quantity} />
          </div>
        </div>
      </div>

      {/* Review Section */}
      <div style={{ padding: '20px', fontFamily: 'Poppins, Arial, sans-serif', marginTop: '40px', backgroundColor: '#f9fafb', borderRadius: '10px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}>
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <h3 className="text-3xl font-bold text-orange-500">Customer Reviews</h3>
          <p className="text-gray-600">See what our customers are saying</p>
        </div>
        {/* Review Form */}
        <div style={{ marginTop: '20px', padding: '20px', backgroundColor: '#fff', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' }}>
          <h4 className="text-2xl font-semibold mb-4">Leave a Review</h4>
          <div style={{ display: 'flex', gap: '5px', marginBottom: '10px' }}>
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
            style={{ width: '100%', height: '100px', padding: '10px', borderRadius: '8px', border: '1px solid #ddd', marginBottom: '10px' }}
          />
          <button onClick={handleReviewSubmit} style={{ padding: '10px 20px', backgroundColor: '#FB923C', color: '#fff', border: 'none', cursor: 'pointer', borderRadius: '8px', boxShadow: '0 4px 8px rgba(251, 146, 60, 0.4)' }}>
            Submit Review
          </button>
        </div>

        {/* Display Reviews */}
        <div style={{ marginTop: '40px' }}>
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <div key={review.id} style={{ borderBottom: '1px solid #ddd', padding: '20px 0', backgroundColor: '#fff', borderRadius: '10px', padding: '20px', marginBottom: '20px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' }}>
                <div style={{ display: 'flex', gap: '5px', marginBottom: '10px' }}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} filled={star <= review.rating} />
                  ))}
                </div>
                {review.comment && <p style={{ fontSize: '1.1rem', color: '#555' }}>{review.comment}</p>}
              </div>
            ))
          ) : (
            <p style={{ textAlign: 'center', fontSize: '1.2rem', color: '#666' }}>No reviews yet. Be the first to leave one!</p>
          )}
        </div>
      </div>
    </>
  );
}
