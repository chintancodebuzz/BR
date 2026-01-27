import React from "react";
import { LogOut, Trash2 } from "lucide-react";
import { Outlet } from "react-router-dom";
import LogoutModal from "../../../components/models/LogoutModal";

const ProfilePageView = ({
    currentUser,
    activeTab,
    menuItems,
    showLogoutModal,
    setShowLogoutModal,
    handleLogout,
    navigate
}) => {
    return (
        <div className=" bg-[#FDFDFD] ">
            <div className="max-w-screen-2xl mx-auto px-6 md:px-12 py-12">
                {/* Breadcrumb */}
                <div className="mb-8 text-sm text-gray-500">
                    <span
                        className="hover:text-[#501F08] cursor-pointer"
                        onClick={() => navigate("/")}
                    >
                        Home
                    </span>{" "}
                    {">"} <span className="text-gray-900 font-medium">My Account</span>
                </div>

                {/* Header Section */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Hi,{" "}
                        <span className="text-[#501F08]">
                            {currentUser?.name || "User"}
                        </span>
                    </h1>
                    <p className="text-gray-500 mt-1">Welcome back to your account.</p>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar */}
                    <div className="w-full lg:w-72 shrink-0">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden sticky top-32">
                            {/* Menu Items */}
                            <nav className="p-2 space-y-1">
                                {menuItems.map((item) => (
                                    <button
                                        key={item.id}
                                        onClick={() => navigate(item.path)}
                                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-md font-medium transition-all duration-200 cursor-pointer ${activeTab === item.id
                                                ? "bg-[#501F08]/5 text-[#501F08]"
                                                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                            }`}
                                    >
                                        <item.icon
                                            className={`w-5 h-5 ${activeTab === item.id ? "text-[#501F08]" : "text-gray-400"}`}
                                        />
                                        {item.label}
                                    </button>
                                ))}

                                <div className="my-2 border-t border-gray-100"></div>

                                {/* Sign Out */}
                                <button
                                    onClick={() => setShowLogoutModal(true)}
                                    className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-md font-medium text-gray-600 hover:bg-red-50 hover:text-red-600 transition-all duration-200"
                                >
                                    <LogOut className="w-5 h-5" />
                                    Sign-out
                                </button>

                                {/* Delete Account */}
                                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-md font-medium text-gray-400 hover:text-red-600 transition-all duration-200">
                                    <Trash2 className="w-5 h-5" />
                                    Delete Account
                                </button>
                            </nav>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1">
                        <Outlet />
                    </div>
                </div>
            </div>

            <LogoutModal
                isOpen={showLogoutModal}
                onClose={() => setShowLogoutModal(false)}
                onConfirm={handleLogout}
            />
        </div>
    );
};

export default ProfilePageView;
