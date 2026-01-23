import React from "react";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[#FDFDFD]">
      <Outlet /> {/* This will render the Login/Register pages */}
    </div>
  );
};

export default AuthLayout;
