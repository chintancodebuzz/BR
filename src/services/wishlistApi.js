import api from "./axios";

// Wishlist APIs
export const addToWishlist = (productId) => api.post("/wishlist/add", { productId });
export const getWishlist = () => api.get("/wishlist");
export const removeFromWishlist = (id) => api.delete(`/wishlist/delete/${id}`);
