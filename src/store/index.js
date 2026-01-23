import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice";
import homeReducer from "../slices/homeSlice";
import productReducer from "../slices/productSlice";
import cartReducer from "../slices/cartSlice";
import wishlistReducer from "../slices/wishlistSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    home: homeReducer,
    product: productReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "auth/register/fulfilled",
          "auth/login/fulfilled",
          "auth/googleLogin/fulfilled",
          "auth/facebookLogin/fulfilled",
        ],
        ignoredActionPaths: ["payload.timestamp", "payload.expiresIn"],
        ignoredPaths: [
          "auth.user.createdAt",
          "auth.user.updatedAt",
          "auth.user.lastLogin",
          "product.products.createdAt",
          "product.products.updatedAt",
        ],
      },
    }),
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
