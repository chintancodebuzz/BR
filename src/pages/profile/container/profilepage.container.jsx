import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { User, Package, MapPin, Lock } from "lucide-react";
import { getProfile, logoutUser } from "../../../slices/authSlice";
import { APP_ROUTES } from "../../../constants/appRoutes";
import ProfilePageView from "../view/profilepage.view";

const ProfilePageContainer = () => {
  const { user } = useSelector((state) => state.auth);
  const currentUser = user?.data || user;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const getActiveTab = () => {
    const path = location.pathname;
    if (path.includes("/orders")) return "orders";
    if (path.includes("/password")) return "password";
    if (path.includes("/address")) return "address";
    return "overview";
  };

  const activeTab = getActiveTab();

  const menuItems = [
    { id: "overview", label: "Account Overview", icon: User, path: "/profile" },
    {
      id: "orders",
      label: "My Orders",
      icon: Package,
      path: "/profile/orders",
    },
    {
      id: "address",
      label: "Manage Address",
      icon: MapPin,
      path: "/profile/address",
    },
    {
      id: "password",
      label: "Change Password",
      icon: Lock,
      path: "/profile/password",
    },
  ];

  const handleLogout = async () => {
    setShowLogoutModal(false);
    await dispatch(logoutUser());
    navigate(APP_ROUTES.HOME);
  };

  useEffect(() => {
    if (currentUser) {
      dispatch(getProfile());
    }
  }, [dispatch]);

  return (
    <ProfilePageView
      currentUser={currentUser}
      activeTab={activeTab}
      menuItems={menuItems}
      showLogoutModal={showLogoutModal}
      setShowLogoutModal={setShowLogoutModal}
      handleLogout={handleLogout}
      navigate={navigate}
    />
  );
};

export default ProfilePageContainer;
