import React, { useState, useEffect } from "react";
import { Mail, ArrowLeft } from "lucide-react";
import { useFormik } from "formik";
import * as Yup from "yup";

const ForgotPasswordStep1 = ({
  formData,
  isEmailVerified,
  isSendingOTP,
  handleChange,
  handleSendOTP,
  setStep,
}) => {
  // Validation Schema
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Please enter a valid email address")
      .required("Email address is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: formData.email || "",
    },
    validationSchema: validationSchema,
    enableReinitialize: true, // Allow parent formData updates to reflect here if needed
    onSubmit: (values) => {
      // This form doesn't really "submit" via standard form submission for verification
      // But we can use it to trigger the verify action if we want
    },
  });

  // Sync with parent state and handle changes
  const handleInputChange = (e) => {
    formik.handleChange(e);
    handleChange(e); // Keep parent state in sync for handleSendOTP in parent
  };

  const onVerifyClick = async () => {
    // touched must be set to show errors if they exist
    formik.setFieldTouched("email", true);
    const errors = await formik.validateForm();

    if (!errors.email && formik.values.email) {
      handleSendOTP();
    }
  };

  return (
    <div className="px-6 sm:px-8 py-4 sm:py-6">
      <div className="space-y-6">
        <div className="text-center mb-2">
          <p className="text-sm text-gray-600">
            We'll send a verification code to your email to reset your password
          </p>
        </div>

        {/* Email Field */}
        <div className="relative group">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className={`h-5 w-5 ${formik.touched.email && formik.errors.email ? "text-red-400" : "text-gray-400"}`} />
            </div>
            <input
              type="email"
              name="email"
              value={formik.values.email}
              onChange={handleInputChange}
              onBlur={formik.handleBlur}
              required
              disabled={isEmailVerified}
              className={`w-full pl-10 pr-3 py-3 bg-white border ${formik.touched.email && formik.errors.email
                  ? "border-red-300 focus:ring-red-200"
                  : isEmailVerified ? "border-green-200" : "border-gray-300 focus:ring-[#501F08]"
                } rounded-xl focus:outline-none focus:ring-2 focus:border-transparent transition-all text-sm ${isEmailVerified ? "bg-green-50" : ""
                }`}
              placeholder="Enter your email address"
            />
            <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-linear-to-r from-transparent ${formik.touched.email && formik.errors.email ? "via-red-500" : "via-[#501F08]"} to-transparent opacity-0 group-focus-within:opacity-100 transition-opacity duration-300`}></div>

            {/* Verification Button/Status */}
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
                  onClick={onVerifyClick}
                  disabled={!formik.values.email || isSendingOTP}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-300 ${formik.values.email && !isSendingOTP
                      ? "bg-gradient-to-r from-[#501F08] to-[#9e5d61] text-white hover:shadow-md"
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
            <p className="text-red-500 text-xs mt-1 ml-1">{formik.errors.email}</p>
          )}
          {isEmailVerified && (
            <p className="text-xs text-green-600 mt-1 ml-3">
              ✓ Email verified. Click "Continue" to reset password
            </p>
          )}
        </div>

        {/* Continue Button */}
        <button
          onClick={() => setStep(2)}
          disabled={!isEmailVerified}
          className={`w-full group relative px-6 py-3.5 rounded-xl font-semibold shadow-lg transition-all duration-300 ${isEmailVerified
              ? "bg-gradient-to-r from-[#501F08] to-[#9e5d61] text-white hover:shadow-xl"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
        >
          <div className="relative flex items-center justify-center space-x-2">
            <span>Continue</span>
            <ArrowLeft className="w-5 h-5 transform rotate-180 group-hover:translate-x-1 transition-transform duration-300" />
          </div>

        </button>
      </div>
    </div>
  );
};

export default ForgotPasswordStep1;
