import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { getFavorites, toggleFavorite } from "../mocks/favoritesService";
import { addProductToCart } from "../mocks/cartService";
import { mockProducts } from "../mocks/products";
import ProductCard from "../components/ProductCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus, faHeart, faThLarge, faList } from "@fortawesome/free-solid-svg-icons";

const getAverageRating = (reviews = []) => {
  if (!reviews.length) return 0;
  return reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
};

const Favoritos = () => {
  const { user, isLoggedIn } = useAuthStore();
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState("grid");
  const [favoriteProducts, setFavoriteProducts] = useState([]);

  // Asegurarse de que el userId sea consistente
  const userId = user?.id || "user123";

  const loadFavorites = () => {
    const favoriteIds = getFavorites(userId);
    console.log("Favoritos cargados:", favoriteIds); // Debug
    const products = favoriteIds
      .map((id) => mockProducts.find((p) => p.id === id))
      .filter(Boolean);
    
    setFavoriteProducts(products);
  };

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    loadFavorites();
  }, [isLoggedIn, navigate, userId]);

  const handleAddToCart = (product) => {
    addProductToCart(product);
  };

  const handleToggleFavorite = (productId) => {
    console.log("Toggle favorito:", productId, "Usuario:", userId); // Debug
    toggleFavorite(userId, productId);
    
    // Recargar favoritos
    setTimeout(() => loadFavorites(), 100);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header de la página */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
              <FontAwesomeIcon icon={faHeart} className="text-red-500" />
              Mis Favoritos
            </h1>
            <p className="text-gray-600 mt-2">
              {favoriteProducts.length} {favoriteProducts.length === 1 ? "producto" : "productos"} en tu lista de favoritos
            </p>
          </div>

          {/* Botones de vista */}
          {favoriteProducts.length > 0 && (
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode("grid")}
                className={`px-4 py-2 rounded-lg transition-all ${
                  viewMode === "grid"
                    ? "bg-teal-600 text-white shadow-md"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                <FontAwesomeIcon icon={faThLarge} className="mr-2" />
                Cuadrícula
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`px-4 py-2 rounded-lg transition-all ${
                  viewMode === "list"
                    ? "bg-teal-600 text-white shadow-md"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                <FontAwesomeIcon icon={faList} className="mr-2" />
                Lista
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Contenido */}
      {favoriteProducts.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <FontAwesomeIcon
            icon={faHeart}
            className="text-gray-300 text-6xl mb-4"
          />
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">
            No tienes favoritos aún
          </h2>
          <p className="text-gray-500 mb-6">
            Añade productos a tu lista de favoritos para verlos aquí
          </p>
          <button
            onClick={() => navigate("/productos")}
            className="bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition-all"
          >
            Explorar productos
          </button>
        </div>
      ) : viewMode === "list" ? (
        // Vista de lista
        <div className="grid grid-cols-1 gap-4">
          {favoriteProducts.map((product) => {
            const avgRating = getAverageRating(product.reviews);

            return (
              <div
                key={product.id}
                className="flex gap-4 bg-white rounded-lg shadow-md 
                overflow-hidden hover:shadow-lg transition-shadow relative"
              >
                {/* Botón de favoritos */}
                <button
                  onClick={() => handleToggleFavorite(product.id)}
                  className="absolute top-2 right-2 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-md hover:scale-110 transition-all"
                  aria-label="Quitar de favoritos"
                >
                  <FontAwesomeIcon
                    icon={faHeart}
                    className="text-xl text-red-500"
                  />
                </button>

                <img
                  src={product.image}
                  alt={product.name}
                  className="w-32 h-32 object-cover flex-shrink-0 cursor-pointer"
                  onClick={() => navigate(`/producto/${product.id}`)}
                />

                <div className="flex-1 p-4 flex flex-col justify-between">
                  <div>
                    <h3
                      className="text-black font-semibold cursor-pointer hover:text-teal-600"
                      onClick={() => navigate(`/producto/${product.id}`)}
                    >
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">
                      {product.category}
                    </p>
                  </div>

                  <div className="flex items-center text-sm text-yellow-500 mb-2">
                    {"★".repeat(Math.round(avgRating))}
                    {"☆".repeat(5 - Math.round(avgRating))}
                    <span className="ml-2 w-8 text-right text-gray-500">
                      {avgRating.toFixed(1)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <p className="text-xl font-bold text-blue-600">
                      {product.price}€
                    </p>
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="btn btn-primary px-4 py-2 bg-blue-500 text-white rounded-lg 
                      hover:bg-blue-600 transition-colors shadow-sm"
                    >
                      <FontAwesomeIcon icon={faCartPlus} className="me-2" />
                      Añadir
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        // Vista de cuadrícula
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {favoriteProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
              userId={userId}
              onFavoriteToggle={() => loadFavorites()}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favoritos;