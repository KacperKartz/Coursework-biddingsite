import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ReviewComponent = ({ productId, userId }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState('');
  const [submissionError, setSubmissionError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [characterCount, setCharacterCount] = useState(0);

  // Fetch reviews for the product on component 
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_APP_BACKEND_API || 'http://localhost:5000'}/api/products/reviews/${productId}`);
        setReviews(response.data);
      } catch (err) {
        console.error("Error fetching reviews:", err);
        setError("Failed to load reviews. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [productId]);


  const handleCommentChange = (e) => {
    const newComment = e.target.value;
    setComment(newComment);
    setCharacterCount(newComment.length); // Update character count

  };

  // Handle form submission for adding a new review including validation
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmissionError('');
    setCharacterCount(comment.length);

    if (characterCount < 20){
      setSubmissionError("Review is too short.");
      setIsSubmitting(false);
      return
    }
    if (characterCount > 250){
      setSubmissionError("Review is too long.");
      setIsSubmitting(false);
      return
    }
    

    if (!userId) {
      setSubmissionError("Please log in to submit a review.");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_APP_BACKEND_API}/api/products/create-review/${productId}`, {
        user_id: userId,
        rating: rating,
        comment: comment
      });
      setReviews([response.data, ...reviews]); // Add the new review to the top of the list
      setRating(1); 
      setComment(''); 
    } catch (error) {
      console.error("Error submitting review:", error);
      setSubmissionError("Failed to submit review. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return <p>Loading reviews...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="review-section">
      <h2 className="review-title">Product Reviews</h2>
      {reviews.length === 0 ? (
        <p className="no-reviews">No reviews yet for this product.</p>
      ) : (
        <ul className="review-list">
          {reviews.map((review) => (
            <li key={review.id} className="review-item">
              <div className="review-header">
                <strong className="review-username">{review.username}</strong>
                <span className="review-rating">{` ⭐ ${review.rating}/5`}</span>
              </div>
              <p className="review-comment">{review.comment}</p>
              <small className="review-date">
                {new Date(review.created_at).toLocaleDateString()}
              </small>
            </li>
          ))}
        </ul>
      )}

      <div className="review-form">
        <h3>Leave a Review</h3>
        {submissionError && <p className="error-message">{submissionError}</p>}
        <form onSubmit={handleSubmit}>
          <label>
            Rating:
            <select
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              disabled={isSubmitting}
            >
              {[1, 2, 3, 4, 5].map((value) => (
                <option key={value} value={value}>{value}</option>
              ))}
            </select>
          </label>
          <label>
            Comment:
            <textarea
              value={comment}
              onChange={handleCommentChange}
              disabled={isSubmitting}
              required
            ></textarea>
          </label>
          <p className='error-message'>
              {characterCount < 20 ? "Please enter at least 20 Characters" : ""}
              {characterCount > 250 ? "Too many characters" : ""}
          </p>
          <p>
            {`${characterCount}/250 characters`}
          </p>
          <button type="submit" disabled={isSubmitting}>Submit Review</button>
        </form>
      </div>
    </div>
  );
};

export default ReviewComponent;
