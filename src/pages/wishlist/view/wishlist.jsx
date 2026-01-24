import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Heart, Trash2, ShoppingCart, ArrowRight } from "lucide-react";
import { fetchWishlist, removeFromWishlist, addToWishlist } from "../../../slices/wishlistSlice";
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


    const handleRemove = async (id) => {
        await dispatch(addToWishlist(id));
        dispatch(fetchWishlist());
    };

    const handleMoveToCart = async (productId, wishlistId) => {
        await dispatch(addToCart(productId));
        await dispatch(addToWishlist(productId));
        dispatch(fetchWishlist());
    };

    if (!user) {
        return (
            <div className="min-h-screen bg-[#FDFDFD] flex items-center justify-center p-6 text-center">
                <div className="max-w-md w-full bg-white p-10 rounded-[32px] shadow-xl border border-gray-100">
                    <div className="w-20 h-20 bg-[#501F08]/5 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Heart className="w-10 h-10 text-[#501F08]" />
                    </div>
                    <h2 className="text-3xl font-black text-[#501F08] mb-4 ">Login Required</h2>
                    <p className="text-gray-500 mb-8 font-medium">Please sign in to view your saved masterpieces.</p>
                    <button
                        onClick={() => navigate('/login')}
                        className="w-full relative group overflow-hidden bg-transparent border-2 border-[#501F08] text-[#501F08] py-4 rounded-2xl font-black text-xs tracking-[0.2em] transition-all duration-300 hover:text-white hover:shadow-lg uppercase shadow-none"
                    >
                        <div className="absolute inset-0 bg-[#501F08] transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                        <span className="relative z-10 block text-center">
                            Login Now
                        </span>
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-[#FDFDFD] pb-24">
            <div className="max-w-screen-2xl mx-auto px-6 md:px-12 py-12">
                <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-black text-[#501F08] mb-2 tracking-tight">My Wishlist</h1>
                        <p className="text-md font-bold text-[#A87453] opacity-60">
                            {items.length} {items.length === 1 ? 'Masterpiece' : 'Masterpieces'} curated
                        </p>
                    </div>
                </div>

                {loading ? (
                    <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-8">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="aspect-4/5 bg-white/50 rounded-[32px] border border-gray-100 animate-pulse" />
                        ))}
                    </div>
                ) : items.length === 0 ? (
                    <div className="text-center py-32 bg-white rounded-[40px] border border-gray-100 shadow-xl max-w-2xl mx-auto mt-12 flex flex-col items-center relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-[#501F08]/5 rounded-full -mr-32 -mt-32 blur-3xl opacity-50" />
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#A87453]/5 rounded-full -ml-32 -mb-32 blur-3xl opacity-50" />
                        <div className="w-24 h-24 bg-[#501F08]/5 rounded-full flex items-center justify-center mb-8 animate-float relative z-10">
                            <Heart className="w-10 h-10 text-[#501F08] opacity-50" />
                        </div>
                        <h2 className="text-3xl font-black text-[#501F08] mb-4 tracking-tight relative z-10">Wishlist Empty</h2>
                        <p className="text-gray-500 mb-10 text-lg font-medium italic relative z-10">Save items you love to find them easily here.</p>
                        <button
                            onClick={() => navigate('/products')}
                            className="relative z-10 px-12 py-4 group overflow-hidden bg-transparent border-2 border-[#501F08] text-[#501F08] rounded-2xl font-black text-xs tracking-[0.2em] transition-all duration-300 hover:text-white hover:shadow-2xl flex items-center gap-3 uppercase"
                        >
                            <div className="absolute inset-0 bg-[#501F08] transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                            <span className="relative z-10 flex items-center gap-3">
                                Explore Collection
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </span>
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                        {items.map((item) => (
                            <div
                                key={item._id || item.id}
                                className="group bg-white rounded-[24px] border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 hover:border-[#501F08]/20 transition-all duration-500 flex flex-col h-full relative"
                            >
                                <div className="relative aspect-4/5 overflow-hidden bg-gray-50">
                                    <img
                                        src={item?.images?.[0] || item?.image || '/placeholder.jpg'}
                                        alt={item?.name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                                    />
                                    <div className="absolute inset-0 bg-[#501F08]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                    <button
                                        onClick={() => handleRemove(item?.id)}
                                        className="absolute top-3 right-3 p-2.5 bg-white/90 backdrop-blur-md rounded-full shadow-lg text-[#501F08] hover:scale-110 transition-all duration-300 z-10"
                                        title="Remove from Wishlist"
                                    >
                                        <Heart size={20} className="fill-[#501F08]" />
                                    </button>
                                </div>

                                <div className="p-5 flex flex-col flex-1">
                                    <p className="text-[10px] font-black text-[#A87453] uppercase tracking-[0.15em] mb-2 opacity-80">
                                        {item?.collectionTitle || item?.category || 'Curated Luxury'}
                                    </p>
                                    <h3 className="text-lg font-black text-[#1A1A1A] mb-3 line-clamp-2 leading-tight group-hover:text-[#501F08] transition-colors">
                                        {item?.name || item?.title}
                                    </h3>

                                    <div className="mt-auto">
                                        <div className="flex items-center gap-3 mb-5">
                                            <span className="text-xl font-black text-[#501F08] tracking-tight">
                                                ₹{(item?.selling_price || item?.price || 0).toLocaleString()}
                                            </span>
                                            {(item?.origional_price || item?.originalPrice) > (item?.selling_price || item?.price) && (
                                                <span className="text-xs font-bold text-gray-400 line-through decoration-red-400/50">
                                                    ₹{(item?.origional_price || item?.originalPrice).toLocaleString()}
                                                </span>
                                            )}
                                        </div>

                                        <button
                                            onClick={() => handleMoveToCart(item.id, item?.wishlistId)}
                                            className="w-full relative group/btn overflow-hidden bg-transparent border-2 border-[#501F08] text-[#501F08] py-3 px-4 rounded-xl font-black text-[10px] tracking-[0.15em] transition-all duration-300 hover:text-white hover:shadow-lg flex items-center justify-center gap-3 uppercase"
                                        >
                                            <div className="absolute inset-0 bg-[#501F08] transform origin-left scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-300"></div>
                                            <span className="relative z-10 flex items-center gap-2">
                                                <ShoppingCart size={16} className="group-hover/btn:scale-110 transition-transform" />
                                                Move to Cart
                                            </span>
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
