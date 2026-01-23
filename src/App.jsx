import { Routes, Route, Outlet, useLocation } from "react-router-dom";
import Home from "./pages/home/view/home";
import Products from "./pages/product/view/product";
import ProductDetail from "./pages/product/view/productDetail";
import Cart from "./pages/cart/view/cart";
import Wishlist from "./pages/wishlist/view/wishlist";
import Header from "./components/layout/header";
import Footer from "./components/layout/footer";
import Academy from "./pages/academy/view/academy";
import Contact from "./pages/contact/view/contact";
import ProfilePage from "./pages/profile/ProfilePage";
import AccountOverview from "./pages/profile/AccountOverview";
import ManageAddress from "./pages/profile/ManageAddress";
import ChangePassword from "./pages/profile/ChangePassword";
import TopBar from "./components/home/topBar";
import ScrollToTop from "./components/common/ScrollToTop";
import FloatingButtons from "./components/common/FloatingButtons";

import Login from "./components/auth/login";
import Register from "./components/auth/register";
import AuthLayout from "./components/common/authLayout";
import ForgetPassword from "./components/auth/forgetPassword/forgetPassword";
import { ToastProvider } from "./contexts/ToastContext";

// Layout wrapper for pages with header/footer
const MainLayout = () => {
  const { pathname } = useLocation();
  const isHomePage = pathname === "/";

  return (
    <>
      <TopBar />
      <Header />
      <main className={`grow pt-19 ${!isHomePage ? 'bg-[#FDFDFD]' : ''}`}>
        <Outlet />
      </main>
      <Footer />
      <FloatingButtons />
    </>
  );
};

import { useAuthManager } from "./hooks/useAuthManager";

function App() {
  useAuthManager();
  return (
    <ToastProvider>
      <div className="flex flex-col min-h-screen">
        <ScrollToTop />
        <Routes>
          {/* Routes with Header & Footer */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/academy" element={<Academy />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/profile" element={<ProfilePage />}>
              <Route index element={<AccountOverview />} />
              <Route path="address" element={<ManageAddress />} />
              <Route path="password" element={<ChangePassword />} />
            </Route>
          </Route>

          {/* Auth routes WITHOUT Header & Footer */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgetPassword />} />
          </Route>
        </Routes>
      </div>
    </ToastProvider>
  );
}

export default App;
