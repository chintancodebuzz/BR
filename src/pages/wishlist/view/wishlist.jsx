import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Heart, Trash2, ShoppingCart, ArrowRight } from "lucide-react";
import { fetchWishlist, removeFromWishlist } from "../../../slices/wishlistSlice";
import { addToCart } from "../../../slices/cartSlice";

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
            <div className="min-h-screen bg-[#FDFDFD] flex items-center justify-center p-6 text-center">
                <div className="max-w-md w-full bg-white p-10 rounded-[32px] shadow-xl border border-gray-100">
                    <div className="w-20 h-20 bg-[#501F08]/5 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Heart className="w-10 h-10 text-[#501F08]" />
                    </div>
                    <h2 className="text-3xl font-black text-[#501F08] mb-4 uppercase tracking-tight">Login Required</h2>
                    <p className="text-gray-500 mb-8 font-medium">Please sign in to view your saved masterpieces.</p>
                    <button
                        onClick={() => navigate('/login')}
                        className="w-full py-4 bg-[#501F08] text-white rounded-2xl font-black text-xs tracking-[0.2em] hover:bg-[#3a1606] transition-all uppercase shadow-lg"
                    >
                        Login Now
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#FDFDFD] pb-24">
            <div className="mx-auto px-6 md:px-12 lg:px-24 py-12">
                <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-black text-[#501F08] mb-1">My Wishlist</h1>
                        <p className="text-sm font-bold text-[#A87453] opacity-60">
                            {items.length} {items.length === 1 ? 'Masterpiece' : 'Masterpieces'} curated
                        </p>
                    </div>
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="aspect-4/5 bg-white/50 rounded-[32px] border border-gray-100 animate-pulse" />
                        ))}
                    </div>
                ) : items.length === 0 ? (
                    <div className="text-center py-32 bg-white rounded-[40px] border border-gray-100 shadow-xl max-w-2xl mx-auto mt-12 flex flex-col items-center">
                        <div className="w-24 h-24 bg-[#501F08]/5 rounded-full flex items-center justify-center mb-8 animate-float">
                            <Heart className="w-10 h-10 text-[#501F08] opacity-30" />
                        </div>
                        <h2 className="text-3xl font-black text-[#501F08] mb-4 uppercase tracking-tight">Wishlist Empty</h2>
                        <p className="text-gray-500 mb-10 text-lg font-medium italic">Save items you love to find them easily here.</p>
                        <button
                            onClick={() => navigate('/products')}
                            className="px-12 py-4 bg-[#501F08] text-white rounded-2xl font-black text-xs tracking-[0.2em] hover:bg-[#3a1606] transition-all hover:shadow-2xl uppercase flex items-center gap-3 group"
                        >
                            Explore Collection
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {items.map((item) => (
                            <div
                                key={item._id || item.id}
                                className="group bg-white rounded-[32px] border border-gray-100 overflow-hidden hover:shadow-2xl hover:border-[#501F08]/10 transition-all duration-500 flex flex-col h-full relative"
                            >
                                <div className="relative aspect-4/3 overflow-hidden bg-gray-50">
                                    <img
                                        src={item?.images?.[0] || item?.image || '/placeholder.jpg'}
                                        alt={item?.name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                                    />
                                    <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                    <button
                                        onClick={() => handleRemove(item?.wishlistId)}
                                        className="absolute top-4 right-4 p-3 bg-white/90 backdrop-blur-md rounded-2xl shadow-xl text-red-400 hover:text-red-600 hover:scale-110 transition-all duration-300 z-10"
                                        title="Remove"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>

                                <div className="p-6 flex flex-col flex-1">
                                    <p className="text-[10px] font-black text-[#A87453] uppercase tracking-[0.3em] mb-2 opacity-70">
                                        {item?.collectionTitle || item?.category || 'Curated Luxury'}
                                    </p>
                                    <h3 className="text-base font-black text-[#1A1A1A] mb-3 line-clamp-2 leading-tight group-hover:text-[#501F08] transition-colors">
                                        {item?.name || item?.title}
                                    </h3>

                                    <div className="mt-auto">
                                        <div className="flex items-center gap-2 mb-5">
                                            <span className="text-xl font-black text-[#501F08]">
                                                ₹{(item?.selling_price || item?.price || 0).toLocaleString()}
                                            </span>
                                            {(item?.origional_price || item?.originalPrice) > (item?.selling_price || item?.price) && (
                                                <span className="text-xs font-bold text-gray-300 line-through">
                                                    ₹{(item?.origional_price || item?.originalPrice).toLocaleString()}
                                                </span>
                                            )}
                                        </div>

                                        <button
                                            onClick={() => handleMoveToCart(item.id, item?.wishlistId)}
                                            className="w-full bg-[#501F08] text-white py-4 px-4 rounded-2xl font-black text-[10px] tracking-[0.2em] hover:bg-[#3a1606] transition-all hover:shadow-xl flex items-center justify-center gap-3 uppercase group/btn"
                                        >
                                            <ShoppingCart size={16} className="group-hover/btn:scale-110 transition-transform" />
                                            Move to Cart
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
