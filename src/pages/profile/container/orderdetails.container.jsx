import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import OrderDetailsView from "../view/orderdetails.view";
import { fetchOrderDetails } from "../../../slices/orderSlice";
import { fetchAddresses } from "../../../slices/authSlice";

const OrderDetailsContainer = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { orderDetails: order, loading: orderLoading } = useSelector(
        (state) => state.order,
    );
    const { user, addresses } = useSelector((state) => state.auth);

    useEffect(() => {
        if (id) {
            dispatch(fetchOrderDetails(id));
            if (addresses.length === 0) {
                dispatch(fetchAddresses());
            }
        }
    }, [dispatch, id, addresses.length]);

    const getStatusColor = (status) => {
        switch (status) {
            case "Pending":
                return "bg-amber-50 text-amber-600 border-amber-100";
            case "Shipped":
                return "bg-sky-50 text-sky-600 border-sky-100";
            case "Delivered":
                return "bg-emerald-50 text-emerald-600 border-emerald-100";
            case "Canclled":
            case "Rejected":
                return "bg-rose-50 text-rose-600 border-rose-100";
            default:
                return "bg-slate-50 text-slate-500 border-slate-100";
        }
    };

    const products = order?.products || [];
    const summary = order?.orderSummery || {};

    const shippingAddr =
        addresses.find((a) => a.id === order?.userAddressId) || addresses[0];

    return (
        <OrderDetailsView
            order={order}
            orderLoading={orderLoading}
            getStatusColor={getStatusColor}
            products={products}
            summary={summary}
            shippingAddr={shippingAddr}
            user={user}
            navigate={navigate}
        />
    );
};

export default OrderDetailsContainer;
