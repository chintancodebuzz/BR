import api from "./axios";

// Cart APIs
export const addToCart = (productId) => api.post("/cart/add", { productId });
export const getCart = () => api.get("/cart");
export const removeFromCart = (id) => api.delete(`/cart/delete/${id}`);
export const updateCartQty = (cartId, productId, qty) => api.put(`/cart/qty`, { cartId, productId, qty });
