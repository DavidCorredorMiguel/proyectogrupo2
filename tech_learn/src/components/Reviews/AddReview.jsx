import { useState } from "react";
import styles from "../../styles/Reviews.module.css";

const AddReview = ({ onAddReview }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!rating || !comment.trim()) return;

    onAddReview(rating, comment);

    setRating(0);
    setComment("");
  };

  return (
    <form className={styles.addReview} onSubmit={handleSubmit}>
      <h4>Escribe tu reseña</h4>
      <div className={styles.starsContainer}>
        {[1, 2, 3, 4, 5].map((n) => (
          <span
            key={n}
            className={n <= rating ? styles.starActive : styles.starInactive}
            onClick={() => setRating(n)}
          >
            ★
          </span>
        ))}
      </div>

      <textarea
        placeholder="Escribe tu opinión..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />

      <button type="submit">Enviar reseña</button>
    </form>
  );
};

export default AddReview;
