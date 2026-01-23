import React from "react";
import { CheckCircle } from "lucide-react";

const ForgotPasswordHeader = ({ step, isEmailVerified, logo }) => {
  return (
    <>
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
          Reset Your Password
        </h1>
        <p className="text-sm text-gray-600">
          {step === 1
            ? "Enter your email to receive a verification code"
            : "Create a new password for your account"}
        </p>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-center mb-6">
        <div className="flex items-center">
          {/* Step 1 */}
          <div className="flex flex-col items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step >= 1
                  ? "bg-linear-to-r from-[#501F08] to-[#9e5d61] text-white"
                  : "bg-gray-200 text-gray-400"
              }`}
            >
              {isEmailVerified ? (
                <CheckCircle className="w-5 h-5" />
              ) : (
                <span className="text-sm font-bold">1</span>
              )}
            </div>
            <span
              className={`text-xs mt-1 ${
                step >= 1 ? "text-[#501F08] font-medium" : "text-gray-400"
              }`}
            >
              Verify Email
            </span>
          </div>

          {/* Connecting Line */}
          <div
            className={`w-16 h-0.5 mx-2 ${
              step >= 2
                ? "bg-linear-to-r from-[#501F08] to-[#9e5d61]"
                : "bg-gray-200"
            }`}
          ></div>

          {/* Step 2 */}
          <div className="flex flex-col items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step >= 2
                  ? "bg-linear-to-r from-[#501F08] to-[#9e5d61] text-white"
                  : "bg-gray-200 text-gray-400"
              }`}
            >
              <span className="text-sm font-bold">2</span>
            </div>
            <span
              className={`text-xs mt-1 ${
                step >= 2 ? "text-[#501F08] font-medium" : "text-gray-400"
              }`}
            >
              New Password
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPasswordHeader;
