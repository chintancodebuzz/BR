import {
  MapPin,
  Plus,
  ChevronRight,
  CreditCard,
  ShieldCheck,
  Home,
  Briefcase,
  Map,
  Loader2,
  ArrowLeft,
  X,
} from "lucide-react";
import { useCheckout } from "../hooks/useCheckout";

export default function Checkout() {
  const {
    items,
    cartLoading,
    addresses,
    addressLoading,
    user,
    selectedAddressId,
    showModal,
    modalView,
    formData,
    setShowModal,
    setModalView,
    handleAddNewSubmit,
    handleAddressSelect,
    handleInputChange,
    handlePlaceOrder,
    calculateTotal,
    navigate,
    setFormData,
  } = useCheckout();

  const getTypeIcon = (type) => {
    switch (type?.toLowerCase()) {
      case "home":
        return <Home className="w-4 h-4" />;
      case "office":
        return <Briefcase className="w-4 h-4" />;
      default:
        return <Map className="w-4 h-4" />;
    }
  };

  if (!user) return null;

  const selectedAddress = addresses.find((a) => a.id === selectedAddressId);

  return (
    <div className="bg-[#FDFDFD] py-10">
      <div className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12 py-4">
          <div className="flex items-center gap-2 text-sm font-medium text-gray-500">
            <span
              onClick={() => navigate("/cart")}
              className="cursor-pointer hover:text-[#501F08] transition-colors"
            >
              Cart
            </span>
            <ChevronRight className="w-4 h-4" />
            <span className="text-[#501F08] font-bold">Address & Payment</span>
          </div>
        </div>
      </div>

      <div className="max-w-screen-2xl mx-auto px-6 md:px-12 py-10">
        <div className="grid lg:grid-cols-12 gap-8 md:gap-12">
          <div className="lg:col-span-8 space-y-8">
            <div>
              <h1 className="text-3xl font-black text-[#501F08] mb-2 tracking-tight">
                Delivery Address
              </h1>
              <p className="text-gray-500 font-medium">
                Please select your delivery address and continue to payment for
                order confirmation.
              </p>
            </div>

            <div className="space-y-4">
              {addressLoading ? (
                <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm animate-pulse">
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gray-200 rounded-xl" />
                      <div className="w-16 h-4 bg-gray-200 rounded-md" />
                    </div>
                    <div className="w-20 h-8 bg-gray-200 rounded-xl" />
                  </div>
                  <div className="space-y-3">
                    <div className="w-1/3 h-6 bg-gray-200 rounded-md" />
                    <div className="w-2/3 h-5 bg-gray-200 rounded-md" />
                    <div className="w-1/2 h-4 bg-gray-200 rounded-md" />
                    <div className="w-1/4 h-4 bg-gray-200 rounded-md mt-4" />
                  </div>
                </div>
              ) : addresses.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-[32px] border-2 border-dashed border-gray-200">
                  <MapPin className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-400 font-medium mb-6">
                    No addresses saved yet.
                  </p>
                  <button
                    onClick={() => {
                      setShowModal(true);
                      setModalView("create");
                    }}
                    className="px-6 py-3 bg-[#501F08] text-white rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-[#3a1606] transition-all"
                  >
                    Add New Address
                  </button>
                </div>
              ) : selectedAddress ? (
                <div className="bg-white p-8 rounded-[32px] border border-[#501F08]/20 shadow-lg relative group overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#501F08]/5 rounded-bl-full -mr-16 -mt-16" />

                  <div className="flex justify-between items-start mb-6 relative">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 bg-[#501F08] text-white rounded-xl">
                        {getTypeIcon(selectedAddress.type)}
                      </div>
                      <span className="text-xs font-black uppercase tracking-widest text-[#501F08]">
                        {selectedAddress.type}
                      </span>
                      {selectedAddress.isDefault ? (
                        <span className="bg-green-50 text-green-700 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide">
                          Default
                        </span>
                      ) : (
                        ""
                      )}
                    </div>
                    <button
                      onClick={() => {
                        setShowModal(true);
                        setModalView("list");
                      }}
                      className="bg-gray-100 hover:bg-[#501F08] hover:text-white text-gray-600 px-5 py-2.5 rounded-xl font-bold text-[11px] uppercase tracking-widest transition-all shadow-sm"
                    >
                      Change
                    </button>
                  </div>

                  <div className="space-y-1 relative">
                    <p className="font-black text-[#501F08] text-lg mb-1">
                      {user?.name}
                    </p>
                    <p className="text-gray-900 font-bold leading-snug text-lg">
                      {selectedAddress.addressLine1}
                    </p>
                    {selectedAddress.addressLine2 && (
                      <p className="text-gray-500 font-medium">
                        {selectedAddress.addressLine2}
                      </p>
                    )}
                    <p className="text-gray-500 pt-1">
                      {selectedAddress.city}, {selectedAddress.state} -{" "}
                      {selectedAddress.zipCode}
                    </p>
                    <p className="text-gray-500">{selectedAddress.country}</p>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setShowModal(true);
                    setModalView("list");
                  }}
                  className="w-full py-6 border-2 border-dashed border-gray-300 text-gray-400 rounded-[24px] font-bold text-sm hover:border-[#501F08] hover:text-[#501F08] transition-all flex items-center justify-center gap-2"
                >
                  Select a Delivery Address
                </button>
              )}
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="bg-white rounded-[32px] border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 lg:sticky lg:top-32">
              <h2 className="text-xl font-black text-[#501F08] mb-6 flex items-center justify-between">
                Order Summary
              </h2>

              <div className="space-y-4 mb-8 max-h-60 overflow-y-auto custom-scrollbar pr-2">
                {cartLoading
                  ? [1].map((i) => (
                    <div
                      key={i}
                      className="flex gap-4 items-center animate-pulse"
                    >
                      <div className="w-16 h-16 rounded-xl bg-gray-200 shrink-0" />
                      <div className="flex-1 space-y-2">
                        <div className="w-24 h-4 bg-gray-200 rounded-md" />
                        <div className="w-12 h-3 bg-gray-200 rounded-md" />
                      </div>
                      <div className="w-16 h-4 bg-gray-200 rounded-md" />
                    </div>
                  ))
                  : items.map((item) => (
                    <div
                      key={item._id || item.cartId}
                      className="flex gap-4 items-center"
                    >
                      <div className="w-16 h-16 rounded-xl bg-gray-50 overflow-hidden border border-gray-100 shrink-0">
                        <img
                          src={item?.images?.[0] || item?.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-bold text-gray-900 truncate">
                          {item.name}
                        </h4>
                        <p className="text-xs text-gray-500">
                          Qty: {item.qty}
                        </p>
                      </div>
                      <div className="text-sm font-black text-[#501F08]">
                        ₹
                        {(
                          item?.selling_price || item?.price
                        ).toLocaleString()}
                      </div>
                    </div>
                  ))}
              </div>

              <div className="space-y-3 mb-8 pt-6 border-t border-dashed border-gray-200">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500 font-medium">Subtotal</span>
                  <span className="font-bold text-gray-900">
                    ₹{calculateTotal().toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500 font-medium">Shipping</span>
                  <span className="font-bold text-green-600">Free</span>
                </div>
                <div className="flex justify-between items-center text-lg pt-4">
                  <span className="font-black text-[#501F08]">Total</span>
                  <span className="font-black text-[#501F08]">
                    ₹{calculateTotal().toLocaleString()}
                  </span>
                </div>
              </div>

              <button
                disabled={!selectedAddressId}
                onClick={handlePlaceOrder}
                className={`w-full relative group overflow-hidden bg-transparent border-2 border-[#501F08] text-[#501F08] py-3 rounded-2xl font-black text-[16px]  transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${selectedAddressId ? "hover:text-white hover:shadow-xl" : ""
                  }`}
              >
                <div
                  className={`absolute inset-0 bg-[#501F08] transform origin-left scale-x-0 transition-transform duration-300 ${selectedAddressId ? "group-hover:scale-x-100" : ""
                    }`}
                />
                <span className="relative z-10 flex items-center justify-center gap-3">
                  <CreditCard className="w-4 h-4" />
                  Proceed to Pay
                </span>
              </button>

              <div className="mt-6 flex items-center justify-center gap-2 text-gray-400">
                <ShieldCheck className="w-4 h-4" />
                <span className="text-[10px] uppercase font-bold tracking-widest">
                  Secure SSL Encryption
                </span>
              </div>
            </div>
          </div>
        </div>

        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
              onClick={() => setShowModal(false)}
            />

            <div className="relative w-full max-w-2xl bg-white rounded-[32px] shadow-2xl animate-in fade-in zoom-in-95 duration-300 overflow-hidden flex flex-col max-h-[80vh]">
              <div className="p-8 pb-4 border-b border-gray-50 flex items-center justify-between shrink-0 bg-white sticky top-0 z-10">
                <div className="flex items-center gap-3">
                  {modalView === "create" && (
                    <button
                      onClick={() => setModalView("list")}
                      className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500"
                    >
                      <ArrowLeft className="w-5 h-5" />
                    </button>
                  )}
                  <h2 className="text-2xl font-black text-[#501F08]">
                    {modalView === "list"
                      ? "Select Address"
                      : "Add New Address"}
                  </h2>
                </div>

                <div className="flex items-center gap-4">
                  {modalView === "list" && (
                    <button
                      onClick={() => setModalView("create")}
                      className="text-[#A87453] hover:text-[#501F08] font-bold text-xs uppercase tracking-widest flex items-center gap-2 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                      Add New
                    </button>
                  )}
                  <button
                    onClick={() => setShowModal(false)}
                    className="p-2 hover:bg-[#501F08]/5 rounded-full transition-colors text-gray-400 hover:text-[#501F08]"
                  >
                    <X className="w-6 h-6 rotate-90" />
                  </button>
                </div>
              </div>

              <div className="p-6 md:p-8 overflow-y-auto custom-scrollbar bg-[#FAFAFA]">
                {modalView === "list" ? (
                  <div className="space-y-4">
                    {addressLoading
                      ? [1, 2, 3].map((i) => (
                        <div
                          key={i}
                          className="p-5 rounded-[20px] border border-gray-100 bg-white shadow-sm flex items-start gap-4 animate-pulse"
                        >
                          <div className="mt-1 w-5 h-5 rounded-full bg-gray-200 shrink-0" />
                          <div className="flex-1 space-y-2">
                            <div className="w-16 h-5 bg-gray-200 rounded-md" />
                            <div className="space-y-1 pt-2">
                              <div className="w-32 h-4 bg-gray-200 rounded-sm" />
                              <div className="w-48 h-4 bg-gray-200 rounded-sm" />
                              <div className="w-24 h-4 bg-gray-200 rounded-sm" />
                            </div>
                          </div>
                        </div>
                      ))
                      : addresses.map((addr) => (
                        <div
                          key={addr.id}
                          onClick={() => handleAddressSelect(addr.id)}
                          className={`relative cursor-pointer p-5 rounded-[20px] border-2 transition-all duration-200 group flex items-start gap-4 ${selectedAddressId === addr.id
                              ? "border-[#501F08] bg-white shadow-lg ring-1 ring-[#501F08]/10"
                              : "border-transparent bg-white shadow-sm hover:border-[#501F08]/20 hover:shadow-md"
                            }`}
                        >
                          <div
                            className={`mt-1 w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${selectedAddressId === addr.id
                                ? "border-[#501F08]"
                                : "border-gray-300 group-hover:border-[#501F08]/50"
                              }`}
                          >
                            {selectedAddressId === addr.id && (
                              <div className="w-2.5 h-2.5 rounded-full bg-[#501F08]" />
                            )}
                          </div>

                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <span
                                className={`text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-md ${addr.type === "Home"
                                    ? "bg-orange-50 text-orange-700"
                                    : addr.type === "Office"
                                      ? "bg-blue-50 text-blue-700"
                                      : "bg-gray-100 text-gray-600"
                                  }`}
                              >
                                {addr.type}
                              </span>
                              {addr.isDefault ? (
                                <span className="bg-green-50 text-green-700 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide">
                                  Default
                                </span>
                              ) : (
                                ""
                              )}
                            </div>

                            <div className="space-y-0.5">
                              <p className="font-black text-[#501F08] text-sm">
                                {user?.name}
                              </p>
                              <p className="font-bold text-gray-900 leading-snug">
                                {addr.addressLine1}
                              </p>
                              {addr.addressLine2 && (
                                <p className="text-sm text-gray-500">
                                  {addr.addressLine2}
                                </p>
                              )}
                              <p className="text-sm text-gray-500">
                                {addr.city}, {addr.state} - {addr.zipCode}
                              </p>
                              <p className="text-sm text-gray-500">
                                {addr.country}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                ) : (
                  <form onSubmit={handleAddNewSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[11px] font-black text-[#501F08] uppercase tracking-widest opacity-60">
                          Address Line 1
                        </label>
                        <input
                          required
                          name="addressLine1"
                          value={formData.addressLine1}
                          onChange={handleInputChange}
                          className="w-full bg-[#FAF7F5] border-transparent focus:border-[#501F08]/20 focus:bg-white rounded-xl px-4 py-3.5 text-sm outline-none transition-all"
                          placeholder="Street Address"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[11px] font-black text-[#501F08] uppercase tracking-widest opacity-60">
                          Address Line 2
                        </label>
                        <input
                          name="addressLine2"
                          value={formData.addressLine2}
                          onChange={handleInputChange}
                          className="w-full bg-[#FAF7F5] border-transparent focus:border-[#501F08]/20 focus:bg-white rounded-xl px-4 py-3.5 text-sm outline-none transition-all"
                          placeholder="Apt, Suite, etc."
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[11px] font-black text-[#501F08] uppercase tracking-widest opacity-60">
                          City
                        </label>
                        <input
                          required
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          className="w-full bg-[#FAF7F5] border-transparent focus:border-[#501F08]/20 focus:bg-white rounded-xl px-4 py-3.5 text-sm outline-none transition-all"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[11px] font-black text-[#501F08] uppercase tracking-widest opacity-60">
                          State
                        </label>
                        <input
                          required
                          name="state"
                          value={formData.state}
                          onChange={handleInputChange}
                          className="w-full bg-[#FAF7F5] border-transparent focus:border-[#501F08]/20 focus:bg-white rounded-xl px-4 py-3.5 text-sm outline-none transition-all"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[11px] font-black text-[#501F08] uppercase tracking-widest opacity-60">
                          Zip Code
                        </label>
                        <input
                          required
                          name="zipCode"
                          value={formData.zipCode}
                          onChange={handleInputChange}
                          className="w-full bg-[#FAF7F5] border-transparent focus:border-[#501F08]/20 focus:bg-white rounded-xl px-4 py-3.5 text-sm outline-none transition-all"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[11px] font-black text-[#501F08] uppercase tracking-widest opacity-60">
                          Address Type
                        </label>
                        <div className="flex gap-3">
                          {["Home", "Office", "Other"].map((type) => (
                            <button
                              key={type}
                              type="button"
                              onClick={() =>
                                setFormData((prev) => ({ ...prev, type }))
                              }
                              className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${formData.type === type ? "bg-[#501F08] text-white shadow-md" : "bg-gray-50 text-gray-400 hover:bg-gray-100"}`}
                            >
                              {type}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-4 pt-4 border-t border-gray-50">
                      <button
                        type="submit"
                        disabled={addressLoading}
                        className="flex-1 bg-[#501F08] text-white py-4 rounded-xl font-bold text-[12px] tracking-widest uppercase hover:bg-[#3a1606] transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-70"
                      >
                        {addressLoading && (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        )}
                        Save Address
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setModalView("list");
                          setFormData({
                            addressLine1: "",
                            addressLine2: "",
                            city: "",
                            state: "",
                            zipCode: "",
                            country: "",
                            type: "Home",
                          });
                        }}
                        className="px-8 bg-gray-100 text-gray-500 py-4 rounded-xl font-bold text-[12px] tracking-widest uppercase hover:bg-gray-200 transition-all"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
