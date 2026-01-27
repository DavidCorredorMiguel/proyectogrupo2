import styles from "../../styles/Reviews.module.css";

const ReviewList = ({ reviews, filterRating }) => {
  const formatDate = (date) => new Date(date).toLocaleDateString("es-ES");

  const filteredReviews = filterRating
    ? reviews.filter((r) => r.rating === filterRating)
    : reviews;

  return (
    <div className={styles.reviewsList}>
      {filteredReviews.length === 0 && (
        <p>No hay reseñas con esta puntuación.</p>
      )}

      {filteredReviews.map((r, index) => (
        <div key={index} className={styles.review}>
          <div className={styles.reviewHeader}>
            <span className={styles.reviewUser}>
              {r.user}

              {r.verified && (
                <span className={styles.verifiedBadge}>
                  ★ Usuario verificado
                </span>
              )}
            </span>
            <span className={styles.reviewRating}>
              {"★".repeat(r.rating)}
              {"☆".repeat(5 - r.rating)}
            </span>
          </div>

          <p className={styles.reviewComment}>{r.comment}</p>

          <small className={styles.reviewDate}>{formatDate(r.date)}</small>
        </div>
      ))}
    </div>
  );
};

export default ReviewList;
