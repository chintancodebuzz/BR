import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
    fetchCart,
    removeFromCart,
    updateCartQty,
} from "../../../slices/cartSlice";
import CartView from "../view/cart.view";

const CartContainer = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { items, loading: storeLoading } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.auth);
    useEffect(() => {
        if (user) {
            dispatch(fetchCart());
        }
    }, [dispatch, user]);

    const handleRemove = async (id) => {
        await dispatch(removeFromCart(id));
    };

    const handleQuantityChange = (item, type) => {
        const increment = type === "inc" ? 1 : -1;
        const currentQty = item?.qty || 1;
        if (currentQty + increment < 1) return;

        dispatch(
            updateCartQty({
                cartId: item.cartId,
                productId: item._id || item.productId,
                qty: increment,
            }),
        );
    };

    const calculateTotal = () => {
        return items.reduce((total, item) => {
            const price = item?.selling_price || item?.price || item?.salePrice || 0;
            const quantity = item?.qty || 1;
            return total + price * quantity;
        }, 0);
    };

    return (
        <CartView
            items={items}
            loading={storeLoading}
            user={user}
            handleRemove={handleRemove}
            handleQuantityChange={handleQuantityChange}
            calculateTotal={calculateTotal}
            navigate={navigate}
        />
    );
};

export default CartContainer;
