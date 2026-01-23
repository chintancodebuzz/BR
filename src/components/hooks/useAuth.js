import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  login,
  register,
  logout,
  verifyOTP,
  forgotPasswordRequest,
  resetPasswordRequest,
  getProfile,
  updateProfile,
  clearErrors,
  clearMessages,
  clearSuccessStates,
} from "../slices/authSlice";
import { verifyEmail } from "../../services/authApi";

export const useAuth = () => {
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);

  // Clear errors and messages
  const clearAuthErrors = () => dispatch(clearErrors());
  const clearAuthMessages = () => dispatch(clearMessages());
  const clearAuthSuccessStates = () => dispatch(clearSuccessStates());

  // Auth actions
  const handleRegister = (userData) => dispatch(register(userData));
  const handleLogin = (credentials) => dispatch(login(credentials));
  const handleLogout = () => dispatch(logout());
  const handleSendOTP = (emailData) => dispatch(verifyEmail(emailData));
  const handleVerifyOTP = (otpData) => dispatch(verifyOTP(otpData));
  const handleForgotPassword = (emailData) =>
    dispatch(forgotPasswordRequest(emailData));
  const handleResetPassword = (resetData) =>
    dispatch(resetPasswordRequest(resetData));
  const handleGetProfile = () => dispatch(getProfile());
  const handleUpdateProfile = (profileData) =>
    dispatch(updateProfile(profileData));

  // Check if user is authenticated
  const isAuthenticated = authState.isAuthenticated;

  // Get user info
  const user = authState.user;

  // Get loading states
  const isLoading = authState.loading;
  const isRegisterLoading = authState.registerLoading;
  const isLoginLoading = authState.loginLoading;
  const isOTPLoading = authState.otpLoading;
  const isForgotPasswordLoading = authState.forgotPasswordLoading;
  const isResetPasswordLoading = authState.resetPasswordLoading;
  const isProfileLoading = authState.profileLoading;

  // Get success states
  const registerSuccess = authState.registerSuccess;
  const otpSent = authState.otpSent;
  const otpVerified = authState.otpVerified;
  const forgotPasswordSuccess = authState.forgotPasswordSuccess;
  const resetPasswordSuccess = authState.resetPasswordSuccess;

  // Get error states
  const error = authState.error;
  const registerError = authState.registerError;
  const loginError = authState.loginError;
  const otpError = authState.otpError;
  const forgotPasswordError = authState.forgotPasswordError;
  const resetPasswordError = authState.resetPasswordError;
  const profileError = authState.profileError;

  // Get messages
  const message = authState.message;
  const otpMessage = authState.otpMessage;
  const forgotPasswordMessage = authState.forgotPasswordMessage;
  const resetPasswordMessage = authState.resetPasswordMessage;

  // Auto-clear messages after 5 seconds
  useEffect(() => {
    if (
      message ||
      otpMessage ||
      forgotPasswordMessage ||
      resetPasswordMessage
    ) {
      const timer = setTimeout(() => {
        clearAuthMessages();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [message, otpMessage, forgotPasswordMessage, resetPasswordMessage]);

  return {
    // State
    user,
    isAuthenticated,

    // Loading states
    isLoading,
    isRegisterLoading,
    isLoginLoading,
    isOTPLoading,
    isForgotPasswordLoading,
    isResetPasswordLoading,
    isProfileLoading,

    // Success states
    registerSuccess,
    otpSent,
    otpVerified,
    forgotPasswordSuccess,
    resetPasswordSuccess,

    // Error states
    error,
    registerError,
    loginError,
    otpError,
    forgotPasswordError,
    resetPasswordError,
    profileError,

    // Messages
    message,
    otpMessage,
    forgotPasswordMessage,
    resetPasswordMessage,

    // Actions
    handleRegister,
    handleLogin,
    handleLogout,
    handleSendOTP,
    handleVerifyOTP,
    handleForgotPassword,
    handleResetPassword,
    handleGetProfile,
    handleUpdateProfile,
    clearAuthErrors,
    clearAuthMessages,
    clearAuthSuccessStates,
  };
};
