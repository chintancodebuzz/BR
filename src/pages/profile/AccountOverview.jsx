import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Loader2, Edit2, Camera, Save, X } from "lucide-react";
import { updateUserProfile, getUserProfile } from "../../services/authApi";
import { setUser } from "../../slices/authSlice";
import { useToast } from "../../contexts/ToastContext";
import DefaultProfile from "../../assets/home/default-profile.svg";

export default function AccountOverview() {
    const { user } = useSelector((state) => state.auth);
    console.log("🚀 ~ AccountOverview ~ user:", user)
    const dispatch = useDispatch();
    const { showToast } = useToast();
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [profileImage, setProfileImage] = useState(null);
    // keep the existing profile image in view mode; in edit mode we update it when selecting a file
    const [imagePreview, setImagePreview] = useState(
        user?.profile || DefaultProfile
    );

    // Update imagePreview when user.profile changes (e.g., after refresh or profile update)
    useEffect(() => {
        if (user?.profile && !profileImage) {
            setImagePreview(user.profile);
        }
    }, [user?.profile, profileImage]);

    const validationSchema = Yup.object({
        name: Yup.string().required("Name is required"),
        phoneNo: Yup.string(),
    });

    const formik = useFormik({
        initialValues: {
            name: user?.name || "",
            phoneNo: user?.phoneNo || "",
            email: user?.email || "",
        },
        enableReinitialize: true,
        validationSchema,
        onSubmit: async (values) => {
            setIsLoading(true);
            try {
                const formData = new FormData();
                formData.append("name", values.name);
                formData.append("phoneNo", values.phoneNo);
                if (profileImage) {
                    formData.append("profile", profileImage);
                }

                const response = await updateUserProfile(formData);

                // Update redux state with new user data
                // Assuming response.data.user contains the updated user object
                const updatedUser = response.data || {
                    ...user,
                    ...values,
                    profileImage: imagePreview,
                };

                if (response.data) {
                    dispatch(setUser({ user: { data: response.data.data || response.data } }));
                } else {
                    // Fallback if response structure is different
                    dispatch(setUser({ user: { data: updatedUser } }));
                }

                // Refresh profile to be sure
                const profileRes = await getUserProfile();
                if (profileRes.data) {
                    dispatch(setUser({ user: { data: profileRes.data.data || profileRes.data } }));
                    // Update imagePreview with the new profile URL from server
                    if (profileRes.data.data?.profile || profileRes.data.profile) {
                        setImagePreview(profileRes.data.data?.profile || profileRes.data.profile);
                    }
                }

                // Clear the selected file since we've uploaded it
                setProfileImage(null);
                showToast("Profile updated successfully", "success");
                setIsEditing(false);
            } catch (error) {
                console.error("Update profile error:", error);
                showToast(
                    error.response?.data?.message || "Failed to update profile",
                    "error"
                );
            } finally {
                setIsLoading(false);
            }
        },
    });

    // Handle image selection
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfileImage(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    // Reset form when cancelling edit
    const handleCancel = () => {
        setIsEditing(false);
        setImagePreview(user?.profile);
        setProfileImage(null);
        formik.resetForm();
    };

    return (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 md:p-8 animate-fade-in">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-[#501F08]">Account Overview</h2>
                {!isEditing && (
                    <button
                        onClick={() => setIsEditing(true)}
                        className="p-2 text-[#501F08] hover:bg-[#501F08]/5 rounded-full transition-colors"
                        title="Edit Profile"
                    >
                        <Edit2 className="w-5 h-5" />
                    </button>
                )}
            </div>

            <form onSubmit={formik.handleSubmit} className="space-y-6">
                {/* Profile Image Section */}
                <div className="flex items-center gap-6 mb-8">
                    <div className="relative group">
                        <div
                            className={`w-24 h-24 rounded-full overflow-hidden border-2 flex items-center justify-center bg-gray-50 ${isEditing ? "border-[#501F08]" : "border-gray-200"
                                }`}
                        >
                            {imagePreview ? (
                                <img
                                    src={imagePreview}
                                    alt="Profile"
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <span className="text-3xl font-bold text-[#501F08] opacity-50">
                                    {user?.name?.charAt(0).toUpperCase()}
                                </span>
                            )}
                        </div>

                        {isEditing && (
                            <label
                                htmlFor="profile-upload"
                                className="absolute inset-0 flex items-center justify-center bg-black/40 text-white rounded-full opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity"
                            >
                                <Camera className="w-8 h-8" />
                                <input
                                    id="profile-upload"
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleImageChange}
                                />
                            </label>
                        )}
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                            {user?.name}
                        </h3>
                        <p className="text-gray-500 text-sm">{user?.email}</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Name Field */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">
                            Name
                        </label>
                        {isEditing ? (
                            <input
                                id="name"
                                name="name"
                                type="text"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.name}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#501F08]/20 focus:border-[#501F08] transition-all outline-none"
                                placeholder="Enter your name"
                            />
                        ) : (
                            <div className="p-2.5 bg-gray-50 rounded-lg border border-transparent text-gray-800 font-medium">
                                {user?.name}
                            </div>
                        )}
                        {formik.touched.name && formik.errors.name && (
                            <span className="text-red-500 text-xs">{formik.errors.name}</span>
                        )}
                    </div>

                    {/* Phone Field */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">
                            Phone Number
                        </label>
                        {isEditing ? (
                            <input
                                id="phoneNo"
                                name="phoneNo"
                                type="text"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.phoneNo}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#501F08]/20 focus:border-[#501F08] transition-all outline-none"
                                placeholder="+91 9999999999"
                            />
                        ) : (
                            <div className="p-2.5 bg-gray-50 rounded-lg border border-transparent text-gray-800 font-medium">
                                {user?.phoneNo || "Not provided"}
                            </div>
                        )}
                        {formik.touched.phoneNo && formik.errors.phoneNo && (
                            <span className="text-red-500 text-xs">
                                {formik.errors.phoneNo}
                            </span>
                        )}
                    </div>

                    {/* Email Field (Read Only) */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">
                            Email Address
                        </label>
                        <div className="p-2.5 bg-gray-50 rounded-lg border border-transparent text-gray-500 cursor-not-allowed">
                            {user?.email}
                        </div>
                        {isEditing && (
                            <span className="text-xs text-gray-400">
                                Email cannot be changed
                            </span>
                        )}
                    </div>
                </div>

                {/* Action Buttons */}
                {isEditing && (
                    <div className="flex items-center gap-4 pt-6 mt-6 border-t border-gray-100 justify-end">
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="px-6 py-2.5 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors flex items-center gap-2"
                            disabled={isLoading}
                        >
                            <X className="w-4 h-4" /> Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="px-6 py-2.5 rounded-lg bg-[#501F08] text-white font-medium hover:bg-[#3a1606] transition-all shadow-md hover:shadow-lg flex items-center gap-2"
                        >
                            {isLoading ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                                <Save className="w-4 h-4" />
                            )}
                            Save Changes
                        </button>
                    </div>
                )}
            </form>
        </div>
    );
}
