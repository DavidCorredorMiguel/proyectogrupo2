// favoritesService.js
const STORAGE_KEY = "favoritos";

// Inicializa los favoritos desde localStorage
export const getFavorites = (userId) => {
  const saved = localStorage.getItem(STORAGE_KEY);
  const allFavorites = saved ? JSON.parse(saved) : {};
  return allFavorites[userId] || [];
};

const saveFavorites = (userId, favorites) => {
  const saved = localStorage.getItem(STORAGE_KEY);
  const allFavorites = saved ? JSON.parse(saved) : {};
  allFavorites[userId] = favorites;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(allFavorites));
};

// Agregar producto a favoritos (sin duplicados)
export const addProductToFavorites = (userId, productId) => {
  const favorites = getFavorites(userId);
  
  if (favorites.includes(productId)) {
    return favorites;
  }
  
  const updatedFavorites = [...favorites, productId];
  saveFavorites(userId, updatedFavorites);
  return updatedFavorites;
};

// Eliminar producto de favoritos
export const removeProductFromFavorites = (userId, productId) => {
  const favorites = getFavorites(userId);
  const updatedFavorites = favorites.filter((id) => id !== productId);
  saveFavorites(userId, updatedFavorites);
  return updatedFavorites;
};

// Toggle: agregar si no existe, eliminar si existe
export const toggleFavorite = (userId, productId) => {
  const favorites = getFavorites(userId);
  
  if (favorites.includes(productId)) {
    return removeProductFromFavorites(userId, productId);
  } else {
    return addProductToFavorites(userId, productId);
  }
};

// Verificar si un producto está en favoritos
export const isFavorite = (userId, productId) => {
  const favorites = getFavorites(userId);
  return favorites.includes(productId);
};

// Limpiar favoritos de un usuario
export const clearFavorites = (userId) => {
  saveFavorites(userId, []);
  return [];
};