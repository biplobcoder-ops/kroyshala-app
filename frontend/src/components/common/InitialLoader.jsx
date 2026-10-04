import React from "react";
import { FiShoppingBag } from "react-icons/fi";

const InitialLoader = () => {
  return (
    <div className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-white">
      {/* Animated Logo */}
      <div className="relative">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-600 shadow-lg animate-pulse-soft">
          <FiShoppingBag className="h-8 w-8 text-white" />
        </div>
      </div>

      {/* Brand Name */}
      <p className="mt-5 text-sm font-semibold tracking-wide text-neutral-900 font-display">
        Kroyshala
      </p>

      {/* Loading Bar */}
      <div className="mt-3 h-1 w-32 overflow-hidden rounded-full bg-neutral-200">
        <div className="h-full w-1/2 animate-loading-bar rounded-full bg-primary-600" />
      </div>

      <p className="mt-3 text-xs text-neutral-500">Loading your experience...</p>
    </div>
  );
};

export default InitialLoader;
