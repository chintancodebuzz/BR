import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import MyOrdersView from "../view/myorders.view";
import { cancelUserOrder, fetchOrders } from "../../../slices/orderSlice";

const MyOrdersContainer = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { orders, loading: storeLoading } = useSelector((state) => state.order);

    useEffect(() => {
        dispatch(fetchOrders());
    }, [dispatch]);

    const handleCancel = async (orderId) => {
        if (window.confirm("Are you sure you want to cancel this order?")) {
            await dispatch(cancelUserOrder(orderId));
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "Pending":
                return "bg-amber-100 text-amber-700 border-amber-200";
            case "Shipped":
                return "bg-sky-100 text-sky-700 border-sky-200";
            case "Delivered":
                return "bg-emerald-100 text-emerald-700 border-emerald-200";
            case "Canclled":
            case "Rejected":
                return "bg-rose-100 text-rose-700 border-rose-200";
            default:
                return "bg-slate-100 text-slate-700 border-slate-200";
        }
    };

    return (
        <MyOrdersView
            orders={orders}
            loading={storeLoading}
            handleCancel={handleCancel}
            getStatusColor={getStatusColor}
            navigate={navigate}
        />
    );
};

export default MyOrdersContainer;
