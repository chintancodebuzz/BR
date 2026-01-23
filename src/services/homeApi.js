import api from "./axios";

export const getHeadlines = () => api.get("/headlines");
export const getCollections = () => api.get("/collections");
export const getBanners = () => api.get("/banners");
export const getProducts = () => api.get("/products");
export const getReels = () => api.get("/reels");
