import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    ShoppingCart,
    Heart,
    ChevronLeft,
    ChevronRight,
    ShieldCheck,
    Truck,
    RotateCcw,
    Star,
    Plus,
    Minus,
    Share2
} from "lucide-react";
import { fetchProductDetail, clearSelectedProduct } from "../../../slices/productSlice";
import { addToCart } from "../../../slices/cartSlice";
import { addToWishlist, removeFromWishlist } from "../../../slices/wishlistSlice";
import { useToast } from "../../../contexts/ToastContext";
import { ProductSkeleton } from "../../../components/common/Skeleton";

export default function ProductDetail() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const toast = useToast();

    const { selectedProduct: product, productLoading: loading, error } = useSelector((state) => state.product);
    const { items: wishlistItems } = useSelector((state) => state.wishlist);
    const { user } = useSelector((state) => state.auth);

    const [activeImage, setActiveImage] = useState(0);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        if (id) {
            dispatch(fetchProductDetail(id));
        }
        return () => {
            dispatch(clearSelectedProduct());
        };
    }, [id, dispatch]);

    useEffect(() => {
        if (product?.images?.length > 0) {
            setActiveImage(0);
        }
    }, [product]);

    const isInWishlist = wishlistItems.some(item =>
        (item.product?.id || item.product?._id || item.id || item._id) === product?.id
    );

    const handleWishlist = async () => {
        if (!user) return navigate('/login');
        try {
            if (isInWishlist) {
                const wishlistItem = wishlistItems.find(item =>
                    (item.product?.id || item.product?._id || item.id || item._id) === product?.id
                );
                await dispatch(removeFromWishlist(wishlistItem._id || wishlistItem.id)).unwrap();
                toast.info("Removed from wishlist");
            } else {
                await dispatch(addToWishlist(product.id)).unwrap();
                toast.success("Added to wishlist");
            }
        } catch (err) {
            toast.error(err?.message || "Action failed");
        }
    };

    const handleAddToCart = async () => {
        if (!user) return navigate('/login');
        try {
            await dispatch(addToCart(product.id)).unwrap();
            toast.success("Added to bag");
        } catch (err) {
            toast.error(err?.message || "Failed to add to cart");
        }
    };

    if (loading) return (
        <div className="max-w-screen-2xl mx-auto px-6 py-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                <div className="aspect-square bg-gray-100 animate-pulse rounded-3xl" />
                <div className="space-y-6">
                    <div className="h-10 bg-gray-100 animate-pulse rounded-lg w-3/4" />
                    <div className="h-6 bg-gray-100 animate-pulse rounded-lg w-1/2" />
                    <div className="h-32 bg-gray-100 animate-pulse rounded-2xl w-full" />
                </div>
            </div>
        </div>
    );

    if (error || !product) return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6">
            <h2 className="text-2xl font-bold text-[#501F08] mb-4">Masterpiece Not Found</h2>
            <p className="text-gray-500 mb-8 italic">"True beauty is sometimes elusive. Please check back later."</p>
            <button onClick={() => navigate('/products')} className="px-8 py-3 bg-[#501F08] text-white rounded-xl font-bold text-xs tracking-widest uppercase shadow-xl">
                Return to Collection
            </button>
        </div>
    );

    const sellingPrice = product.selling_price || product.price || 0;
    const originalPrice = product.origional_price || product.originalPrice;
    const discount = product.discount || (originalPrice > sellingPrice ? Math.round(((originalPrice - sellingPrice) / originalPrice) * 100) : null);

    return (
        <div className="bg-[#FDFDFD] min-h-screen">
            <div className="max-w-screen-2xl mx-auto px-6 md:px-12 lg:px-24 py-12">
                {/* Breadcrumbs */}
                <div className="flex items-center gap-2 text-[10px] font-bold text-[#A87453] uppercase tracking-[0.2em] mb-12">
                    <span className="hover:text-[#501F08] cursor-pointer transition-colors" onClick={() => navigate('/')}>Home</span>
                    <ChevronRight className="w-3 h-3 opacity-30" />
                    <span className="hover:text-[#501F08] cursor-pointer transition-colors" onClick={() => navigate('/products')}>Collection</span>
                    <ChevronRight className="w-3 h-3 opacity-30" />
                    <span className="text-[#501F08]">{product.name}</span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
                    {/* Image Gallery Section */}
                    <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-6">
                        {/* Thumbnails */}
                        <div className="flex flex-row md:flex-col gap-4 overflow-auto pb-4 md:pb-0 scrollbar-hide shrink-0">
                            {product.images?.map((img, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setActiveImage(idx)}
                                    className={`relative w-24 h-24 rounded-2xl overflow-hidden border-2 transition-all duration-300 bg-white ${activeImage === idx ? 'border-[#501F08] shadow-lg scale-105' : 'border-gray-100 opacity-60 hover:opacity-100'}`}
                                >
                                    <img src={img} alt={`${product.name} ${idx + 1}`} className="w-full h-full object-cover" />
                                </button>
                            ))}
                        </div>

                        {/* Main Image */}
                        <div className="relative flex-1 aspect-square md:aspect-auto md:h-[600px] rounded-[40px] overflow-hidden bg-white border border-gray-50 shadow-sm group">
                            <img
                                src={product.images?.[activeImage] || '/placeholder.jpg'}
                                alt={product.name}
                                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                            />
                            {discount && (
                                <div className="absolute top-8 left-8 bg-[#501F08] text-white px-5 py-2 rounded-full text-xs font-black tracking-widest shadow-2xl">
                                    {discount}% OFF
                                </div>
                            )}
                            <div className="absolute top-8 right-8 flex flex-col gap-4">
                                <button
                                    onClick={handleWishlist}
                                    className={`p-4 rounded-full backdrop-blur-md shadow-2xl transition-all duration-500 scale-90 hover:scale-100 ${isInWishlist ? 'bg-red-50 text-red-500' : 'bg-white/80 text-gray-400'}`}
                                >
                                    <Heart className={`w-6 h-6 ${isInWishlist ? 'fill-current' : ''}`} />
                                </button>
                                <button className="p-4 bg-white/80 backdrop-blur-md rounded-full text-gray-400 shadow-2xl transition-all hover:scale-100 scale-90 hover:text-[#501F08]">
                                    <Share2 className="w-6 h-6" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Product Info Section */}
                    <div className="lg:col-span-5 flex flex-col pt-4">
                        <div className="mb-2">
                            <span className="text-xs font-black text-[#A87453] tracking-[0.3em] uppercase opacity-70">
                                {product.collectionTitle || 'Exquisite Collection'}
                            </span>
                        </div>

                        <h1 className="text-4xl md:text-5xl font-black text-[#1A1A1A] mb-4 leading-tight">
                            {product.name}
                        </h1>

                        <div className="flex items-center gap-4 mb-8">
                            <div className="flex items-center gap-1 text-[#501F08]">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="w-4 h-4 fill-current" />
                                ))}
                            </div>
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                                4.9 (124 Verified Reviews)
                            </span>
                        </div>

                        <div className="flex items-baseline gap-4 mb-10 pb-10 border-b border-gray-100">
                            <span className="text-4xl font-black text-[#501F08]">
                                ₹{sellingPrice.toLocaleString()}
                            </span>
                            {originalPrice && originalPrice > sellingPrice && (
                                <span className="text-xl text-gray-400 line-through font-medium opacity-50">
                                    ₹{originalPrice.toLocaleString()}
                                </span>
                            )}
                        </div>

                        <div className="space-y-8 mb-12">
                            <div>
                                <h3 className="text-xs font-black text-[#501F08] uppercase tracking-widest mb-4">Description</h3>
                                <div
                                    className="text-gray-500 text-sm leading-relaxed italic"
                                    dangerouslySetInnerHTML={{ __html: product.description }}
                                />
                            </div>

                            {/* Quantity Selector */}
                            <div className="flex items-center gap-8">
                                <h3 className="text-xs font-black text-[#501F08] uppercase tracking-widest">Quantity</h3>
                                <div className="flex items-center bg-[#FAF7F5] rounded-xl p-1 border border-[#501F08]/5">
                                    <button
                                        onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                                        className="p-2.5 text-[#501F08] hover:bg-white rounded-lg transition-all"
                                    >
                                        <Minus className="w-4 h-4" />
                                    </button>
                                    <span className="w-12 text-center text-sm font-black text-[#501F08]">{quantity}</span>
                                    <button
                                        onClick={() => setQuantity(prev => prev + 1)}
                                        className="p-2.5 text-[#501F08] hover:bg-white rounded-lg transition-all"
                                    >
                                        <Plus className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
                            <button
                                onClick={handleAddToCart}
                                className="w-full bg-[#501F08] text-white py-5 rounded-2xl font-black text-[11px] tracking-[0.2em] shadow-[0_20px_40px_rgba(80,31,8,0.2)] hover:shadow-[0_25px_50px_rgba(80,31,8,0.3)] transition-all flex items-center justify-center gap-3 uppercase"
                            >
                                <ShoppingCart className="w-5 h-5" />
                                Add to Bag
                            </button>
                            <button className="w-full bg-white text-[#501F08] border-2 border-[#501F08] py-5 rounded-2xl font-black text-[11px] tracking-[0.2em] hover:bg-[#501F08] hover:white transition-all uppercase flex items-center justify-center gap-3">
                                Buy Masterpiece Now
                            </button>
                        </div>

                        {/* Value Props */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-10 border-t border-gray-100">
                            <div className="flex flex-col items-center text-center gap-2">
                                <div className="p-3 bg-green-50 rounded-full text-green-600">
                                    <Truck className="w-5 h-5" />
                                </div>
                                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Complimentary Delivery</span>
                            </div>
                            <div className="flex flex-col items-center text-center gap-2">
                                <div className="p-3 bg-blue-50 rounded-full text-blue-600">
                                    <ShieldCheck className="w-5 h-5" />
                                </div>
                                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Authenticity Guaranteed</span>
                            </div>
                            <div className="flex flex-col items-center text-center gap-2">
                                <div className="p-3 bg-purple-50 rounded-full text-purple-600">
                                    <RotateCcw className="w-5 h-5" />
                                </div>
                                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">14-Day Boutique Return</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Similar Products Placeholder */}
                {/* <div className="mt-32 pt-20 border-t border-gray-50">
                    <div className="text-center mb-16">
                        <p className="text-[10px] font-black tracking-[0.4em] text-[#A87453] uppercase mb-4">Curated for You</p>
                        <h2 className="text-3xl md:text-5xl font-black text-[#501F08] uppercase tracking-tight">Similar Masterpieces</h2>
                    </div>
                </div> */}
            </div>
        </div>
    );
}
