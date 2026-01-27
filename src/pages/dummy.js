import { useEffect } from "react";
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

    // Use useState from react but I need to make sure I don't break the imports if I use view_file
    // Wait, the previous file had useState in imports.

    // Actually, I'll use view_file to be precise.
    // I noticed I missed imports in my plan.

    return null; // Placeholder to avoid error before I get exact content
};
export default ProductDetailContainer;
