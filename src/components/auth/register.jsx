import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Lock,
  Eye,
  Phone,
  EyeOff,
  UserPlus,
  Shield,
} from "lucide-react";
import logo from "../../assets/logos/logo_white.svg";
import OTPModal from "../models/otpModal";
import { useDispatch } from "react-redux";
import { register, reqVerifyEmail } from "../../slices/authSlice";
import { useToast } from "../../contexts/ToastContext";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toastEvents } from "../../utils/toastEventEmitter";
import { isValidPhoneNumber } from "libphonenumber-js";

import { APP_ROUTES } from "../../constants/appRoutes";
import NewPhoneInput from "../common/NewPhoneInput";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showOTPModal, setShowOTPModal] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSendingOTP, setIsSendingOTP] = useState(false);

  // Validation Schema
  const validationSchema = Yup.object({
    name: Yup.string().required("Full Name is required"),
    email: Yup.string()
      .email("Please enter a valid email address")
      .required("Email address is required"),
    phoneNo: Yup.string()
      .test(
        "is-valid-phone",
        "Invalid phone number for the selected country",
        (value) => {
          if (!value) return false;
          // libphonenumber-js handles the "+" prefix and extracts country automatically
          return isValidPhoneNumber(value);
        },
      )
      .required("Mobile Number is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/\d/, "Password must contain at least one number")
      .matches(
        /[!@#$%^&*]/,
        "Password must contain at least one special character",
      )
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
    acceptTerms: Yup.boolean().oneOf(
      [true],
      "You must accept the terms and conditions",
    ),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phoneNo: "",
      password: "",
      confirmPassword: "",
      acceptTerms: false,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      if (!isEmailVerified) {
        toast.error("Please verify your email first", {
          title: "Email Verification Required",
        });
        return;
      }

      const otpToken = localStorage.getItem("otpVerificationToken");
      if (!otpToken) {
        toast.error("Please complete email verification first", {
          title: "Verification Required",
        });
        return;
      }

      const registrationData = {
        name: values.name,
        email: values.email,
        phoneNo: values.phoneNo,
        password: values.password,
        confirmPassword: values.confirmPassword,
      };

      setIsLoading(true);

      try {
        const result = await dispatch(register(registrationData)).unwrap();

        if (result.status) {
          formik.resetForm();
          setIsEmailVerified(false);
          // Redux thunk handles token and user storage
          localStorage.removeItem("otpVerificationToken");
          navigate(APP_ROUTES.HOME);
        }
      } catch (error) {
        throw error; // Handled by global error toaster
      } finally {
        setIsLoading(false);
      }
    },
  });

  const handleSendOTP = async () => {
    // Validate email field specifically before sending OTP
    formik.setFieldTouched("email", true);
    const emailError = await formik.validateField("email");

    if (emailError) {
      // Formik will show the error because we touched it
      return;
    }

    if (!formik.values.email) {
      return; // Should be covered by validateField but just in case
    }

    setIsSendingOTP(true);

    try {
      await dispatch(reqVerifyEmail({ email: formik.values.email })).unwrap();

      // Global toaster handles success message

      setShowOTPModal(true);
    } catch (error) {
      // Handle "Already Verified" case specifically
      const errorMsg = error?.message || "";
      if (errorMsg.toLowerCase().includes("already verified")) {
        setIsEmailVerified(true);
        toastEvents.success("Email is already verified");
        return;
      }

      // Global toaster handles other errors
    } finally {
      setIsSendingOTP(false);
    }
  };

  const handleOTPVerification = (success) => {
    if (success) {
      setIsEmailVerified(true);
      setShowOTPModal(false);
    }
  };

  const passwordRequirements = [
    { text: "8+ characters", met: formik.values.password.length >= 8 },
    { text: "Uppercase", met: /[A-Z]/.test(formik.values.password) },
    { text: "Number", met: /\d/.test(formik.values.password) },
    { text: "Special", met: /[!@#$%^&*]/.test(formik.values.password) },
  ];

  return (
    <>
      <div className="fixed inset-0 bg-[#FDFDFD] overflow-hidden">
        {/* Animated Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Swirling Gradient Lines */}
          <div className="absolute top-20 left-20 w-[500px] h-[500px] opacity-5">
            <div className="w-full h-full border-8 border-transparent border-t-[#501F08] border-r-[#9e5d61] rounded-full animate-spin-slow"></div>
          </div>
          <div className="absolute bottom-20 right-20 w-[500px] h-[500px] opacity-5">
            <div
              className="w-full h-full border-8 border-transparent border-b-[#501F08] border-l-[#9e5d61] rounded-full animate-spin-slow"
              style={{ animationDirection: "reverse" }}
            ></div>
          </div>

          {/* Gradient Orbs */}
          <div className="absolute -top-32 -left-32 w-[400px] h-[400px] rounded-full bg-linear-to-r from-[#501F08]/10 to-[#9e5d61]/10 blur-3xl"></div>
          <div className="absolute -bottom-32 -right-32 w-[400px] h-[400px] rounded-full bg-linear-to-l from-[#501F08]/10 to-[#9e5d61]/10 blur-3xl"></div>

          {/* Nail Polish Bottles */}
          <div className="absolute top-10 left-10 w-24 h-36 rotate-12 opacity-5">
            <div className="w-10 h-36 bg-linear-to-b from-[#501F08] to-[#9e5d61] rounded-t-lg mx-auto"></div>
          </div>
          <div className="absolute bottom-10 right-10 w-24 h-36 -rotate-12 opacity-5">
            <div className="w-10 h-36 bg-linear-to-b from-[#9e5d61] to-[#501F08] rounded-t-lg mx-auto"></div>
          </div>
        </div>
        {/* Main Content */}
        <div className="relative h-screen flex items-center justify-center p-4">
          <div className="w-full max-w-md mx-auto">
            {/* Logo Header */}
            <div className="text-center mb-6">
              <div className="mx-auto w-24 h-24 mb-4 relative">
                <div className="relative w-24 h-24 bg-linear-to-br from-[#501F08] to-[#9e5d61] rounded-full flex items-center justify-center shadow-2xl">
                  <img
                    src={logo}
                    alt="BR Nails"
                    className="w-20 h-20 object-fill mt-1"
                  />
                </div>
              </div>

              <h1 className="text-2xl font-bold text-[#501F08] mb-1">
                Join BR Nails
              </h1>
              <p className="text-sm text-gray-600">
                Create your account and unlock premium features
              </p>
            </div>

            {/* Register Card */}
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/50 overflow-hidden">
              <div className="px-6 sm:px-8 py-4 sm:py-6">
                <form onSubmit={formik.handleSubmit} className="space-y-4">
                  {/* Full Name */}
                  <div className="relative group">
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User
                          className={`h-5 w-5 ${formik.touched.name && formik.errors.name ? "text-red-400" : "text-gray-400"}`}
                        />
                      </div>
                      <input
                        type="text"
                        name="name"
                        {...formik.getFieldProps("name")}
                        className={`w-full pl-10 pr-3 py-3 bg-white border ${
                          formik.touched.name && formik.errors.name
                            ? "border-red-300 focus:ring-red-200"
                            : "border-gray-300 focus:ring-[#501F08]"
                        } rounded-xl focus:outline-none focus:ring-2 focus:border-transparent transition-all text-sm`}
                        placeholder="Full name"
                      />
                    </div>
                    {formik.touched.name && formik.errors.name && (
                      <p className="text-red-500 text-xs mt-1 ml-1">
                        {formik.errors.name}
                      </p>
                    )}
                  </div>

                  {/* Email with Verification */}
                  <div className="relative group">
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail
                          className={`h-5 w-5 ${formik.touched.email && formik.errors.email ? "text-red-400" : "text-gray-400"}`}
                        />
                      </div>
                      <input
                        type="email"
                        name="email"
                        {...formik.getFieldProps("email")}
                        disabled={isEmailVerified}
                        className={`w-full pl-10 pr-3 py-3 bg-white border ${
                          formik.touched.email && formik.errors.email
                            ? "border-red-300 focus:ring-red-200"
                            : isEmailVerified
                              ? "border-green-200"
                              : "border-gray-300 focus:ring-[#501F08]"
                        } rounded-xl focus:outline-none focus:ring-2 focus:border-transparent transition-all text-sm ${
                          isEmailVerified ? "bg-green-50" : ""
                        }`}
                        placeholder="Email address"
                      />

                      {/* Verification Status */}
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        {isEmailVerified ? (
                          <div className="flex items-center space-x-1">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                            <span className="text-xs text-green-600 font-medium">
                              Verified
                            </span>
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={handleSendOTP}
                            disabled={!formik.values.email || isSendingOTP}
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-300 cursor-pointer ${
                              formik.values.email && !isSendingOTP
                                ? "bg-linear-to-r from-[#501F08] to-[#9e5d61] text-white hover:shadow-md"
                                : "bg-gray-100 text-gray-400 cursor-not-allowed"
                            }`}
                          >
                            {isSendingOTP ? (
                              <div className="flex items-center">
                                <div className="w-3 h-3 border-2 border-gray border-t-transparent rounded-full animate-spin mr-1"></div>
                                Sending...
                              </div>
                            ) : (
                              "Verify Email"
                            )}
                          </button>
                        )}
                      </div>
                    </div>
                    {formik.touched.email && formik.errors.email && (
                      <p className="text-red-500 text-xs mt-1 ml-1">
                        {formik.errors.email}
                      </p>
                    )}
                    {isEmailVerified && (
                      <p className="text-xs text-green-600 mt-1 ml-3">
                        ✓ Email verified successfully
                      </p>
                    )}
                  </div>

                  {/* Mobile */}
                  <div className="relative group">
                    <NewPhoneInput
                      name="phoneNo"
                      value={formik.values.phoneNo}
                      onChange={(value) =>
                        formik.setFieldValue("phoneNo", value)
                      }
                      onBlur={() => formik.setFieldTouched("phoneNo", true)}
                      error={formik.errors.phoneNo}
                      touched={formik.touched.phoneNo}
                    />
                  </div>

                  {/* Password */}
                  <div className="relative group">
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock
                          className={`h-5 w-5 ${formik.touched.password && formik.errors.password ? "text-red-400" : "text-gray-400"}`}
                        />
                      </div>
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        {...formik.getFieldProps("password")}
                        className={`w-full pl-10 pr-10 py-3 bg-white border ${
                          formik.touched.password && formik.errors.password
                            ? "border-red-300 focus:ring-red-200"
                            : "border-gray-300 focus:ring-[#501F08]"
                        } rounded-xl focus:outline-none focus:ring-2 focus:border-transparent transition-all text-sm`}
                        placeholder="Password"
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600 cursor-pointer" />
                        ) : (
                          <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600 cursor-pointer" />
                        )}
                      </button>
                    </div>
                    {formik.touched.password && formik.errors.password && (
                      <p className="text-red-500 text-xs mt-1 ml-1">
                        {formik.errors.password}
                      </p>
                    )}
                  </div>

                  {/* Password Requirements */}
                  <div className="grid grid-cols-2 gap-2 mb-2 ml-3">
                    {passwordRequirements.map((req, idx) => (
                      <div key={idx} className="flex items-center">
                        <div
                          className={`w-2 h-2 rounded-full mr-2 ${
                            req.met ? "bg-green-500" : "bg-gray-300"
                          }`}
                        ></div>
                        <span
                          className={`text-xs ${
                            req.met ? "text-green-600" : "text-gray-500"
                          }`}
                        >
                          {req.text}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Confirm Password */}
                  <div className="relative group">
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock
                          className={`h-5 w-5 ${formik.touched.confirmPassword && formik.errors.confirmPassword ? "text-red-400" : "text-gray-400"}`}
                        />
                      </div>
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        {...formik.getFieldProps("confirmPassword")}
                        className={`w-full pl-10 pr-10 py-3 bg-white border ${
                          formik.touched.confirmPassword &&
                          formik.errors.confirmPassword
                            ? "border-red-300 focus:ring-red-200"
                            : "border-gray-300 focus:ring-[#501F08]"
                        } rounded-xl focus:outline-none focus:ring-2 focus:border-transparent transition-all text-sm`}
                        placeholder="Confirm password"
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600 cursor-pointer" />
                        ) : (
                          <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600 cursor-pointer" />
                        )}
                      </button>
                    </div>
                    {formik.touched.confirmPassword &&
                      formik.errors.confirmPassword && (
                        <p className="text-red-500 text-xs mt-1 ml-1">
                          {formik.errors.confirmPassword}
                        </p>
                      )}
                  </div>

                  {/* Terms */}
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="accept-terms"
                        name="acceptTerms"
                        type="checkbox"
                        checked={formik.values.acceptTerms}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`h-4 w-4 text-[#501F08] focus:ring-[#501F08] border-gray-300 rounded shrink-0 cursor-pointer ${
                          formik.touched.acceptTerms &&
                          formik.errors.acceptTerms
                            ? "border-red-500 ring-1 ring-red-500"
                            : ""
                        }`}
                      />
                    </div>
                    <div className="ml-2 text-xs">
                      <label htmlFor="accept-terms" className="text-gray-700">
                        I agree to the{" "}
                        <Link
                          to="/terms"
                          className="text-[#501F08] hover:text-[#3a1606] transition-colors"
                        >
                          Terms
                        </Link>{" "}
                        and{" "}
                        <Link
                          to="/privacy"
                          className="text-[#501F08] hover:text-[#3a1606] transition-colors"
                        >
                          Privacy Policy
                        </Link>
                      </label>
                      {formik.touched.acceptTerms &&
                        formik.errors.acceptTerms && (
                          <p className="text-red-500 text-xs mt-1">
                            {formik.errors.acceptTerms}
                          </p>
                        )}
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isLoading || !isEmailVerified}
                    className={`w-full group relative px-6 py-3.5 rounded-xl font-semibold shadow-lg transition-all duration-300 ${
                      isEmailVerified
                        ? "bg-linear-to-r from-[#501F08] to-[#9e5d61] text-white hover:shadow-xl"
                        : "bg-gray-200 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    <div className="relative flex items-center justify-center space-x-2">
                      {isLoading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span className="text-sm">Creating account...</span>
                        </>
                      ) : (
                        <>
                          <span>Create Account</span>
                          <UserPlus className="w-5 h-5 transform group-hover:scale-110 transition-transform duration-300" />
                        </>
                      )}
                    </div>
                  </button>
                </form>

                {/* Login Link */}
                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-600">
                    Already have an account?{" "}
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
              <div className="bg-linear-to-r from-[#501F08]/5 via-[#9e5d61]/5 to-[#501F08]/5 p-4 text-center">
                <div className="flex items-center justify-center space-x-2 text-xs text-gray-500">
                  <Shield className="w-4 h-4" />
                  <span>256-bit encryption • GDPR compliant</span>
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

        {/* Custom animation styles */}
        <style jsx global>{`
          @keyframes spin-slow {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }
          .animate-spin-slow {
            animation: spin-slow 25s linear infinite;
          }
          body {
            overflow: hidden;
          }
        `}</style>
      </div>

      {/* OTP Modal */}
      {showOTPModal && (
        <OTPModal
          email={formik.values.email}
          onClose={() => setShowOTPModal(false)}
          onVerify={handleOTPVerification}
        />
      )}
    </>
  );
};

export default Register;
