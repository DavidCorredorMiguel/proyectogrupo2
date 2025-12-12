import { useParams } from "react-router-dom";
import { mockProducts } from "../mocks/products";
import styles from "../styles/DetallesProducto.module.css";

export default function DetalleProducto() {
  const { id } = useParams();

  const product = mockProducts.find((p) => p.id === Number(id));

  if (!product) {
    return <h2 className="producto-no-encontrado">Producto no encontrado</h2>;
  }

  return (
    <div className={styles.detallePage}>
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
          <p className={styles.precio}>{product.price} €</p>

          <div className={styles.cantidad}>
            <span>Cantidad</span>
            <input type="number" min="1" defaultValue="1" />
          </div>

          <button className={styles.btnComprar}>COMPRAR</button>
        </div>
      </div>

      {/* DESCRIPCIONES */}
      <h3 className={styles.subtitulo}>Descripción Breve del producto</h3>
      <p className={styles.texto}>PC Gaming Windows 11</p>

      <h3 className={styles.subtitulo}>Descripción Completa del producto</h3>
      <p className={styles.texto}>
        PC Gaming con Windows 11 <br />
        AMD Radeon
      </p>

      {/* TABLA CARACTERISTICAS */}
      <h3 className={styles.subtitulo}>Características Producto</h3>

      <table className={styles.tabla}>
        <tbody>
          <tr>
            <th>Sistema Operativo</th>
            <td>Windows 11</td>
          </tr>
          <tr>
            <th>Tarjeta Gráfica</th>
            <td>AMD Radeon</td>
          </tr>
          <tr>
            <th>Procesador</th>
            <td>Intel Core i5</td>
          </tr>
          <tr>
            <th>Almacenamiento</th>
            <td>1 TB</td>
          </tr>
        </tbody>
      </table>

      {/* IMÁGENES PRODUCTO */}
      <h3 className={styles.subtitulo}>Imágenes Producto</h3>

      <div className={styles.extraImages}>
        <img src={product.image} />
  
      </div>

      {/* RESEÑAS */}
      <h3 className={styles.subtitulo}>Reseñas</h3>

      <div className={styles.reviews}>
        <span>Comentarios</span>
        <span>Valoraciones</span>
      </div>
    </div>
  );
}