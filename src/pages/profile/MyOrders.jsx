import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Package,
  Calendar,
  Hash,
  IndianRupee,
  MapPin,
  ArrowRight,
} from "lucide-react";
import { fetchOrders, cancelUserOrder } from "../../slices/orderSlice";
import { useNavigate } from "react-router-dom";

export default function MyOrders() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { orders, loading } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const handleCancel = async (orderId) => {
    if (window.confirm("Are you sure you want to cancel this order?")) {
      await dispatch(cancelUserOrder(orderId));
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-amber-100 text-amber-700 border-amber-200";
      case "Shipped":
        return "bg-sky-100 text-sky-700 border-sky-200";
      case "Delivered":
        return "bg-emerald-100 text-emerald-700 border-emerald-200";
      case "Canclled":
      case "Rejected":
        return "bg-rose-100 text-rose-700 border-rose-200";
      default:
        return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  if (loading && orders.length === 0) {
    return (
      <div className="space-y-6">
        {[1, 2].map((i) => (
          <div
            key={i}
            className="h-64 bg-white rounded-[32px] border border-gray-100 animate-pulse shadow-sm"
          ></div>
        ))}
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="bg-white rounded-[32px] p-16 text-center border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
        <div className="w-24 h-24 bg-[#501F08]/5 rounded-full flex items-center justify-center mx-auto mb-8">
          <Package className="w-12 h-12 text-[#501F08]/20" />
        </div>
        <h3 className="text-2xl font-black text-[#501F08] mb-3">
          No Orders Found
        </h3>
        <p className="text-gray-500 text-lg max-w-sm mx-auto mb-10 leading-relaxed">
          It looks like you haven't placed any orders yet. Explore our latest
          collections and start shopping!
        </p>
        <button
          className="bg-[#501F08] text-white px-10 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-[#3a1606] transition-all shadow-xl hover:shadow-[#501F08]/20 active:scale-95"
          onClick={() => navigate("/products")}
        >
          Explore Collections
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-[#501F08] tracking-tight">
            My Orders
          </h2>
          <p className="text-gray-500 font-medium">
            Manage and track your recent purchases
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {orders.map((order) => {
          const summary = order.orderSummery || {};
          const products = order.products || [];

          return (
            <div
              key={order.id}
              className="bg-white rounded-[20px] border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] overflow-hidden hover:shadow-[0_20px_40px_rgb(0,0,0,0.06)] transition-all duration-500 group/order"
            >
              {/* Card Header */}
              <div className="px-8 py-6 border-b border-gray-50 bg-[#FDFCFB]">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
                    <div>
                      <div className="flex items-center gap-2 text-gray-400 mb-1.5">
                        <Hash className="w-3.5 h-3.5" />
                        <span className="text-[10px] font-black uppercase tracking-widest">
                          Order ID
                        </span>
                      </div>
                      <p className="text-sm font-black text-gray-900 truncate max-w-[120px]">
                        {order.orderId}
                      </p>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 text-gray-400 mb-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        <span className="text-[10px] font-black uppercase tracking-widest">
                          Date
                        </span>
                      </div>
                      <p className="text-sm font-bold text-gray-900">
                        {new Date(order.createdAt).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 text-gray-400 mb-1.5">
                        <IndianRupee className="w-3.5 h-3.5" />
                        <span className="text-[10px] font-black uppercase tracking-widest">
                          Total
                        </span>
                      </div>
                      <p className="text-sm font-black text-[#501F08]">
                        ₹{summary.totalPrice?.toLocaleString() || "0"}
                      </p>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 text-gray-400 mb-1.5">
                        <MapPin className="w-3.5 h-3.5" />
                        <span className="text-[10px] font-black uppercase tracking-widest">
                          Status
                        </span>
                      </div>
                      <span
                        className={`inline-flex px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${getStatusColor(order.status)}`}
                      >
                        {order.status}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    {order.status?.toLowerCase() === "pending" && (
                      <button
                        onClick={() => handleCancel(order.id)}
                        className="px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-widest text-rose-600 hover:bg-rose-50 border border-rose-100 transition-all"
                      >
                        Cancel Order
                      </button>
                    )}
                    <button
                      onClick={() => navigate(`/profile/orders/${order.id}`)}
                      className="group/btn relative overflow-hidden bg-white border border-gray-100 text-gray-700 px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-widest transition-all duration-500 shadow-sm hover:border-[#501F08]"
                    >
                      <div className="absolute inset-0 w-0 bg-[#501F08] transition-all duration-500 ease-out group-hover/btn:w-full"></div>
                      <span className="relative z-10 flex items-center gap-2 group-hover/btn:text-white transition-colors duration-500">
                        View Details
                        <ArrowRight size={16} className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                      </span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Product Info */}
              <div className="px-8 py-6">
                <div className="space-y-6">
                  {products.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex flex-col sm:flex-row sm:items-center gap-6 pb-6 border-b border-gray-50 last:border-0 last:pb-0"
                    >
                      <div className="w-24 h-24 rounded-2xl bg-gray-50 border border-gray-100 overflow-hidden shrink-0 group-hover/order:scale-105 transition-transform duration-500">
                        <img
                          src={item.images?.[0]}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                          <h4 className="text-lg font-black text-gray-900">
                            {item.name}
                          </h4>
                          <div className="text-sm font-black text-[#501F08]">
                            ₹{item.selling_price?.toLocaleString()}
                          </div>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-400">
                          <span className="font-bold">
                            Qty:{" "}
                            <span className="text-gray-900">{item.qty}</span>
                          </span>
                          <span className="w-1.5 h-1.5 rounded-full bg-gray-200" />
                          <span className="font-bold">
                            Collection:{" "}
                            <span className="text-gray-900">
                              {item.collectionTitle}
                            </span>
                          </span>
                        </div>
                        {item.discount > 0 && (
                          <p className="mt-2 text-[10px] font-black uppercase text-green-600 tracking-wider">
                            You saved ₹
                            {(item.origional_price - item.selling_price) *
                              item.qty}{" "}
                            ({item.discount}% Off)
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
