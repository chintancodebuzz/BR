import React, { useEffect, useState } from "react";
import {
  X,
  Sparkles,
  Shield,
  Palette,
  Check,
  AlertTriangle,
  Info,
} from "lucide-react";

const toastTypes = {
  success: {
    icon: Check,
    bgColor: "bg-[#501F08]/95",
    textColor: "text-white",
    borderColor: "border-emerald-400/20",
    iconBg: "bg-emerald-500",
    title: "Beautiful!",
  },
  error: {
    icon: X,
    bgColor: "bg-[#501F08]/95",
    textColor: "text-white",
    borderColor: "border-red-400/20",
    iconBg: "bg-red-500",
    title: "Oops!",
  },
  warning: {
    icon: AlertTriangle,
    bgColor: "bg-[#501F08]/95",
    textColor: "text-white",
    borderColor: "border-amber-400/20",
    iconBg: "bg-amber-500",
    title: "Careful",
  },
  info: {
    icon: Info,
    bgColor: "bg-[#501F08]/95",
    textColor: "text-white",
    borderColor: "border-blue-400/20",
    iconBg: "bg-blue-500",
    title: "Notice",
  },
  default: {
    icon: Palette,
    bgColor: "bg-[#501F08]/95",
    textColor: "text-white",
    borderColor: "border-white/10",
    iconBg: "bg-[#A87453]",
    title: "Update",
  },
};

const CustomToast = ({ message, type = "default", onClose, title }) => {
  const [isVisible, setIsVisible] = useState(false);

  const toastConfig = toastTypes[type] || toastTypes.default;
  const Icon = toastConfig.icon;

  useEffect(() => {
    const showTimer = setTimeout(() => setIsVisible(true), 10);
    const hideTimer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 800);
    }, 2000);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, [onClose]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 800);
  };

  return (
    <div
      className={`max-w-[400px] w-full transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${isVisible
        ? "translate-y-0 opacity-100 scale-100"
        : "-translate-y-12 opacity-0 scale-90"
        }`}
    >
      <div
        className={`relative ${toastConfig.bgColor} backdrop-blur-md rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.3)] border ${toastConfig.borderColor} overflow-hidden p-2 pr-6 flex items-center gap-4 group mx-auto`}
      >
        {/* Shine Animation */}
        {/* <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div> */}

        {/* Progress Bar */}
        <div className="absolute bottom-0 left-12 right-12 h-[2px] bg-white/5 overflow-hidden rounded-full">
          <div className={`h-full bg-white animate-toast-progress-top origin-left`}></div>
        </div>

        {/* Brand Icon Badge */}
        <div className="relative shrink-0">
          <div className={`${toastConfig.iconBg} w-10 h-10 rounded-full flex items-center justify-center shadow-lg border-2 border-white/20 transition-all duration-500 group-hover:scale-110 group-hover:rotate-[360deg]`}>
            <Icon size={18} className="text-white" strokeWidth={3} />
          </div>
          {/* <Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-amber-200 animate-pulse" /> */}
        </div>

        {/* Message Content */}
        <div className="flex-1 min-w-0 py-1">
          <p className="text-[10px] font-black text-white/40  uppercase mb-0.5">
            {title || toastConfig.title}
          </p>
          <p className="text-[14px] font-bold text-white truncate leading-tight">
            {message}
          </p>
        </div>

        {/* Close Button */}
        <button
          onClick={handleClose}
          className="shrink-0 p-2 rounded-full hover:bg-white/10 transition-colors group/close"
        >
          <X size={14} className="text-white/40 group-hover/close:text-white transition-colors" />
        </button>
      </div>

      <style>{`
        @keyframes toast-progress-top {
          from { transform: scaleX(1); }
          to { transform: scaleX(0); }
        }
        .animate-toast-progress-top {
          animation: toast-progress-top 2.5s linear forwards;
        }
      `}</style>
    </div>
  );
};

export default CustomToast;
