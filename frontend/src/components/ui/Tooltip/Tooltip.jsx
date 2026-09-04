import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

const Tooltip = ({
  // --------------------------------
  // Content
  // --------------------------------
  content,
  children,

  // --------------------------------
  // Position
  // --------------------------------
  position = "bottom",

  // --------------------------------
  // Appearance
  // --------------------------------
  variant = "default",
  size = "md",

  // --------------------------------
  // Behavior
  // --------------------------------
  delay = 400,
  disabled = false,

  // --------------------------------
  // Controlled
  // --------------------------------
  open,

  // --------------------------------
  // Custom classes
  // --------------------------------
  className = "",
  tooltipClassName = "",

  // --------------------------------
  // Events
  // --------------------------------
  onOpen,
  onClose,

  ...props
}) => {
  // --------------------------------
  // Internal state
  // --------------------------------

  const [internalOpen, setInternalOpen] =
    useState(false);

  // --------------------------------
  // Controlled / Uncontrolled
  // --------------------------------

  const isControlled =
    open !== undefined;

  const isOpen = isControlled
    ? open
    : internalOpen;

  // --------------------------------
  // Timer
  // --------------------------------

  const timerRef = useRef(null);

  // --------------------------------
  // Variants
  // --------------------------------

  const variants = {
    default: `
      bg-slate-200
      text-slate-800
      shadow-sm
    `,

    dark: `
      bg-slate-300
      text-slate-900
      shadow-sm
    `,

    light: `
      bg-white
      text-slate-800
      border
      border-slate-200
      shadow-sm
    `,

    primary: `
      bg-blue-100
      text-blue-800
      shadow-sm
    `,

    success: `
      bg-green-100
      text-green-800
      shadow-sm
    `,

    danger: `
      bg-red-100
      text-red-800
      shadow-sm
    `,
  };

  // --------------------------------
  // Sizes
  // --------------------------------

  const sizes = {
    sm: `
      px-2
      py-1
      text-xs
    `,

    md: `
      px-2.5
      py-1.5
      text-sm
    `,

    lg: `
      px-3
      py-2
      text-sm
    `,
  };

  // --------------------------------
  // Positions
  // --------------------------------

  const positions = {
    // Top center
    top: `
      bottom-full
      left-1/2
      mb-2
      -translate-x-1/2
    `,

    // Bottom center
    bottom: `
      top-full
      left-1/2
      mt-2
      -translate-x-1/2
    `,

    // Left side + slightly lower
    left: `
      right-full
      top-1/2
      mr-2
      translate-y-2
    `,

    // Right side + slightly lower
    right: `
      left-full
      top-1/2
      ml-2
      translate-y-2
    `,
  };

  // --------------------------------
  // Current styles
  // --------------------------------

  const currentVariant =
    variants[variant] || variants.default;

  const currentSize =
    sizes[size] || sizes.md;

  const currentPosition =
    positions[position] || positions.bottom;

  // --------------------------------
  // Clear timer
  // --------------------------------

  const clearTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);

      timerRef.current = null;
    }
  };

  // --------------------------------
  // Open tooltip
  // --------------------------------

  const handleOpen = () => {
    if (disabled || !content) {
      return;
    }

    clearTimer();

    timerRef.current = setTimeout(() => {
      if (!isControlled) {
        setInternalOpen(true);
      }

      onOpen?.();

      timerRef.current = null;
    }, delay);
  };

  // --------------------------------
  // Close tooltip
  // --------------------------------

  const handleClose = () => {
    clearTimer();

    if (!isControlled) {
      setInternalOpen(false);
    }

    onClose?.();
  };

  // --------------------------------
  // Cleanup
  // --------------------------------

  useEffect(() => {
    return () => {
      clearTimer();
    };
  }, []);

  // --------------------------------
  // Render
  // --------------------------------

  return (
    <span
      className={twMerge(
        clsx(
          "relative",
          "inline-flex",
          className
        )
      )}
      onMouseEnter={handleOpen}
      onMouseLeave={handleClose}
      onFocus={handleOpen}
      onBlur={handleClose}
      {...props}
    >
      {/* Target */}

      {children}

      {/* Tooltip */}

      {content && !disabled && (
        <span
          role="tooltip"
          aria-hidden={!isOpen}
          className={twMerge(
            clsx(
              // Position
              "pointer-events-none",
              "absolute",
              "z-50",
              "w-max",
              "max-w-xs",

              currentPosition,

              // Shape
              "rounded-md",

              // Typography
              "font-normal",
              "leading-none",
              "whitespace-nowrap",

              // Appearance
              currentVariant,
              currentSize,

              // Animation
              "origin-center",
              "transition-all",
              "duration-200",
              "ease-out",

              isOpen
                ? "scale-100 opacity-100"
                : "scale-95 opacity-0",

              // Custom
              tooltipClassName
            )
          )}
        >
          {content}
        </span>
      )}
    </span>
  );
};

export default Tooltip;