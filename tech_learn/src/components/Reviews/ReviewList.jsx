import styles from "../../styles/Reviews.module.css";

const ReviewList = ({ reviews }) => {
  const formatDate = (date) =>
    new Date(date).toLocaleDateString("es-ES");

  return (
    <div className={styles.reviewsList}>
      {reviews.map((r, index) => (
        <div key={index} className={styles.review}>
          <div className={styles.reviewHeader}>
            <span className={styles.reviewUser}>{r.user}</span>
            <span className={styles.reviewRating}>
              {"★".repeat(r.rating)}
              {"☆".repeat(5 - r.rating)}
            </span>
          </div>

          <p className={styles.reviewComment}>{r.comment}</p>

          <small className={styles.reviewDate}>
            {formatDate(r.date)}
          </small>
        </div>
      ))}
    </div>
  );
};

export default ReviewList;
