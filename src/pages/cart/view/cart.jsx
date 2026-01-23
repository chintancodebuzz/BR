import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ShoppingCart, Trash2, ArrowRight, ShoppingBag } from "lucide-react";
import { fetchCart, removeFromCart } from "../../../slices/cartSlice";
import { CardSkeleton } from "../../../components/common/Skeleton";

export default function Cart() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { items, loading } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
        if (user) {
            dispatch(fetchCart());
        }
    }, [dispatch, user]);

    const handleRemove = (id) => {
        dispatch(removeFromCart(id));
    };

    const calculateTotal = () => {
        return items.reduce((total, item) => {
            const price = item?.selling_price || item?.price || item?.salePrice || 0;
            return total + price;
        }, 0);
    };

    if (!user) {
        return (
            <div className="min-h-screen bg-[#FDFDFD] flex items-center justify-center px-6">
                <div className="text-center max-w-sm bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                    <ShoppingCart className="w-12 h-12 text-[#501F08]/20 mx-auto mb-6" />
                    <h2 className="text-2xl font-bold text-[#501F08] mb-2 uppercase">Login Required</h2>
                    <p className="text-gray-500 mb-8 text-sm italic">Please sign in to view your cart items.</p>
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
                <div className="mb-10 flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-black text-[#501F08] uppercase tracking-tight mb-1">Your Bag</h1>
                        <p className="text-xs font-bold text-[#A87453] uppercase  opacity-70">
                            {items.length} {items.length === 1 ? 'Item' : 'Items'} Selected
                        </p>
                    </div>
                </div>

                {loading ? (
                    <div className="grid lg:grid-cols-3 gap-10">
                        <div className="lg:col-span-2">
                            <CardSkeleton count={3} />
                        </div>
                    </div>
                ) : items.length === 0 ? (
                    <div className="text-center py-24 bg-white rounded-2xl border border-gray-50 flex flex-col items-center">
                        <ShoppingBag className="w-12 h-12 text-[#501F08]/20 mb-6" />
                        <h2 className="text-xl font-bold text-[#501F08] mb-2 uppercase">Empty Bag</h2>
                        <p className="text-gray-400 mb-8 text-sm italic">You haven't added any masterpieces to your bag yet.</p>
                        <button
                            onClick={() => navigate('/products')}
                            className="px-8 py-3 bg-[#501F08] text-white rounded-xl font-bold text-xs tracking-widest hover:bg-[#3a1606] transition-all uppercase flex items-center gap-2"
                        >
                            Browse Collection
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>
                ) : (
                    <div className="grid lg:grid-cols-3 gap-10 items-start">
                        <div className="lg:col-span-2 space-y-4">
                            {items.map((item) => (
                                <div
                                    key={item._id || item.id}
                                    className="bg-white rounded-xl border border-gray-100 p-4 hover:shadow-sm transition-all group"
                                >
                                    <div className="flex gap-6">
                                        <div className="w-24 h-24 rounded-lg overflow-hidden bg-gray-50 shrink-0">
                                            <img
                                                src={item?.images?.[0] || item?.image || '/placeholder.jpg'}
                                                alt={item?.name}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                        </div>

                                        <div className="flex-1 flex flex-col">
                                            <div className="flex justify-between items-start mb-2">
                                                <div>
                                                    <p className="text-[10px] font-bold text-[#A87453] uppercase opacity-70">
                                                        {item?.collectionTitle || item?.category || 'Luxury Collection'}
                                                    </p>
                                                    <h3 className="text-md font-bold text-gray-900 group-hover:text-[#501F08] transition-colors">
                                                        {item?.name || item?.title}
                                                    </h3>
                                                </div>
                                                <button
                                                    onClick={() => handleRemove(item?.cartId)}
                                                    className="p-2 text-gray-300 hover:text-red-500 transition-colors"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>

                                            <div className="mt-auto flex items-center justify-between">
                                                <div className="flex items-center gap-3">
                                                    <span className="text-lg font-bold text-[#501F08]">
                                                        ₹{(item?.selling_price || item?.price || 0).toLocaleString()}
                                                    </span>
                                                    {(item?.origional_price || item?.originalPrice) > (item?.selling_price || item?.price) && (
                                                        <span className="text-xs text-gray-400 line-through">
                                                            ₹{(item?.origional_price || item?.originalPrice).toLocaleString()}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-xl border border-gray-100 p-6 sticky top-32 shadow-sm">
                                <h2 className="text-lg font-bold text-[#501F08] mb-6 uppercase tracking-widest">Order Summary</h2>

                                <div className="space-y-4 mb-8">
                                    <div className="flex justify-between text-xs font-bold uppercase ">
                                        <span className="text-gray-400">Subtotal</span>
                                        <span className="text-gray-900">₹{calculateTotal().toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between text-xs font-bold uppercase ">
                                        <span className="text-gray-400">Shipping</span>
                                        <span className="text-green-600">Free</span>
                                    </div>
                                    <div className="pt-4 border-t border-gray-100">
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm font-black text-[#501F08] uppercase">Total</span>
                                            <span className="text-2xl font-black text-[#501F08]">₹{calculateTotal().toLocaleString()}</span>
                                        </div>
                                    </div>
                                </div>

                                <button className="w-full bg-[#501F08] text-white py-3 px-6 rounded-lg font-bold text-xs tracking-widest hover:bg-[#3a1606] transition-all shadow-md flex items-center justify-center gap-2 mb-3 uppercase">
                                    Checkout
                                    <ArrowRight className="w-4 h-4" />
                                </button>

                                <button
                                    onClick={() => navigate('/products')}
                                    className="w-full border border-gray-200 text-gray-500 py-3 px-6 rounded-lg font-bold text-[10px] tracking-widest hover:bg-gray-50 transition-all uppercase"
                                >
                                    Continue Shopping
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
