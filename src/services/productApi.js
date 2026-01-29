import api from "./axios";

export const getProducts = (params) => api.get("/products", { params });

export const getProductById = (id) => api.get(`/product/${id}`);

export const createProduct = (data) => api.post("/products", data);
