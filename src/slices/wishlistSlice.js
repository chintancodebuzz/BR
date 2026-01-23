import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as wishlistApi from "../services/wishlistApi";

// Fetch wishlist
export const fetchWishlist = createAsyncThunk(
    "wishlist/fetchWishlist",
    async (_, { rejectWithValue }) => {
        try {
            const response = await wishlistApi.getWishlist();
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

// Add to wishlist
export const addToWishlist = createAsyncThunk(
    "wishlist/addToWishlist",
    async (productId, { rejectWithValue }) => {
        try {
            const response = await wishlistApi.addToWishlist(productId);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

// Remove from wishlist
export const removeFromWishlist = createAsyncThunk(
    "wishlist/removeFromWishlist",
    async (id, { rejectWithValue }) => {
        try {
            const response = await wishlistApi.removeFromWishlist(id);
            return { id, ...response.data };
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

const wishlistSlice = createSlice({
    name: "wishlist",
    initialState,
    reducers: {
        clearWishlist: (state) => {
            state.items = [];
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch wishlist
            .addCase(fetchWishlist.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchWishlist.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload.data || action.payload;
            })
            .addCase(fetchWishlist.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Add to wishlist
            .addCase(addToWishlist.pending, (state) => {
                state.loading = true;
            })
            .addCase(addToWishlist.fulfilled, (state, action) => {
                state.loading = false;
                // Add the new item if not already in wishlist
                const newItem = action.payload.data || action.payload;
                if (newItem && !state.items.find(item => item._id === newItem._id)) {
                    state.items.push(newItem);
                }
            })
            .addCase(addToWishlist.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Remove from wishlist
            .addCase(removeFromWishlist.pending, (state) => {
                state.loading = true;
            })
            .addCase(removeFromWishlist.fulfilled, (state, action) => {
                state.loading = false;
                state.items = state.items.filter(item => item._id !== action.payload.id);
            })
            .addCase(removeFromWishlist.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
