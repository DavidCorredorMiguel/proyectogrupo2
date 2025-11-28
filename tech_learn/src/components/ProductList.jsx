import { mockProducts } from '../mocks/products';
import ProductCard from './ProductCard';

const ProductList = () => {
  return (
    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
      {mockProducts.map((product) => (
        <div key={product.id} className="col">
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
};

export default ProductList;