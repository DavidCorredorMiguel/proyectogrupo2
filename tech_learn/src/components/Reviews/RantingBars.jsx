import styles from "../../styles/Reviews.module.css";

const RatingBars = ({ reviews, onSelectRating }) => {
  if (!reviews || reviews.length === 0) return null;

  const total = reviews.length;

  const getPercent = (stars) => {
    const count = reviews.filter((r) => r.rating === stars).length;
    return Math.round((count / total) * 100);
  };

  return (
    <div className={styles.ratingBars}>
      {[5, 4, 3, 2, 1].map((star) => (
        <div
          key={star}
          className={styles.ratingRow}
          onClick={() => onSelectRating(star)}
        >
          <span>{star} estrellas</span>

          <div className={styles.bar}>
            <div
              className={styles.barFill}
              style={{ width: `${getPercent(star)}%` }}
            />
          </div>

          <span className={styles.percent}>{getPercent(star)}%</span>
        </div>
      ))}
    </div>
  );
};

export default RatingBars;
