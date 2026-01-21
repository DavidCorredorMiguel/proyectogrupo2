import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { mockProducts } from "../mocks/products";
import ProductList from "../components/ProductList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThLarge, faList } from "@fortawesome/free-solid-svg-icons";

const normalize = (str) => {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
};

const Productos = () => {
  const [searchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState("grid");
  const { user } = useAuthStore();

  const categoria = searchParams.get("categoria") || "todas";
  const query = searchParams.get("q") || "";

  const filteredProducts = mockProducts.filter((product) => {
    const searchNorm = normalize(query);
    const nameMatch = normalize(product.name).includes(searchNorm);

    if (categoria === "todas") {
      return nameMatch;
    }

    return nameMatch && product.category === categoria;
  });

  return (
    <div className="px-4 py-4 max-w-7xl mx-auto">
      <div className="flex flex-wrap justify-between items-center mb-4 gap-4">
<div>
  <h1 className="text-2xl font-semibold mb-2">
    {query ? "Resultados de búsqueda" : "Todos los productos"}
  </h1>
  <p className="text-gray-600">
    {filteredProducts.length} producto(s) encontrado(s)
    {query && ` para "${query}"`}
    {categoria !== "todas" && ` en ${categoria}`}
  </p>
</div>
        <div className="flex gap-2">
          <button
            onClick={() => setViewMode("grid")}
            className={`px-4 py-2 rounded-lg transition-all ${
              viewMode === "grid"
                ? "bg-teal-600 text-white shadow-md"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
            aria-label="Vista de cuadrícula"
          >
            <FontAwesomeIcon icon={faThLarge} className="mr-2" />
            Cuadrícula
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`px-4 py-2 rounded-lg transition-all ${
              viewMode === "list"
                ? "bg-teal-600 text-white shadow-md"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
            aria-label="Vista de lista"
          >
            <FontAwesomeIcon icon={faList} className="mr-2" />
            Lista
          </button>
        </div>
      </div>

      {filteredProducts.length > 0 ? (
        <ProductList
          products={filteredProducts}
          viewMode={viewMode}
          showPagination={true}
          showFilters={true}
          userId={user?.id || "user123"}
        />
      ) : (
        <p className="text-center text-gray-500 py-8">
          No se encontraron productos que coincidan con tu búsqueda.
        </p>
      )}
    </div>
  );
};

export default Productos;