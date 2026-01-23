import api from "./axios";

export const getProducts = () => api.get("/products");

export const getProductById = (id) => api.get(`/product/${id}`);

export const createProduct = (data) => api.post("/products", data);
