import React from "react";
import { NavLink } from "react-router-dom";

import {
  FiUser,
  FiPackage,
  FiTruck,
  FiHeart,
  FiMapPin,
  FiLock,
} from "react-icons/fi";

const accountNavigation = [
  {
    id: "profile",
    label: "My Profile",
    path: "/account/profile",
    icon: FiUser,
  },
  {
    id: "orders",
    label: "My Orders",
    path: "/account/orders",
    icon: FiPackage,
  },
  {
    id: "order-status",
    label: "Order Status",
    path: "/account/order-status",
    icon: FiTruck,
  },
  {
    id: "wishlist",
    label: "Wishlist",
    path: "/account/wishlist",
    icon: FiHeart,
  },
  {
    id: "addresses",
    label: "Addresses",
    path: "/account/addresses",
    icon: FiMapPin,
  },
  {
    id: "change-password",
    label: "Change Password",
    path: "/account/change-password",
    icon: FiLock,
  },
];

const AccountSidebar = () => {
  return (
    <aside className="hidden w-64 shrink-0 lg:block">
      <div className="sticky top-24 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {/* Header */}

        <div className="border-b border-slate-200 px-5 py-5">
          <h2 className="text-base font-bold text-slate-900">
            My Account
          </h2>

          <p className="mt-1 text-xs text-slate-500">
            Manage your account
          </p>
        </div>

        {/* Navigation */}

        <nav className="p-3">
          <div className="space-y-1">
            {accountNavigation.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.id}
                  to={item.path}
                  className={({ isActive }) =>
                    `
                    flex
                    items-center
                    gap-3
                    rounded-lg
                    px-3
                    py-2.5
                    text-sm
                    font-medium
                    transition
                    ${
                      isActive
                        ? "bg-blue-50 text-blue-700"
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                    }
                  `
                  }
                >
                  <Icon className="h-5 w-5 shrink-0" />

                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default AccountSidebar;