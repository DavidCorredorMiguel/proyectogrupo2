const REVIEWS_KEY = "reviews";

// inicializar (solo una vez)
export const initReviews = (mockReviews) => {
  if (!localStorage.getItem(REVIEWS_KEY)) {
    localStorage.setItem(REVIEWS_KEY, JSON.stringify(mockReviews));
  }
};

// obtener reviews de un producto
export const getReviewsByProduct = (productId) => {
  const reviews = JSON.parse(localStorage.getItem(REVIEWS_KEY)) || [];
  return reviews.filter(r => r.productId === productId);
};

// añadir review
export const addReview = (productId, rating, comment, userId) => {
  const reviews = JSON.parse(localStorage.getItem(REVIEWS_KEY)) || [];

  const newReview = {
    id: Date.now(),
    productId,
    userId,
    rating,
    comment,
    date: new Date().toISOString().split("T")[0],
  };

  localStorage.setItem(
    REVIEWS_KEY,
    JSON.stringify([...reviews, newReview])
  );

  return newReview;
};
