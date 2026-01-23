import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Lock, Mail, Eye, EyeOff, LogIn, Sparkles, Shield } from "lucide-react";
import logo from "../../assets/logos/logo_white.svg";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, clearMessages, reqLogin } from "../../slices/authSlice";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useToast } from "../../contexts/ToastContext";

import { APP_ROUTES } from "../../constants/appRoutes";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loginLoading, isAuthenticated, user } = useSelector(
    (state) => state.auth
  );

  const [showPassword, setShowPassword] = useState(false);

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Please enter a valid email address")
      .required("Email address is required"),
    password: Yup.string().required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const loginData = {
        email: values.email,
        password: values.password,
      };

      try {
        await dispatch(reqLogin(loginData)).unwrap();
        navigate(APP_ROUTES.HOME);
      } catch (error) {
        // Error handled globally by axios interceptor
      }
    },
  });

  useEffect(() => {
    if (isAuthenticated && user) {
      navigate(APP_ROUTES.HOME);
    }
  }, [isAuthenticated, user, navigate]);

  // Clean up errors on mount/unmount
  useEffect(() => {
    dispatch(clearErrors());
    dispatch(clearMessages());
    return () => {
      dispatch(clearErrors());
      dispatch(clearMessages());
    };
  }, [dispatch]);

  return (
    <div className="fixed inset-0 bg-[#FDFDFD] overflow-hidden">
      {/* Animated Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Swirling linear Lines */}
        <div className="absolute top-20 left-20 w-125 h-125 opacity-5">
          <div className="w-full h-full border-8 border-transparent border-t-[#501F08] border-r-[#9e5d61] rounded-full animate-spin-slow"></div>
        </div>
        <div className="absolute bottom-20 right-20 w-125 h-125 opacity-5">
          <div
            className="w-full h-full border-8 border-transparent border-b-[#501F08] border-l-[#9e5d61] rounded-full animate-spin-slow"
            style={{ animationDirection: "reverse" }}
          ></div>
        </div>

        {/* linear Orbs */}
        <div className="absolute -top-40 -left-40 w-125 h-125 rounded-full bg-linear-to-r from-[#501F08]/10 to-[#9e5d61]/10 blur-3xl"></div>
        <div className="absolute -bottom-40 -right-40 w-125 h-125 rounded-full bg-linear-to-l from-[#501F08]/10 to-[#9e5d61]/10 blur-3xl"></div>

        {/* Nail Polish Bottles */}
        <div className="absolute top-1/3 -left-16 w-32 h-48 rotate-12 opacity-5">
          <div className="w-12 h-48 bg-linear-to-b from-[#501F08] to-[#9e5d61] rounded-t-lg mx-auto"></div>
        </div>
        <div className="absolute bottom-1/3 -right-16 w-32 h-48 -rotate-12 opacity-5">
          <div className="w-12 h-48 bg-linear-to-b from-[#9e5d61] to-[#501F08] rounded-t-lg mx-auto"></div>
        </div>
      </div>

      {/* Main Content - No Scroll Container */}
      <div className="relative h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md mx-auto">
          {/* Logo Header */}
          <div className="text-center mb-8">
            <div className="mx-auto w-24 h-24 mb-4 relative">
              <div className="relative w-24 h-24 bg-linear-to-br from-[#501F08] to-[#9e5d61] rounded-full flex items-center justify-center shadow-2xl">
                <img
                  src={logo}
                  alt="BR Nails"
                  className="w-20 h-20 object-fill mt-1"
                />
              </div>
            </div>

            <h1 className="text-3xl font-bold text-[#501F08] mb-2">
              Welcome Back
              <Sparkles className="inline-block w-5 h-5 ml-2 text-[#9e5d61]" />
            </h1>
            <p className="text-gray-600">Sign in to your BR Nails account</p>
          </div>

          {/* Login Card */}
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/50 overflow-hidden">
            <div className="p-6 sm:p-8">
              <form onSubmit={formik.handleSubmit} className="space-y-5">
                {/* Email Field */}
                <div className="relative group">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className={`h-5 w-5 ${formik.touched.email && formik.errors.email ? "text-red-400" : "text-gray-400"}`} />
                    </div>
                    <input
                      type="email"
                      name="email"
                      {...formik.getFieldProps("email")}
                      className={`w-full pl-10 pr-3 py-3 bg-white border ${formik.touched.email && formik.errors.email
                        ? "border-red-300 focus:ring-red-200"
                        : "border-gray-300 focus:ring-[#501F08]"
                        } rounded-xl focus:outline-none focus:ring-2 focus:border-transparent transition-all text-sm`}
                      placeholder="Email address"
                    />
                    <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-linear-to-r from-transparent ${formik.touched.email && formik.errors.email ? "via-red-500" : "via-[#501F08]"} to-transparent opacity-0 group-focus-within:opacity-100 transition-opacity duration-300`}></div>
                  </div>
                  {formik.touched.email && formik.errors.email && (
                    <p className="text-red-500 text-xs mt-1 ml-1">{formik.errors.email}</p>
                  )}
                </div>

                {/* Password Field */}
                <div className="relative group">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className={`h-5 w-5 ${formik.touched.password && formik.errors.password ? "text-red-400" : "text-gray-400"}`} />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      {...formik.getFieldProps("password")}
                      className={`w-full pl-10 pr-10 py-3 bg-white border ${formik.touched.password && formik.errors.password
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
                    <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-linear-to-r from-transparent ${formik.touched.password && formik.errors.password ? "via-red-500" : "via-[#501F08]"} to-transparent opacity-0 group-focus-within:opacity-100 transition-opacity duration-300`}></div>
                  </div>
                  {formik.touched.password && formik.errors.password && (
                    <p className="text-red-500 text-xs mt-1 ml-1">{formik.errors.password}</p>
                  )}
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="rememberMe"
                      type="checkbox"
                      checked={formik.values.rememberMe}
                      onChange={formik.handleChange}
                      className="h-4 w-4 text-[#501F08] focus:ring-[#501F08] border-gray-300 rounded cursor-pointer"
                    />
                    <label
                      htmlFor="remember-me"
                      className="ml-2 text-sm text-gray-700 "
                    >
                      Remember me
                    </label>
                  </div>
                  <Link
                    to="/forgot-password"
                    className="text-sm text-[#501F08] hover:text-[#3a1606] transition-colors"
                  >
                    Forgot password?
                  </Link>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loginLoading}
                  className="w-full group relative px-6 py-3.5 bg-linear-to-r from-[#501F08] to-[#9e5d61] text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  <div className="relative flex items-center justify-center space-x-2">
                    {loginLoading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span className="text-sm">Signing in...</span>
                      </>
                    ) : (
                      <>
                        <span>Sign In</span>
                        <LogIn className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" />
                      </>
                    )}
                  </div>
                </button>
              </form>

              {/* Sign Up Link */}
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  Don't have an account?{" "}
                  <Link
                    to="/register"
                    className="font-semibold text-[#501F08] hover:text-[#3a1606] transition-colors"
                  >
                    Sign up
                  </Link>
                </p>
              </div>
            </div>

            {/* Security Badge */}
            <div className="bg-linear-to-r from-[#501F08]/5 via-[#9e5d61]/5 to-[#501F08]/5 p-4 text-center">
              <div className="flex items-center justify-center space-x-2 text-xs text-gray-500">
                <Shield className="w-4 h-4" />
                <span>Secure login • Encrypted connection</span>
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

      {/* Add custom animation */}
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
  );
};

export default Login;
