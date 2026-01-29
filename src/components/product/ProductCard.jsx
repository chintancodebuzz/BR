import React, { forwardRef } from "react";
import { Heart, ShoppingCart, Eye } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, fetchCart } from "../../slices/cartSlice";
import {
  addToWishlist,
  fetchWishlist,
  removeFromWishlist,
} from "../../slices/wishlistSlice";

const ProductCard = forwardRef(({ product, viewMode = "grid" }, ref) => {
  const dispatch = useDispatch();
  const { items: wishlistItems } = useSelector((state) => state.wishlist);
  const { items: cartItems } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const productId = product.id || product._id;
  const name = product.name || product.title;
  const sellingPrice =
    product.selling_price || product.price || product.salePrice || 0;
  const originalPrice = product.origional_price || product.originalPrice;
  const displayImage =
    product.images && product.images.length > 0
      ? product.images[0]
      : product.image || "/placeholder.jpg";
  const discount =
    product.discount ||
    (originalPrice > sellingPrice
      ? Math.round(((originalPrice - sellingPrice) / originalPrice) * 100)
      : null);

  const isInWishlist = wishlistItems.some((item) => item.id === productId);
  const isInCart = cartItems?.some(
    (item) => (item.product?._id || item.productId || item._id) === productId,
  );

  const handleWishlist = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      if (isInWishlist) {
        // Remove from wishlist
        await dispatch(addToWishlist(productId));
        await dispatch(fetchWishlist());
      } else {
        // Add to wishlist
        await dispatch(addToWishlist(productId));
        await dispatch(fetchWishlist());
      }
    } catch (error) {
      throw error;
    }
  };

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await dispatch(addToCart(productId));
      await dispatch(fetchCart());
    } catch (error) {
      throw error;
    }
  };

  const isGridView = viewMode === "grid";

  if (!isGridView) {
    return (
      <div
        ref={ref}
        className="bg-white rounded-[24px] border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-300 group"
      >
        <div className="flex flex-col sm:flex-row gap-6 p-4">
          <div
            className="relative w-full sm:w-48 aspect-square rounded-[18px] overflow-hidden bg-gray-50 shrink-0 border border-gray-100 cursor-pointer"
            onClick={() => navigate(`/products/${productId}`)}
          >
            <img
              src={displayImage}
              alt={name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 cursor-pointer"
            />
            {discount && (
              <span className="absolute top-2 left-2 bg-[#501F08] text-white px-2 py-0.5 rounded text-[10px] font-bold">
                {discount}% OFF
              </span>
            )}
            <div className="absolute inset-0 bg-[#501F08]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>

          <div className="flex-1 flex flex-col justify-between py-1">
            <div>
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="text-[10px] font-black text-[#A87453] uppercase tracking-[0.15em] mb-1.5 opacity-80">
                    {product.collectionTitle ||
                      product.category ||
                      "Luxury Collection"}
                  </p>
                  <h3 className="text-xl font-black text-[#1A1A1A] group-hover:text-[#501F08] transition-colors line-clamp-1 mb-2">
                    {name}
                  </h3>
                </div>
                {/* <button
                                    onClick={handleWishlist}
                                    className="p-2.5 rounded-full bg-gray-50 hover:bg-red-50 transition-colors"
                                >
                                    <Heart
                                        className={`w-5 h-5 transition-colors ${isInWishlist ? 'fill-[#501F08] text-[#501F08]' : 'text-gray-300'}`}
                                    />
                                </button> */}
              </div>

              <p
                className="text-gray-500 text-sm mb-4 line-clamp-2 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: product.description }}
              />

              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-2xl font-black text-[#501F08] tracking-tight">
                  ₹{sellingPrice.toLocaleString()}
                </span>
                {originalPrice && originalPrice > sellingPrice && (
                  <span className="text-sm font-bold text-gray-400 line-through decoration-red-400/50">
                    ₹{originalPrice.toLocaleString()}
                  </span>
                )}
              </div>
            </div>

            {/* <div className="flex gap-4">
                            <button
                                onClick={isInCart ? () => navigate('/cart') : handleAddToCart}
                                className={`relative group/btn overflow-hidden border-2 ${isInCart ? 'border-emerald-500 text-emerald-500 hover:text-white' : 'border-[#501F08] text-[#501F08] hover:text-white'} py-3 px-6 rounded-xl font-black text-xs tracking-[0.15em] transition-all duration-300 hover:shadow-lg flex items-center justify-center gap-2 uppercase w-max`}
                            >
                                <div className={`absolute inset-0 ${isInCart ? 'bg-emerald-600' : 'bg-[#501F08]'} transform origin-left scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-300`}></div>
                                <span className="relative z-10 flex items-center gap-2">
                                    {isInCart ? (
                                        <>
                                            <ShoppingCart className="w-4 h-4" />
                                            Go to Cart
                                        </>
                                    ) : (
                                        <>
                                            <ShoppingCart className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                                            Add to Cart
                                        </>
                                    )}
                                </span>
                            </button>

                        </div> */}
          </div>
        </div>
      </div>
    );
  }

  // Grid View - Small & Standard
  return (
    <div
      ref={ref}
      className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-300 group flex flex-col h-full"
    >
      <div className="relative aspect-square overflow-hidden bg-gray-50">
        <img
          src={displayImage}
          alt={name}
          onClick={() => navigate(`/products/${productId}`)}
          className="w-full cursor-pointer h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />

        {discount && (
          <div className="absolute top-2 left-2 z-10">
            <span className="bg-[#501F08] text-white px-2 py-0.5 rounded text-[10px] font-bold">
              {discount}% OFF
            </span>
          </div>
        )}

        {/* <button
                    onClick={handleWishlist}
                    className={`absolute top-2 right-2 z-10 p-2 bg-white rounded-full shadow-sm transition-opacity duration-300 ${isInWishlist ? 'opacity-100' : 'opacity-0 group-hover:opacity-100 hover:bg-gray-50'}`}
                >
                    <Heart
                        className={`w-4 h-4 transition-colors ${isInWishlist ? 'fill-[#501F08] text-[#501F08]' : 'text-[#501F08]'}`}
                    />
                </button> */}
      </div>

      <div className="p-3 sm:p-4 flex flex-col flex-1">
        <div className="flex-1">
          <p className="text-[9px] sm:text-[10px] font-bold text-[#A87453] uppercase mb-0.5 sm:mb-1 opacity-70">
            {product.collectionTitle || product.category || "Luxury Collection"}
          </p>
          <h3 className="text-xs sm:text-sm font-bold text-gray-900 mb-1.5 sm:mb-2 group-hover:text-[#501F08] transition-colors line-clamp-2">
            {name}
          </h3>

          <div className="flex items-center gap-2 mb-3 sm:mb-4">
            <span className="text-base sm:text-lg font-bold text-[#501F08]">
              ₹{sellingPrice.toLocaleString()}
            </span>
            {originalPrice && originalPrice > sellingPrice && (
              <span className="text-[10px] sm:text-xs text-gray-400 line-through opacity-60">
                ₹{originalPrice.toLocaleString()}
              </span>
            )}
          </div>
        </div>

        {/* <button
                    onClick={isInCart ? () => navigate('/cart') : handleAddToCart}
                    className={`w-full relative group/btn overflow-hidden border-2 ${isInCart ? 'border-emerald-600 text-emerald-700 hover:text-white' : 'border-[#501F08] text-[#501F08] hover:text-white'} py-2 sm:py-2.5 px-4 rounded-xl font-black text-[10px] tracking-[0.15em] transition-all duration-300 hover:shadow-lg flex items-center justify-center gap-2 uppercase`}
                >
                    <div className={`absolute inset-0 ${isInCart ? 'bg-emerald-600' : 'bg-[#501F08]'} transform origin-left scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-300`}></div>
                    <span className="relative z-10 flex items-center gap-2">
                        {isInCart ? (
                            <>
                                <ShoppingCart className="w-3.5 h-3.5" />
                                Go to Cart
                            </>
                        ) : (
                            <>
                                <ShoppingCart className="w-3.5 h-3.5 group-hover/btn:scale-110 transition-transform" />
                                Add to Cart
                            </>
                        )}
                    </span>
                </button> */}
      </div>
    </div>
  );
});

export default ProductCard;
