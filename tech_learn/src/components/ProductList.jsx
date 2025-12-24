import { useState } from "react";
import PropTypes from 'prop-types';
import { mockProducts } from '../mocks/products';
import ProductCard from "./ProductCard";
import { addProductToCart } from "../mocks/cartService";
import RecommendationRow from "./RecommendationRow";

const ProductList = ({ products }) => {
  // eslint-disable-next-line no-unused-vars
  const [cart, setCart] = useState([]);

  const displayProducts = products || mockProducts;

  const handleAddToCart = (product) => {
    const updated = addProductToCart(product);
    setCart(updated);
  };

  const audio = mockProducts.filter(p => p.category === "audio");
  const perifericos = mockProducts.filter(p => p.category === "perifericos");

  return (
    <div className="space-y-10">

      {/* GRID PRINCIPAL */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {displayProducts.map(product => (
          <div key={product.id}>
            <ProductCard product={product} onAddToCart={handleAddToCart} />
          </div>
        ))}
      </div>
      {/* RECOMENDACIONES */}
      <RecommendationRow
        title="Recomendado para ti"
        products={mockProducts.slice(0, 6)}
      />

      {audio.length > 0 && (
        <RecommendationRow
          title="Audio"
          products={audio}
        />
      )}

      {perifericos.length > 0 && (
        <RecommendationRow
          title="Periféricos"
          products={perifericos}
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
