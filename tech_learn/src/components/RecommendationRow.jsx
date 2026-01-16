import { useRef } from "react"; 
import ProductCard from "./ProductCard";
//componente y sus props
const RecommendationRow = ({ title, products }) => {
  const rowRef = useRef(null); //referencia al contenedor scroll
  //funciones para scrollar a la izquierda y derecha
  const scrollLeft = () => {
    rowRef.current.scrollBy({ left: -320, behavior: "smooth" });
  };
  const scrollRight = () => {
    rowRef.current.scrollBy({ left: 320, behavior: "smooth" });
  };
  return (
    <section className="mt-5 position-relative">
      {/* TÍTULO */}
      <h4 className="mb-3">{title}</h4>
      {/* FLECHA IZQUIERDA */}
      <button onClick={scrollLeft}
        className="position-absolute z-50 top-50
          start-0 translate-middle-y btn btn-light
          rounded-circle shadow" style={{ zIndex: 10 }}>
        ◀</button>
      {/* FLECHA DERECHA */}
      <button onClick={scrollRight}
        className="position-absolute z-50 top-50
          end-0 translate-middle-y btn btn-light
          rounded-circle shadow" style={{ zIndex: 10 }}>
        ▶</button>
      {/* CONTENEDOR SCROLL */}
      <div ref={rowRef} className="d-flex gap-3 overflow-hidden px-5">
        {products.map(product => (
          <div key={product.id} style={{ minWidth: "260px" }}>
            <ProductCard product={product}
              //hideAddToCart={true} se puede usar si no queremos mostrar el botón de añadir al carrito
            />
          </div>
        ))}
      </div>
    </section>
  );
};
export default RecommendationRow;