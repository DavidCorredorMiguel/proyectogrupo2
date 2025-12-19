import { useState } from "react";
import { mockProducts } from '../mocks/products';
import ProductCard from "./ProductCard";
import { addProductToCart } from "../mocks/cartService";

const ProductList = () => {
  const [setCart] = useState([]);

  const handleAddToCart = (product) => {
    const updated = addProductToCart(product);
    setCart(updated); // React detecta el cambio
  };

  return (
    <div className="row">
      {mockProducts.map(product => (
        <div className="col-md-4 mb-4" key={product.id}>
          <ProductCard product={product} onAddToCart={handleAddToCart} />
        </div>
      ))}
    </div>
  );
};

export default ProductList;