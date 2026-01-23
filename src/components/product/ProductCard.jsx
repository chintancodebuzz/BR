import { Heart, ShoppingCart, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../slices/cartSlice";
import { addToWishlist, removeFromWishlist } from "../../slices/wishlistSlice";
import { useToast } from "../../contexts/ToastContext";

export default function ProductCard({ product, viewMode = 'grid' }) {
    const dispatch = useDispatch();
    const toast = useToast();
    const { items: wishlistItems } = useSelector((state) => state.wishlist);

    const productId = product.id || product._id;
    const name = product.name || product.title;
    const sellingPrice = product.selling_price || product.price || product.salePrice || 0;
    const originalPrice = product.origional_price || product.originalPrice;
    const displayImage = (product.images && product.images.length > 0) ? product.images[0] : (product.image || '/placeholder.jpg');
    const discount = product.discount || (originalPrice > sellingPrice ? Math.round(((originalPrice - sellingPrice) / originalPrice) * 100) : null);

    const isInWishlist = wishlistItems.some(item =>
        (item.product?.id || item.product?._id || item.id || item._id) === productId
    );

    const handleWishlist = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        try {
            if (isInWishlist) {
                const wishlistItem = wishlistItems.find(item =>
                    (item.product?.id || item.product?._id || item.id || item._id) === productId
                );
                if (wishlistItem) {
                    await dispatch(removeFromWishlist(wishlistItem._id || wishlistItem.id)).unwrap();
                    toast.info("Removed from wishlist");
                }
            } else {
                await dispatch(addToWishlist(productId)).unwrap();
                toast.success("Added to wishlist");
            }
        } catch (error) {
            toast.error(error?.message || "Failed to update wishlist");
        }
    };

    const handleAddToCart = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        try {
            await dispatch(addToCart(productId)).unwrap();
            toast.success("Added to cart");
        } catch (error) {
            toast.error(error?.message || "Failed to add to cart");
        }
    };

    const isGridView = viewMode === 'grid';

    if (!isGridView) {
        return (
            <div className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-300 group">
                <div className="flex flex-col sm:flex-row">
                    <div className="relative sm:w-48 h-48 sm:h-auto overflow-hidden bg-gray-50">
                        <img
                            src={displayImage}
                            alt={name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        {discount && (
                            <span className="absolute top-2 left-2 bg-[#501F08] text-white px-2 py-0.5 rounded text-[10px] font-bold">
                                {discount}% OFF
                            </span>
                        )}
                    </div>

                    <div className="flex-1 p-5 flex flex-col justify-between">
                        <div>
                            <div className="flex items-start justify-between mb-2">
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#501F08] transition-colors line-clamp-1">
                                        {name}
                                    </h3>
                                    <p className="text-xs text-[#A87453] font-medium uppercase">
                                        {product.collectionTitle || product.category || 'Luxury Collection'}
                                    </p>
                                </div>
                                <button
                                    onClick={handleWishlist}
                                    className="p-2 rounded-full hover:bg-red-50 transition-colors"
                                >
                                    <Heart
                                        className={`w-5 h-5 transition-colors ${isInWishlist ? 'fill-red-500 text-red-500' : 'text-gray-300'}`}
                                    />
                                </button>
                            </div>

                            <p className="text-gray-500 text-sm mb-4 line-clamp-2" dangerouslySetInnerHTML={{ __html: product.description }} />

                            <div className="flex items-baseline gap-2 mb-4">
                                <span className="text-xl font-bold text-[#501F08]">
                                    ₹{sellingPrice.toLocaleString()}
                                </span>
                                {originalPrice && originalPrice > sellingPrice && (
                                    <span className="text-sm text-gray-400 line-through">
                                        ₹{originalPrice.toLocaleString()}
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="flex gap-2">
                            <button
                                onClick={handleAddToCart}
                                className="flex-1 bg-[#501F08] text-white py-2.5 px-4 rounded-lg font-bold text-xs hover:bg-[#3a1606] transition-all flex items-center justify-center gap-2 uppercase "
                            >
                                <ShoppingCart className="w-4 h-4" />
                                Add to Cart
                            </button>
                            <Link
                                to={`/products/${productId}`}
                                className="p-2.5 border border-[#501F08] text-[#501F08] rounded-lg hover:bg-[#501F08] hover:text-white transition-all"
                            >
                                <Eye className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Grid View - Small & Standard
    return (
        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-300 group flex flex-col h-full">
            <div className="relative aspect-square overflow-hidden bg-gray-50">
                <img
                    src={displayImage}
                    alt={name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />

                {discount && (
                    <div className="absolute top-2 left-2 z-10">
                        <span className="bg-[#501F08] text-white px-2 py-0.5 rounded text-[10px] font-bold">
                            {discount}% OFF
                        </span>
                    </div>
                )}

                <button
                    onClick={handleWishlist}
                    className={`absolute top-2 right-2 z-10 p-2 bg-white rounded-full shadow-sm transition-opacity duration-300 ${isInWishlist ? 'opacity-100' : 'opacity-0 group-hover:opacity-100 hover:bg-gray-50'}`}
                >
                    <Heart
                        className={`w-4 h-4 transition-colors ${isInWishlist ? 'fill-red-500 text-red-500' : 'text-gray-300'}`}
                    />
                </button>

                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Link
                        to={`/products/${productId}`}
                        className="bg-white text-[#501F08] py-2 px-4 rounded-lg font-bold text-[10px] tracking-widest hover:bg-[#501F08] hover:text-white transition-all shadow-md uppercase"
                    >
                        View Details
                    </Link>
                </div>
            </div>

            <div className="p-4 flex flex-col flex-1">
                <div className="flex-1">
                    <p className="text-[10px] font-bold text-[#A87453] uppercase mb-1 opacity-70">
                        {product.collectionTitle || product.category || 'Luxury Collection'}
                    </p>
                    <h3 className="text-sm font-bold text-gray-900 mb-2 group-hover:text-[#501F08] transition-colors line-clamp-2">
                        {name}
                    </h3>

                    <div className="flex items-center gap-2 mb-4">
                        <span className="text-lg font-bold text-[#501F08]">
                            ₹{sellingPrice.toLocaleString()}
                        </span>
                        {originalPrice && originalPrice > sellingPrice && (
                            <span className="text-xs text-gray-400 line-through opacity-60">
                                ₹{originalPrice.toLocaleString()}
                            </span>
                        )}
                    </div>
                </div>

                <button
                    onClick={handleAddToCart}
                    className="w-full bg-[#501F08]/5 text-[#501F08] hover:bg-[#501F08] hover:text-white py-2.5 px-4 rounded-lg font-bold text-[10px] tracking-widest transition-all flex items-center justify-center gap-2 uppercase"
                >
                    <ShoppingCart className="w-3.5 h-3.5" />
                    Add to Cart
                </button>
            </div>
        </div>
    );
}
