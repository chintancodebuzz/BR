import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { updateUserProfile, getUserProfile } from "../../../services/authApi";
import { setUser } from "../../../slices/authSlice";
import DefaultProfile from "../../../assets/home/default-profile.svg";
import AccountOverviewView from "../view/accountoverview.view";

const AccountOverviewContainer = () => {
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [initialLoading, setInitialLoading] = useState(false);
    const [profileImage, setProfileImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(
        user?.profile || DefaultProfile,
    );

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

                if (response.data) {
                    dispatch(
                        setUser({ user: { data: response.data.data || response.data } }),
                    );
                }

                const profileRes = await getUserProfile();
                if (profileRes.data) {
                    dispatch(
                        setUser({
                            user: { data: profileRes.data.data || profileRes.data },
                        }),
                    );
                    if (profileRes.data.data?.profile || profileRes.data.profile) {
                        setImagePreview(
                            profileRes.data.data?.profile || profileRes.data.profile,
                        );
                    }
                }

                setProfileImage(null);
                setIsEditing(false);
            } catch (error) {
                throw error;
            } finally {
                setIsLoading(false);
            }
        },
    });

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfileImage(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleCancel = () => {
        setIsEditing(false);
        setImagePreview(user?.profile || DefaultProfile);
        setProfileImage(null);
        formik.resetForm();
    };

    return (
        <AccountOverviewView
            user={user}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            isLoading={isLoading}
            initialLoading={initialLoading}
            imagePreview={imagePreview}
            handleImageChange={handleImageChange}
            handleCancel={handleCancel}
            formik={formik}
        />
    );
};

export default AccountOverviewContainer;
