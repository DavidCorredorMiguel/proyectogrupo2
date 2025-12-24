import { useState } from "react";
import PropTypes from 'prop-types';
import { mockProducts } from '../mocks/products';
import ProductCard from "./ProductCard";
import { addProductToCart } from "../mocks/cartService";

const ProductList = ({ products }) => {
  // eslint-disable-next-line no-unused-vars
  const [cart, setCart] = useState([]);
  
  const displayProducts = products || mockProducts;

  const handleAddToCart = (product) => {
    const updated = addProductToCart(product);
    setCart(updated);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {displayProducts.map(product => (
        <div key={product.id}>
          <ProductCard product={product} onAddToCart={handleAddToCart} />
        </div>
      ))}
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