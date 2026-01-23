import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as homeApi from "../services/homeApi";

export const fetchHeadlines = createAsyncThunk(
    "home/fetchHeadlines",
    async (_, { rejectWithValue }) => {
        try {
            const response = await homeApi.getHeadlines();
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const fetchCollections = createAsyncThunk(
    "home/fetchCollections",
    async (_, { rejectWithValue }) => {
        try {
            const response = await homeApi.getCollections();
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const fetchBanners = createAsyncThunk(
    "home/fetchBanners",
    async (_, { rejectWithValue }) => {
        try {
            const response = await homeApi.getBanners();
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const fetchProducts = createAsyncThunk(
    "home/fetchProducts",
    async (_, { rejectWithValue }) => {
        try {
            const response = await homeApi.getProducts();
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const fetchReels = createAsyncThunk(
    "home/fetchReels",
    async (_, { rejectWithValue }) => {
        try {
            const response = await homeApi.getReels();
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

const initialState = {
    headlines: [],
    collections: [],
    banners: [],
    products: [],
    reels: [],
    loading: {
        headlines: false,
        collections: false,
        banners: false,
        products: false,
        reels: false,
    },
    error: {
        headlines: null,
        collections: null,
        banners: null,
        products: null,
        reels: null,
    },
};

const homeSlice = createSlice({
    name: "home",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // Headlines
        builder
            .addCase(fetchHeadlines.pending, (state) => {
                state.loading.headlines = true;
                state.error.headlines = null;
            })
            .addCase(fetchHeadlines.fulfilled, (state, action) => {
                state.loading.headlines = false;
                state.headlines = action.payload.data;
            })
            .addCase(fetchHeadlines.rejected, (state, action) => {
                state.loading.headlines = false;
                state.error.headlines = action.payload;
            });

        // Collections
        builder
            .addCase(fetchCollections.pending, (state) => {
                state.loading.collections = true;
                state.error.collections = null;
            })
            .addCase(fetchCollections.fulfilled, (state, action) => {
                state.loading.collections = false;
                state.collections = action.payload.data;
            })
            .addCase(fetchCollections.rejected, (state, action) => {
                state.loading.collections = false;
                state.error.collections = action.payload;
            });

        // Banners
        builder
            .addCase(fetchBanners.pending, (state) => {
                state.loading.banners = true;
                state.error.banners = null;
            })
            .addCase(fetchBanners.fulfilled, (state, action) => {
                state.loading.banners = false;
                state.banners = action.payload.data;
            })
            .addCase(fetchBanners.rejected, (state, action) => {
                state.loading.banners = false;
                state.error.banners = action.payload;
            });

        // Products
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading.products = true;
                state.error.products = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading.products = false;
                state.products = action.payload.data;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading.products = false;
                state.error.products = action.payload;
            });

        // Reels
        builder
            .addCase(fetchReels.pending, (state) => {
                state.loading.reels = true;
                state.error.reels = null;
            })
            .addCase(fetchReels.fulfilled, (state, action) => {
                state.loading.reels = false;
                state.reels = action.payload.data;
            })
            .addCase(fetchReels.rejected, (state, action) => {
                state.loading.reels = false;
                state.error.reels = action.payload;
            });
    },
});

export default homeSlice.reducer;
