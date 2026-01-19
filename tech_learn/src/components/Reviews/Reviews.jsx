import ReviewsSummary from "./ReviewsSummary";
import { useState } from "react";
import RatingBars from "./RantingBars";

import ReviewList from "./ReviewList";
import styles from "../../styles/Reviews.module.css";
const Reviews = ({ reviews = [] }) => {

  
  const [showReviews, setShowReviews] = useState(false);
  if (!reviews.length) return null;

  return (
    <section className={styles.reviewsContainer}>
      <ReviewsSummary reviews={reviews} />
      <RatingBars reviews={reviews} />

      <button
        className={styles.viewMoreBtn}
        onClick={() => setShowReviews(!showReviews)}
      >
        {showReviews ? "Ocultar valoraciones" : "Ver valoraciones"}
      </button>

      {showReviews && <ReviewList reviews={reviews} />}
    </section>
  );
};

export default Reviews;
