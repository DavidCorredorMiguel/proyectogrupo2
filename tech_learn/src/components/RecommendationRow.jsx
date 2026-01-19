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
    <section className="mt-5 relative max-w-6xl mx-auto">
      {/* TÍTULO */}
      <h4 className="mb-3">{title}</h4>

      {/* FLECHA IZQUIERDA */}
      <button
        onClick={scrollLeft}
        className="position-absolute top-50 translate-middle-y btn btn-light rounded-circle shadow"
        style={{ left: "-18px", zIndex: 10 }}
      >
        ◀
      </button>
      {/* FLECHA DERECHA */}
      <button
        onClick={scrollRight}
        className="position-absolute top-50 translate-middle-y btn btn-light rounded-circle shadow"
        style={{ right: "-18px", zIndex: 10 }}
      >
        ▶
      </button>

      <div className="mx-auto w-fit relative px-4">
        {/* CONTENEDOR SCROLL */}
        <div
          ref={rowRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide"
          style={{ scrollBehavior: "smooth" }}
        >
          {products.map((product) => (
            <div key={product.id} style={{ minWidth: "260px", flexShrink: 0 }}>
              <ProductCard
                product={product}
                //hideAddToCart={true} se puede usar si no queremos mostrar el botón de añadir al carrito
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default RecommendationRow;
