import api from "./axios";

export const placeOrder = (data) => api.post("/order/place-order", data);
export const getOrderList = () => api.get("/order/list");
export const getOrderDetails = (id) => api.get(`/order/details/${id}`);
export const cancelOrder = (id) => api.put(`/order/cancel/${id}`);
