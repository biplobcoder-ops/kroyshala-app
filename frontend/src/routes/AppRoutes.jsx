import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import AdminLayout from "../layouts/AdminLayout";

// Auth Pages
import RegisterPage from "../features/auth/pages2/RegisterPage";
import VerifyEmailPage2 from "../features/auth/pages2/VerifyEmailPage2";
import LoginPage2 from "../features/auth/pages2/LoginPage2";
import ForgotPasswordPage2 from "../features/auth/pages2/ForgotPasswordPage2";
import RefreshTokenPage2 from "../features/auth/pages2/RefreshTokenPage2";
import ResetPasswordPage from "../features/auth/pages2/ResetPasswordPage";

// Account Pages
import AccountLayout from "../features/auth/pages2/AccountLayout";
import MyAccountPage from "../features/auth/pages2/MyAccountPage";
import ProfilePage from "../features/auth/pages2/ProfilePage";
import EditProfilePage from "../features/auth/pages2/EditProfilePage";
import AccountMyOrdersPage from "../features/auth/pages2/MyOrdersPage";
import OrderStatusPage from "../features/auth/pages2/OrderStatusPage";
import AccountWishlistPage from "../features/auth/pages2/WishlistPage";
import AddressPage from "../features/auth/pages2/AddressPage";
import ChangePasswordPage from "../features/auth/pages2/ChangePasswordPage";

// Product Pages
import HomePage from "../features/products/pages/HomePage";
import ShopPage from "../features/products/pages/ShopPage";
import ProductDetailsPage from "../features/products/pages/ProductDetailsPage";

// Category Pages
import CategoriesPage from "../features/categories/pages/CategoriesPage";

// Cart Pages
import CartPage from "../features/cart/pages/CartPage";

// Wishlist Pages
import WishlistPage from "../features/wishlist/pages/WishlistPage";

// Order Pages
import CheckoutPage from "../features/order/pages/CheckoutPage";
import MyOrdersPage from "../features/order/pages/MyOrdersPage";
import OrderDetailsPage from "../features/order/pages/OrderDetailsPage";
import ThankYouPage from "../features/order/pages/ThankYouPage";

// Admin Pages
import AdminLoginPage from "../features/admin/pages/AdminLoginPage";
import AdminDashboardPage from "../features/admin/pages/AdminDashboardPage";
import AdminOrdersPage from "../features/admin/pages/AdminOrdersPage";
import AdminProductsPage from "../features/admin/pages/AdminProductsPage";
import AdminCategoriesPage from "../features/admin/pages/AdminCategoriesPage";
import AdminUsersPage from "../features/admin/pages/AdminUsersPage";
import AdminAnalyticsPage from "../features/admin/pages/AdminAnalyticsPage";

// 404 Page
import NotFoundPage from "../features/auth/pages/404";

import { AuthProvider } from "../features/auth/context/AuthContext";
import AdminProtectedRoute from "../components/common/ProtectedRoute";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* ======================================
              MAIN APPLICATION ROUTES
          ====================================== */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ShopPage />} />
            <Route path="/products/:slug" element={<ProductDetailsPage />} />
            <Route path="/categories" element={<CategoriesPage />} />
            <Route path="/categories/:slug" element={<ShopPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/wishlist" element={<WishlistPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/orders" element={<MyOrdersPage />} />
            <Route path="/orders/:id" element={<OrderDetailsPage />} />
            <Route path="/thank-you/:orderId" element={<ThankYouPage />} />

            {/* Account Routes */}
            <Route path="/account" element={<AccountLayout />}>
              <Route index element={<MyAccountPage />} />
              <Route path="profile" element={<ProfilePage />} />
              <Route path="profile/edit" element={<EditProfilePage />} />
              <Route path="orders" element={<AccountMyOrdersPage />} />
              <Route path="order-status" element={<OrderStatusPage />} />
              <Route path="wishlist" element={<AccountWishlistPage />} />
              <Route path="addresses" element={<AddressPage />} />
              <Route path="change-password" element={<ChangePasswordPage />} />
            </Route>
          </Route>

          {/* ======================================
              ADMIN LOGIN (Public)
          ====================================== */}
          <Route path="/admin/login" element={<AdminLoginPage />} />

          {/* ======================================
              ADMIN ROUTES (Protected)
          ====================================== */}
          <Route
            path="/admin"
            element={
              <AdminProtectedRoute>
                <AdminLayout />
              </AdminProtectedRoute>
            }
          >
            <Route index element={<AdminDashboardPage />} />
            <Route path="analytics" element={<AdminAnalyticsPage />} />
            <Route path="orders" element={<AdminOrdersPage />} />
            <Route path="products" element={<AdminProductsPage />} />
            <Route path="categories" element={<AdminCategoriesPage />} />
            <Route path="users" element={<AdminUsersPage />} />
          </Route>

          {/* ======================================
              AUTH ROUTES (Navbar ছাড়া)
          ====================================== */}
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/verify-email" element={<VerifyEmailPage2 />} />
          <Route path="/login" element={<LoginPage2 />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage2 />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/refresh-token" element={<RefreshTokenPage2 />} />

          {/* 404 */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default AppRoutes;