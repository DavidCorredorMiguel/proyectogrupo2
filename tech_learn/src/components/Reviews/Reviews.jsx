import { useState, useEffect } from "react";
import styles from "../../styles/Reviews.module.css";
import { mockProducts } from "../../mocks/products";
import { useAuthStore } from "../../store/authStore";

import ReviewsSummary from "./ReviewsSummary";
import RatingBars from "./RantingBars";
import ReviewList from "./ReviewList";
import AddReview from "./AddReview";

const Reviews = ({ productId }) => {
  const usuario = useAuthStore((state) => state.user); //
  const [showReviews, setShowReviews] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [filterRating, setFilterRating] = useState(null);

  useEffect(() => {
    loadReviews();
  }, [productId]);

  const loadReviews = () => {
    try {
      const product = mockProducts.find((p) => p.id === productId);
      const mockReviews = product?.reviews || [];

      const storedReviews = localStorage.getItem("product_reviews");
      const allReviews = storedReviews ? JSON.parse(storedReviews) : [];
      const localReviews = allReviews.filter(
        (review) => review.productId === productId
      );

      setReviews([...mockReviews, ...localReviews]);
    } catch (error) {
      console.error("Error al cargar reseñas:", error);
    }
  };

  const handleAddReview = (rating, comment) => {
    const newReview = {
      id: `review_${Date.now()}`,
      productId,
      userId: usuario?.id || "anonimo",
      user: usuario?.name || "Usuario invitado",
      verified: !!usuario,
      rating,
      comment,
      date: new Date().toISOString(),
    };

    const storedReviews = localStorage.getItem("product_reviews");
    const allReviews = storedReviews ? JSON.parse(storedReviews) : [];
    const updated = [...allReviews, newReview];

    localStorage.setItem("product_reviews", JSON.stringify(updated));

    loadReviews();
  };

  return (
    <div className={styles.reviewsContainer}>
      <ReviewsSummary reviews={reviews} />
      <RatingBars reviews={reviews} onSelectRating={setFilterRating} />
      <button
        className={styles.viewMoreBtn}
        onClick={() => setShowReviews(!showReviews)}
      >
        {showReviews ? "Ocultar valoraciones" : "Ver valoraciones"}
      </button>

      {showReviews && (
        <ReviewList reviews={reviews} filterRating={filterRating} />
      )}

      <AddReview onAddReview={handleAddReview} />
    </div>
  );
};

export default Reviews;
