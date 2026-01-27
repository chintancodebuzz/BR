import React from "react";
import { ShoppingCart, Trash2, ArrowRight, Plus, Minus } from "lucide-react";

import { CartSkeleton } from "../../../components/common/loading-skeletons";

const CartView = ({
    items,
    loading,
    user,
    handleRemove,
    handleQuantityChange,
    calculateTotal,
    navigate
}) => {
    if (!user) {
        /* ... existing guest view ... */
        return (
            <div className="min-h-screen bg-[#FDFDFD] flex items-center justify-center p-6 text-center">
                <div className="max-w-md w-full bg-white p-10 rounded-[32px] shadow-xl border border-gray-100">
                    <div className="w-20 h-20 bg-[#501F08]/5 rounded-full flex items-center justify-center mx-auto mb-6">
                        <ShoppingCart className="w-10 h-10 text-[#501F08]" />
                    </div>
                    <h2 className="text-3xl font-black text-[#501F08] mb-4  ">Login Required</h2>
                    <p className="text-gray-500 mb-8 font-medium">Please sign in to view your curated cart items.</p>
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
        <div className=" bg-[#FDFDFD] pb-10">
            <div className="max-w-screen-2xl mx-auto px-6 md:px-12 py-12">
                <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-black text-[#501F08] mb-2 tracking-tight">Shopping Cart</h1>
                        <p className="text-md font-bold text-[#A87453] opacity-60">
                            {items.length} {items.length === 1 ? 'Masterpiece' : 'Masterpieces'} curated in your collection
                        </p>
                    </div>
                </div>

                {loading ? (
                    <CartSkeleton />
                ) : items.length === 0 ? (
                    <div className="text-center py-32 bg-white rounded-[40px] border border-gray-100 shadow-xl max-w-2xl mx-auto mt-12 flex flex-col items-center relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-[#501F08]/5 rounded-full -mr-32 -mt-32 blur-3xl opacity-50" />
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#A87453]/5 rounded-full -ml-32 -mb-32 blur-3xl opacity-50" />

                        <div className="w-24 h-24 bg-[#501F08]/5 rounded-full flex items-center justify-center mb-8 animate-float relative z-10">
                            <ShoppingCart className="w-10 h-10 text-[#501F08] opacity-50" />
                        </div>
                        <h2 className="text-3xl font-black text-[#501F08] mb-4 tracking-tight relative z-10">Your Cart is Empty</h2>
                        <p className="text-gray-500 mb-10 text-lg font-medium italic relative z-10">Your collection is waiting for its first masterpiece.</p>
                        <button
                            onClick={() => navigate('/products')}
                            className="relative z-10 px-12 py-4 group overflow-hidden bg-transparent border-2 border-[#501F08] text-[#501F08] rounded-2xl font-black text-xs tracking-[0.2em] transition-all duration-300 hover:text-white hover:shadow-2xl flex items-center gap-3 uppercase"
                        >
                            <div className="absolute inset-0 bg-[#501F08] transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                            <span className="relative z-10 flex items-center gap-3">
                                Browse Collection
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </span>
                        </button>
                    </div>
                ) : (
                    <div className="grid lg:grid-cols-12 gap-8">
                        {/* Items List */}
                        <div className="lg:col-span-8 xl:col-span-9 space-y-3">
                            {items.map((item) => (
                                <div
                                    key={item._id || item.id}
                                    className="group bg-white rounded-[24px] border border-gray-100 p-4 hover:shadow-lg hover:-translate-y-0.5 hover:border-[#501F08]/20 transition-all duration-500 relative flex flex-col sm:flex-row gap-5"
                                >
                                    <div className="w-full sm:w-36 aspect-square rounded-[18px] overflow-hidden bg-gray-50 shrink-0 border border-gray-100 shadow-sm relative">
                                        <img
                                            src={item?.images?.[0] || item?.image || '/placeholder.jpg'}
                                            alt={item?.name}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                        />
                                        <div className="absolute inset-0 bg-[#501F08]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                    </div>

                                    <div className="flex-1 flex flex-col justify-start py-1">
                                        <div className="flex justify-between items-start mb-2">
                                            <div>
                                                <p className="text-[10px] font-black text-[#A87453] uppercase tracking-[0.15em] mb-1.5 opacity-80">
                                                    {item?.collectionTitle || item?.category || 'Luxury Selection'}
                                                </p>
                                                <h3 className="text-lg md:text-xl font-black text-[#1A1A1A] group-hover:text-[#501F08] transition-colors leading-tight">
                                                    {item?.name || item?.title}
                                                </h3>
                                            </div>
                                            <button
                                                onClick={() => handleRemove(item?.cartId)}
                                                className="p-2.5 bg-gray-50 text-[#501F08] hover:text-[#501F08]  rounded-xl  cursor-pointer border border-transparent hover:border-[#501F08] hover:shadow-sm"
                                                title="Remove Item"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>

                                        <div className="flex flex-wrap items-start justify-between gap-4 border-t border-gray-50 ">
                                            <div className="flex items-center gap-2.5">
                                                <span className="text-xl md:text-2xl font-black text-[#501F08]">
                                                    ₹{(item?.selling_price || item?.price || 0).toLocaleString()}
                                                </span>
                                                {(item?.origional_price || item?.originalPrice) > (item?.selling_price || item?.price) && (
                                                    <span className="text-xs font-bold text-gray-400 line-through decoration-red-400/50">
                                                        ₹{(item?.origional_price || item?.originalPrice).toLocaleString()}
                                                    </span>
                                                )}
                                            </div>

                                            <div className="flex items-center bg-gray-50 rounded-xl p-1 shadow-inner border border-gray-100">
                                                <button
                                                    onClick={() => handleQuantityChange(item, "dec")}
                                                    className="w-8 h-8 flex items-center justify-center rounded-lg bg-white text-gray-700 hover:text-[#501F08] hover:shadow-sm transition-all disabled:opacity-30 disabled:hover:shadow-none cursor-pointer border border-gray-100"
                                                    disabled={item?.qty <= 1}
                                                >
                                                    <Minus size={14} strokeWidth={2.5} />
                                                </button>
                                                <span className="w-8 text-center font-black text-[#501F08] text-sm">
                                                    {item?.qty || 1}
                                                </span>
                                                <button
                                                    onClick={() => handleQuantityChange(item, "inc")}
                                                    className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#501F08] text-white hover:bg-[#3a1606] shadow-sm hover:shadow-md transition-all cursor-pointer"
                                                >
                                                    <Plus size={14} strokeWidth={2.5} />
                                                </button>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Summary Sidebar */}
                        <div className="lg:col-span-4 xl:col-span-3">
                            <div className="bg-white rounded-[32px] border border-gray-100 shadow-[0_20px_50px_rgba(80,31,8,0.05)] p-8 lg:sticky lg:top-32 overflow-hidden relative">
                                {/* Decorative Element */}
                                <div className="absolute top-0 right-0 w-40 h-40 bg-[#501F08]/5 rounded-full -mr-20 -mt-20 blur-3xl opacity-60" />

                                <h2 className="text-2xl font-black text-[#501F08] mb-4 pb-2 border-b border-gray-50 flex items-center justify-between relative z-10">
                                    Order Summary
                                    <span className="text-xs font-bold bg-[#501F08]/5 text-[#501F08] px-3 py-1 rounded-full uppercase tracking-wider">{items.length} Items</span>
                                </h2>

                                <div className="space-y-2 mb-8 relative z-10">
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-gray-700 font-bold uppercase tracking-wider text-xs">Subtotal</span>
                                        <span className="text-gray-900 font-black text-lg">₹{calculateTotal().toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-gray-700 font-bold uppercase tracking-wider text-xs">Shipping</span>
                                        <span className="text-emerald-600 font-black bg-emerald-50 px-2 py-1 rounded-lg text-xs tracking-wider">FREE DELIVERY</span>
                                    </div>

                                    <div className="mt-8 pt-6 border-t-2 border-dashed border-gray-100">
                                        <div className="flex justify-between items-end">
                                            <div className="flex flex-col gap-1">
                                                <span className="text-xs font-black text-gray-700 uppercase tracking-widest">Total Amount</span>
                                                <span className="text-[10px] text-gray-700 italic">Incl. of all taxes</span>
                                            </div>
                                            <span className="text-3xl font-black text-[#501F08] leading-none tracking-tight">₹{calculateTotal().toLocaleString()}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2 relative z-10">
                                    <button className="w-full relative group overflow-hidden bg-transparent border-2 border-[#501F08] text-[#501F08] py-3 rounded-2xl font-black text-sm tracking-widest transition-all duration-300 hover:text-white hover:shadow-xl uppercase" onClick={() => navigate("/checkout")}>
                                        <div className="absolute inset-0 bg-[#501F08] transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                                        <span className="relative z-10 flex items-center justify-center gap-3">
                                            Checkout Now
                                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                        </span>
                                    </button>

                                </div>

                                {/* Unique touch: subtle trust message */}
                                <div className="mt-8 flex items-center justify-center gap-2 opacity-60 relative z-10">
                                    <div className="h-px bg-gray-200 w-12" />
                                    <p className="text-center text-[10px] font-bold text-gray-700 uppercase tracking-widest">
                                        Secure Payment
                                    </p>
                                    <div className="h-px bg-gray-200 w-12" />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CartView;
