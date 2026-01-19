import styles from "../../styles/Reviews.module.css";


const ReviewsSummary = ({ reviews }) => {
  if (!reviews || reviews.length === 0) return null;

  const avg =
    reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

  return (
    <>
      <h4>Opiniones de clientes</h4>
      <div className={styles.reviews}>
        <span className={styles.stars}>{"★".repeat(Math.round(avg))}</span>
        <span className={styles.averageNumber}>
          {avg.toFixed(1)} de 5
        </span>
      </div>
      <div className={styles.totalReviews}>
        {reviews.length} valoraciones
      </div>
    </>
  );
};

export default ReviewsSummary;
