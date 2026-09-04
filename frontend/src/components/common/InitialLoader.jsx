import React from "react";
import { FiShoppingBag } from "react-icons/fi";

const InitialLoader = () => {
  return (
    <div className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-slate-900">
      <div className="relative">
        <div className="flex h-16 w-16 animate-pulse items-center justify-center rounded-2xl bg-blue-600 shadow-lg">
          <FiShoppingBag className="h-8 w-8 text-white" />
        </div>
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 h-1 w-12 rounded-full bg-blue-600/50 blur-sm" />
      </div>
      <p className="mt-4 text-sm font-medium text-slate-400">Loading Kroyshala...</p>
    </div>
  );
};

export default InitialLoader;