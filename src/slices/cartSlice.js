import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as cartApi from "../services/cartApi";

// Fetch cart
export const fetchCart = createAsyncThunk(
    "cart/fetchCart",
    async (_, { rejectWithValue }) => {
        try {
            const response = await cartApi.getCart();
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

// Add to cart
export const addToCart = createAsyncThunk(
    "cart/addToCart",
    async (productId, { rejectWithValue }) => {
        try {
            const response = await cartApi.addToCart(productId);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

// Remove from cart
export const removeFromCart = createAsyncThunk(
    "cart/removeFromCart",
    async (id, { rejectWithValue }) => {
        try {
            const response = await cartApi.removeFromCart(id);
            return { id, ...response.data };
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

// Update cart quantity
export const updateCartQty = createAsyncThunk(
    "cart/updateCartQty",
    async ({ cartId, productId, qty }, { rejectWithValue }) => {
        try {
            const response = await cartApi.updateCartQty(cartId, productId, qty);
            return { cartId, productId, qty, ...response.data };
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);


const initialState = {
    items: [],
    loading: false,
    error: null,
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        clearCart: (state) => {
            state.items = [];
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch cart
            .addCase(fetchCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCart.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload.data || action.payload;
            })
            .addCase(fetchCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Add to cart
            .addCase(addToCart.pending, (state) => {
                state.error = null;
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                state.loading = false;
                const newItem = action.payload.data || action.payload;
                if (newItem && !state.items.find(item => item._id === newItem._id)) {
                    state.items.push(newItem);
                }
            })

            .addCase(addToCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Remove from cart
            .addCase(removeFromCart.pending, (state) => {
                state.error = null;
            })
            .addCase(removeFromCart.fulfilled, (state, action) => {
                state.loading = false;
                state.items = state.items.filter(item => (item.cartId || item._id) !== action.payload.id);
            })
            .addCase(removeFromCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Update cart quantity
            .addCase(updateCartQty.pending, (state, action) => {
                const { cartId, productId, qty } = action.meta.arg;
                const itemIndex = state.items.findIndex(item =>
                    (item.cartId === cartId) || (item._id === productId) || (item.productId === productId)
                );

                if (itemIndex !== -1) {
                    state.items[itemIndex].qty = (state.items[itemIndex].qty || 1) + qty;
                }
            })
            .addCase(updateCartQty.rejected, (state, action) => {
                const { cartId, productId, qty } = action.meta.arg;
                const itemIndex = state.items.findIndex(item =>
                    (item.cartId === cartId) || (item._id === productId) || (item.productId === productId)
                );

                if (itemIndex !== -1) {
                    // Rollback
                    state.items[itemIndex].qty -= qty;
                }
                state.error = action.payload;
            })
            // Clear cart on logout
            .addCase("auth/logout/fulfilled", (state) => {
                state.items = [];
                state.loading = false;
                state.error = null;
            });
    },
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;
