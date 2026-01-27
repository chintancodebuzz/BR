import { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import ChangePasswordView from "../view/changepassword.view";
import { changePassword } from "../../../services/authApi";

const ChangePasswordContainer = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validationSchema = Yup.object({
    oldPassword: Yup.string().required("Current password is required"),
    newPassword: Yup.string()
      .required("New password is required")
      .min(6, "Password must be at least 6 characters"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
      .required("Please confirm your password"),
  });

  const formik = useFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      setIsLoading(true);
      try {
        await changePassword({
          oldPassword: values.oldPassword,
          newPassword: values.newPassword,
          confirmPassword: values.confirmPassword,
        });
        resetForm();
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <ChangePasswordView
      isLoading={isLoading}
      initialLoading={initialLoading}
      showOldPassword={showOldPassword}
      setShowOldPassword={setShowOldPassword}
      showNewPassword={showNewPassword}
      setShowNewPassword={setShowNewPassword}
      showConfirmPassword={showConfirmPassword}
      setShowConfirmPassword={setShowConfirmPassword}
      formik={formik}
    />
  );
};

export default ChangePasswordContainer;
