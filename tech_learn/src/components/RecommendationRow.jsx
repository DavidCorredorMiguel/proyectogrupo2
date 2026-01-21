import { useRef } from "react";
import ProductCard from "./ProductCard";

const RecommendationRow = ({ title, products }) => {
  const rowRef = useRef(null);

  const scrollLeft = () => {
    rowRef.current.scrollBy({ left: -320, behavior: "smooth" });
  };

  const scrollRight = () => {
    rowRef.current.scrollBy({ left: 320, behavior: "smooth" });
  };

  return (
    <section className="mt-8 relative">
      <h4 className="text-xl font-semibold mb-4">{title}</h4>

      {/* Contenedor con flechas */}
      <div className="relative">
        {/* FLECHA IZQUIERDA */}
        <button
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 z-10
            w-10 h-10 bg-white rounded-full shadow-lg
            flex items-center justify-center
            hover:bg-gray-100 transition-colors"
          aria-label="Anterior"
        >
          ◀
        </button>

        {/* FLECHA DERECHA */}
        <button
          onClick={scrollRight}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 z-10
            w-10 h-10 bg-white rounded-full shadow-lg
            flex items-center justify-center
            hover:bg-gray-100 transition-colors"
          aria-label="Siguiente"
        >
          ▶
        </button>

        {/* CONTENEDOR SCROLL */}
        <div
          ref={rowRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide px-6 py-2"
          style={{ scrollBehavior: "smooth" }}
        >
          {products.map((product) => (
            <div key={product.id} className="min-w-[260px] flex-shrink-0">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecommendationRow;