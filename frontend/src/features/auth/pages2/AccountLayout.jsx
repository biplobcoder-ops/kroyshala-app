import React from "react";
import { Outlet } from "react-router-dom";

// ==========================================
// Account Layout (No Sidebar, No Mobile Menu)
// ==========================================

const AccountLayout = () => {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        {/* শুধু Content */}
        <main className="min-w-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AccountLayout;