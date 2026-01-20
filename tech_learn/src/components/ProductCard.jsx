import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus, faHeart } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { toggleFavorite, isFavorite } from "../mocks/favoritesService";

const getAverageRating = (reviews = []) => {
  if (!reviews.length) return 0;
  return reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
};

const ProductCard = ({ product, onAddToCart, userId = "user123", onFavoriteToggle }) => {
  const avgRating = getAverageRating(product.reviews);
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    setIsFav(isFavorite(userId, product.id));
  }, [userId, product.id]);

  const handleToggleFavorite = (e) => {
    e.preventDefault();
    console.log("Toggling favorite:", product.id, "User:", userId); // Debug
    toggleFavorite(userId, product.id);
    setIsFav(!isFav);
    
    // Notificar al componente padre si existe el callback
    if (onFavoriteToggle) {
      onFavoriteToggle(product.id);
    }
  };

  return (
    <div className="h-full flex flex-col rounded-lg border border-gray-200 bg-white 
      shadow-sm hover:shadow-md transition relative">
      <button
        onClick={handleToggleFavorite}
        className="absolute top-2 right-2 z-10 w-10 h-10 flex items-center justify-center rounded-full 
          bg-white shadow-md hover:scale-110 transition-all"
        aria-label={isFav ? "Quitar de favoritos" : "Añadir a favoritos"}>
        <FontAwesomeIcon icon={faHeart}
          className={`text-xl ${isFav ? "text-red-500" : "text-gray-400"}`}/>
      </button>
      <Link to={`/producto/${product.id}`}>
        <img src={product.image} alt={product.name}
          className="h-48 w-full max-w-[220px] object-contain p-4 mx-auto" />
      </Link>
      <div className="flex flex-col flex-1 px-4 pb-4">
        <Link to={`/producto/${product.id}`} className="text-decoration-none text-dark">
          <h5 className="text-base font-semibold min-h-[48px] leading-tight">{product.name}</h5>
        </Link>
        {product.category && (
          <span className="text-sm text-gray-500 mb-1 min-h-[18px]">
            {product.category || "\u00A0"}
          </span>
        )}
        <div className="flex items-center text-sm text-yellow-500 mb-2">
          {"★".repeat(Math.round(avgRating))}
          {"☆".repeat(5 - Math.round(avgRating))}
          <span className="ml-2 w-8 text-right text-gray-500">
            {avgRating.toFixed(1)}
          </span>
        </div>

        <div className="mt-auto flex items-center justify-between">
          <span className="text-xl font-bold text-blue-600">
            {product.price}€
          </span>
          <button className="btn btn-primary hover:scale-105 transition-all"
            onClick={() => onAddToCart(product)}>
            <FontAwesomeIcon icon={faCartPlus} className="me-2" />
            Añadir
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;