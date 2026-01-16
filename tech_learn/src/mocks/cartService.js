const STORAGE_KEY = "cesta";
// Inicializa la cesta desde localStorage
export const getCart = () => {
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved ? JSON.parse(saved) : [];
};
const saveCart = (cart) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
};
// Agregar producto al carrito sin duplicados
export const addProductToCart = (product) => {
  const cart = getCart();
  const existing = cart.find((item) => item.id === product.id);
  let updatedCart;
  if (existing) {
    updatedCart = cart.map((item) =>
      item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
    );
  } else { updatedCart = [...cart, { ...product, quantity: 1 }]; }
  saveCart(updatedCart);
  return updatedCart;
};
// Cambiar cantidad
export const updateQuantity = (productId, quantity) => {
  let cart = getCart();
  const updatedCart = cart
    .map((item) => (item.id === productId ? { ...item, quantity } : item))
    .filter((item) => item.quantity > 0);
  saveCart(updatedCart);
  return updatedCart;
};
// Eliminar producto
export const removeProduct = (productId) => {
  let cart = getCart();
  const updatedCart = cart.filter((item) => item.id !== productId);
  saveCart(updatedCart);
  return updatedCart;
};