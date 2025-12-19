import { useSearchParams } from 'react-router-dom';
import { mockProducts } from '../mocks/products';
import ProductList from '../components/ProductList';

const normalize = (str) => {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
};

const Productos = () => {
  const [searchParams] = useSearchParams();
  
  const filtro = searchParams.get('filtro') || 'nombre';
  const query = searchParams.get('q') || '';

  const filteredProducts = mockProducts.filter((product) => {
    const searchNorm = normalize(query);
    
    switch (filtro) {
      case 'nombre':
        return normalize(product.name).includes(searchNorm);
      case 'categoria':
        return normalize(product.category).includes(searchNorm);
      default:
        return true;
    }
  });

  return (
    <div className="container py-4">
      <h1 className="text-2xl font-semibold mb-2">Resultados de búsqueda</h1>
      <p className="text-gray-600 mb-4">
        {filteredProducts.length} producto(s) encontrado(s) para "{query}" en {filtro}
      </p>
      
      {filteredProducts.length > 0 ? (
        <ProductList products={filteredProducts} />
      ) : (
        <p className="text-center text-gray-500 py-8">
          No se encontraron productos que coincidan con tu búsqueda.
        </p>
      )}
    </div>
  );
};

export default Productos;