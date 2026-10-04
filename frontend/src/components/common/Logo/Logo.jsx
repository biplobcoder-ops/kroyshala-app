import React from "react";
import { Link } from "react-router-dom";

/**
 * Kroyshala Custom Logo
 * K-monogram + Shopping bag integration
 */
const Logo = ({
  size = "md",
  showText = true,
  linkTo = "/",
  variant = "default", // "default" | "light"
  className = "",
}) => {
  // Size configurations
  const sizeMap = {
    sm: { icon: 32, text: "text-base", sub: "text-[9px]" },
    md: { icon: 40, text: "text-lg", sub: "text-[10px]" },
    lg: { icon: 48, text: "text-xl", sub: "text-[11px]" },
    xl: { icon: 56, text: "text-2xl", sub: "text-xs" },
  };

  const current = sizeMap[size] || sizeMap.md;

  const iconColor = variant === "light" ? "#ffffff" : "#059669";
  const textColor = variant === "light" ? "text-white" : "text-neutral-900";
  const subColor = variant === "light" ? "text-neutral-300" : "text-neutral-400";

  const content = (
    <div className={`flex items-center gap-2 sm:gap-2.5 ${className}`}>
      {/* Icon */}
      <div
        className="relative flex shrink-0 items-center justify-center transition-transform duration-200 group-hover:scale-105"
        style={{ width: current.icon, height: current.icon }}
      >
        <svg
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-full w-full"
        >
          {/* Background rounded square */}
          <rect
            width="48"
            height="48"
            rx="12"
            fill={iconColor}
            className="transition-colors"
          />

          {/* Shopping bag handle (subtle, top-right) */}
          <path
            d="M32 15C32 15 31 11 27 11C23 11 22 15 22 15"
            stroke="white"
            strokeWidth="1.8"
            strokeLinecap="round"
            fill="none"
            opacity="0.5"
          />

          {/* Main "K" monogram */}
          <path
            d="M14 13V35"
            stroke="white"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <path
            d="M14 24L26 13"
            stroke="white"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M14 24L27 35"
            stroke="white"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Small dot accent (top-right, represents products) */}
          <circle cx="36" cy="12" r="2.5" fill="white" opacity="0.9" />
        </svg>
      </div>

      {/* Brand Text */}
      {showText && (
        <div className="flex flex-col leading-none">
          <span
            className={`font-bold tracking-tight font-display ${current.text} ${textColor}`}
          >
            Kroyshala
          </span>
          <span
            className={`hidden sm:block font-medium uppercase tracking-[0.15em] ${current.sub} ${subColor}`}
          >
            Premium Shopping
          </span>
        </div>
      )}
    </div>
  );

  if (linkTo) {
    return (
      <Link to={linkTo} className="group inline-flex shrink-0">
        {content}
      </Link>
    );
  }

  return content;
};

export default Logo;
