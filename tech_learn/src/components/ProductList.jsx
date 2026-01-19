import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { mockProducts } from "../mocks/products";
import ProductCard from "./ProductCard";
import { addProductToCart } from "../mocks/cartService";
import RecommendationRow from "./RecommendationRow";

const ProductList = ({
  products,
  viewMode = "grid",
  showPagination = true,
}) => {
  // Estado carrito (aunque no se use visualmente)
  // eslint-disable-next-line no-unused-vars
  const [cart, setCart] = useState([]);
  // Productos más vistos (backend)
  const [topViewedIds, setTopViewedIds] = useState([]);
  // Paginación
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;
  // Cargar productos más vistos GET
  useEffect(() => {
    fetch("http://localhost:3001/products/most-viewed")
      .then((r) => r.json())
      .then((data) => {
        setTopViewedIds(data.map((x) => x.id));
      })
      .catch(() => {});
  }, []);
  // Convertir IDs en productos reales
  const mostViewedProducts = topViewedIds
    .map((id) => mockProducts.find((p) => p.id === id))
    .filter(Boolean)
    .slice(0, 6);
  // Productos a mostrar en el grid
  const displayProducts = products || mockProducts;

  // Añadir al carrito
  const handleAddToCart = (product) => {
    const updated = addProductToCart(product);
    setCart(updated);
  };
  // Cálculo de paginación
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  const currentProducts = displayProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const productsToRender = showPagination ? currentProducts : displayProducts;

  return (
    <div className="space-y-10">
      {/* GRID O LISTA PRINCIPAL */}
      {viewMode === "list" ? (
        <div className="grid grid-cols-1 gap-4">
          {productsToRender.map((product) => (
            <div
              key={product.id}
              className="flex gap-4 bg-white rounded-lg shadow-md 
                overflow-hidden hover:shadow-lg transition-shadow"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-32 h-32 object-cover flex-shrink-0"
              />
              <div className="flex-1 p-4 flex flex-col justify-between">
                <div>
                  <h3 className="text-black">{product.name}</h3>
                  <p className="text-gray-700 text-sm mb-2">
                    {product.description}
                  </p>
                  <p className="text-sm text-blue-600 mb-2">
                    {product.category}
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-xl font-bold text-blue-600">
                    ${product.price}
                  </p>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg 
                      hover:bg-blue-600 transition-colors shadow-sm"
                  >
                    Añadir al carrito
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {productsToRender.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      )}
      <br />
      {/* PAGINACIÓN */}
      {showPagination && (
        <div className="flex justify-center items-center gap-4">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-orange-500 text-white rounded disabled:opacity-50 
            disabled:cursor-not-allowed hover:bg-orange-600 transition-colors"
          >
            ⬅ Anterior
          </button>
          <span className="font-semibold">Página {currentPage}</span>
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={indexOfLastProduct >= displayProducts.length}
            className="px-4 py-2 bg-orange-500 text-white rounded disabled:opacity-50 
          disabled:cursor-not-allowed hover:bg-orange-600 transition-colors"
          >
            Siguiente ➡
          </button>
        </div>
      )}
      {/* MÁS VISTOS */}
      {mostViewedProducts.length > 0 && (
        <RecommendationRow
          title=" Los más vistos"
          products={mostViewedProducts}
        />
      )}
    </div>
  );
};

ProductList.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      image: PropTypes.string,
      category: PropTypes.string,
      viewMode: PropTypes.oneOf(["grid", "list"]),
      showPagination: PropTypes.bool,
      description: PropTypes.string,
    })
  ),
  viewMode: PropTypes.oneOf(["grid", "list"]),
};

export default ProductList;
