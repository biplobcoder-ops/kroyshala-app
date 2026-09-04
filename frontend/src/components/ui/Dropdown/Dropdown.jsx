import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

const Dropdown = ({
  // --------------------------------
  // Content
  // --------------------------------
  items = [],
  children,

  // --------------------------------
  // State
  // --------------------------------
  open,
  defaultOpen = false,

  onOpenChange,
  onSelect,

  // --------------------------------
  // Appearance
  // --------------------------------
  size = "md",
  variant = "default",

  // --------------------------------
  // Position
  // --------------------------------
  align = "left",
  position = "bottom",

  // --------------------------------
  // Behavior
  // --------------------------------
  closeOnSelect = true,
  closeOnOutsideClick = true,
  closeOnEscape = true,

  // --------------------------------
  // Disabled
  // --------------------------------
  disabled = false,

  // --------------------------------
  // Custom classes
  // --------------------------------
  className = "",
  menuClassName = "",
  itemClassName = "",
  iconClassName = "",
  labelClassName = "",

  ...props
}) => {
  // --------------------------------
  // Internal state
  // --------------------------------

  const [internalOpen, setInternalOpen] =
    useState(defaultOpen);

  // --------------------------------
  // Controlled / Uncontrolled
  // --------------------------------

  const isControlled =
    open !== undefined;

  const isOpen = isControlled
    ? open
    : internalOpen;

  // --------------------------------
  // Ref
  // --------------------------------

  const dropdownRef = useRef(null);

  // --------------------------------
  // Variants
  // --------------------------------

  const variants = {
    default: {
      menu: `
        border
        border-slate-200
        bg-white
        text-slate-700
        shadow-lg
      `,

      item: `
        hover:bg-slate-100
        hover:text-slate-900
      `,
    },

    dark: {
      menu: `
        bg-slate-800
        text-white
        shadow-lg
      `,

      item: `
        hover:bg-slate-700
      `,
    },

    primary: {
      menu: `
        border
        border-blue-100
        bg-white
        text-slate-700
        shadow-lg
      `,

      item: `
        hover:bg-blue-50
        hover:text-blue-700
      `,
    },
  };

  // --------------------------------
  // Sizes
  // --------------------------------

  const sizes = {
    sm: {
      menu: "min-w-40 p-1",
      item: "px-3 py-1.5 text-sm",
      icon: "h-4 w-4",
    },

    md: {
      menu: "min-w-48 p-1.5",
      item: "px-3 py-2 text-sm",
      icon: "h-5 w-5",
    },

    lg: {
      menu: "min-w-56 p-2",
      item: "px-4 py-2.5 text-base",
      icon: "h-5 w-5",
    },
  };

  // --------------------------------
  // Alignment
  // --------------------------------

  const alignments = {
    left: "left-0",
    center: "left-1/2 -translate-x-1/2",
    right: "right-0",
  };

  // --------------------------------
  // Position
  // --------------------------------

  const positions = {
    bottom: "top-full mt-2",
    top: "bottom-full mb-2",
  };

  // --------------------------------
  // Current styles
  // --------------------------------

  const currentVariant =
    variants[variant] || variants.default;

  const currentSize =
    sizes[size] || sizes.md;

  const currentAlign =
    alignments[align] || alignments.left;

  const currentPosition =
    positions[position] || positions.bottom;

  // --------------------------------
  // Change open state
  // --------------------------------

  const setOpenState = (nextOpen) => {
    if (disabled) {
      return;
    }

    if (!isControlled) {
      setInternalOpen(nextOpen);
    }

    onOpenChange?.(nextOpen);
  };

  // --------------------------------
  // Toggle
  // --------------------------------

  const handleToggle = () => {
    setOpenState(!isOpen);
  };

  // --------------------------------
  // Select item
  // --------------------------------

  const handleItemClick = (item) => {
    if (item.disabled || item.divider) {
      return;
    }

    onSelect?.(item.value, item);

    if (closeOnSelect) {
      setOpenState(false);
    }
  };

  // --------------------------------
  // Click outside
  // --------------------------------

  useEffect(() => {
    if (!isOpen || !closeOnOutsideClick) {
      return;
    }

    const handleOutsideClick = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(
          event.target
        )
      ) {
        setOpenState(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleOutsideClick
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleOutsideClick
      );
    };
  }, [
    isOpen,
    closeOnOutsideClick,
  ]);

  // --------------------------------
  // Escape key
  // --------------------------------

  useEffect(() => {
    if (!isOpen || !closeOnEscape) {
      return;
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setOpenState(false);
      }
    };

    document.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      document.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [
    isOpen,
    closeOnEscape,
  ]);

  // --------------------------------
  // Render
  // --------------------------------

  return (
    <div
      ref={dropdownRef}
      className={twMerge(
        clsx(
          "relative",
          "inline-flex",
          className,

          disabled &&
            "cursor-not-allowed opacity-60"
        )
      )}
      {...props}
    >
      {/* =================================
          TRIGGER
      ================================= */}

      <button
        type="button"
        disabled={disabled}
        onClick={handleToggle}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        className="
          inline-flex
          items-center
          justify-center
          outline-none
          focus-visible:ring-2
          focus-visible:ring-blue-500/30
        "
      >
        {children}
      </button>

      {/* =================================
          MENU
      ================================= */}

      {isOpen && (
        <div
          role="menu"
          className={twMerge(
            clsx(
              // Position
              "absolute",
              "z-50",
              currentPosition,
              currentAlign,

              // Appearance
              "overflow-hidden",
              "rounded-lg",

              currentVariant.menu,
              currentSize.menu,

              // Animation
              "origin-top",
              "animate-none",

              // Custom menu
              menuClassName
            )
          )}
        >
          {items.map((item, index) => {
            // --------------------------------
            // Divider
            // --------------------------------

            if (item.divider) {
              return (
                <div
                  key={
                    item.id ??
                    `divider-${index}`
                  }
                  className="
                    my-1
                    h-px
                    bg-slate-200
                  "
                />
              );
            }

            return (
              <button
                key={
                  item.id ??
                  item.value ??
                  index
                }
                type="button"
                role="menuitem"
                disabled={item.disabled}
                onClick={() =>
                  handleItemClick(item)
                }
                className={twMerge(
                  clsx(
                    // Base
                    "flex",
                    "w-full",
                    "items-center",
                    "gap-3",
                    "rounded-md",
                    "text-left",
                    "font-medium",
                    "outline-none",

                    // Size
                    currentSize.item,

                    // Variant
                    currentVariant.item,

                    // Focus
                    "focus-visible:bg-slate-100",

                    // Disabled
                    item.disabled &&
                      "cursor-not-allowed opacity-50",

                    // Destructive
                    item.danger &&
                      "text-red-600 hover:bg-red-50",

                    // Custom item
                    itemClassName
                  )
                )}
              >
                {/* =================================
                    ICON
                ================================= */}

                {item.icon && (
                  <span
                    className={twMerge(
                      clsx(
                        "shrink-0",
                        currentSize.icon,

                        // Custom icon class
                        iconClassName
                      )
                    )}
                  >
                    {item.icon}
                  </span>
                )}

                {/* =================================
                    LABEL
                ================================= */}

                <span
                  className={twMerge(
                    clsx(
                      "flex-1",

                      // Custom label class
                      labelClassName
                    )
                  )}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Dropdown;