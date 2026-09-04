import React, { useState } from "react";
import { NavLink, Outlet, Link } from "react-router-dom";
import {
  FiGrid,
  FiPackage,
  FiShoppingCart,
  FiUsers,
  FiBarChart2,
  FiMenu,
  FiX,
  FiLogOut,
  FiExternalLink,
} from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import Button from "../components/ui/Button/Button";
import { logoutUser } from "../features/auth/services/authApi2";
import { clearUser } from "../features/auth/store/authSlice2";
import { clearCart } from "../features/cart/store/cartSlice";
import { clearWishlist } from "../features/wishlist/store/wishlistSlice";

const adminNavItems = [
  { id: "dashboard", label: "Dashboard", path: "/admin", icon: <FiBarChart2 /> },
  { id: "analytics", label: "Analytics", path: "/admin/analytics", icon: <FiBarChart2 /> },
  { id: "orders", label: "Orders", path: "/admin/orders", icon: <FiShoppingCart /> },
  { id: "products", label: "Products", path: "/admin/products", icon: <FiPackage /> },
  { id: "categories", label: "Categories", path: "/admin/categories", icon: <FiGrid /> },
  { id: "users", label: "Users", path: "/admin/users", icon: <FiUsers /> },
];

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const handleLogout = async () => {
    try {
      try {
        await logoutUser();
      } catch (error) {
        console.log("Logout API error:", error);
      }
      localStorage.removeItem("accessToken");
      dispatch(clearUser());
      dispatch(clearCart());
      dispatch(clearWishlist());
      window.location.href = "/admin/login";
    } catch (error) {
      localStorage.removeItem("accessToken");
      dispatch(clearUser());
      dispatch(clearCart());
      dispatch(clearWishlist());
      window.location.href = "/admin/login";
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-slate-100">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-64 transform flex-col bg-slate-900 text-white transition-transform duration-300 ease-in-out md:static md:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Sidebar Header */}
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-slate-800 px-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
              <FiShoppingCart className="h-4 w-4" />
            </div>
            <span className="text-lg font-bold">Kroyshala</span>
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            rounded="full"
            className="!h-8 !w-8 !p-0 !text-white md:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <FiX className="h-4 w-4" />
          </Button>
        </div>

        {/* User Info */}
        <div className="shrink-0 border-b border-slate-800 px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold">
              {user?.name?.charAt(0)?.toUpperCase() || "A"}
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold">{user?.name || "Admin"}</p>
              <p className="truncate text-xs text-slate-400">{user?.email || ""}</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-4">
          <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
            Main Menu
          </p>
          <div className="space-y-1">
            {adminNavItems.map((item) => (
              <NavLink
                key={item.id}
                to={item.path}
                end={item.path === "/admin"}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                      : "text-slate-300 hover:bg-slate-800 hover:text-white"
                  }`
                }
              >
                <span className="h-5 w-5 shrink-0">{item.icon}</span>
                <span className="flex-1">{item.label}</span>
              </NavLink>
            ))}
          </div>

          {/* Visit Store Link */}
          <div className="mt-4 border-t border-slate-800 pt-4">
            <Link
              to="/"
              className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-slate-300 transition hover:bg-slate-800 hover:text-white"
            >
              <FiExternalLink className="h-5 w-5 shrink-0" />
              <span>Visit Store</span>
            </Link>
          </div>
        </nav>

        {/* Logout */}
        <div className="shrink-0 border-t border-slate-800 p-3">
          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-red-400 transition hover:bg-red-500/10 hover:text-red-300"
          >
            <FiLogOut className="h-5 w-5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top Header */}
        <header className="flex h-16 shrink-0 items-center justify-between border-b border-slate-200 bg-white px-4 shadow-sm md:px-6">
          <div className="flex items-center gap-3">
            <Button
              type="button"
              variant="outline"
              size="sm"
              rounded="lg"
              className="!h-10 !w-10 !p-0 md:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <FiMenu className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-lg font-bold text-slate-900">Admin Panel</h1>
              <p className="hidden text-xs text-slate-500 sm:block">Manage your store</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden text-sm font-medium text-slate-600 md:block">{user?.name}</span>
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold text-white">
              {user?.name?.charAt(0)?.toUpperCase() || "A"}
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;