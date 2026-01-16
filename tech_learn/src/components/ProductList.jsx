import { useState, useEffect } from "react";
import PropTypes from "prop-types";

import { mockProducts } from "../mocks/products";
import ProductCard from "./ProductCard";
import { addProductToCart } from "../mocks/cartService";
import RecommendationRow from "./RecommendationRow";

const ProductList = ({ products }) => {
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

  return (
    <div className="space-y-10">
      {/* GRID PRINCIPAL */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div><br />
      {/* PAGINACIÓN */}
      <div className="flex justify-center items-center gap-4">
        <button onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1} className="px-4 py-2 bg-orange-500 rounded">
            ⬅ Anterior</button>
        <span>Página {currentPage}</span>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={indexOfLastProduct >= displayProducts.length}
          className="px-4 py-2 bg-orange-500 rounded">
          Siguiente ➡</button>
      </div>
      {/* MÁS VISTOS */}
      {mostViewedProducts.length > 0 && (
        <RecommendationRow
          title="🔥 Los más vistos"
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
      description: PropTypes.string,
    })
  ),
};

export default ProductList;
