import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { mockProducts } from '../mocks/products';
import ProductList from '../components/ProductList';
const normalize = (str) => {
  return str.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
};
const Productos = () => {
  const [searchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState('grid'); // 'grid' o 'list'
  
  const categoria = searchParams.get('categoria') || 'todas';
  const query = searchParams.get('q') || '';

  const filteredProducts = mockProducts.filter((product) => {
    const searchNorm = normalize(query);
    const nameMatch = normalize(product.name).includes(searchNorm);
    if (categoria === 'todas') { return nameMatch; }
    return nameMatch && product.category === categoria;
  });
  return (
    <div className="container py-4">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-2xl font-semibold mb-2">Resultados de búsqueda</h1>
          <p className="text-gray-600">
            {filteredProducts.length} producto(s) encontrado(s) para "{query}"
            {categoria !== 'todas' && ` en ${categoria}`}
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setViewMode('grid')}
            className={`px-4 py-2 rounded-lg transition-colors font-semibold ${
              viewMode === 'grid' ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`} aria-label="Vista de cuadrícula">
            ⊞ Cuadrícula
          </button>
          <button onClick={() => setViewMode('list')}
            className={`px-4 py-2 rounded-lg transition-colors font-semibold ${
              viewMode === 'list' ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`} aria-label="Vista de lista">
            ☰ Lista
          </button>
        </div>
      </div>
      {filteredProducts.length > 0 ? (
        <ProductList products={filteredProducts} viewMode={viewMode} />
      ) : (
        <p className="text-center text-gray-500 py-8">
          No se encontraron productos que coincidan con tu búsqueda.
        </p>
      )}
    </div>
  );
};

export default Productos;