import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { mockProducts } from "../mocks/products";
import Reviews from "../components/Reviews/Reviews";
import styles from "../styles/DetallesProducto.module.css";
import RecommendationRow from "../components/RecommendationRow";

export default function DetalleProducto() {
  const { id } = useParams();

  const product = mockProducts.find((p) => p.id === Number(id));

  useEffect(() => {
    if (!product) return;

    fetch(`http://localhost:3001/products/${product.id}/view`, {
      method: "POST",
    }).catch(() => {});
  }, [product]);

  if (!product) {
    return <h2>Producto no encontrado</h2>;
  }

  const recommendedByCategory = mockProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);
  return (
    <>
      <div className={styles.detallePage}>
        <div className={styles.pageContainer}>
          <Link to="/">
            <button className="btn btn-light btn-lg">volver</button>
          </Link>

          {/* PRODUCTO */}
          <section className={styles.section}>
            <div className={styles.productLayout}>
              <img
                src={product.image}
                alt={product.name}
                className={styles.imgPrincipal}
              />

              <div className={styles.topCompra}>
                <h2 className={styles.nombre}>{product.name}</h2>

                <div className={styles.rowCompra}>
                  <p className={styles.precio}>{product.price} €</p>

                  <div className={styles.cantidad}>
                    <span>Cantidad</span>
                    <input type="number" min="1" defaultValue="1" />
                  </div>

                  <button className={styles.btnComprar}>COMPRAR</button>
                </div>
              </div>
            </div>
          </section>

          {/* DESCRIPCIÓN */}
          <section className={styles.section}>
            <div className={styles.contentBlock}>
              <h3 className={styles.subtitulo}>Descripción</h3>
              <p className={styles.descripcionCorta}>{product.description}</p>
              <p className={styles.descripcionCompleta}>
                {product.descriptionC}
              </p>
            </div>
          </section>

          {/* CARACTERÍSTICAS */}
          <section className={styles.section}>
            <div className={styles.contentBlock}>
              <h3 className={styles.subtitulo}>Características</h3>
              <table className={styles.tabla}>
                <tbody>
                  {Object.entries(product.features).map(([key, value]) => (
                    <tr key={key}>
                      <th>{key}</th>
                      <td>{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* RESEÑAS */}
          <section className={styles.section}>
            <div className={styles.contentBlock}>
              <Reviews reviews={product.reviews} />
            </div>
          </section>
        </div>
      </div>

      {/* RECOMENDADOS */}
      {recommendedByCategory.length > 0 && (
        <section className={styles.recommendationsSection}>
          <div className={styles.recommendationsInner}>
            <RecommendationRow
              title={`Más productos de ${product.category}`}
              products={recommendedByCategory}
            />
          </div>
        </section>
      )}
    </>
  );
}
