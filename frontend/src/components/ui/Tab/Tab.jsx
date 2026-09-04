import { useState } from "react";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

const Tabs = ({
  items = [],

  value,
  defaultValue,

  onChange,

  variant = "default",
  size = "md",

  fullWidth = false,

  className = "",
  listClassName = "",
  tabClassName = "",
  activeTabClassName = "",

  ...props
}) => {
  // --------------------------------
  // Find first available tab
  // --------------------------------

  const firstAvailableTab = items.find(
    (item) => !item.disabled
  );

  // --------------------------------
  // Initial active value
  // --------------------------------

  const initialValue =
    defaultValue ??
    firstAvailableTab?.value ??
    null;

  // --------------------------------
  // Internal state
  // --------------------------------

  const [
    internalValue,
    setInternalValue,
  ] = useState(initialValue);

  // --------------------------------
  // Controlled / Uncontrolled
  // --------------------------------

  const activeValue =
    value !== undefined
      ? value
      : internalValue;

  // --------------------------------
  // Variants
  // --------------------------------

  const variants = {
    default: {
      list:
        "border-b border-slate-200",

      tab:
        "text-slate-600 hover:text-slate-900",

      active:
        "border-b-2 border-blue-600 text-blue-600",
    },

    pills: {
      list:
        "gap-2",

      tab: `
        rounded-lg
        text-slate-600
        hover:bg-slate-100
        hover:text-slate-900
      
      `,

      active: `
        bg-blue-600
        text-white
        hover:bg-blue-600
        hover:text-white
       
      `,
    },

    outline: {
      list:
        "gap-1 border-b border-slate-200",

      tab: `
        rounded-t-lg
        border
        border-transparent
        text-slate-600
        hover:text-slate-900
      `,

      active: `
        border-slate-200
        border-b-white
        bg-white
        text-blue-600
      `,
    },

    underline: {
      list:
        "border-b border-slate-200",

      tab:
        "text-slate-600 hover:text-slate-900",

      active:
        "border-b-2 border-blue-600 text-blue-600",
    },
  };

  // --------------------------------
  // Sizes
  // --------------------------------

  const sizes = {
    sm: {
      tab:
        "px-3 py-2 text-sm",

      icon:
        "h-4 w-4",
    },

    md: {
      tab:
        "px-4 py-2.5 text-base",

      icon:
        "h-5 w-5",
    },

    lg: {
      tab:
        "px-5 py-3 text-lg",

      icon:
        "h-6 w-6",
    },
  };

  // --------------------------------
  // Handle tab change
  // --------------------------------

  const handleTabChange = (item) => {
    // Disabled tab
    if (item.disabled) {
      return;
    }

    // Uncontrolled mode
    if (value === undefined) {
      setInternalValue(item.value);
    }

    // Controlled mode
    onChange?.(item.value);
  };

  // --------------------------------
  // Find active tab
  // --------------------------------

  const activeItem = items.find(
    (item) =>
      item.value === activeValue
  );

  // --------------------------------
  // Component
  // --------------------------------

  return (
    <div
      className={twMerge(
        clsx(
          "w-full",
          className
        )
      )}

      {...props}
    >
      {/* =================================
          TAB LIST
      ================================= */}

      <div
        role="tablist"
        className={twMerge(
          clsx(
            "flex",
            "items-center",
            "overflow-x-auto",

            fullWidth &&
              "w-full",

            variants[variant]?.list,

            listClassName
          )
        )}
      >
        {items.map((item) => {
          const isActive =
            item.value === activeValue;

          return (
            <button
              key={item.value}
              type="button"
            

              role="tab"

              aria-selected={
                isActive
              }

              aria-disabled={
                item.disabled || undefined
              }

              disabled={
                item.disabled
              }

              onClick={() =>
                handleTabChange(item)
              }

              className={twMerge(
                clsx(
                  // --------------------------------
                  // Base
                  // --------------------------------

                  "flex",
                  "shrink-0",
                  "items-center",
                  "justify-center",
                  "gap-2",

                  "font-medium",

                  "outline-none",
                  "cursor-pointer",

                  "transition-all",
                  "duration-200",
                  "focus-visible:ring-2",
                  "focus-visible:ring-blue-500/30",

                  // --------------------------------
                  // Width
                  // --------------------------------

                  fullWidth &&
                    "flex-1",

                  // --------------------------------
                  // Size
                  // --------------------------------

                  sizes[size]?.tab,

                  // --------------------------------
                  // Variant
                  // --------------------------------

                  variants[variant]?.tab,

                  // --------------------------------
                  // Active
                  // --------------------------------

                  isActive &&
                    variants[variant]?.active,

                  // --------------------------------
                  // Common custom classes
                  // --------------------------------

                  tabClassName,

                  // --------------------------------
                  // Disabled
                  // --------------------------------

                  item.disabled &&
                    "cursor-not-allowed opacity-50"
                ),

                // --------------------------------
                // Active custom classes
                //
                // These are merged LAST
                // so they can override
                // variant active classes.
                // --------------------------------

                isActive &&
                  activeTabClassName
              )}
            >
              {/* ================================
                  ICON
              ================================= */}

              {item.icon && (
                <span
                  className={clsx(
                    "shrink-0",
                    sizes[size]?.icon
                  )}
                >
                  {item.icon}
                </span>
              )}

              {/* ================================
                  LABEL
              ================================= */}

              <span>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* =================================
          ACTIVE TAB CONTENT
      ================================= */}

      {activeItem && (
        <div
          role="tabpanel"
          className="pt-5"
        >
          {activeItem.content}
        </div>
      )}
    </div>
  );
};

export default Tabs;