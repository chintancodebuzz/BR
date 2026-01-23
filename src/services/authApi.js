// authApi.js
import api from "./axios";

// Auth endpoints - remove config parameter since axios handles it
export const registerUser = (data) => api.post("/auth/create-profile", data);
export const verifyEmail = (data) => api.post("/auth/email-verify", data);
export const resendOtp = (data) => api.post("/auth/resendOtp", data);
export const verifyOTP = (data) => api.post("/auth/otpVerification", data);
export const loginUser = (data) => api.post("/auth/login", data);
export const forgotPassword = (data) => api.post("/auth/forgetPassword", data);
export const resetPassword = (data) => api.post("/auth/reset-password", data);
export const logoutUser = () => api.get("/auth/logout");

// User endpoints
export const getUserProfile = () => api.get("/auth/getProfile");
export const updateUserProfile = (data) => {
  const isFormData =
    typeof FormData !== "undefined" && data instanceof FormData;

  // When sending FormData (binary upload), let axios set the boundary.
  // We still override the default JSON content-type from the axios instance.
  if (isFormData) {
    return api.put("/auth/editProfile", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  }

  return api.put("/auth/editProfile", data);
};
export const changePassword = (data) => api.put("/auth/passwordReset", data);
export const deleteAccount = () => api.delete("/auth/account");

// Email verification
export const resendVerificationEmail = (data) =>
  api.post("/auth/resend-verification", data);

// Address endpoints
export const addAddress = (data) => api.post("/auth/address/add", data);
export const getAddressList = () => api.get("/auth/address/list");
export const editAddress = (id, data) => api.put(`/auth/address/edit/${id}`, data);
export const deleteAddress = (id) => api.delete(`/auth/address/delete/${id}`);
export const setDefaultAddress = (id) => api.put(`/auth/address/set-default/${id}`);
