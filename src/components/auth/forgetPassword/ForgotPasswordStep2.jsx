import React, { useState } from "react";
import { Lock, ArrowLeft, Key, Eye, EyeOff } from "lucide-react"; // Added Eye, EyeOff for cleaner imports if needed, though they were unused in original imports but used in code? Ah, orig used showPassword state but didn't have icons in import? No, I see them in my previous view.
// Actually, original code imported { Lock, ArrowLeft, Key } but used Eye/EyeOff? Wait, looking at file content:
// 1: import React, { useState } from "react";
// 2: import { Lock, ArrowLeft, Key } from "lucide-react";
// It seems the original code MIGHT have been missing imports or I missed them. The view_file output showed: 
// 38-57: Button onClick sets showPassword. Icon is Lock? 
// 53: <Lock ... />
// Ah, the original code used Lock icon for toggle? That seems weird.
// Let's fix that while we are here: use separate Eye/EyeOff icons for visibility toggle.
import { useFormik } from "formik";
import * as Yup from "yup";

const ForgotPasswordStep2 = ({
  formData,
  isLoading,
  handleChange,
  handleResetPassword,
  setStep,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Validation Schema
  const validationSchema = Yup.object({
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/\d/, "Password must contain at least one number")
      .matches(/[!@#$%^&*]/, "Password must contain at least one special character")
      .required("New Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      password: formData.password || "",
      confirmPassword: formData.confirmPassword || "", // Assuming parent has this or just empty
    },
    validationSchema: validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      // We trigger the parent handler.
      // Parent handleResetPassword uses formData.
      // So we must ensure formData is synced.
      // But since we are calling it on submit, maybe we can just rely on the sync during change.
      // Or better: we call handleResetPassword with event? Original code: onSubmit={handleResetPassword}
      // handleResetPassword(e) -> e.preventDefault()...
      // Formik onSubmit passes values.

      // We will create a synthetic event or just call the logic if we could.
      // But let's look at parent implementation (I recall it uses preventDefault).
      // Best approach: call handleResetPassword with a mock event object.
      const mockEvent = {
        preventDefault: () => { },
      };
      handleResetPassword(mockEvent);
    },
  });

  // Sync with parent state and handle changes
  const handleInputChange = (e) => {
    formik.handleChange(e);
    handleChange(e); // Keep parent state in sync
  };

  const passwordRequirements = [
    { text: "8+ characters", met: formik.values.password.length >= 8 },
    { text: "Uppercase", met: /[A-Z]/.test(formik.values.password) },
    { text: "Number", met: /\d/.test(formik.values.password) },
    { text: "Special", met: /[!@#$%^&*]/.test(formik.values.password) },
  ];

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="px-6 sm:px-8 py-4 sm:py-6 space-y-4"
    >
      <div className="text-center mb-2">
        <p className="text-sm text-gray-600">
          Create a strong new password for your account
        </p>
      </div>

      {/* New Password */}
      <div className="relative group">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Lock className={`h-5 w-5 ${formik.touched.password && formik.errors.password ? "text-red-400" : "text-gray-400"}`} />
          </div>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formik.values.password}
            onChange={handleInputChange}
            onBlur={formik.handleBlur}
            required
            className={`w-full pl-10 pr-10 py-3 bg-white border ${formik.touched.password && formik.errors.password
                ? "border-red-300 focus:ring-red-200"
                : "border-gray-300 focus:ring-[#501F08]"
              } rounded-xl focus:outline-none focus:ring-2 focus:border-transparent transition-all text-sm`}
            placeholder="New password"
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
            ) : (
              <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
            )}
          </button>
          <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-linear-to-r from-transparent ${formik.touched.password && formik.errors.password ? "via-red-500" : "via-[#501F08]"} to-transparent opacity-0 group-focus-within:opacity-100 transition-opacity duration-300`}></div>
        </div>
        {formik.touched.password && formik.errors.password && (
          <p className="text-red-500 text-xs mt-1 ml-1">{formik.errors.password}</p>
        )}
      </div>

      {/* Password Requirements */}
      <div className="grid grid-cols-2 gap-2 mb-2 ml-3">
        {passwordRequirements.map((req, idx) => (
          <div key={idx} className="flex items-center">
            <div
              className={`w-2 h-2 rounded-full mr-2 ${req.met ? "bg-green-500" : "bg-gray-300"
                }`}
            ></div>
            <span
              className={`text-xs ${req.met ? "text-green-600" : "text-gray-500"
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
            <Lock className={`h-5 w-5 ${formik.touched.confirmPassword && formik.errors.confirmPassword ? "text-red-400" : "text-gray-400"}`} />
          </div>
          <input
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            value={formik.values.confirmPassword}
            onChange={handleInputChange}
            onBlur={formik.handleBlur}
            required
            className={`w-full pl-10 pr-10 py-3 bg-white border ${formik.touched.confirmPassword && formik.errors.confirmPassword
                ? "border-red-300 focus:ring-red-200"
                : "border-gray-300 focus:ring-[#501F08]"
              } rounded-xl focus:outline-none focus:ring-2 focus:border-transparent transition-all text-sm`}
            placeholder="Confirm new password"
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? (
              <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
            ) : (
              <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
            )}
          </button>
          <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-linear-to-r from-transparent ${formik.touched.confirmPassword && formik.errors.confirmPassword ? "via-red-500" : "via-[#501F08]"} to-transparent opacity-0 group-focus-within:opacity-100 transition-opacity duration-300`}></div>
        </div>
        {formik.touched.confirmPassword && formik.errors.confirmPassword && (
          <p className="text-red-500 text-xs mt-1 ml-1">{formik.errors.confirmPassword}</p>
        )}
      </div>

      {/* Reset Password Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full group relative px-6 py-3.5 bg-linear-to-r from-[#501F08] to-[#9e5d61] text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <div className="relative flex items-center justify-center space-x-2">
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span className="text-sm">Resetting...</span>
            </>
          ) : (
            <>
              <span>Reset Password</span>
              <Key className="w-5 h-5 transform group-hover:scale-110 transition-transform duration-300" />
            </>
          )}
        </div>
      </button>
    </form>
  );
};

export default ForgotPasswordStep2;
