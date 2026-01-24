import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as orderApi from "../services/orderApi";

export const fetchOrders = createAsyncThunk(
    "order/fetchOrders",
    async (_, { rejectWithValue }) => {
        try {
            const response = await orderApi.getOrderList();
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data || { message: "Failed to fetch orders" }
            );
        }
    }
);

export const cancelUserOrder = createAsyncThunk(
    "order/cancelOrder",
    async (id, { rejectWithValue, dispatch }) => {
        try {
            const response = await orderApi.cancelOrder(id);
            dispatch(fetchOrders());
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data || { message: "Failed to cancel order" }
            );
        }
    }
);

export const fetchOrderDetails = createAsyncThunk(
    "order/fetchOrderDetails",
    async (id, { rejectWithValue }) => {
        try {
            const response = await orderApi.getOrderDetails(id);
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data || { message: "Failed to fetch order details" }
            );
        }
    }
);

const initialState = {
    orders: [],
    orderDetails: null,
    loading: false,
    error: null,
    orderSuccess: false,
};

const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
        clearOrderState: (state) => {
            state.loading = false;
            state.error = null;
            state.orderSuccess = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchOrders.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchOrders.fulfilled, (state, action) => {
                state.loading = false;
                state.orders = action.payload.data || [];
            })
            .addCase(fetchOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(cancelUserOrder.pending, (state) => {
                state.loading = true;
            })
            .addCase(cancelUserOrder.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(cancelUserOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchOrderDetails.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.orderDetails = null;
            })
            .addCase(fetchOrderDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.orderDetails = action.payload.data || action.payload;
            })
            .addCase(fetchOrderDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { clearOrderState } = orderSlice.actions;
export default orderSlice.reducer;
