import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as authApi from "../services/authApi";

export const reqVerifyEmail = createAsyncThunk(
  "auth/reqVerifyEmail",
  async (emailData, { rejectWithValue }) => {
    try {
      const response = await authApi.verifyEmail(emailData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to send OTP" }
      );
    }
  }
);
export const reqResendOtp = createAsyncThunk(
  "auth/reqResendOtp",
  async (emailData, { rejectWithValue }) => {
    try {
      const response = await authApi.resendOtp(emailData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to send OTP" }
      );
    }
  }
);

export const verifyOTP = createAsyncThunk(
  "auth/verifyOTP",
  async (otpData, { rejectWithValue }) => {
    try {
      const response = await authApi.verifyOTP(otpData);

      // Store the access token in localStorage for use in register API
      if (response.data?.authentication?.accessToken) {
        localStorage.setItem(
          "otpVerificationToken",
          response.data.authentication.accessToken
        );
      }

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "OTP verification failed" }
      );
    }
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      const currentOtpToken = localStorage.getItem("otpVerificationToken");
      const response = await authApi.registerUser(userData);

      // Check for authentication data in response or fallback to OTP token
      const authData = response.data?.data?.authentication || response.data?.authentication;
      const accessToken = authData?.accessToken || currentOtpToken;
      const refreshToken = authData?.refreshToken || currentOtpToken;

      if (accessToken) {
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
      }


      let finalUserData = response.data?.data || response.data;

      if (accessToken && response.data.status && !finalUserData.name) {
        try {
          const profileRes = await authApi.getUserProfile();
          finalUserData = profileRes.data.data || profileRes.data;
        } catch (profileErr) {
          console.error("❌ ~ Failed to fetch profile after registration:", profileErr);
        }
      }

      localStorage.setItem("user", JSON.stringify(finalUserData));

      // Clear the OTP token after successful registration and promotion
      localStorage.removeItem("otpVerificationToken");

      // Return combined data for the reducer to handle
      return {
        ...response.data,
        user: finalUserData,
        authentication: authData || (accessToken ? { accessToken, refreshToken } : null)
      };
    } catch (error) {
      console.error("❌ ~ Registration error in authSlice:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });

      return rejectWithValue(
        error.response?.data || {
          message: error.message || "Registration failed. Please try again.",
        }
      );
    }
  }
);
export const reqLogin = createAsyncThunk(
  "auth/reqLogin",
  async (credentials, { rejectWithValue }) => {
    try {
      const res = await authApi.loginUser(credentials);
      if (res.data.data) {
        localStorage.setItem(
          "accessToken",
          res.data.data.authentication.accessToken
        );
        localStorage.setItem(
          "refreshToken",
          res.data.data.authentication.refreshToken
        );
        localStorage.setItem("user", JSON.stringify(res.data.data));
      }
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);
export const reqForgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (emailData, { rejectWithValue }) => {
    try {
      const res = await authApi.forgotPassword(emailData);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const resetPasswordRequest = createAsyncThunk(
  "auth/resetPassword",
  async (resetData, { rejectWithValue }) => {
    try {
      const res = await authApi.resetPassword(resetData);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const res = await authApi.logoutUser();
      // Clear localStorage
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
      return res.data;
    } catch (err) {
      // Still clear localStorage even if API call fails
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const getProfile = createAsyncThunk(
  "auth/getProfile",
  async (_, { rejectWithValue }) => {
    try {
      const res = await authApi.getUserProfile();
      localStorage.setItem("user", JSON.stringify(res.data.data || res.data));
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const updateProfile = createAsyncThunk(
  "auth/updateProfile",
  async (profileData, { rejectWithValue }) => {
    try {
      const res = await authApi.updateUserProfile(profileData);
      localStorage.setItem("user", JSON.stringify(res.data));
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const changePassword = createAsyncThunk(
  "auth/changePassword",
  async (passwordData, { rejectWithValue }) => {
    try {
      const res = await authApi.changePassword(passwordData);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Address Thunks
export const fetchAddresses = createAsyncThunk(
  "auth/fetchAddresses",
  async (_, { rejectWithValue }) => {
    try {
      const res = await authApi.getAddressList();
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const createAddress = createAsyncThunk(
  "auth/createAddress",
  async (addressData, { rejectWithValue, dispatch }) => {
    try {
      const res = await authApi.addAddress(addressData);
      dispatch(fetchAddresses());
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const modifyAddress = createAsyncThunk(
  "auth/modifyAddress",
  async ({ id, data }, { rejectWithValue, dispatch }) => {
    try {
      const res = await authApi.editAddress(id, data);
      dispatch(fetchAddresses());
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const removeAddress = createAsyncThunk(
  "auth/removeAddress",
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const res = await authApi.deleteAddress(id);
      return { id, ...res.data };
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);


export const setMainAddress = createAsyncThunk(
  "auth/setMainAddress",
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const res = await authApi.setDefaultAddress(id);
      dispatch(fetchAddresses());
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Initial state
const getInitialUser = () => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.data && !user.name) return user.data; // Handle nested response structure
    return user;
  } catch (e) {
    return null;
  }
};

const initialState = {
  user: getInitialUser(),
  accessToken: localStorage.getItem("accessToken") || null,
  refreshToken: localStorage.getItem("refreshToken") || null,
  isAuthenticated: !!localStorage.getItem("accessToken"),
  otpToken: null,

  // Loading states
  loading: false,
  registerLoading: false,
  loginLoading: false,
  otpLoading: false,
  forgotPasswordLoading: false,
  resetPasswordLoading: false,
  profileLoading: false,
  socialLoginLoading: false,
  addressLoading: false,

  // Success states
  registerSuccess: false,
  otpSent: false,
  otpVerified: false,
  forgotPasswordSuccess: false,
  resetPasswordSuccess: false,
  addressSuccess: false,

  // Error states
  error: null,
  registerError: null,
  loginError: null,
  otpError: null,
  forgotPasswordError: null,
  resetPasswordError: null,
  profileError: null,
  socialLoginError: null,
  addressError: null,

  // Data states
  addresses: [],
  message: null,
  otpMessage: null,
  forgotPasswordMessage: null,
  resetPasswordMessage: null,
  addressMessage: null,
};

// Auth slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearErrors: (state) => {
      state.error = null;
      state.registerError = null;
      state.loginError = null;
      state.otpError = null;
      state.forgotPasswordError = null;
      state.resetPasswordError = null;
      state.profileError = null;
      state.socialLoginError = null;
    },
    clearMessages: (state) => {
      state.message = null;
      state.otpMessage = null;
      state.forgotPasswordMessage = null;
      state.resetPasswordMessage = null;
    },
    clearSuccessStates: (state) => {
      state.registerSuccess = false;
      state.otpSent = false;
      state.otpVerified = false;
      state.forgotPasswordSuccess = false;
      state.resetPasswordSuccess = false;
    },
    setTokens: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.isAuthenticated = true;
      localStorage.setItem("accessToken", action.payload.accessToken);
      localStorage.setItem("refreshToken", action.payload.refreshToken);
    },
    setUser: (state, action) => {
      state.user = action.payload.user.data;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
  },
  extraReducers: (builder) => {
    // Register
    builder
      .addCase(register.pending, (state) => {
        state.registerLoading = true;
        state.registerError = null;
        state.registerSuccess = false;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.registerLoading = false;
        state.registerSuccess = true;

        // Auto-login updates
        const authData = action.payload?.authentication;
        const accessToken =
          authData?.accessToken ||
          state.accessToken ||
          localStorage.getItem("accessToken");
        const refreshToken =
          authData?.refreshToken ||
          state.refreshToken ||
          localStorage.getItem("refreshToken");

        if (accessToken) {
          state.isAuthenticated = true;
          state.accessToken = accessToken;
          state.refreshToken = refreshToken;
          // Use the user data from the payload if provided, otherwise fallback to existing response structure
          state.user =
            action.payload.user || action.payload.data || action.payload;
        }

        state.message = action.payload.message || "Registration successful!";
      })
      .addCase(register.rejected, (state, action) => {
        state.registerLoading = false;
        state.registerError = action.payload;
        state.registerSuccess = false;
      });

    // Login
    builder
      .addCase(reqLogin.pending, (state) => {
        state.loginLoading = true;
        state.loginError = null;
      })
      .addCase(reqLogin.fulfilled, (state, action) => {
        state.loginLoading = false;
        state.isAuthenticated = true;
        state.accessToken = action.payload.data.authentication.accessToken;
        state.refreshToken = action.payload.data.authentication.refreshToken;
        state.user = action.payload.data;
        state.message = action.payload.message || "Login successful!";
      })
      .addCase(reqLogin.rejected, (state, action) => {
        state.loginLoading = false;
        state.loginError = action.payload;
      });

    // Send OTP
    builder
      .addCase(reqVerifyEmail.pending, (state) => {
        state.otpLoading = true;
        state.otpError = null;
        state.otpSent = false;
      })
      .addCase(reqVerifyEmail.fulfilled, (state, action) => {
        state.otpLoading = false;
        state.otpSent = true;
        state.otpMessage = action.payload.message || "OTP sent successfully!";
      })
      .addCase(reqVerifyEmail.rejected, (state, action) => {
        state.otpLoading = false;
        state.otpError = action.payload;
        state.otpSent = false;
      });

    // Verify OTP
    builder
      .addCase(verifyOTP.pending, (state) => {
        state.otpLoading = true;
        state.otpError = null;
        state.otpVerified = false;
      })
      .addCase(verifyOTP.fulfilled, (state, action) => {
        state.otpLoading = false;
        state.otpVerified = true;
        state.otpToken = action.payload?.authentication?.accessToken || null;
        state.otpMessage =
          action.payload.message || "OTP verified successfully";
      })
      .addCase(verifyOTP.rejected, (state, action) => {
        state.otpLoading = false;
        state.otpError = action.payload;
        state.otpVerified = false;
      });
    // In the extraReducers, add case for verifyOTP.fulfilled

    // Forgot Password
    builder
      .addCase(reqForgotPassword.pending, (state) => {
        state.forgotPasswordLoading = true;
        state.forgotPasswordError = null;
        state.forgotPasswordSuccess = false;
      })
      .addCase(reqForgotPassword.fulfilled, (state, action) => {
        state.forgotPasswordLoading = false;
        state.forgotPasswordSuccess = true;
        state.forgotPasswordMessage =
          action.payload.message || "Reset instructions sent to your email!";
      })
      .addCase(reqForgotPassword.rejected, (state, action) => {
        state.forgotPasswordLoading = false;
        state.forgotPasswordError = action.payload;
        state.forgotPasswordSuccess = false;
      });

    // Reset Password
    builder
      .addCase(resetPasswordRequest.pending, (state) => {
        state.resetPasswordLoading = true;
        state.resetPasswordError = null;
        state.resetPasswordSuccess = false;
      })
      .addCase(resetPasswordRequest.fulfilled, (state, action) => {
        state.resetPasswordLoading = false;
        state.resetPasswordSuccess = true;
        state.resetPasswordMessage =
          action.payload.message || "Password reset successful!";
      })
      .addCase(resetPasswordRequest.rejected, (state, action) => {
        state.resetPasswordLoading = false;
        state.resetPasswordError = action.payload;
        state.resetPasswordSuccess = false;
      });

    // Logout
    builder
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.accessToken = null;
        state.refreshToken = null;
        state.isAuthenticated = false;
        state.message = "Logged out successfully!";
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.user = null;
        state.accessToken = null;
        state.refreshToken = null;
        state.isAuthenticated = false;
        state.error = action.payload;
      });

    // Get Profile
    builder
      .addCase(getProfile.pending, (state) => {
        state.profileLoading = true;
        state.profileError = null;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.profileLoading = false;
        // Handle both nested (.data) and flat response structures
        state.user = action.payload?.data || action.payload;
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.profileLoading = false;
        state.profileError = action.payload;
      });

    // Update Profile
    builder
      .addCase(updateProfile.pending, (state) => {
        state.profileLoading = true;
        state.profileError = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.profileLoading = false;
        // Update user state with the response data if available
        if (action.payload) {
          state.user = action.payload.data || action.payload;
        }
        state.message = "Profile updated successfully!";
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.profileLoading = false;
        state.profileError = action.payload;
      });

    // Change Password
    builder
      .addCase(changePassword.pending, (state) => {
        state.resetPasswordLoading = true;
        state.resetPasswordError = null;
        state.resetPasswordSuccess = false;
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.resetPasswordLoading = false;
        state.resetPasswordSuccess = true;
        state.resetPasswordMessage =
          action.payload.message || "Password changed successfully!";
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.resetPasswordLoading = false;
        state.resetPasswordError = action.payload;
        state.resetPasswordSuccess = false;
      });

    // Address list
    builder
      .addCase(fetchAddresses.pending, (state) => {
        state.addressLoading = true;
        state.addressError = null;
      })
      .addCase(fetchAddresses.fulfilled, (state, action) => {
        state.addressLoading = false;
        state.addresses = action.payload.data || [];
      })
      .addCase(fetchAddresses.rejected, (state, action) => {
        state.addressLoading = false;
        state.addressError = action.payload;
      });

    // Create address
    builder
      .addCase(createAddress.pending, (state) => {
        state.addressLoading = true;
        state.addressError = null;
        state.addressSuccess = false;
      })
      .addCase(createAddress.fulfilled, (state, action) => {
        state.addressLoading = false;
        state.addressSuccess = true;
        state.addressMessage = action.payload.message || "Address added successfully!";
      })
      .addCase(createAddress.rejected, (state, action) => {
        state.addressLoading = false;
        state.addressError = action.payload;
        state.addressSuccess = false;
      });

    // Edit/Remove/SetDefault address use same loading/error states
    builder.addCase(removeAddress.pending, (state) => {
      state.addressError = null;
    })
      .addCase(removeAddress.fulfilled, (state, action) => {
        state.addressLoading = false;
        state.addresses = state.addresses.filter(addr => addr._id !== action.payload.id);
        state.addressMessage = action.payload.message || "Address removed successfully";
      })
      .addCase(removeAddress.rejected, (state, action) => {
        state.addressLoading = false;
        state.addressError = action.payload;
      });

    const addressActionThunks = [modifyAddress, setMainAddress];
    addressActionThunks.forEach((thunk) => {
      builder
        .addCase(thunk.pending, (state) => {
          state.addressLoading = true;
          state.addressError = null;
        })
        .addCase(thunk.fulfilled, (state, action) => {
          state.addressLoading = false;
          state.addressMessage = action.payload.message;
        })
        .addCase(thunk.rejected, (state, action) => {
          state.addressLoading = false;
          state.addressError = action.payload;
        });
    });

  },
});

export const {
  clearErrors,
  clearMessages,
  clearSuccessStates,
  setTokens,
  setUser,
  clearAddressState,
} = authSlice.actions;

export default authSlice.reducer;
