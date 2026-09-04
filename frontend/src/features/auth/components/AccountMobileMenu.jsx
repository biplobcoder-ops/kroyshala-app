import React from "react";
import { NavLink } from "react-router-dom";

import {
  FiUser,
  FiPackage,
  FiTruck,
  FiHeart,
  FiMapPin,
  FiLock,
  FiX,
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

const AccountMobileMenu = ({
  isOpen,
  onClose,
}) => {
  return (
    <>
      {/* Overlay */}

      <div
        onClick={onClose}
        className={`
          fixed
          inset-0
          z-[60]
          bg-slate-900/40
          backdrop-blur-[2px]
          transition-opacity
          duration-300
          lg:hidden
          ${
            isOpen
              ? "pointer-events-auto opacity-100"
              : "pointer-events-none opacity-0"
          }
        `}
      />

      {/* Drawer */}

      <aside
        className={`
          fixed
          left-0
          top-0
          z-[70]
          flex
          h-full
          w-[280px]
          max-w-[85vw]
          flex-col
          bg-white
          shadow-2xl
          transition-transform
          duration-300
          ease-out
          lg:hidden
          ${
            isOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }
        `}
      >
        {/* Header */}

        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-5">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              My Account
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              Manage your account
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close account menu"
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-lg
              text-slate-500
              transition
              hover:bg-slate-100
              hover:text-slate-900
            "
          >
            <FiX className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation */}

        <nav className="flex-1 overflow-y-auto p-3">
          <div className="space-y-1">
            {accountNavigation.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.id}
                  to={item.path}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `
                    flex
                    items-center
                    gap-3
                    rounded-lg
                    px-3
                    py-3
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
      </aside>
    </>
  );
};

export default AccountMobileMenu;