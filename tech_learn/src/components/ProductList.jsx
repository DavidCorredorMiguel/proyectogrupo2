import { useState, useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import { mockProducts } from "../mocks/products";
import ProductCard from "./ProductCard";
import { addProductToCart } from "../mocks/cartService";
import RecommendationRow from "./RecommendationRow";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";

const ProductList = ({
  products,
  viewMode = "grid",
  showPagination = true,
}) => {
  const [cart, setCart] = useState([]);
  const [topViewedIds, setTopViewedIds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;

  const [priceRange, setPriceRange] = useState({ min: 0, max: Infinity });
  const [customMin, setCustomMin] = useState("");
  const [customMax, setCustomMax] = useState("");

  useEffect(() => {
    fetch("http://localhost:3001/products/most-viewed")
      .then((r) => r.json())
      .then((data) => {
        setTopViewedIds(data.map((x) => x.id));
      })
      .catch(() => {});
  }, []);

  const getAvgRating = (product) =>
    product.reviews?.length
      ? product.reviews.reduce((s, r) => s + r.rating, 0) /
        product.reviews.length
      : 0;

  const mostViewedProducts = topViewedIds
    .map((id) => mockProducts.find((p) => p.id === id))
    .filter(Boolean)
    .slice(0, 6);

  const displayProducts = products || mockProducts;

  const maxPrice = useMemo(() => {
    return Math.max(...displayProducts.map((p) => p.price));
  }, [displayProducts]);

  const priceRanges = [
    { label: "Todos los precios", min: 0, max: Infinity },
    { label: "Hasta 50€", min: 0, max: 50 },
    { label: "50€ - 100€", min: 50, max: 100 },
    { label: "100€ - 200€", min: 100, max: 200 },
    { label: "200€ - 500€", min: 200, max: 500 },
    { label: "Más de 500€", min: 500, max: Infinity },
  ];

  const filteredProducts = useMemo(() => {
    return displayProducts.filter(
      (p) => p.price >= priceRange.min && p.price <= priceRange.max
    );
  }, [displayProducts, priceRange]);

  useEffect(() => {
    setCurrentPage(1);
  }, [priceRange]);

  const handleAddToCart = (product) => {
    const updated = addProductToCart(product);
    setCart(updated);
  };

  const handlePriceRangeClick = (min, max) => {
    setPriceRange({ min, max });
    setCustomMin("");
    setCustomMax("");
  };

  const handleCustomPriceSubmit = (e) => {
    e.preventDefault();
    const min = customMin === "" ? 0 : Number(customMin);
    const max = customMax === "" ? Infinity : Number(customMax);
    setPriceRange({ min, max });
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const productsToRender = showPagination ? currentProducts : filteredProducts;
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  return (
    <div className="flex gap-6">
      {/* SIDEBAR FILTROS */}
      <aside className="w-64 flex-shrink-0">
        <div className="bg-white rounded-xl shadow-lg sticky top-4 border border-gray-100">
          {/* Header del filtro */}
          <div className="bg-gradient-to-r from-teal-600 to-teal-500 px-4 py-3 rounded-t-xl">
            <h3 className="font-bold text-white flex items-center gap-2">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                />
              </svg>
              Filtrar por precio
            </h3>
          </div>

          <div className="p-4">
            {/* Rangos predefinidos */}
            <ul className="space-y-1 mb-4">
              {priceRanges.map((range, index) => (
                <li key={index}>
                  <button
                    onClick={() => handlePriceRangeClick(range.min, range.max)}
                    className={`w-full text-left px-3 py-2.5 rounded-lg transition-all text-sm flex items-center gap-3
                      ${
                        priceRange.min === range.min &&
                        priceRange.max === range.max
                          ? "bg-teal-50 text-teal-700 font-semibold border-l-4 border-teal-600 shadow-sm"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 border-l-4 border-transparent"
                      }`}
                  >
                    <FontAwesomeIcon icon={faCartPlus} />
                    Añadir al carrito
                  </button>
                </li>
              ))}
            </ul>

            {/* Separador */}
            <div className="relative my-5">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="bg-white px-3 text-xs text-gray-400 uppercase tracking-wider">
                  o personaliza
                </span>
              </div>
            </div>

            {/* Rango personalizado */}
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
              <p className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                <svg
                  className="w-4 h-4 text-teal-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Rango personalizado
              </p>
              <form onSubmit={handleCustomPriceSubmit} className="space-y-3">
                <div className="flex gap-2 items-center">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      placeholder="0"
                      value={customMin}
                      onChange={(e) =>
                        setCustomMin(e.target.value.replace(/[^0-9]/g, ""))
                      }
                      className="w-full px-3 py-2.5 pr-8 border border-gray-200 rounded-lg text-sm
                        focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent
                        bg-white transition-all text-gray-800"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm pointer-events-none">
                      €
                    </span>
                  </div>
                  <span className="text-gray-400 font-medium">—</span>
                  <div className="relative flex-1">
                    <input
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      placeholder="∞"
                      value={customMax}
                      onChange={(e) =>
                        setCustomMax(e.target.value.replace(/[^0-9]/g, ""))
                      }
                      className="w-full px-3 py-2.5 pr-8 border border-gray-200 rounded-lg text-sm
                        focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent
                        bg-white transition-all text-gray-800"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm pointer-events-none">
                      €
                    </span>
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-teal-600 to-teal-500 text-white py-2.5 rounded-lg text-sm
                    font-semibold hover:from-teal-700 hover:to-teal-600 transition-all
                    shadow-md hover:shadow-lg active:scale-[0.98]"
                >
                  Aplicar filtro
                </button>
              </form>
            </div>

            {/* Info de productos filtrados */}
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600">Productos encontrados</p>
                <span className="bg-teal-100 text-teal-700 font-bold px-3 py-1 rounded-full text-sm">
                  {filteredProducts.length}
                </span>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* CONTENIDO PRINCIPAL */}
      <div className="flex-1 space-y-6">
        {/* GRID O LISTA */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <p className="text-gray-500 text-lg">
              No hay productos en este rango de precio
            </p>
            <button
              onClick={() => handlePriceRangeClick(0, Infinity)}
              className="mt-4 text-teal-600 hover:underline font-semibold"
            >
              Ver todos los productos
            </button>
          </div>
        ) : viewMode === "list" ? (
          <div className="grid grid-cols-1 gap-4">
            {productsToRender.map((product) => {
              const avgRating = getAvgRating(product);

              return (
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
                      <p className="text-sm text-black mb-2">
                        {product.category}
                      </p>
                    </div>

                    <div className="flex items-center text-sm text-yellow-500 mb-2">
                      {"★".repeat(Math.round(avgRating))}
                      {"☆".repeat(5 - Math.round(avgRating))}
                      <span className="ml-2 w-8 text-right text-gray-500">
                        {avgRating.toFixed(1)}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <p className="text-xl font-bold text-blue-600">
                        {product.price}€
                      </p>
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="btn btn-primary px-4 py-2 bg-blue-500 text-white rounded-lg 
              hover:bg-blue-600 transition-colors shadow-sm"
                      >
                        <FontAwesomeIcon icon={faCartPlus} className="me-2" />
                        Añadir
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
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

        {/* PAGINACIÓN */}
        {showPagination && filteredProducts.length > 0 && (
          <div className="flex justify-center items-center gap-4">
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-teal-600 text-white rounded disabled:opacity-50 
                disabled:cursor-not-allowed hover:bg-teal-700 transition-colors"
            >
              ⬅ Anterior
            </button>
            <span className="font-semibold">
              Página {currentPage} de {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={indexOfLastProduct >= filteredProducts.length}
              className="px-4 py-2 bg-teal-600 text-white rounded disabled:opacity-50 
                disabled:cursor-not-allowed hover:bg-teal-700 transition-colors"
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
      description: PropTypes.string,
    })
  ),
  viewMode: PropTypes.oneOf(["grid", "list"]),
  showPagination: PropTypes.bool,
};

export default ProductList;
