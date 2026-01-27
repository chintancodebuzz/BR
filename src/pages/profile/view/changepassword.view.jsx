import React from "react";
import { Loader2, Lock, Eye, EyeOff } from "lucide-react";

const ChangePasswordView = ({
    isLoading,
    initialLoading,
    showOldPassword,
    setShowOldPassword,
    showNewPassword,
    setShowNewPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    formik
}) => {
    if (initialLoading) {
        return (
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8 space-y-8 animate-pulse">
                <div className="space-y-3">
                    <div className="h-8 w-48 bg-gray-50 rounded-lg"></div>
                    <div className="h-4 w-64 bg-gray-50 rounded-md"></div>
                </div>
                <div className="space-y-6 max-w-lg">
                    <div className="space-y-3">
                        <div className="h-4 w-24 bg-gray-50 rounded-md"></div>
                        <div className="h-12 w-full bg-gray-50 rounded-xl"></div>
                    </div>
                    <div className="space-y-3">
                        <div className="h-4 w-24 bg-gray-50 rounded-md"></div>
                        <div className="h-12 w-full bg-gray-50 rounded-xl"></div>
                    </div>
                    <div className="h-12 w-32 bg-gray-50 rounded-xl"></div>
                </div>
            </div>
        );
    }
    return (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 md:p-8 animate-fade-in">
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-[#501F08]">Change Password</h2>
                <p className="text-gray-500 text-sm mt-1">
                    Ensure your account is secure by using a strong password.
                </p>
            </div>

            <form onSubmit={formik.handleSubmit} className="space-y-3 max-w-lg">
                {/* Old Password */}
                <div >
                    <label className="text-[12px] font-black text-[#501F08] uppercase  opacity-60">
                        Current Password
                    </label>
                    <div className="relative">
                        <input
                            type={showOldPassword ? "text" : "password"}
                            name="oldPassword"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.oldPassword}
                            className="w-full bg-[#FAF7F5] border-transparent focus:border-[#501F08]/20 focus:bg-white rounded-xl px-4 pl-10 pr-12 py-2.5 text-sm transition-all outline-hidden"
                            placeholder="Enter current password"
                        />
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <button
                            type="button"
                            onClick={() => setShowOldPassword(!showOldPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                        >
                            {showOldPassword ? (
                                <EyeOff className="w-5 h-5" />
                            ) : (
                                <Eye className="w-5 h-5" />
                            )}
                        </button>
                    </div>
                    {formik.touched.oldPassword && formik.errors.oldPassword && (
                        <span className="text-red-500 text-sm">
                            {formik.errors.oldPassword}
                        </span>
                    )}
                </div>

                {/* New Password */}
                <div>
                    <label className="text-[12px] font-black text-[#501F08] uppercase  opacity-60">
                        New Password
                    </label>
                    <div className="relative">
                        <input
                            type={showNewPassword ? "text" : "password"}
                            name="newPassword"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.newPassword}
                            className="w-full bg-[#FAF7F5] border-transparent focus:border-[#501F08]/20 focus:bg-white rounded-xl px-4 pl-10 pr-12 py-2.5 text-sm transition-all outline-hidden"
                            placeholder="Enter new password"
                        />
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <button
                            type="button"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                        >
                            {showNewPassword ? (
                                <EyeOff className="w-5 h-5" />
                            ) : (
                                <Eye className="w-5 h-5" />
                            )}
                        </button>
                    </div>
                    {formik.touched.newPassword && formik.errors.newPassword && (
                        <span className="text-red-500 text-sm">
                            {formik.errors.newPassword}
                        </span>
                    )}
                </div>

                {/* Confirm Password */}
                <div className="space-y-1">
                    <label className="text-[12px] font-black text-[#501F08] uppercase  opacity-60">
                        Confirm New Password
                    </label>
                    <div className="relative">
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            name="confirmPassword"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.confirmPassword}
                            className="w-full bg-[#FAF7F5] border-transparent focus:border-[#501F08]/20 focus:bg-white rounded-xl px-4 pl-10 pr-12 py-2.5 text-sm transition-all outline-hidden"
                            placeholder="Confirm new password"
                        />
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                        >
                            {showConfirmPassword ? (
                                <EyeOff className="w-5 h-5" />
                            ) : (
                                <Eye className="w-5 h-5" />
                            )}
                        </button>
                    </div>
                    {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                        <span className="text-red-500 text-sm">
                            {formik.errors.confirmPassword}
                        </span>
                    )}
                </div>

                <div className="pt-4">
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full sm:w-auto px-8 py-2.5 rounded-lg bg-[#501F08] text-white font-medium hover:bg-[#3a1606] transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                    >
                        {isLoading ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                            "Change Password"
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ChangePasswordView;
