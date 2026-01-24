import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  ArrowLeft,
  MapPin,
  CreditCard,
  Calendar,
  Hash,
  User,
  Clock,
  Info,
} from "lucide-react";
import { fetchOrderDetails } from "../../slices/orderSlice";
import { fetchAddresses } from "../../slices/authSlice";

export default function OrderDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { orderDetails: order, loading: orderLoading } = useSelector(
    (state) => state.order,
  );
  const { user, addresses } = useSelector((state) => state.auth);

  useEffect(() => {
    if (id) {
      dispatch(fetchOrderDetails(id));
    }
    if (addresses.length === 0) {
      dispatch(fetchAddresses());
    }
  }, [dispatch, id]);

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-amber-50 text-amber-600 border-amber-100";
      case "Shipped":
        return "bg-sky-50 text-sky-600 border-sky-100";
      case "Delivered":
        return "bg-emerald-50 text-emerald-600 border-emerald-100";
      case "Canclled":
      case "Rejected":
        return "bg-rose-50 text-rose-600 border-rose-100";
      default:
        return "bg-slate-50 text-slate-500 border-slate-100";
    }
  };

  if (orderLoading && !order) {
    return (
      <div className="animate-pulse space-y-6">
        <div className="flex items-center gap-6 mb-4">
          <div className="w-14 h-14 bg-gray-200 rounded-[22px]"></div>
          <div className="space-y-3">
            <div className="h-8 w-48 bg-gray-200 rounded-lg"></div>
            <div className="h-4 w-64 bg-gray-200 rounded-md"></div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-3">
            <div className="bg-white rounded-3xl border border-gray-100 p-2 overflow-hidden">
              {[1].map((i) => (
                <div
                  key={i}
                  className="p-6 flex gap-6 border-b border-gray-50 last:border-0"
                >
                  <div className="w-24 h-24 bg-gray-200 rounded-2xl shrink-0"></div>
                  <div className="flex-1 space-y-4">
                    <div className="flex justify-between items-start">
                      <div className="h-6 w-1/2 bg-gray-200 rounded-md"></div>
                      <div className="h-6 w-20 bg-gray-200 rounded-md"></div>
                    </div>
                    <div className="h-4 w-1/3 bg-gray-200 rounded-md"></div>
                    <div className="h-4 w-24 bg-gray-200 rounded-md"></div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-3xl border border-gray-100 px-8 py-6 space-y-6">
              <div className="h-6 w-40 bg-gray-200 rounded-md"></div>
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 bg-gray-200 rounded-2xl shrink-0"></div>
                <div className="space-y-2 flex-1">
                  <div className="h-3 w-20 bg-gray-200 rounded-md"></div>
                  <div className="h-5 w-1/2 bg-gray-200 rounded-md"></div>
                </div>
              </div>
              <div className="flex items-start gap-6">
                <div className="w-14 h-14 bg-gray-200 rounded-2xl shrink-0"></div>
                <div className="space-y-3 flex-1">
                  <div className="h-3 w-24 bg-gray-200 rounded-md"></div>
                  <div className="h-20 w-full bg-gray-200 rounded-2xl"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-3xl border border-gray-100 p-8 space-y-6">
              <div className="h-6 w-32 bg-gray-200 rounded-md"></div>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex justify-between">
                    <div className="h-4 w-20 bg-gray-200 rounded-md"></div>
                    <div className="h-4 w-16 bg-gray-200 rounded-md"></div>
                  </div>
                ))}
                <div className="pt-8 border-t border-dashed border-gray-200 flex justify-between items-end">
                  <div className="h-4 w-24 bg-gray-200 rounded-md"></div>
                  <div className="h-10 w-32 bg-gray-200 rounded-md"></div>
                </div>
              </div>
              <div className="h-16 w-full bg-gray-200 rounded-[24px]"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="w-20 h-20 bg-rose-50 rounded-full flex items-center justify-center mb-6">
          <Info className="w-10 h-10 text-rose-200" />
        </div>
        <h2 className="text-2xl font-black text-[#501F08] mb-2">
          Order Tracking Unavailable
        </h2>
        <p className="text-gray-500 mb-8 max-w-xs">
          We couldn't retrieve the details for this order. Please try again
          later.
        </p>
        <button
          onClick={() => navigate("/profile/orders")}
          className="bg-[#501F08] text-white px-8 py-3.5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-[#3a1606] transition-all"
        >
          Return to Orders
        </button>
      </div>
    );
  }

  const products = order.products || [];
  const summary = order.orderSummery || {};

  const shippingAddr =
    addresses.find((a) => a.id === order.userAddressId) || addresses[0];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-4">
        <div className="flex items-start gap-6">
          <button
            onClick={() => navigate("/profile/orders")}
            className="p-4 bg-white border border-gray-100 rounded-[22px] hover:bg-[#501F08] hover:text-white transition-all shadow-sm group active:scale-95"
          >
            <ArrowLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
          </button>

          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-4">
              <h1 className="text-2xl font-black text-[#501F08] tracking-tight">
                Order Details
              </h1>
              <span
                className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border transition-colors ${getStatusColor(order.status)}`}
              >
                {order.status}
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400 font-bold">
              <div className="flex items-center gap-2">
                <Hash className="w-4 h-4 text-gray-300" />
                <span className="text-gray-900 tracking-tight">
                  {order.orderId}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-300" />
                <span>
                  Ordered on &nbsp;
                  <span className="text-gray-900">
                    {new Date(order.createdAt).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-3">
          <div className="bg-white rounded-3xl border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] overflow-hidden">
            <div className="divide-y divide-gray-50 px-2">
              {products.map((item, idx) => (
                <div
                  key={idx}
                  className="p-6 flex flex-col md:flex-row gap-6 hover:bg-[#FDFCFB]/50 transition-all duration-300 group"
                >
                  <div className="w-24 h-24 rounded-2xl bg-gray-50 border border-gray-100 overflow-hidden shrink-0 group-hover:scale-105 transition-transform duration-500 shadow-sm group-hover:shadow-md">
                    <img
                      src={item.images?.[0]}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 flex flex-col justify-center">
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                      <div className="space-y-3">
                        <h4 className="text-xl font-black text-[#501F08] leading-tight transition-colors">
                          {item.name}
                        </h4>
                        <div className="flex items-center gap-4">
                          <span className="px-3.5 py-1.5 bg-[#501F08]/5 text-[#501F08] rounded-xl text-[10px] font-black uppercase tracking-[0.15em]">
                            {item.collectionTitle}
                          </span>
                          <span className="text-sm font-black text-gray-400">
                            Qty:{" "}
                            <span className="text-gray-900 border-b-2 border-[#501F08]/10 pb-0.5">
                              {item.qty}
                            </span>
                          </span>
                        </div>
                      </div>
                      <div className="md:text-right space-y-1">
                        <div className="text-3xl font-black text-[#501F08] tracking-tight">
                          ₹{item.selling_price?.toLocaleString()}
                        </div>
                        {item.discount > 0 && (
                          <div className="text-[11px] font-black text-emerald-600 uppercase tracking-widest bg-emerald-50 px-2 py-0.5 rounded-md inline-block">
                            Saved ₹
                            {(
                              (item.origional_price - item.selling_price) *
                              item.qty
                            ).toLocaleString()}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-gray-100 px-8 py-6 shadow-[0_4px_20px_rgba(0,0,0,0.02)] space-y-6">
            <div className="space-y-2">
              <h3 className="text-lg font-black text-[#501F08] tracking-tight">
                Shipping Details
              </h3>

              <div className="flex items-center gap-6 p-1">
                <div className="w-14 h-14 bg-[#501F08]/5 border border-[#501F08]/10 rounded-2xl flex items-center justify-center text-[#501F08] shrink-0 shadow-sm">
                  <User className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                    Recipient
                  </p>
                  <p className="text-xl font-black text-gray-900 leading-tight tracking-tight">
                    {user?.name || "Customer"}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-6 p-1">
                <div className="w-14 h-14 bg-amber-50 border border-amber-100 rounded-2xl flex items-center justify-center text-amber-600 shrink-0 shadow-sm mt-1">
                  <MapPin className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                      Delivery Address
                    </p>
                    {shippingAddr?.type && (
                      <span className="bg-white border border-gray-100 px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest text-gray-600 shadow-sm">
                        {shippingAddr.type}
                      </span>
                    )}
                  </div>
                  <p className="text-md font-bold text-gray-800 leading-relaxed bg-gray-50/50 py-2 rounded-2xl border border-gray-50">
                    {shippingAddr ? (
                      <>
                        <span className="block text-gray-900 font-black mb-1">
                          {shippingAddr.addressLine1}
                        </span>
                        {shippingAddr.addressLine2 && (
                          <span className="block mb-1">
                            {shippingAddr.addressLine2}
                          </span>
                        )}
                        <span className="block text-gray-500 uppercase text-xs tracking-wider">
                          {shippingAddr.city}, {shippingAddr.state}{" "}
                          {shippingAddr.zipCode}
                        </span>
                        <span className="block text-gray-400 text-[11px] font-black uppercase mt-1 tracking-widest">
                          {shippingAddr.country}
                        </span>
                      </>
                    ) : (
                      <span className="flex items-center gap-2 text-gray-400 italic">
                        <Clock className="w-4 h-4 animate-pulse" />
                        Locating address details...
                      </span>
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-[0_4px_20px_rgba(0,0,0,0.02)] space-y-6">
            <h3 className="text-lg font-black text-[#501F08] tracking-tight">
              Order Summary
            </h3>

            <div className="space-y-5">
              <div className="flex justify-between items-center group">
                <span className="text-sm font-bold text-gray-400 group-hover:text-gray-600 transition-colors">
                  Subtotal
                </span>
                <span className="text-sm font-black text-gray-900">
                  ₹{summary.subTotalPrice?.toLocaleString()}
                </span>
              </div>

              {summary.totalDiscount > 0 && (
                <div className="flex justify-between items-center group">
                  <span className="text-sm font-bold text-emerald-600/80 group-hover:text-emerald-600 transition-colors">
                    Discount Applied
                  </span>
                  <span className="text-sm font-black text-emerald-600">
                    - ₹{summary.totalDiscount?.toLocaleString()}
                  </span>
                </div>
              )}

              <div className="flex justify-between items-center group">
                <span className="text-sm font-bold text-gray-400 group-hover:text-gray-600 transition-colors">
                  Shipping Fee
                </span>
                <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">
                  Free Delivery
                </span>
              </div>

              <div className="pt-8 border-t border-dashed border-gray-100">
                <div className="flex justify-between items-end">
                  <div className="space-y-1">
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
                      Grand Total
                    </span>
                    <p className="text-[10px] font-bold text-gray-400 italic">
                      Inclusive of all taxes
                    </p>
                  </div>
                  <span className="text-4xl font-[1000] text-[#501F08] leading-none mb-1 tracking-tighter">
                    ₹{summary.totalPrice?.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            <div className="p-6 bg-[#FEF9F6] rounded-[30px] border border-[#501F08]/5 flex items-start gap-4">
              <div className="p-3 bg-[#501F08] text-white rounded-[18px] shadow-lg shadow-[#501F08]/10">
                <CreditCard className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                  Payment Mode
                </p>
                <p className="text-sm font-black text-[#501F08]">
                  Cash on Delivery
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
