import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/common/Navbar/Navbar";
import Footer from "../components/common/Footer";

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />

      <main className="flex-1 pb-16 md:pb-0">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default MainLayout;