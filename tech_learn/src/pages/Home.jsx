import { useState } from "react";
import { mockProducts } from "../mocks/products";
import ProductList from "../components/ProductList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThLarge, faList } from "@fortawesome/free-solid-svg-icons";
import "../styles/Home.css";
const Home = () => {
  const [viewMode, setViewMode] = useState("grid");

  const destacados = [...mockProducts].sort((a, b) => b.rating - a.rating).slice(0, 6);
  return (
    <main className="home">
      <section className="home-hero">
        <h1 className="home-hero-title">Bienvenido a Tech-learn</h1>
        <p className="home-hero-subtitle">Los mejores productos al mejor precio</p>
      </section>
      <section className="home-featured">
        <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
          <h2 className="home-featured-title">Productos destacados</h2>
          {/* Selector de vista con los mismos estilos que Productos */}
          <div className="flex gap-2">
            <button onClick={() => setViewMode("grid")}
              className={`px-4 py-2 rounded-lg transition-all ${viewMode === "grid"
                  ? "bg-teal-600 text-white shadow-md"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`} aria-label="Vista de cuadrícula">
              <FontAwesomeIcon icon={faThLarge} className="mr-2" />Cuadrícula
            </button>
            <button onClick={() => setViewMode("list")}
              className={`px-4 py-2 rounded-lg transition-all ${viewMode === "list"
                  ? "bg-teal-600 text-white shadow-md"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`} aria-label="Vista de lista">
              <FontAwesomeIcon icon={faList} className="mr-2" />Lista
            </button>
          </div>
        </div>
        <ProductList showSorting={false} products={destacados}
          showPagination={false} showFilters={false} viewMode={viewMode} />
      </section>
    </main>
  );
};

export default Home;