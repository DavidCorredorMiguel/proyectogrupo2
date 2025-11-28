import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';

const ProductCard = ({ product }) => {
  return (
    <div className="card h-100 hover:shadow-lg transition-all">
      <img 
        src={product.image} 
        alt={product.name} 
        className="card-img-top object-cover"
        style={{ height: '200px' }}
      />
      <div className="card-body d-flex flex-column">
        <span className="badge bg-secondary mb-2 w-fit">{product.category}</span>
        <h5 className="card-title font-semibold">{product.name}</h5>
        <p className="card-text text-gray-600 text-sm flex-grow-1">{product.description}</p>
        <div className="d-flex justify-content-between align-items-center mt-3">
          <span className="text-xl font-bold text-primary">{product.price}€</span>
          <button className="btn btn-primary hover:scale-105 transition-all">
            <FontAwesomeIcon icon={faCartPlus} className="me-2" />
            Añadir
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;