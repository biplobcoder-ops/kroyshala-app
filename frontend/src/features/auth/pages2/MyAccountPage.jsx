import React, { useState } from "react";
import { FiMenu } from "react-icons/fi";
import { Outlet } from "react-router-dom";

import Button from "../../../components/ui/Button/Button";

import AccountSidebar from "../components/AccountSidebar";
import AccountMobileMenu from "../components/AccountMobileMenu";

const MyAccountPage = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] =
    useState(false);

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">

        {/* =====================================
            Mobile Header
        ====================================== */}

        <div className="mb-5 flex items-center justify-between lg:hidden">
          <div>
            <h1 className="text-xl font-bold text-slate-900">
              My Account
            </h1>

            <p className="mt-1 text-xs text-slate-500">
              Manage your account
            </p>
          </div>

          <Button
            type="button"
            variant="outline"
            size="sm"
            rounded="lg"
            leftIcon={<FiMenu />}
            onClick={() =>
              setIsMobileMenuOpen(true)
            }
            aria-label="Open account menu"
          >
            Menu
          </Button>
        </div>

        {/* =====================================
            Account Layout
        ====================================== */}

        <div className="flex items-start gap-6">

          {/* Desktop Sidebar */}

          <AccountSidebar />

          {/* Content */}

          <main className="min-w-0 flex-1">
            <Outlet />
          </main>
        </div>
      </div>

      {/* Mobile Drawer */}

      <AccountMobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() =>
          setIsMobileMenuOpen(false)
        }
      />
    </div>
  );
};

export default MyAccountPage;