import React, { useEffect, useState } from "react";
import {
  CheckCircle,
  XCircle,
  AlertCircle,
  Info,
  X,
  Sparkles,
  Shield,
} from "lucide-react";

const toastTypes = {
  success: {
    icon: CheckCircle,
    bgColor: "bg-[#F6E6D6]",
    borderColor: "border-[#501F08]/20",
    iconColor: "text-[#27ae60]",
    accentColor: "bg-[#27ae60]",
    title: "Success",
  },
  error: {
    icon: XCircle,
    bgColor: "bg-[#F6E6D6]",
    borderColor: "border-[#501F08]/20",
    iconColor: "text-[#e74c3c]",
    accentColor: "bg-[#e74c3c]",
    title: "Error",
  },
  warning: {
    icon: AlertCircle,
    bgColor: "bg-[#F6E6D6]",
    borderColor: "border-[#501F08]/20",
    iconColor: "text-[#f39c12]",
    accentColor: "bg-[#f39c12]",
    title: "Warning",
  },
  info: {
    icon: Info,
    bgColor: "bg-[#F6E6D6]",
    borderColor: "border-[#501F08]/20",
    iconColor: "text-[#3498db]",
    accentColor: "bg-[#3498db]",
    title: "Information",
  },
  default: {
    icon: Sparkles,
    bgColor: "bg-[#F6E6D6]",
    borderColor: "border-[#501F08]/20",
    iconColor: "text-[#501F08]",
    accentColor: "bg-[#501F08]",
    title: "Notification",
  },
  verification: {
    icon: Shield,
    bgColor: "bg-[#F6E6D6]",
    borderColor: "border-[#501F08]/20",
    iconColor: "text-[#9e5d61]",
    accentColor: "bg-gradient-to-r from-[#501F08] to-[#9e5d61]",
    title: "Verification",
  },
};

const CustomToast = ({ message, type = "default", onClose, title }) => {
  const [isVisible, setIsVisible] = useState(true);

  const toastConfig = toastTypes[type] || toastTypes.default;
  const Icon = toastConfig.icon;

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300);
    }, 4000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  if (!isVisible) return null;

  return (
    <div
      className={`w-full transform transition-all duration-300 ${
        isVisible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
      }`}
    >
      <div
        className={`relative ${toastConfig.bgColor} rounded-xl shadow-lg border ${toastConfig.borderColor} overflow-hidden`}
      >
        <div
          className={`absolute top-0 left-0 h-full w-1.5 ${toastConfig.accentColor}`}
        ></div>

        <div className="pl-5 pr-4 py-4">
          <div className="flex items-start">
            <div className="relative mr-3 flex-shrink-0 mt-0.5">
              <div className="w-8 h-8 rounded-full bg-white/80 flex items-center justify-center shadow-sm">
                <Icon className={`w-4 h-4 ${toastConfig.iconColor}`} />
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center mb-1">
                <span className="text-xs font-semibold text-[#501F08] tracking-wide uppercase">
                  {title || toastConfig.title}
                </span>
              </div>
              <p className="text-sm text-[#501F08] leading-relaxed">
                {message}
              </p>
            </div>

            <button
              onClick={handleClose}
              className="ml-3 flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center hover:bg-white/50 transition-colors"
            >
              <X className="w-3 h-3 text-[#501F08]/60" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomToast;
