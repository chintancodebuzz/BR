import React from "react";
import {
    ShoppingCart,
    Heart,
    Share2,
    Star,
    Check,
    Truck,
    Shield,
    RefreshCw,
    Award,
    Minus,
    Plus,
    X,
    Package,
    Tag,
    Clock
} from "lucide-react";

import { ProductDetailSkeleton } from "../../../components/common/loading-skeletons";

const ProductDetailView = ({
    product,
    loading,
    error,
    isInWishlist,
    cartItem,
    activeImage,
    setActiveImage,
    quantity,
    handleQuantityChange,
    handleAddToCart,
    handleWishlist,
    handleUpdateCartQty,
    isModalOpen,
    setIsModalOpen,
    sellingPrice,
    originalPrice,
    discount,
    features,
    navigate
}) => {
    if (loading) return <ProductDetailSkeleton />;

    if (error || !product)
        return (
            <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6">
                <div className="w-24 h-24 rounded-full bg-[#F5EDE8] flex items-center justify-center mb-6">
                    <Package className="w-12 h-12 text-[#501F08]" />
                </div>
                <h2 className="text-3xl font-bold text-[#501F08] mb-4">
                    Product Not Found
                </h2>
                <p className="text-gray-600 mb-8 max-w-md">
                    We couldn't find the product you're looking for. It might have been moved or is no longer available.
                </p>
                <button
                    onClick={() => navigate("/products")}
                    className="px-8 py-3.5 bg-[#501F08] text-white rounded-xl font-semibold text-sm uppercase tracking-wide hover:bg-[#3A1606] transition-colors shadow-lg"
                >
                    Continue Shopping
                </button>
            </div>
        );

    return (
        <div className="bg-white min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
                    {/* Image Gallery */}
                    <div className="space-y-4">
                        <div className="relative aspect-square rounded-3xl overflow-hidden bg-gray-50 border border-gray-100">
                            {discount && (
                                <div className="absolute top-4 left-4 z-10">
                                    <div className="bg-[#501F08] text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                                        {discount}% OFF
                                    </div>
                                </div>
                            )}
                            <div className="absolute top-4 right-4 z-10 flex gap-2">
                                <button
                                    onClick={handleWishlist}
                                    className={`p-2.5 rounded-full bg-white/90 backdrop-blur-sm shadow-md transition-all hover:scale-110 ${isInWishlist ? "text-[#501F08]" : "text-gray-400 hover:text-[#501F08]"}`}
                                >
                                    <Heart
                                        className={`w-5 h-5 transition-colors ${isInWishlist ? "fill-[#501F08] text-[#501F08]" : "text-current"}`}
                                    />
                                </button>
                                <button className="p-2.5 bg-white/90 backdrop-blur-sm rounded-full text-gray-400 shadow-md transition-all hover:scale-110 hover:text-[#501F08]">
                                    <Share2 className="w-5 h-5" />
                                </button>
                            </div>
                            <img
                                src={product.images?.[activeImage] || "/placeholder.jpg"}
                                alt={product.name}
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                            />
                        </div>

                        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                            {product.images?.map((img, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setActiveImage(idx)}
                                    className={`shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${activeImage === idx ? "border-[#501F08] scale-105" : "border-transparent hover:border-gray-200"}`}
                                >
                                    <img
                                        src={img}
                                        alt={`Thumbnail ${idx + 1}`}
                                        className="w-full h-full object-cover"
                                    />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="space-y-8">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <span className="text-sm text-[#A87453] font-semibold uppercase tracking-wider">
                                    {product.collectionTitle || "Premium Collection"}
                                </span>
                                {product.inStock !== false && (
                                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-100 text-green-800 text-xs font-medium">
                                        <Check className="w-3 h-3" />
                                        In Stock
                                    </span>
                                )}
                            </div>

                            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                                {product.name}
                            </h1>

                            <div className="flex items-center gap-4 mb-6">
                                <div className="flex items-center gap-1">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className="w-5 h-5 text-yellow-400 fill-current"
                                        />
                                    ))}
                                    <span className="ml-2 text-gray-900 font-semibold">4.9</span>
                                </div>
                                <span className="text-gray-500 text-sm">
                                    (124 verified reviews)
                                </span>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-baseline gap-3">
                                <span className="text-4xl font-bold text-[#501F08]">
                                    ₹{sellingPrice.toLocaleString()}
                                </span>
                                {originalPrice && originalPrice > sellingPrice && (
                                    <>
                                        <span className="text-xl text-gray-400 line-through">
                                            ₹{originalPrice.toLocaleString()}
                                        </span>
                                        <span className="text-sm font-semibold text-green-600">
                                            Save ₹{(originalPrice - sellingPrice).toLocaleString()}
                                        </span>
                                    </>
                                )}
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-lg font-black text-[#501F08] uppercase tracking-wider">
                                Description
                            </h3>
                            <div className="relative">
                                <div
                                    className="text-gray-600 leading-relaxed space-y-3 [&_p]:text-gray-600 line-clamp-3 font-medium"
                                    dangerouslySetInnerHTML={{ __html: product.description }}
                                />
                                <button
                                    onClick={() => setIsModalOpen(true)}
                                    className="mt-2 text-[#A87453] font-bold text-sm hover:text-[#501F08] transition-colors uppercase tracking-wide border-b-2 border-[#A87453]/20 hover:border-[#501F08] pb-0.5"
                                >
                                    Read Full Description
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            {features.map((feature, idx) => (
                                <div
                                    key={idx}
                                    className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100"
                                >
                                    <div className="p-2 bg-white rounded-lg">
                                        <feature.icon className="w-5 h-5 text-[#501F08]" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-gray-900">
                                            {feature.text}
                                        </p>
                                        <p className="text-xs text-gray-500">{feature.subtext}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="space-y-6 pt-6 border-t border-gray-100">
                            {!cartItem ? (
                                <div className="space-y-4">
                                    <div className="flex items-center justify-start gap-3">
                                        <span className="text-sm font-black text-[#501F08] uppercase tracking-wider">
                                            Quantity :-
                                        </span>
                                        <div className="flex items-center bg-gray-50 rounded-xl p-1.5 shadow-inner border border-gray-100">
                                            <button
                                                onClick={() => handleQuantityChange("dec")}
                                                disabled={quantity <= 1}
                                                className="w-10 h-10 flex items-center justify-center rounded-lg bg-white text-gray-700 hover:text-[#501F08] hover:shadow-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed border border-gray-100"
                                            >
                                                <Minus size={16} strokeWidth={2.5} />
                                            </button>
                                            <span className="w-12 text-center font-black text-[#501F08] text-lg">
                                                {quantity}
                                            </span>
                                            <button
                                                onClick={() => handleQuantityChange("inc")}
                                                className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#501F08] text-white hover:bg-[#3a1606] shadow-md hover:shadow-lg transition-all"
                                            >
                                                <Plus size={16} strokeWidth={2.5} />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <button
                                            onClick={handleAddToCart}
                                            className="relative group overflow-hidden bg-[#501F08] text-white py-3 rounded-xl font-bold uppercase tracking-wider shadow-lg hover:shadow-xl transition-all"
                                        >
                                            <div className="absolute inset-0 bg-white/20 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                                            <span className="relative z-10 flex items-center justify-center gap-2">
                                                <ShoppingCart className="w-5 h-5" />
                                                Add to Cart
                                            </span>
                                        </button>
                                        <button className="relative group overflow-hidden border-2 border-[#501F08] text-[#501F08] py-3 rounded-xl font-bold uppercase tracking-wider hover:text-white transition-all shadow-md hover:shadow-lg">
                                            <div className="absolute inset-0 bg-[#501F08] transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                                            <span className="relative z-10 flex items-center justify-center gap-2">
                                                Buy Now
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between bg-green-50 p-4 rounded-xl">
                                        <div className="flex items-center gap-3">
                                            <Check className="w-5 h-5 text-green-600" />
                                            <span className="font-semibold text-green-800">
                                                Added to Cart
                                            </span>
                                        </div>
                                        <button
                                            onClick={() => navigate("/cart")}
                                            className="text-[#501F08] font-semibold hover:underline"
                                        >
                                            View Cart
                                        </button>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="flex items-center bg-gray-50 rounded-xl p-1.5 shadow-inner border border-gray-100">
                                            <button
                                                onClick={() => handleUpdateCartQty("dec")}
                                                disabled={cartItem.qty <= 1}
                                                className="w-10 h-10 flex items-center justify-center rounded-lg bg-white text-gray-700 hover:text-[#501F08] hover:shadow-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed border border-gray-100"
                                            >
                                                <Minus size={16} strokeWidth={2.5} />
                                            </button>
                                            <span className="w-12 text-center font-black text-[#501F08] text-lg">
                                                {cartItem.qty}
                                            </span>
                                            <button
                                                onClick={() => handleUpdateCartQty("inc")}
                                                className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#501F08] text-white hover:bg-[#3a1606] shadow-md hover:shadow-lg transition-all"
                                            >
                                                <Plus size={16} strokeWidth={2.5} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="space-y-4 text-sm text-gray-600 pt-6 border-t border-gray-100">
                            <div className="flex items-center gap-2">
                                <Tag className="w-4 h-4" />
                                <span>SKU: {product.sku || "N/A"}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4" />
                                <span>Delivery: 3-5 business days</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
                    <div className="bg-white rounded-[32px] max-w-2xl w-full max-h-[80vh] overflow-hidden shadow-2xl relative animate-scale-in">
                        <div className="p-8 overflow-y-auto max-h-[80vh] scrollbar-hide">
                            <div className="flex justify-between items-start mb-6 sticky top-0 bg-white z-10 pb-4 border-b border-gray-100">
                                <h2 className="text-2xl font-black text-[#501F08] uppercase tracking-tight">
                                    Product Description
                                </h2>
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors text-[#501F08]"
                                >
                                    <X size={24} />
                                </button>
                            </div>
                            <div
                                className="text-gray-600 leading-relaxed space-y-4 [&_p]:mb-4 [&_h3]:font-black [&_h3]:text-[#501F08] [&_h3]:mb-2 [&_ul]:list-disc [&_ul]:pl-5 [&_li]:mb-1"
                                dangerouslySetInnerHTML={{ __html: product.description }}
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductDetailView;

