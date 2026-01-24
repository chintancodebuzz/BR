import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ShoppingCart, Trash2, ArrowRight, Plus, Minus } from "lucide-react";
import {
  fetchCart,
  removeFromCart,
  updateCartQty,
} from "../../../slices/cartSlice";

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

  const handleRemove = async (id) => {
    await dispatch(removeFromCart(id));
  };

  const handleQuantityChange = (item, type) => {
    const increment = type === "inc" ? 1 : -1;
    const currentQty = item?.qty || 1;
    if (currentQty + increment < 1) return;

    dispatch(
      updateCartQty({
        cartId: item.cartId,
        productId: item._id || item.productId,
        qty: increment,
      }),
    );
  };

  const calculateTotal = () => {
    return items.reduce((total, item) => {
      const price = item?.selling_price || item?.price || item?.salePrice || 0;
      const quantity = item?.qty || 1;
      return total + price * quantity;
    }, 0);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-[#FDFDFD] flex items-center justify-center p-6 text-center">
        <div className="max-w-md w-full bg-white p-10 rounded-[32px] shadow-xl border border-gray-100">
          <div className="w-20 h-20 bg-[#501F08]/5 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingCart className="w-10 h-10 text-[#501F08]" />
          </div>
          <h2 className="text-3xl font-black text-[#501F08] mb-4  tracking-tight">
            Login Required
          </h2>
          <p className="text-gray-500 mb-8 font-medium">
            Please sign in to view your curated cart items.
          </p>
          <button
            onClick={() => navigate("/login")}
            className="w-full py-4 bg-[#501F08] text-white rounded-2xl font-black text-xs tracking-[0.2em] hover:bg-[#3a1606] transition-all  shadow-lg"
          >
            Login Now
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className=" bg-[#FDFDFD] pb-10">
      <div className="mx-auto px-6 md:px-12 lg:px-24 py-12">
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-black text-[#501F08] mb-1">
              Shopping Cart
            </h1>
            <p className="text-md font-bold text-[#A87453]  opacity-60">
              {items.length}{" "}
              {items.length === 1 ? "Masterpiece" : "Masterpieces"} curated in
              your collection
            </p>
          </div>
        </div>

        {loading ? (
          <div className="grid lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8 space-y-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-44 bg-white/50 rounded-[24px] border border-gray-100 animate-pulse"
                />
              ))}
            </div>
            <div className="lg:col-span-4 h-80 bg-white/50 rounded-[32px] border border-gray-100 animate-pulse" />
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-32 bg-white rounded-[40px] border border-gray-100 shadow-xl max-w-2xl mx-auto mt-12 flex flex-col items-center">
            <div className="w-24 h-24 bg-[#501F08]/5 rounded-full flex items-center justify-center mb-8 animate-float">
              <ShoppingCart className="w-10 h-10 text-[#501F08] opacity-30" />
            </div>
            <h2 className="text-3xl font-black text-[#501F08] mb-4  tracking-tight">
              Your Cart is Empty
            </h2>
            <p className="text-gray-500 mb-10 text-lg font-medium italic">
              Your collection is waiting for its first masterpiece.
            </p>
            <button
              onClick={() => navigate("/products")}
              className="px-12 py-4 bg-[#501F08] text-white rounded-2xl font-black text-xs tracking-[0.2em] hover:bg-[#3a1606] transition-all hover:shadow-2xl  flex items-center gap-3 group"
            >
              Browse Collection
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-12 gap-6">
            {/* Items List */}
            <div className="lg:col-span-9 space-y-3">
              {items.map((item) => (
                <div
                  key={item._id || item.id}
                  className="group bg-white rounded-[32px] border border-gray-100 p-4 hover:shadow-sm hover:border-[#501F08]/10 transition-all duration-500 relative flex flex-col sm:flex-row gap-8"
                >
                  <div className="w-full sm:w-40 aspect-square rounded-[20px] overflow-hidden bg-gray-50 shrink-0 border border-gray-100 shadow-sm">
                    <img
                      src={
                        item?.images?.[0] || item?.image || "/placeholder.jpg"
                      }
                      alt={item?.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-start py-2">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="text-[12px] font-black text-[#A87453]  tracking-[0.3em] mb-2 opacity-70">
                          {item?.collectionTitle ||
                            item?.category ||
                            "Luxury Selection"}
                        </p>
                        <h3 className="text-xl font-black text-[#1A1A1A] group-hover:text-[#501F08] transition-colors leading-tight">
                          {item?.name || item?.title}
                        </h3>
                      </div>
                      <button
                        onClick={() => handleRemove(item?.cartId)}
                        className="p-3 bg-red-50 text-red-400 hover:text-red-600 hover:bg-red-100 rounded-2xl transition-all duration-300 cursor-pointer"
                        title="Remove Item"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl font-black text-[#501F08]">
                          ₹
                          {(
                            item?.selling_price ||
                            item?.price ||
                            0
                          ).toLocaleString()}
                        </span>
                        {(item?.origional_price || item?.originalPrice) >
                          (item?.selling_price || item?.price) && (
                          <span className="text-sm font-bold text-gray-300 line-through">
                            ₹
                            {(
                              item?.origional_price || item?.originalPrice
                            ).toLocaleString()}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center justify-between border-t border-gray-50 pt-4 mt-auto">
                      <div className="flex items-center gap-6">
                        {/* Quantity Controls - Small & Dark Theme */}
                        <div className="flex items-center bg-[#501F08] rounded-xl p-1 shadow-md border border-[#501F08]/10">
                          <button
                            onClick={() => handleQuantityChange(item, "dec")}
                            className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-white/10 text-white transition-all disabled:opacity-30 cursor-pointer"
                            disabled={item?.qty <= 1}
                          >
                            <Minus size={14} />
                          </button>
                          <span className="w-8 text-center font-bold text-white text-sm">
                            {item?.qty || 1}
                          </span>
                          <button
                            onClick={() => handleQuantityChange(item, "inc")}
                            className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-white/10 text-white transition-all cursor-pointer"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary Sidebar */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-3xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-6 lg:sticky lg:top-32 overflow-hidden">
                {/* Decorative Element */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#501F08]/5 rounded-full -mr-16 -mt-16 blur-3xl opacity-50" />

                <h2 className="text-xl font-black text-[#501F08] mb-4 pb-4 border-b border-gray-50 flex items-center justify-between">
                  Summary
                  <span className="text-[14px] font-bold text-gray-400  tracking-widest">
                    {items.length} Items
                  </span>
                </h2>

                <div className="space-y-2 mb-10">
                  <div className="flex justify-between items-center text-md">
                    <span className="text-gray-500 font-bold  tracking-wider">
                      Subtotal
                    </span>
                    <span className="text-gray-900 font-black">
                      ₹{calculateTotal().toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-md">
                    <span className="text-gray-500 font-bold tracking-wider">
                      Shipping
                    </span>
                    <span className="text-green-600 font-black tracking-wider">
                      Free
                    </span>
                  </div>

                  <div className="mt-8 pt-6 border-t border-dashed border-gray-200">
                    <div className="flex justify-between items-center">
                      <div className="flex flex-col gap-1">
                        <span className="text-[12px] font-black text-gray-400  tracking-widest">
                          Grand Total
                        </span>
                        <span className="text-[12px] text-gray-400 italic">
                          Inclusive of all taxes
                        </span>
                      </div>
                      <span className="text-3xl font-black text-[#501F08] leading-none">
                        ₹{calculateTotal().toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={() => navigate("/checkout")}
                    className="w-full bg-[#501F08] text-white py-4 rounded-2xl font-black text-[14px]  hover:bg-[#3a1606] transition-all  flex items-center justify-center gap-2  group"
                  >
                    Checkout Now
                    <ArrowRight
                      size={16}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </button>
                </div>

                {/* Unique touch: subtle trust message */}
                <p className="mt-6 text-center text-[10px] font-bold text-gray-300  tracking-widest">
                  Secure Checkout • Worldwide Delivery
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
