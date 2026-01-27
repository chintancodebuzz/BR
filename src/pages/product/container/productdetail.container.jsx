import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Truck, Shield, RefreshCw, Award } from "lucide-react";
import {
    fetchProductDetail,
    clearSelectedProduct,
} from "../../../slices/productSlice";
import { addToCart, fetchCart, updateCartQty } from "../../../slices/cartSlice";
import {
    addToWishlist,
    removeFromWishlist,
    fetchWishlist,
} from "../../../slices/wishlistSlice";
import ProductDetailView from "../view/productdetail.view";

const ProductDetailContainer = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {
        selectedProduct: product,
        productLoading: storeLoading,
        error,
    } = useSelector((state) => state.product);
    const { items: wishlistItems } = useSelector((state) => state.wishlist);
    const { items: cartItems } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.auth);

    const [activeImage, setActiveImage] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        if (id) {
            dispatch(fetchProductDetail(id));
            if (user) {
                dispatch(fetchCart());
                dispatch(fetchWishlist());
            }
        }
        return () => {
            dispatch(clearSelectedProduct());
        };
    }, [id, dispatch, user]);

    useEffect(() => {
        if (product?.images?.length > 0) {
            setActiveImage(0);
        }
    }, [product]);

    const productId = product?._id || product?.id;

    const isInWishlist = wishlistItems.some((item) => {
        const itemProductId =
            item.productId?._id ||
            item.productId ||
            item.product?._id ||
            item.product?.id ||
            item._id ||
            item.id;
        return itemProductId === productId;
    });

    const handleWishlist = async () => {
        if (!user) return navigate("/login");
        try {
            if (isInWishlist) {
                const wishlistItem = wishlistItems.find((item) => {
                    const itemProductId =
                        item.productId?._id ||
                        item.productId ||
                        item.product?._id ||
                        item.product?.id ||
                        item._id ||
                        item.id;
                    return itemProductId === productId;
                });

                const wishlistItemId =
                    wishlistItem?._id || wishlistItem?.wishlistId || wishlistItem?.id;

                if (wishlistItemId) {
                    await dispatch(removeFromWishlist(wishlistItemId)).unwrap();
                    await dispatch(fetchWishlist());
                }
            } else {
                await dispatch(addToWishlist(productId)).unwrap();
                await dispatch(fetchWishlist());
            }
        } catch (err) {
            console.error(err);
        }
    };

    const cartItem = cartItems?.find(
        (item) =>
            (item.productId?._id || item.productId) === productId ||
            item._id === productId,
    );

    const handleAddToCart = async () => {
        if (!user) return navigate("/login");
        try {
            await dispatch(addToCart({ productId, quantity })).unwrap();
            await dispatch(fetchCart());
        } catch (err) {
            console.error(err?.message || "Failed to add to cart");
        }
    };

    const handleQuantityChange = (type) => {
        if (type === "inc") {
            setQuantity(quantity + 1);
        } else if (type === "dec" && quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const handleUpdateCartQty = async (type) => {
        if (!cartItem) return;
        const increment = type === "inc" ? 1 : -1;
        if (cartItem.qty + increment < 1) return;

        try {
            await dispatch(
                updateCartQty({
                    cartId: cartItem.cartId,
                    productId:
                        cartItem.productId?._id || cartItem.productId || cartItem._id,
                    qty: increment,
                }),
            ).unwrap();
            await dispatch(fetchCart());
        } catch (err) {
            console.error(err?.message || "Failed to update quantity");
        }
    };

    const sellingPrice = product?.selling_price || product?.price || 0;
    const originalPrice = product?.origional_price || product?.originalPrice;
    const discount =
        product?.discount ||
        (originalPrice > sellingPrice
            ? Math.round(((originalPrice - sellingPrice) / originalPrice) * 100)
            : null);

    const features = [
        { icon: Truck, text: "Free Shipping", subtext: "On orders over ₹999" },
        { icon: Shield, text: "Authenticity", subtext: "100% Guaranteed" },
        { icon: RefreshCw, text: "Easy Returns", subtext: "30-Day Policy" },
        { icon: Award, text: "Premium Quality", subtext: "Craftsmanship" },
    ];

    return (
        <ProductDetailView
            product={product}
            loading={storeLoading}
            error={error}
            isInWishlist={isInWishlist}
            cartItem={cartItem}
            activeImage={activeImage}
            setActiveImage={setActiveImage}
            quantity={quantity}
            handleQuantityChange={handleQuantityChange}
            handleAddToCart={handleAddToCart}
            handleWishlist={handleWishlist}
            handleUpdateCartQty={handleUpdateCartQty}
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            sellingPrice={sellingPrice}
            originalPrice={originalPrice}
            discount={discount}
            features={features}
            navigate={navigate}
        />
    );
};

export default ProductDetailContainer;
