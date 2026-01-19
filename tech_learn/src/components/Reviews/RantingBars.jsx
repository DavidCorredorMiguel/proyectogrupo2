
import styles from "../../styles/Reviews.module.css";

const ratings = [
  { stars: "5 estrellas", percent: 77 },
  { stars: "4 estrellas", percent: 11 },
  { stars: "3 estrellas", percent: 7 },
  { stars: "2 estrellas", percent: 1 },
  { stars: "1 estrella", percent: 4 },
]

const RantingBars = () => {
  return (
    <div className={styles.ratingBars}>
      {ratings.map((r) => (
        <div key={r.stars} className={styles.ratingRow}>
          <span>{r.stars}</span>

          <div className={styles.bar}>
            <div
              className={styles.barFill}
              style={{ width: `${r.percent}%` }}
            />
          </div>

          <span className={styles.percent}>{r.percent}%</span>
        </div>
      ))}
    </div>
  )
}

export default RantingBars


