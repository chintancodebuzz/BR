import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  ShoppingCart,
  Heart,
  Share2,
  Star,
  Check,
  Truck,
  Shield,
  RefreshCw,
  Package,
  Clock,
  Tag,
  Award,
  ChevronRight,
  Minus,
  Plus,
  X,
} from "lucide-react";
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
import { ProductSkeleton } from "../../../components/common/Skeleton";

export default function ProductDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    selectedProduct: product,
    productLoading: loading,
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
        } else {
          console.error("Could not determine wishlist item ID", wishlistItem);
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

  if (loading)
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="animate-pulse">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="aspect-square bg-gray-100 rounded-3xl" />
            <div className="space-y-6">
              <div className="h-8 bg-gray-100 rounded-lg w-3/4" />
              <div className="h-6 bg-gray-100 rounded-lg w-1/2" />
              <div className="h-4 bg-gray-100 rounded-lg w-full" />
              <div className="h-32 bg-gray-100 rounded-2xl w-full" />
            </div>
          </div>
        </div>
      </div>
    );

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

  const sellingPrice = product.selling_price || product.price || 0;
  const originalPrice = product.origional_price || product.originalPrice;
  const discount =
    product.discount ||
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
    <div className="bg-white min-h-screen">


      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
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

            {product.images?.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImage(idx)}
                className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${activeImage === idx ? "border-[#501F08] scale-105" : "border-transparent hover:border-gray-200"}`}
              >
                <img
                  src={img}
                  alt={`Thumbnail ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>

          {/* Product Info */}
          <div className="space-y-8">
            {/* Category & Brand */}
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

              {/* Product Title */}
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                {product.name}
              </h1>

              {/* Rating */}
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

            {/* Price Section */}
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
              {discount && (
                <p className="text-sm text-gray-600">
                  Inclusive of all taxes
                </p>
              )}
            </div>

            {/* Description */}
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

            {/* Features Grid */}
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

            {/* Quantity & Actions */}
            <div className="space-y-6 pt-6 border-t border-gray-100">
              {/* Quantity Selector */}
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

                  {/* Action Buttons */}
                  {/* Action Buttons */}
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

            {/* Additional Info */}
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

        {/* Additional Sections (Optional) */}
        {/* <div className="mt-20">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">
            Product Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900">Specifications</h4>
              <div className="space-y-2">
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">Material</span>
                  <span className="font-medium">Premium Quality</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">Dimensions</span>
                  <span className="font-medium">10" x 8" x 6"</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">Weight</span>
                  <span className="font-medium">1.5 kg</span>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900">Care Instructions</h4>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Handle with care</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Clean with soft cloth</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Avoid direct sunlight</span>
                </li>
              </ul>
            </div>
          </div>
        </div> */}
      </div>
      {/* Description Modal */}
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
}