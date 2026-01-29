import { useState, useEffect } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logos/B_Logo.svg";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../slices/authSlice";
import { fetchCollections } from "../../slices/homeSlice";
import { APP_ROUTES } from "../../constants/appRoutes";
import LogoutModal from "../models/LogoutModal";
import { User, LogOut, Heart, ShoppingCart, Menu, X } from "lucide-react";
import { fetchCart } from "../../slices/cartSlice";
import { fetchWishlist } from "../../slices/wishlistSlice";
import DefaultProfile from "../../assets/home/default-profile.svg";
export default function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { collections } = useSelector((state) => state.home);
  const { items: cartItems } = useSelector((state) => state.cart);
  const { items: wishlistItems } = useSelector((state) => state.wishlist);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const [desktopProductsOpen, setDesktopProductsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hideHeader, setHideHeader] = useState(false);
  const [scrollDirection, setScrollDirection] = useState("up");
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const currentY = window.scrollY;
      if (currentY > lastScrollY && currentY > 100) {
        setScrollDirection("down");
        setHideHeader(true);
      } else if (currentY < lastScrollY) {
        setScrollDirection("up");
        setHideHeader(false);
      }
      setScrolled(currentY > 10);
      lastScrollY = currentY;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchCart());
      dispatch(fetchWishlist());
    }
  }, [isAuthenticated, dispatch]);

  useEffect(() => {
    dispatch(fetchCollections());
  }, [dispatch]);

  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = async () => {
    await dispatch(logoutUser());
    setShowLogoutModal(false);
    navigate(APP_ROUTES.HOME);
    setMobileMenuOpen(false);
  };

  const getInitials = (name) => {
    if (!name) return "US";
    const parts = name.trim().split(" ");
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  const activeClass =
    "after:block after:w-full after:h-[3px] after:bg-[#501F08] after:rounded-full after:transition-all";

  return (
    <div className="sticky top-0 z-50">
      <header
        className={`fixed left-0 w-full z-40 transition-all duration-300 ease-in-out ${
          scrolled
            ? "backdrop-blur-md shadow-lg top-7"
            : "backdrop-blur-md shadow-lg top-7"
        } `}
      >
        <div className="mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-24 py-0.5 flex items-center justify-between">
          {/* Logo */}
          <Link to={APP_ROUTES.HOME} className="shrink-0">
            <img
              src={logo}
              alt="BR Nails Logo"
              className="h-12 w-12 sm:h-14 sm:w-14 md:h-15 md:w-15 lg:h-16 lg:w-16 rounded-full shadow-sm"
            />
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-10 font-medium text-[#333333]">
            <NavLink
              to={APP_ROUTES.HOME}
              end
              className={({ isActive }) =>
                `hover:text-[#501F08] relative transition-colors ${
                  isActive ? activeClass : "after:hidden"
                }`
              }
            >
              HOME
            </NavLink>
            <div
              className="relative"
              onMouseEnter={() => setDesktopProductsOpen(true)}
              onMouseLeave={() => setDesktopProductsOpen(false)}
            >
              <button className="flex items-center gap-1 hover:text-[#501F08] cursor-pointer relative transition-colors group">
                COLLECTIONS
                <svg
                  className={`w-3 h-3 transition-transform duration-300 ${desktopProductsOpen ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {desktopProductsOpen && (
                <div className="absolute left-0 top-full pt-2 w-72 z-50 animate-in fade-in slide-in-from-top-2 duration-300">
                  <div className="bg-white/98 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
                    {/* Scrollable Content with Custom Scrollbar */}
                    <div className="max-h-96 overflow-y-auto custom-scrollbar">
                      {/* Gradient Fade Top */}
                      <div className="sticky top-0 h-4 bg-linear-to-b from-white to-transparent pointer-events-none z-10"></div>

                      <div className="px-2 pb-2">
                        {collections && collections.length > 0 ? (
                          collections.map((collection, index) => (
                            <Link
                              key={collection._id || collection.id}
                              to={`/products?collectionId=${collection._id || collection.id}`}
                              className="group/item block relative"
                              onClick={() => setDesktopProductsOpen(false)}
                            >
                              <div className="flex items-center gap-3 px-4 py-2 justify-between rounded-xl hover:bg-linear-to-r hover:from-[#501F08]/5 hover:to-[#501F08]/10 transition-all duration-300 border border-transparent hover:border-[#501F08]/20">
                                {/* Collection Name */}
                                <div>
                                  <p className="font-semibold text-gray-800 group-hover/item:text-[#501F08] transition-colors">
                                    {collection.name || collection.title}
                                  </p>
                                  {collection.description && (
                                    <p className="text-xs text-gray-500 line-clamp-1 mt-0.5">
                                      {collection.description}
                                    </p>
                                  )}
                                </div>

                                {/* Arrow */}
                                <svg
                                  className="w-4 h-4 text-gray-400 group-hover/item:text-[#501F08] group-hover/item:translate-x-1 transition-all"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M9 5l7 7-7 7"
                                  />
                                </svg>
                              </div>
                            </Link>
                          ))
                        ) : (
                          <div className="px-4 py-8 text-center">
                            <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-gray-100 flex items-center justify-center">
                              <svg
                                className="w-8 h-8 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                                />
                              </svg>
                            </div>
                            <p className="text-sm text-gray-500 font-medium">
                              No collections available
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Gradient Fade Bottom */}
                      <div className="sticky bottom-0 h-4 bg-linear-to-t from-white to-transparent pointer-events-none"></div>
                    </div>

                    {/* Footer */}
                    <div className="border-t border-gray-100 p-3 bg-gray-50/50">
                      <Link
                        to="/products"
                        className="block text-center text-sm font-semibold text-[#501F08] hover:text-[#3a1606] transition-colors"
                        onClick={() => setDesktopProductsOpen(false)}
                      >
                        View All Products →
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <style jsx="true">{`
              .custom-scrollbar::-webkit-scrollbar {
                display: none;
              }

              .custom-scrollbar {
                -ms-overflow-style: none;
                scrollbar-width: none;
              }
            `}</style>

            <NavLink
              to="/academy"
              className={({ isActive }) =>
                `hover:text-gray-900 relative transition-colors ${
                  isActive ? activeClass : "after:hidden"
                }`
              }
            >
              NAIL ART COURSES
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `hover:text-gray-900 relative transition-colors ${
                  isActive ? activeClass : "after:hidden"
                }`
              }
            >
              CONTACT US
            </NavLink>
          </nav>

          {/* Desktop Buttons Container */}
          <div className="hidden lg:flex items-center space-x-3 xl:space-x-4">
            {/* <Link
              to="/products"
              className="relative group px-3 py-1.5 xl:px-4 overflow-hidden rounded-md bg-transparent border-2 border-[#501F08] text-[#501F08] font-semibold transition-all duration-300 hover:text-white text-sm xl:text-base"
            >
              <div className="absolute inset-0 bg-[#501F08] transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
              <span className="relative z-10 whitespace-nowrap">
                BULK ORDER
              </span>
            </Link> */}

            {/* Book Now Button - Desktop */}
            <Link
              to="/contact"
              className="bg-[#501F08] text-white px-3 py-2 xl:px-4 rounded-md font-light transition hover:bg-[#3a1606] shadow-md text-sm xl:text-base whitespace-nowrap"
            >
              BOOK APPOINTMENT
            </Link>

            {/* Cart & Wishlist Icons */}
            {/* <div className="flex items-center gap-2 ml-1 xl:ml-2">
              <Link
                to="/wishlist"
                className="group relative p-2.5 text-gray-700 hover:text-[#501F08] bg-gray-50/50 hover:bg-[#501F08]/10 rounded-2xl border border-gray-100 hover:border-[#501F08]/20 transition-all active:scale-95 shadow-sm"
                aria-label="Wishlist"
              >
                <Heart
                  size={20}
                  className={`transition-all duration-300 ${wishlistItems?.length > 0 ? "fill-[#501F08] text-[#501F08]" : ""}`}
                />
                {wishlistItems?.length > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#501F08] text-[9px] font-bold text-white border-2 border-white shadow-md group-hover:scale-110 transition-transform">
                    {wishlistItems.length}
                  </span>
                )}
              </Link>

              <Link
                to="/cart"
                className="group relative p-2.5 text-gray-700 hover:text-[#501F08] bg-gray-50/50 hover:bg-[#501F08]/10 rounded-2xl border border-gray-100 hover:border-[#501F08]/20 transition-all active:scale-95 shadow-sm"
                aria-label="Cart"
              >
                <ShoppingCart size={20} />
                {cartItems?.length > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#501F08] text-[9px] font-bold text-white border-2 border-white shadow-md group-hover:scale-110 transition-transform">
                    {cartItems.length}
                  </span>
                )}
              </Link>
            </div> */}

            {/* Login / User Profile - Desktop */}
            {/* {isAuthenticated ? (
              <div className="relative group ml-2">
                <button className="flex items-center gap-2 text-[#501F08] font-medium hover:text-[#3a1606] transition-colors p-1.5 rounded-lg hover:bg-[#501F08]/5">
                  <div className="w-10 h-10 rounded-full bg-[#501F08]/5 flex items-center justify-center text-[#501F08] text-sm font-bold shadow-inner overflow-hidden border border-[#501F08]/10">
                    <img
                      src={user?.profile || DefaultProfile}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <span className="max-w-[100px] truncate hidden xl:block">
                    {user?.name || "User"}
                  </span>
                </button>

                <div className="absolute right-0 top-full pt-2 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right z-50">
                  <div className="bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden">
                    <div className="p-3 border-b border-gray-100 bg-gray-50/50">
                      <p className="text-sm font-semibold text-gray-900 truncate">
                        {user?.name}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {user?.email}
                      </p>
                    </div>
                    <Link
                      to="/profile"
                      className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      My Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <Link
                to={APP_ROUTES.LOGIN}
                className="ml-2 group p-1.5 text-gray-600 hover:text-[#501F08] hover:bg-[#501F08]/5 rounded-full transition-all border border-[#501F08 ]"
                aria-label="Login"
              >
                <User size={22} />
              </Link>
            )} */}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden py-1.5 px-2 text-white focus:outline-none  rounded-lg transition-colors bg-[#501F08]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav className="lg:hidden bg-white/95 backdrop-blur-xl border-t border-[#f7f7f7] shadow-lg h-[calc(100vh-80px)] overflow-y-auto w-full absolute left-0 z-50 animate-in fade-in slide-in-from-top-4 duration-300">
            <div className="flex flex-col px-6 py-4 space-y-4 font-medium text-gray-700">
              {/* User Info Mobile */}
              {/* {isAuthenticated && (
                <div className="flex items-center gap-3 py-3 border-b mb-2">
                  <div className="w-10 h-10 rounded-full bg-[#501F08]/5 flex items-center justify-center text-[#501F08] font-bold shadow-md overflow-hidden border border-[#501F08]/10">
                    <img
                      src={user?.profile || DefaultProfile}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div>
                    <p className="font-semibold text-gray-900">
                      {user?.name || "User"}
                    </p>
                    <p className="text-xs text-gray-500">{user?.email}</p>
                  </div>
                </div>
              )} */}

              <NavLink
                to={APP_ROUTES.HOME}
                end
                className={({ isActive }) =>
                  `hover:text-[#501F08] py-2.5 border-b text-sm ${
                    isActive ? "font-semibold text-[#501F08]" : ""
                  }`
                }
                onClick={() => setMobileMenuOpen(false)}
              >
                HOME
              </NavLink>

              {/* Collections Menu */}
              <div className="border-b">
                <button
                  className="flex justify-between w-full hover:text-[#501F08] py-2.5 font-semibold transition-colors"
                  onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
                >
                  <span>COLLECTIONS</span>
                  <svg
                    className={`w-4 h-4 transition-transform duration-300 ${mobileProductsOpen ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {mobileProductsOpen && (
                  <div className="mt-2 mb-3 bg-linear-to-br from-gray-50 to-white rounded-xl border border-gray-100 overflow-hidden">
                    {/* Scrollable Collections */}
                    <div className="max-h-64 overflow-y-auto custom-scrollbar-mobile p-2">
                      {collections && collections.length > 0 ? (
                        collections.map((collection, index) => (
                          <Link
                            key={collection._id || collection.id}
                            to={`/products?collectionId=${collection._id || collection.id}`}
                            className="group/mobile block"
                            onClick={() => {
                              setMobileMenuOpen(false);
                              setMobileProductsOpen(false);
                            }}
                          >
                            <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-linear-to-r hover:from-[#501F08]/5 hover:to-[#501F08]/10 transition-all border border-transparent hover:border-[#501F08]/20">
                              {/* Number Badge */}
                              <div className="w-7 h-7 rounded-lg bg-linear-to-br from-[#501F08]/10 to-[#501F08]/5 flex items-center justify-center text-[#501F08] font-bold text-xs shrink-0">
                                {index + 1}
                              </div>

                              {/* Collection Info */}
                              <div className="flex-1 min-w-0">
                                <p className="font-semibold text-sm text-gray-800 group-hover/mobile:text-[#501F08] transition-colors truncate">
                                  {collection.name || collection.title}
                                </p>
                                {collection.description && (
                                  <p className="text-xs text-gray-500 line-clamp-1">
                                    {collection.description}
                                  </p>
                                )}
                              </div>

                              {/* Arrow */}
                              <svg
                                className="w-4 h-4 text-gray-400 group-hover/mobile:text-[#501F08] group-hover/mobile:translate-x-0.5 transition-all shrink-0"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M9 5l7 7-7 7"
                                />
                              </svg>
                            </div>
                          </Link>
                        ))
                      ) : (
                        <div className="px-4 py-6 text-center">
                          <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-gray-100 flex items-center justify-center">
                            <svg
                              className="w-6 h-6 text-gray-400"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                              />
                            </svg>
                          </div>
                          <p className="text-xs text-gray-500 font-medium">
                            No collections available
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Footer */}
                    <div className="border-t border-gray-100 p-2 bg-gray-50/50">
                      <Link
                        to="/products"
                        className="block text-center text-xs font-semibold text-[#501F08] hover:text-[#3a1606] transition-colors py-1"
                        onClick={() => {
                          setMobileMenuOpen(false);
                          setMobileProductsOpen(false);
                        }}
                      >
                        View All Products →
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              <style jsx="true">{`
                .custom-scrollbar-mobile::-webkit-scrollbar {
                  display: none;
                }

                .custom-scrollbar-mobile {
                  -ms-overflow-style: none;
                  scrollbar-width: none;
                }
              `}</style>

              <NavLink
                to="/academy"
                className={({ isActive }) =>
                  `hover:text-gray-900 py-2.5 border-b ${
                    isActive ? "font-semibold text-[#501F08]" : ""
                  }`
                }
                onClick={() => setMobileMenuOpen(false)}
              >
                NAIL ART COURSES
              </NavLink>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  `hover:text-gray-900 py-2.5 border-b ${
                    isActive ? "font-semibold text-[#501F08]" : ""
                  }`
                }
                onClick={() => setMobileMenuOpen(false)}
              >
                CONTACT US
              </NavLink>

              {/* Bulk Order Button - Mobile */}
              {/* <Link
                to="/bulk-order"
                className="border border-[#501F08] text-[#501F08] px-4 py-3 rounded-md font-semibold text-center hover:bg-[#501F08] hover:text-white transition shadow-sm"
                onClick={() => setMobileMenuOpen(false)}
              >
                BULK ORDER
              </Link> */}

              {/* Book Now Button - Mobile */}
              <Link
                to="/contact"
                className="bg-[#501F08] hover:bg-[#3a1606] text-white px-4 py-3 rounded-md font-light text-center shadow-md"
                onClick={() => setMobileMenuOpen(false)}
              >
                BOOK APPOINTMENT
              </Link>

              {/* Login / Logout Link - Mobile */}
              {isAuthenticated ? (
                <button
                  onClick={handleLogout}
                  className="flex items-center justify-center space-x-2 text-red-600 hover:bg-red-50 py-3 rounded-xl transition-colors font-medium"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Sign Out</span>
                </button>
              ) : (
                <Link
                  to={APP_ROUTES.LOGIN}
                  className="flex items-center justify-center space-x-2 hover:text-[#501F08] py-4 bg-[#501F08]/5 rounded-xl transition-all duration-300 group border border-transparent hover:border-[#501F08]/20 mt-4"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <User
                    size={20}
                    className="text-gray-600 group-hover:text-[#501F08]"
                  />
                  <span className="font-semibold text-gray-700 group-hover:text-[#501F08]">
                    LOGIN
                  </span>
                </Link>
              )}
            </div>
          </nav>
        )}
      </header>

      {/* Logout Modal */}
      <LogoutModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={confirmLogout}
      />
    </div>
  );
}
