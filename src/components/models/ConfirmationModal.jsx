import React from "react";
import { X, AlertTriangle, Trash2 } from "lucide-react";

const ConfirmationModal = ({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    confirmText = "Confirm",
    cancelText = "Cancel",
    ConfirmIcon = Trash2, // Default icon for confirmation
    confirmButtonClass = "bg-[#501F08] hover:bg-[#3a1606] text-white", // Default to theme color but can be overridden (e.g., red for delete)
    iconColorClass = "text-[#501F08]",
    iconBgClass = "bg-[#501F08]/5",
    iconRingClass = "bg-[#501F08]/10"
}) => {
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
                    {/* Icon with rings - Reusing the aesthetic from LogoutModal */}
                    <div className="relative mb-6 group">
                        <div className={`absolute inset-0 rounded-full blur-xl group-hover:blur-2xl transition-all duration-300 opacity-50 ${iconColorClass.replace('text-', 'bg-').replace('text', 'bg')}/20`}></div>
                        <div className={`relative w-20 h-20 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 ${iconBgClass}`}>
                            <div className={`w-14 h-14 rounded-full flex items-center justify-center ${iconRingClass}`}>
                                <ConfirmIcon className={`w-7 h-7 ${iconColorClass} ml-0`} />
                            </div>
                        </div>
                    </div>

                    <h3 className="text-2xl font-bold text-gray-900 mb-3 ">{title}</h3>
                    <p className="text-gray-600 mb-8 leading-relaxed max-w-xs">
                        {message}
                    </p>

                    <div className="flex gap-4 w-full">
                        <button
                            onClick={onClose}
                            className="flex-1 py-3.5 px-6 bg-white text-gray-700 font-semibold rounded-2xl hover:bg-gray-50 transition-all border border-gray-200 hover:border-gray-300 shadow-sm active:scale-95"
                        >
                            {cancelText}
                        </button>
                        <button
                            onClick={onConfirm}
                            className={`flex-1 py-3.5 px-6 font-semibold rounded-2xl transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2 ${confirmButtonClass}`}
                        >
                            <ConfirmIcon className="w-4 h-4" />
                            {confirmText}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;
