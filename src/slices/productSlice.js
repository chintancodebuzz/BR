import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as productApi from "../services/productApi";

// Fetch all products with optional filters
export const fetchProducts = createAsyncThunk(
    "product/fetchProducts",
    async (filters = {}, { rejectWithValue }) => {
        try {
            const response = await productApi.getProducts(filters);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

// Fetch single product by ID
export const fetchProductDetail = createAsyncThunk(
    "product/fetchProductDetail",
    async (id, { rejectWithValue }) => {
        try {
            const response = await productApi.getProductById(id);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

const initialState = {
    products: [],
    filteredProducts: [],
    loading: false,
    selectedProduct: null,
    productLoading: false,
    error: null,

    // Filter states
    selectedCollection: null,
    selectedCategory: null,
    priceRange: { min: 0, max: 10000 },
    sortBy: 'newest', // newest, price-low, price-high, popular

    // View state
    viewMode: 'grid', // grid or list

    // Pagination
    currentPage: 1,
    itemsPerPage: 12,
    totalItems: 0,
};

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        setSelectedCollection: (state, action) => {
            state.selectedCollection = action.payload;
            state.currentPage = 1;
        },
        setSelectedCategory: (state, action) => {
            state.selectedCategory = action.payload;
            state.currentPage = 1;
        },
        setPriceRange: (state, action) => {
            state.priceRange = action.payload;
            state.currentPage = 1;
        },
        setSortBy: (state, action) => {
            state.sortBy = action.payload;
        },
        setViewMode: (state, action) => {
            state.viewMode = action.payload;
        },
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload;
        },
        clearFilters: (state) => {
            state.selectedCollection = null;
            state.selectedCategory = null;
            state.priceRange = { min: 0, max: 10000 };
            state.sortBy = 'newest';
            state.currentPage = 1;
        },
        clearSelectedProduct: (state) => {
            state.selectedProduct = null;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                const newProducts = action.payload.data || action.payload;

                if (state.currentPage === 1) {
                    state.products = newProducts;
                } else {
                    // Filter out duplicates just in case
                    const existingIds = new Set(state.products.map(p => p.id || p._id));
                    const uniqueNewProducts = newProducts.filter(p => !existingIds.has(p.id || p._id));
                    state.products = [...state.products, ...uniqueNewProducts];
                }

                state.filteredProducts = state.products;
                state.totalItems = action.payload.total || state.products.length;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Single Product Cases
            .addCase(fetchProductDetail.pending, (state) => {
                state.productLoading = true;
                state.error = null;
            })
            .addCase(fetchProductDetail.fulfilled, (state, action) => {
                state.productLoading = false;
                state.selectedProduct = action.payload.data || action.payload;
            })
            .addCase(fetchProductDetail.rejected, (state, action) => {
                state.productLoading = false;
                state.error = action.payload;
            });
    },
});

export const {
    setSelectedCollection,
    setSelectedCategory,
    setPriceRange,
    setSortBy,
    setViewMode,
    setCurrentPage,
    clearFilters,
    clearSelectedProduct,
} = productSlice.actions;

export default productSlice.reducer;
