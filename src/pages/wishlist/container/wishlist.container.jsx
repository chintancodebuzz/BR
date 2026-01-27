import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchWishlist, addToWishlist } from "../../../slices/wishlistSlice";
import { addToCart } from "../../../slices/cartSlice";
import WishlistView from "../view/wishlist.view";

const WishlistContainer = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { items, loading: storeLoading } = useSelector((state) => state.wishlist);
    const { user } = useSelector((state) => state.auth);
    useEffect(() => {
        if (user) {
            dispatch(fetchWishlist());
        }
    }, [dispatch, user]);

    const handleRemove = async (id) => {
        await dispatch(addToWishlist(id));
        dispatch(fetchWishlist());
    };

    const handleMoveToCart = async (productId, wishlistId) => {
        await dispatch(addToCart(productId));
        await dispatch(addToWishlist(productId));
        dispatch(fetchWishlist());
    };

    return (
        <WishlistView
            items={items}
            loading={storeLoading}
            user={user}
            handleRemove={handleRemove}
            handleMoveToCart={handleMoveToCart}
            navigate={navigate}
        />
    );
};

export default WishlistContainer;
