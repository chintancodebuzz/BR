import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useCallback,
  useMemo,
  useEffect,
} from "react";
import CustomToast from "../components/common/customToast";
import { toastEvents } from "../utils/toastEventEmitter";

const ToastContext = createContext(null);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within ToastProvider");
  }
  return context;
};

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);
  const toastIdRef = useRef(0);

  // Stable addToast function
  const addToast = useCallback((message, options = {}) => {
    const id = ++toastIdRef.current;
    const toast = {
      id,
      message,
      type: options.type || "default",
      duration: options.duration || 4000,
      title: options.title,
    };

    setToasts((prev) => {
      const newToasts = [toast, ...prev];
      // Limit to 3 toasts maximum
      return newToasts.slice(0, 3);
    });

    // Auto-remove after duration + buffer
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, options.duration || 4000 + 1000);

    return id;
  }, []);

  // Stable removeToast function
  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  // Create a completely stable toast object using useMemo
  const toast = useMemo(
    () => ({
      success: (message, options) =>
        addToast(message, { ...options, type: "success" }),
      error: (message, options) =>
        addToast(message, { ...options, type: "error" }),
      warning: (message, options) =>
        addToast(message, { ...options, type: "warning" }),
      info: (message, options) =>
        addToast(message, { ...options, type: "info" }),
      default: (message, options) =>
        addToast(message, { ...options, type: "default" }),
      verification: (message, options) =>
        addToast(message, { ...options, type: "verification" }),
      remove: removeToast,
    }),
    [addToast, removeToast]
  );

  // Subscribe to global toast events
  useEffect(() => {
    const unsubscribe = toastEvents.subscribe(({ type, message, options }) => {
      // Use the stable toast object methods if available, or fallback to addToast
      if (toast[type]) {
        toast[type](message, options || {});
      } else {
        toast.default(message, options || {});
      }
    });
    return unsubscribe;
  }, [toast]);

  return (
    <ToastContext.Provider value={toast}>
      {children}
      <div className="fixed top-28 left-1/2 -translate-x-1/2 z-[9999] flex flex-col items-center gap-3 pointer-events-none w-full px-6">
        {toasts.map((toastItem) => (
          <div key={toastItem.id} className="pointer-events-auto flex justify-center w-full">
            <CustomToast
              message={toastItem.message}
              type={toastItem.type}
              duration={toastItem.duration}
              title={toastItem.title}
              onClose={() => removeToast(toastItem.id)}
            />
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};
