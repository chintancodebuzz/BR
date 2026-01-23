import api from "./axios";

// Cart APIs
export const addToCart = (productId) => api.post("/cart/add", { productId });
export const getCart = () => api.get("/cart");
export const removeFromCart = (id) => api.delete(`/cart/delete/${id}`);
