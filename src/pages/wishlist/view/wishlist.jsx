import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Heart, Trash2, ShoppingCart, ArrowRight } from "lucide-react";
import { fetchWishlist, removeFromWishlist } from "../../../slices/wishlistSlice";
import { addToCart } from "../../../slices/cartSlice";
import { ProductSkeleton } from "../../../components/common/Skeleton";

export default function Wishlist() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { items, loading } = useSelector((state) => state.wishlist);
    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
        if (user) {
            dispatch(fetchWishlist());
        }
    }, [dispatch, user]);

    const handleRemove = (id) => {
        dispatch(removeFromWishlist(id));
    };

    const handleMoveToCart = async (productId, wishlistId) => {
        await dispatch(addToCart(productId));
        dispatch(removeFromWishlist(wishlistId));
    };

    if (!user) {
        return (
            <div className="min-h-screen bg-[#FDFDFD] flex items-center justify-center px-6">
                <div className="text-center max-w-sm bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                    <Heart className="w-12 h-12 text-[#501F08]/20 mx-auto mb-6" />
                    <h2 className="text-2xl font-bold text-[#501F08] mb-2 uppercase">Login Required</h2>
                    <p className="text-gray-500 mb-8 text-sm italic">Please sign in to view your saved items.</p>
                    <button
                        onClick={() => navigate('/login')}
                        className="w-full py-3 bg-[#501F08] text-white rounded-xl font-bold text-xs tracking-widest hover:bg-[#3a1606] transition-all uppercase"
                    >
                        Login Now
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#FDFDFD]">
            <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
                <div className="mb-10">
                    <h1 className="text-3xl font-black text-[#501F08] uppercase tracking-tight mb-1">My Wishlist</h1>
                    <p className="text-xs font-bold text-[#A87453] uppercase  opacity-70">
                        {items.length} {items.length === 1 ? 'Item' : 'Items'} Saved
                    </p>
                </div>

                {loading ? (
                    <ProductSkeleton count={4} />
                ) : items.length === 0 ? (
                    <div className="text-center py-24 bg-white rounded-2xl border border-gray-50 flex flex-col items-center">
                        <Heart className="w-12 h-12 text-[#501F08]/20 mb-6" />
                        <h2 className="text-xl font-bold text-[#501F08] mb-2 uppercase">Wishlist Empty</h2>
                        <p className="text-gray-400 mb-8 text-sm italic">You haven't saved any masterpieces yet.</p>
                        <button
                            onClick={() => navigate('/products')}
                            className="px-8 py-3 bg-[#501F08] text-white rounded-xl font-bold text-xs tracking-widest hover:bg-[#3a1606] transition-all uppercase flex items-center gap-2"
                        >
                            Explore Collection
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {items.map((item) => (
                            <div
                                key={item._id || item.id}
                                className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-sm transition-all duration-300 group flex flex-col h-full"
                            >
                                <div className="relative aspect-square overflow-hidden bg-gray-50">
                                    <img
                                        src={item?.images?.[0] || item?.image || '/placeholder.jpg'}
                                        alt={item?.name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <button
                                        onClick={() => handleRemove(item._id || item.id)}
                                        className="absolute top-2 right-2 p-2 bg-white/90 rounded-full shadow-sm hover:bg-red-50 text-gray-400 hover:text-red-500 transition-all z-10"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>

                                <div className="p-4 flex flex-col flex-1">
                                    <p className="text-[10px] font-bold text-[#A87453] uppercase mb-1 opacity-70">
                                        {item?.collectionTitle || item?.category || 'Luxury Collection'}
                                    </p>
                                    <h3 className="text-sm font-bold text-gray-900 mb-2 line-clamp-2">
                                        {item?.name || item?.title}
                                    </h3>

                                    <div className="flex items-center gap-2 mb-4 mt-auto">
                                        <span className="text-lg font-bold text-[#501F08]">
                                            ₹{(item?.selling_price || item?.price || 0).toLocaleString()}
                                        </span>
                                        {(item?.origional_price || item?.originalPrice) > (item?.selling_price || item?.price) && (
                                            <span className="text-xs text-gray-400 line-through opacity-60">
                                                ₹{(item?.origional_price || item?.originalPrice).toLocaleString()}
                                            </span>
                                        )}
                                    </div>

                                    <button
                                        onClick={() => handleMoveToCart(item.id || item._id, item._id || item.id)}
                                        className="w-full bg-[#501F08]/5 text-[#501F08] hover:bg-[#501F08] hover:text-white py-2 px-4 rounded-lg font-bold text-[10px] tracking-widest transition-all flex items-center justify-center gap-2 uppercase"
                                    >
                                        <ShoppingCart className="w-3.5 h-3.5" />
                                        Move to Bag
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
