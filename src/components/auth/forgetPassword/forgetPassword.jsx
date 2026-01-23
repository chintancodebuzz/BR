import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../../assets/logos/logo_white.svg";
import ForgotPasswordStep2 from "./ForgotPasswordStep2";
import ForgotPasswordStep1 from "./ForgotPasswordStep1";
import OTPModal from "../../models/otpModal";
import { Shield } from "lucide-react";
import { useToast } from "../../../contexts/ToastContext";
import { useDispatch } from "react-redux";
import { reqForgotPassword, changePassword } from "../../../slices/authSlice";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [showOTPModal, setShowOTPModal] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSendingOTP, setIsSendingOTP] = useState(false);
  const toast = useToast();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Handle form data changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Validate email format
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  // Handle sending OTP
  const handleSendOTP = async () => {
    if (!formData.email) {
      toast.error("Please enter your email address first", {
        title: "Email Required",
      });
      return;
    }

    if (!validateEmail(formData.email)) {
      toast.error("Please enter a valid email address", {
        title: "Invalid Email",
      });
      return;
    }

    setIsSendingOTP(true);

    try {
      await dispatch(
        reqForgotPassword({ email: formData.email })
      ).unwrap();

      // Global toaster handles success
      setShowOTPModal(true);
      // Set step to 2 when OTP modal opens
      setStep(2);
    } catch (error) {
      // Global toaster handles error
    } finally {
      setIsSendingOTP(false);
    }
  };

  // Handle OTP verification
  const handleOTPVerification = (success) => {
    if (success) {
      setIsEmailVerified(true);
      setShowOTPModal(false);

      const otpToken = localStorage.getItem("otpVerificationToken");
      if (otpToken) {
        // Success toast is handled by OTPModal
        // Move to step 3 (set new password)
        setStep(3);
      } else {
        toast.error("Verification token not found. Please try again.", {
          title: "Verification Error",
        });
        setIsEmailVerified(false);
        // Go back to step 1
        setStep(1);
      }
    } else {
      toast.error("Verification failed. Please try again.", {
        title: "Verification Failed",
      });
      setStep(1); // Go back to email step
    }
  };

  // Handle password reset
  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords don't match!", {
        title: "Password Mismatch",
      });
      return;
    }

    // Validate password requirements
    const password = formData.password;
    const requirements = [
      {
        check: password.length >= 8,
        message: "Password must be at least 8 characters",
      },
      {
        check: /[A-Z]/.test(password),
        message: "Password must contain at least one uppercase letter",
      },
      {
        check: /\d/.test(password),
        message: "Password must contain at least one number",
      },
      {
        check: /[!@#$%^&*]/.test(password),
        message:
          "Password must contain at least one special character (!@#$%^&*)",
      },
    ];

    for (const req of requirements) {
      if (!req.check) {
        toast.error(req.message, {
          title: "Password Requirement",
        });
        return;
      }
    }

    setIsLoading(true);

    try {
      // Check if OTP verification token exists
      const otpToken = localStorage.getItem("otpVerificationToken");
      if (!otpToken) {
        toast.error("Please complete email verification first", {
          title: "Verification Required",
        });
        return;
      }

      // Call changePassword API
      await dispatch(
        changePassword({
          password: formData.password,
          confirmPassword: formData.confirmPassword,
        })
      ).unwrap();

      // Global toaster handles success

      // Clear OTP token and redirect
      // Clear OTP token and redirect
      localStorage.removeItem("otpVerificationToken");
      navigate("/login");
    } catch (error) {
      // Global toaster handles error
    } finally {
      setIsLoading(false);
    }
  };

  // Render step based on current step
  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <ForgotPasswordStep1
            formData={formData}
            isEmailVerified={isEmailVerified}
            isSendingOTP={isSendingOTP}
            handleChange={handleChange}
            handleSendOTP={handleSendOTP}
            setStep={setStep}
          />
        );
      case 3: // Changed from 2 to 3 since step 2 is OTP verification
        return (
          <ForgotPasswordStep2
            formData={formData}
            isLoading={isLoading}
            handleChange={handleChange}
            handleResetPassword={handleResetPassword}
            setStep={setStep}
          />
        );
      default:
        return null;
    }
  };

  // Get header text based on step
  const getHeaderText = () => {
    switch (step) {
      case 1:
        return "Reset Password";
      case 2:
        return "Verify Your Email";
      case 3:
        return "Set New Password";
      default:
        return "Reset Password";
    }
  };

  // Get subtext based on step
  const getSubText = () => {
    switch (step) {
      case 1:
        return "Enter your email to receive a verification code";
      case 2:
        return "Enter the verification code sent to your email";
      case 3:
        return "Enter your new password";
      default:
        return "Reset your password";
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-gradient-to-br from-[#F8F2E9] via-[#EDE3D9] to-[#E2D4C9] overflow-hidden">
        <BackgroundEffects />

        <div className="relative h-screen flex items-center justify-center p-4">
          <div className="w-full max-w-md mx-auto">
            {/* Header */}
            <div className="text-center mb-6">
              <div className="mx-auto w-24 h-24 mb-4 relative">
                <div className="relative w-24 h-24 bg-gradient-to-br from-[#501F08] to-[#9e5d61] rounded-full flex items-center justify-center shadow-2xl">
                  <img
                    src={logo}
                    alt="BR Nails"
                    className="w-20 h-20 object-fill mt-1"
                  />
                </div>
              </div>

              <h1 className="text-2xl font-bold text-[#501F08] mb-1">
                {getHeaderText()}
              </h1>
              <p className="text-sm text-gray-600">{getSubText()}</p>
            </div>

            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/50 overflow-hidden">
              {renderStep()}

              {/* Back to Login Link */}
              <div className="px-6 sm:px-8 py-4">
                <div className="text-center">
                  <p className="text-sm text-gray-600">
                    Remember your password?{" "}
                    <Link
                      to="/login"
                      className="font-semibold text-[#501F08] hover:text-[#3a1606] transition-colors"
                    >
                      Sign in
                    </Link>
                  </p>
                </div>
              </div>

              {/* Security Badge */}
              <div className="bg-gradient-to-r from-[#501F08]/5 via-[#9e5d61]/5 to-[#501F08]/5 p-4 text-center">
                <div className="flex items-center justify-center space-x-2 text-xs text-gray-500">
                  <Shield className="w-4 h-4" />
                  <span>Secure password reset • 256-bit encryption</span>
                </div>
              </div>
            </div>

            {/* Back to Home */}
            <div className="mt-6 text-center">
              <Link
                to="/"
                className="inline-flex items-center text-sm text-gray-600 hover:text-[#501F08] transition-colors"
              >
                <svg
                  className="w-4 h-4 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                Back to home
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* OTP Modal - For Forgot Password */}
      {showOTPModal && (
        <OTPModal
          email={formData.email}
          onClose={() => {
            setShowOTPModal(false);
            setStep(1); // Go back to email step if modal closed
          }}
          onVerify={handleOTPVerification}
          type="password" // For password reset
          title="Reset Password Verification"
          description="Enter the 6-digit code sent to"
          resendAction="reqVerifyEmail" // Use email verification
        />
      )}
    </>
  );
};

// Background Effects Component
const BackgroundEffects = () => (
  <div className="absolute inset-0 overflow-hidden">
    {/* Swirling Gradient Lines */}
    <div className="absolute top-20 left-20 w-[500px] h-[500px] opacity-5">
      <div className="w-full h-full border-[8px] border-transparent border-t-[#501F08] border-r-[#9e5d61] rounded-full animate-spin-slow"></div>
    </div>
    <div className="absolute bottom-20 right-20 w-[500px] h-[500px] opacity-5">
      <div
        className="w-full h-full border-[8px] border-transparent border-b-[#501F08] border-l-[#9e5d61] rounded-full animate-spin-slow"
        style={{ animationDirection: "reverse" }}
      ></div>
    </div>

    {/* Gradient Orbs */}
    <div className="absolute -top-32 -left-32 w-[400px] h-[400px] rounded-full bg-gradient-to-r from-[#501F08]/10 to-[#9e5d61]/10 blur-3xl"></div>
    <div className="absolute -bottom-32 -right-32 w-[400px] h-[400px] rounded-full bg-gradient-to-l from-[#501F08]/10 to-[#9e5d61]/10 blur-3xl"></div>

    {/* Nail Polish Bottles */}
    <div className="absolute top-10 left-10 w-24 h-36 rotate-12 opacity-5">
      <div className="w-10 h-36 bg-gradient-to-b from-[#501F08] to-[#9e5d61] rounded-t-lg mx-auto"></div>
    </div>
    <div className="absolute bottom-10 right-10 w-24 h-36 -rotate-12 opacity-5">
      <div className="w-10 h-36 bg-gradient-to-b from-[#9e5d61] to-[#501F08] rounded-t-lg mx-auto"></div>
    </div>
  </div>
);

export default ForgotPassword;
