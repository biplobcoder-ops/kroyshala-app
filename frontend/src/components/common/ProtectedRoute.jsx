import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAuth } from "../../features/auth/context/AuthContext";

const AdminProtectedRoute = ({ children }) => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const { loading } = useAuth();
  const location = useLocation();

  // ✅ Auth check শেষ না হওয়া পর্যন্ত কিছু রেন্ডার করো না
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return <Navigate to="/admin/login" state={{ from: location.pathname }} replace />;
  }

  if (user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminProtectedRoute;