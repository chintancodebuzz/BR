import React from "react";
import {
    Plus,
    Trash2,
    Edit2,
    Check,
    X,
    Loader2,
    MapPin
} from "lucide-react";
import ConfirmationModal from "../../../components/models/ConfirmationModal";

import { AddressSkeleton } from "../../../components/common/loading-skeletons";

const ManageAddressView = ({
    addresses,
    addressLoading,
    isAdding,
    setIsAdding,
    editingId,
    setEditingId,
    deleteModalOpen,
    setDeleteModalOpen,
    formData,
    handleInputChange,
    handleSubmit,
    handleEdit,
    handleDelete,
    confirmDelete,
    handleSetDefault,
    getTypeIcon,
    resetForm
}) => {
    return (
        <div className="mx-auto">
            <div className="flex justify-between items-center mb-10">
                <div>
                    <h2 className="text-2xl font-black text-[#501F08] ">Manage Addresses</h2>
                    <p className="text-xs font-bold text-[#A87453]   opacity-70 mt-1">
                        Configure your delivery destinations
                    </p>
                </div>
                {!isAdding && (
                    <button
                        onClick={() => { setIsAdding(true); resetForm(); }}
                        className="flex items-center gap-2 bg-[#501F08] text-white px-6 py-3 rounded-xl font-bold text-[14px] hover:bg-[#3a1606] transition-all shadow-lg hover:shadow-[#501F08]/20"
                    >
                        <Plus className="w-4 h-4" />
                        Add New Address
                    </button>
                )}
            </div>

            {isAdding ? (
                /* ... (staying as is) ... */
                <div className="bg-white rounded-[32px] border border-gray-100 p-8 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-50">
                        <h3 className="text-lg font-bold text-[#501F08] ">
                            {editingId ? "Edit Address Details" : "New Address Information"}
                        </h3>
                        <button
                            onClick={() => { setIsAdding(false); setEditingId(null); }}
                            className="p-2 hover:bg-red-50 text-gray-400 hover:text-red-500 rounded-lg transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[12px] font-black text-[#501F08] uppercase  opacity-60">Address Line 1*</label>
                                <input
                                    required
                                    type="text"
                                    name="addressLine1"
                                    value={formData.addressLine1}
                                    onChange={handleInputChange}
                                    placeholder="Street name, building etc"
                                    className="w-full bg-[#FAF7F5] border-transparent focus:border-[#501F08]/20 focus:bg-white rounded-xl px-4 py-3.5 text-sm transition-all outline-hidden"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[12px] font-black text-[#501F08] uppercase  opacity-60">Address Line 2 (Optional)</label>
                                <input
                                    type="text"
                                    name="addressLine2"
                                    value={formData.addressLine2}
                                    onChange={handleInputChange}
                                    placeholder="Apt, Suite, Floor etc"
                                    className="w-full bg-[#FAF7F5] border-transparent focus:border-[#501F08]/20 focus:bg-white rounded-xl px-4 py-3.5 text-sm transition-all outline-hidden"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[12px] font-black text-[#501F08] uppercase  opacity-60">City*</label>
                                <input
                                    required
                                    type="text"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleInputChange}
                                    className="w-full bg-[#FAF7F5] border-transparent focus:border-[#501F08]/20 focus:bg-white rounded-xl px-4 py-3.5 text-sm transition-all outline-hidden"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[12px] font-black text-[#501F08] uppercase  opacity-60">State*</label>
                                <input
                                    required
                                    type="text"
                                    name="state"
                                    value={formData.state}
                                    onChange={handleInputChange}
                                    className="w-full bg-[#FAF7F5] border-transparent focus:border-[#501F08]/20 focus:bg-white rounded-xl px-4 py-3.5 text-sm transition-all outline-hidden"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[12px] font-black text-[#501F08] uppercase  opacity-60">Zip / Postal Code*</label>
                                <input
                                    required
                                    type="text"
                                    name="zipCode"
                                    value={formData.zipCode}
                                    onChange={handleInputChange}
                                    className="w-full bg-[#FAF7F5] border-transparent focus:border-[#501F08]/20 focus:bg-white rounded-xl px-4 py-3.5 text-sm transition-all outline-hidden"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[12px] font-black text-[#501F08] uppercase  opacity-60">Address Type</label>
                                <div className="flex gap-4">
                                    {['Home', 'Office', 'Other'].map(type => (
                                        <button
                                            key={type}
                                            type="button"
                                            onClick={() => handleInputChange({ target: { name: 'type', value: type } })}
                                            className={`flex-1 py-3 px-4 rounded-xl border text-[12px] font-black uppercase  transition-all flex items-center justify-center gap-2 ${formData.type === type ? 'bg-[#501F08] text-white border-[#501F08] shadow-md' : 'bg-white text-gray-400 border-gray-100 hover:border-[#501F08]/20'}`}
                                        >
                                            {getTypeIcon(type)}
                                            {type}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="pt-6 border-t border-gray-50 flex justify-end gap-4">
                            <button
                                type="button"
                                onClick={() => { setIsAdding(false); setEditingId(null); }}
                                className="px-8 border border-gray-200 text-gray-500 py-3 rounded-xl font-bold text-[11px] uppercase hover:bg-gray-50 transition-all"
                            >
                                Cancel
                            </button>
                            <button
                                disabled={addressLoading}
                                type="submit"
                                className="bg-[#501F08] text-white px-8 py-3 rounded-xl font-bold text-[11px] uppercase hover:bg-[#3a1606] transition-all shadow-lg flex items-center gap-2 disabled:opacity-50"
                            >
                                {addressLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                                {editingId ? "Update Address" : "Save Address"}
                            </button>
                        </div>
                    </form>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                    {addressLoading && addresses.length === 0 ? (
                        <AddressSkeleton count={3} />
                    ) : addresses.length === 0 ? (
                        <div className="col-span-2 py-20 bg-white border-2 border-dashed border-gray-100 rounded-[32px] flex flex-col items-center justify-center text-center px-10">
                            <div className="w-20 h-20 bg-[#FAF7F5] rounded-full flex items-center justify-center mb-6">
                                <MapPin className="w-8 h-8 text-[#501F08]/20" />
                            </div>
                            <h4 className="text-[#501F08] font-bold text-lg mb-2 uppercase">No Saved Addresses</h4>
                            <p className="text-gray-400 text-xs italic leading-relaxed max-w-sm">"Your masterpiece deserves a perfect destination. Let's add your first delivery address."</p>
                        </div>
                    ) : (
                        addresses.map((address) => (
                            <div
                                key={address.id}
                                className={`relative bg-white rounded-[28px] p-6 border transition-all duration-300 group ${address.isDefault ? 'border-[#501F08]/10 shadow-[0_15px_35px_rgba(80,31,8,0.06)]' : 'border-gray-50 hover:border-[#501F08]/10 hover:shadow-md'}`}
                            >
                                <div className="flex justify-between items-start mb-6">
                                    <div className={`px-4 py-1.5 rounded-full flex items-center gap-2 text-[8px] font-black uppercase  ${address.type === 'Home' ? 'bg-orange-50 text-orange-600' : address.type === 'Office' ? 'bg-blue-50 text-blue-600' : 'bg-gray-50 text-gray-500'}`}>
                                        {getTypeIcon(address.type)}
                                        {address.type}
                                    </div>
                                    {address.isDefault ? (
                                        <span className="bg-green-50 text-green-600 px-3 py-1 rounded-full text-[8px] font-black uppercase  flex items-center gap-1">
                                            <Check className="w-3 h-3" /> Default
                                        </span>
                                    ) : (
                                        ""
                                    )}
                                </div>

                                <div className="space-y-1 mb-8">
                                    <p className="text-gray-800 font-bold text-md leading-relaxed">{address.addressLine1}</p>
                                    {address.addressLine2 && <p className="text-gray-500 text-sm font-medium">{address.addressLine2}</p>}
                                    <p className="text-gray-400 text-xs font-black  pb-1">
                                        {address.city}, {address.state} - {address.zipCode}
                                    </p>
                                </div>

                                <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleEdit(address)}
                                            className="p-2.5 bg-[#FAF7F5]  text-[#501F08] rounded-xl transition-all"
                                        >
                                            <Edit2 className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(address.id)}
                                            className="p-2.5 bg-red-50 text-[#501F08] rounded-xl transition-all"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                    {!address.isDefault && (
                                        <button
                                            onClick={() => handleSetDefault(address.id)}
                                            className="text-[10px] font-black uppercase  text-[#A87453] hover:text-[#501F08] transition-colors"
                                        >
                                            Set as Default
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}

            <ConfirmationModal
                isOpen={deleteModalOpen}
                onClose={() => {
                    setDeleteModalOpen(false);
                }}
                onConfirm={confirmDelete}
                title="Delete Address?"
                message="Are you sure you want to delete this address? This action cannot be undone."
                confirmText="Delete Address"
                cancelText="Keep It"
                ConfirmIcon={Trash2}
            />
        </div>
    );
};

export default ManageAddressView;
