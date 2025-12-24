import { useParams, Link } from "react-router-dom";
import { mockProducts } from "../mocks/products";
import { useState } from "react";
import styles from "../styles/DetallesProducto.module.css";

export default function DetalleProducto() {
  const { id } = useParams();
  const [selectedRating, setSelectedRating] = useState(null);

  const product = mockProducts.find((p) => p.id === Number(id));

  if (!product) {
    return <h2 className="producto-no-encontrado">Producto no encontrado</h2>;
  }

  /* ===== LÓGICA RESEÑAS ===== */
  const totalReviews = product.reviews.length;

  const averageRating =
    totalReviews === 0
      ? 0
      : (
          product.reviews.reduce((acc, r) => acc + r.rating, 0) / totalReviews
        ).toFixed(1);

  const ratingCounts = [5, 4, 3, 2, 1].map((star) => {
    const count = product.reviews.filter((r) => r.rating === star).length;
    const percentage =
      totalReviews === 0 ? 0 : Math.round((count / totalReviews) * 100);

    return { star, count, percentage };
  });

  const filteredReviews =
    selectedRating === null
      ? product.reviews
      : product.reviews.filter((r) => r.rating === selectedRating);

  /* ===== JSX ===== */
  return (
    <div className={styles.detallePage}>
      {/* VOLVER */}
      <Link to="/">
        <button className="btn btn-light btn-lg hover:scale-105 transition-all">
          volver
        </button>
      </Link>

      {/* IMAGEN PRINCIPAL */}
      <img
        src={product.image}
        alt={product.name}
        className={styles.imgPrincipal}
      />

      {/* MINI GALERÍA */}
      <div className={styles.gallery}>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* NOMBRE + COMPRA */}
      <div className={styles.topCompra}>
        <h2 className={styles.nombre}>{product.name}</h2>
        <div className={styles.rowCompra}>
          <p className={styles.precio}>
            Precio: <span>{product.price} €</span>
          </p>

          <div className={styles.cantidad}>
            <span>Cantidad</span>
            <input type="number" min="1" defaultValue="1" />
          </div>

          <button className={styles.btnComprar}>Añadir</button>
        </div>
      </div>

      {/* DESCRIPCIONES */}
      <h3 className={styles.subtitulo}>Descripción Breve del producto</h3>
      <p className={styles.texto}>{product.description}</p>

      <h3 className={styles.subtitulo}>Descripción Completa del producto</h3>
      <p className={styles.texto}>{product.descriptionC}</p>

      {/* CARACTERÍSTICAS */}
      <h3 className={styles.subtitulo}>Características Producto</h3>
      <table className={styles.tabla}>
        <tbody>
          {Object.entries(product.features).map(([key, value]) => (
            <tr key={key}>
              <th>
                {key
                  .replace(/([A-Z])/g, " $1")
                  .replace(/^./, (c) => c.toUpperCase())}
              </th>
              <td>{value}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ===== OPINIONES ===== */}
      <div className={styles.ratingSummary}>
        <h3 className={styles.ratingTitle}>Opiniones de clientes</h3>

        <div className={styles.ratingAverage}>
          <span className={styles.stars}>★★★★★</span>
          <span className={styles.averageNumber}>{averageRating} de 5</span>
        </div>

        <p className={styles.totalReviews}>
          {totalReviews} calificaciones globales
        </p>

        <div className={styles.ratingBars}>
          {ratingCounts.map((item) => (
            <div
              key={item.star}
              className={`${styles.ratingRow} ${
                selectedRating === item.star ? styles.ratingRowActive : ""
              }`}
              onClick={() =>
                setSelectedRating(
                  selectedRating === item.star ? null : item.star
                )
              }
            >
              <span>{item.star} estrellas</span>

              <div className={styles.bar}>
                <div
                  className={styles.barFill}
                  style={{ width: `${item.percentage}%` }}
                />
              </div>

              <span className={styles.percent}>{item.percentage}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* LISTADO RESEÑAS */}
      {selectedRating !== null &&
        (filteredReviews.length === 0 ? (
          <p className={styles.noReviews}>
            Pulsa una valoración para ver las reseñas No hay reseñas con{" "}
            {selectedRating} estrellas
          </p>
        ) : (
          <div className={styles.reviewsList}>
            {filteredReviews.map((review, index) => (
              <div key={index} className={styles.review}>
                <div className={styles.reviewHeader}>
                  <strong className={styles.reviewUser}>{review.user}</strong>
                  <span className={styles.reviewRating}>{review.rating} ★</span>
                </div>

                <p className={styles.reviewComment}>{review.comment}</p>
              </div>
            ))}
          </div>
        ))}
    </div>
  );
}
