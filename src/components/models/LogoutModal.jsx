import React from "react";
import { LogOut, X } from "lucide-react";

const LogoutModal = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
            {/* Backdrop with blur */}
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-md transition-opacity duration-300"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-300 border border-white/20">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-all"
                >
                    <X className="w-5 h-5" />
                </button>

                <div className="p-8 flex flex-col items-center text-center">
                    {/* Icon with rings */}
                    <div className="relative mb-6 group">
                        <div className="absolute inset-0 bg-[#501F08]/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-300 opacity-50"></div>
                        <div className="relative w-20 h-20 bg-[#501F08]/5 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                            <div className="w-14 h-14 bg-[#501F08]/10 rounded-full flex items-center justify-center">
                                <LogOut className="w-7 h-7 text-[#501F08] ml-1" />
                            </div>
                        </div>
                    </div>

                    <h3 className="text-2xl font-bold text-gray-900 mb-3 tracking-tight">Sign Out?</h3>
                    <p className="text-gray-600 mb-8 leading-relaxed max-w-xs">
                        Are you sure you want to end your current session?
                    </p>

                    <div className="flex gap-4 w-full">
                        <button
                            onClick={onClose}
                            className="flex-1 py-3.5 px-6 bg-white text-gray-700 font-semibold rounded-2xl hover:bg-gray-50 transition-all border border-gray-200 hover:border-gray-300 shadow-sm active:scale-95"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={onConfirm}
                            className="flex-1 py-3.5 px-6 bg-[#501F08] text-white font-semibold rounded-2xl hover:bg-[#3a1606] transition-all shadow-lg shadow-[#501F08]/25 hover:shadow-[#501F08]/40 active:scale-95 flex items-center justify-center gap-2"
                        >
                            <LogOut className="w-4 h-4" />
                            Sign Out
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LogoutModal;
