import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { X, Mail, RefreshCw, CheckCircle, ArrowRight } from "lucide-react";
import {
  verifyOTP,
  clearErrors,
  clearMessages,
  clearSuccessStates,
  reqResendOtp,
} from "../../slices/authSlice";
import { useToast } from "../../contexts/ToastContext";

const OTPModal = ({ email, onClose, onVerify, type = "register", resendAction }) => {
  const dispatch = useDispatch();
  const { otpLoading, otpError, otpVerified, otpMessage } = useSelector(
    (state) => state.auth
  );

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [countdown, setCountdown] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const inputRefs = useRef([]);
  const isSubmitting = useRef(false);
  const timerRef = useRef(null);

  // Clear previous states on mount
  useEffect(() => {
    dispatch(clearSuccessStates());
    dispatch(clearErrors());
    dispatch(clearMessages());

    // Focus first input
    setTimeout(() => {
      if (inputRefs.current[0]) {
        inputRefs.current[0].focus();
      }
    }, 100);

    startTimer();

    return () => {
      stopTimer();
      dispatch(clearSuccessStates());
      dispatch(clearErrors());
      dispatch(clearMessages());
    };
  }, []);

  const startTimer = () => {
    stopTimer();
    setCountdown(30);
    setCanResend(false);

    timerRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          stopTimer();
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  // Handle Success
  useEffect(() => {
    if (otpVerified) {
      isSubmitting.current = false;
      // Global toaster handles success message

      onVerify(true);
    }
  }, [otpVerified, otpMessage, onVerify]);

  // Handle Error
  useEffect(() => {
    if (otpError) {
      isSubmitting.current = false;
      // Global toaster handles error

      // Focus first input
      if (inputRefs.current[0]) {
        inputRefs.current[0].focus();
      }

      dispatch(clearErrors());
    }
  }, [otpError, dispatch]);

  // Auto-submit when filled
  useEffect(() => {
    const otpString = otp.join("");
    if (otpString.length === 6 && !isSubmitting.current && !otpLoading && !otpVerified) {
      handleSubmit(otpString);
    }
  }, [otp]);

  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    // Handle paste of multiple digits
    if (value.length > 1) {
      const digits = value.split("").slice(0, 6);
      digits.forEach((digit, i) => {
        if (index + i < 6) newOtp[index + i] = digit;
      });
      setOtp(newOtp);
      // Focus last filled
      const nextIndex = Math.min(index + digits.length, 5);
      if (inputRefs.current[nextIndex] && newOtp[nextIndex] === "") {
        inputRefs.current[nextIndex].focus();
      } else if (nextIndex === 5 && newOtp[5] !== "") {
        // stay on last
      }
    } else {
      newOtp[index] = value;
      setOtp(newOtp);
      // Auto-advance
      if (value && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace") {
      if (!otp[index] && index > 0) {
        const newOtp = [...otp];
        newOtp[index - 1] = "";
        setOtp(newOtp);
        inputRefs.current[index - 1]?.focus();
      } else {
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < 5) {
      inputRefs.current[index + 1]?.focus();
    } else if (e.key === "Enter") {
      if (otp.join("").length === 6) {
        handleSubmit(otp.join(""));
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text/plain").replace(/\D/g, "").slice(0, 6);
    if (pastedData) {
      const newOtp = [...otp];
      pastedData.split("").forEach((char, i) => {
        if (i < 6) newOtp[i] = char;
      });
      setOtp(newOtp);
      // Focus appropriate input
      const nextIndex = Math.min(pastedData.length, 5);
      inputRefs.current[nextIndex]?.focus();
    }
  };

  const handleResendOTP = async () => {
    if (!canResend || isResending) return;

    setIsResending(true);
    try {
      // Determine which action to dispatch based on prop or default
      await dispatch(resendAction === "reqVerifyEmail" ? reqVerifyEmail({ email }) : reqResendOtp({ email })).unwrap();

      // Global toaster handles success
      startTimer();
    } catch (error) {
      // Global toaster handles error
      setCanResend(true); // Allow retry if failed
    } finally {
      setIsResending(false);
    }
  };

  const handleSubmit = async (otpValue) => {
    const code = otpValue || otp.join("");
    if (code.length !== 6 || isSubmitting.current || otpLoading || otpVerified) return;

    isSubmitting.current = true;
    try {
      await dispatch(verifyOTP({ email, otp: code })).unwrap();
      // Success handled by useEffect
    } catch (error) {
      // Error handled by useEffect
      isSubmitting.current = false;
    }
  };

  const isLoading = otpLoading || isSubmitting.current;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={onClose}></div>

      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors z-10"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>

        <div className="p-8">
          <div className="text-center mb-8">
            <div className="mx-auto w-16 h-16 mb-4 bg-[#501F08]/5 rounded-full flex items-center justify-center">
              <Mail className="w-8 h-8 text-[#501F08]" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Verify Email</h2>
            <p className="text-gray-500 text-sm">
              We've sent a code to <span className="font-semibold text-gray-900">{email}</span>
            </p>
          </div>

          <div className="flex justify-between gap-2 mb-8">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={handlePaste}
                disabled={isLoading || otpVerified}
                className={`w-12 h-14 text-center text-xl font-bold rounded-xl border-2 transition-all outline-none focus:ring-4 focus:ring-[#501F08]/10
                  ${digit ? "border-[#501F08] bg-[#501F08]/5 text-[#501F08]" : "border-gray-200 bg-white text-gray-900"}
                  ${otpError ? "border-red-500 bg-red-50" : ""}
                  disabled:opacity-50 disabled:cursor-not-allowed`}
              />
            ))}
          </div>

          <div className="space-y-4">
            <button
              onClick={() => handleSubmit()}
              disabled={otp.join("").length !== 6 || isLoading || otpVerified}
              className="w-full py-3.5 rounded-xl bg-[#501F08] text-white font-semibold hover:bg-[#3a1606] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-[#501F08]/20"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : otpVerified ? (
                <>Verified <CheckCircle className="w-5 h-5" /></>
              ) : (
                <>Verify Account <ArrowRight className="w-5 h-5" /></>
              )}
            </button>

            <div className="flex items-center justify-center gap-2 text-sm">
              <span className="text-gray-500">Didn't receive code?</span>
              <button
                onClick={handleResendOTP}
                disabled={!canResend || isResending}
                className={`font-semibold transition-colors flex items-center gap-1.5
                  ${canResend ? "text-[#501F08] hover:text-[#3a1606]" : "text-gray-400 cursor-not-allowed"}`}
              >
                {isResending ? "Sending..." : canResend ? "Resend" : `Resend in ${countdown}s`}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OTPModal;
