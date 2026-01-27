import { Routes, Route, Outlet, useLocation } from "react-router-dom";
import Home from "./pages/home/container/home.container";
import Products from "./pages/product/container/product.container";
import ProductDetail from "./pages/product/container/productdetail.container";
import Cart from "./pages/cart/container/cart.container";
import Wishlist from "./pages/wishlist/container/wishlist.container";
import Header from "./components/layout/header";
import Footer from "./components/layout/footer";
import Academy from "./pages/academy/container/academy.container";
import Contact from "./pages/contact/container/contact.container";
import ProfilePage from "./pages/profile/container/profilepage.container";
import AccountOverview from "./pages/profile/container/accountoverview.container";
import ManageAddress from "./pages/profile/container/manageaddress.container";
import ChangePassword from "./pages/profile/container/changepassword.container";
import MyOrders from "./pages/profile/container/myorders.container";
import OrderDetails from "./pages/profile/container/orderdetails.container";
import Checkout from "./pages/checkout/container/checkout.container";
import TopBar from "./components/home/topbar";
import ScrollToTop from "./components/common/scrolltotop";
import FloatingButtons from "./components/common/floatingbuttons";

import Login from "./components/auth/login";
import Register from "./components/auth/register";
import AuthLayout from "./components/common/authlayout";
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
      <main className={`grow pt-19 ${!isHomePage ? "bg-[#FDFDFD]" : ""}`}>
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
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/academy" element={<Academy />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/profile" element={<ProfilePage />}>
              <Route index element={<AccountOverview />} />
              <Route path="orders" element={<MyOrders />} />
              <Route path="orders/:id" element={<OrderDetails />} />
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
