import { useState } from "react";
import { mockProducts } from "../mocks/products";
import ProductCard from "./ProductCard";
import { addProductToCart } from "../mocks/cartService";
import RecommendationRow from "./RecommendationRow";

const ProductList = () => {
  const [, setCart] = useState([]);

  const handleAddToCart = (product) => {
    const updated = addProductToCart(product);
    setCart(updated);
  };

  const audio = mockProducts.filter(p => p.category === "audio");
  const perifericos = mockProducts.filter(p => p.category === "perifericos");

  return (
    <div className="container">

      {/* GRID NORMAL DE PRODUCTOS */}
      <div className="row">
        {mockProducts.map(product => (
          <div className="col-md-4 mb-4" key={product.id}>
            <ProductCard
              product={product}
              onAddToCart={handleAddToCart}
            />
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

export default ProductList;
