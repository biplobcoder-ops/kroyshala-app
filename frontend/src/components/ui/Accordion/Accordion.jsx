import { useState } from "react";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

const Accordion = ({
  // --------------------------------
  // Content
  // --------------------------------
  items = [],

  // --------------------------------
  // State
  // --------------------------------
  activeItem,
  defaultActiveItem = null,
  onChange,

  // --------------------------------
  // Behavior
  // --------------------------------
  multiple = false,

  // --------------------------------
  // Appearance
  // --------------------------------
  variant = "default",
  size = "md",

  // --------------------------------
  // Custom classes
  // --------------------------------
  className = "",
  itemClassName = "",
  triggerClassName = "",
  contentClassName = "",
  iconClassName = "",

  // --------------------------------
  // Disabled
  // --------------------------------
  disabled = false,

  ...props
}) => {
  // --------------------------------
  // Internal state
  // --------------------------------

  const [internalActiveItem, setInternalActiveItem] =
    useState(defaultActiveItem);

  // --------------------------------
  // Controlled / Uncontrolled
  // --------------------------------

  const isControlled =
    activeItem !== undefined;

  const currentActiveItem = isControlled
    ? activeItem
    : internalActiveItem;

  // --------------------------------
  // Variants
  // --------------------------------

  const variants = {
    default: {
      item: `
        border
        border-slate-200
        bg-white
      `,

      trigger: `
        text-slate-800
        hover:bg-slate-50
      `,

      content: `
        border-t
        border-slate-200
        text-slate-600
      `,
    },

    bordered: {
      item: `
        border
        border-slate-300
        bg-white
      `,

      trigger: `
        text-slate-800
        hover:bg-slate-50
      `,

      content: `
        border-t
        border-slate-200
        text-slate-600
      `,
    },

    dark: {
      item: `
        bg-slate-800
        text-white
      `,

      trigger: `
        text-white
        hover:bg-slate-700
      `,

      content: `
        border-t
        border-slate-700
        text-slate-300
      `,
    },
  };

  // --------------------------------
  // Sizes
  // --------------------------------

  const sizes = {
    sm: {
      trigger: "px-3 py-2 text-sm",
      content: "px-3 py-2 text-sm",
      icon: "h-4 w-4",
    },

    md: {
      trigger: "px-4 py-3 text-sm",
      content: "px-4 py-3 text-sm",
      icon: "h-5 w-5",
    },

    lg: {
      trigger: "px-5 py-4 text-base",
      content: "px-5 py-4 text-base",
      icon: "h-5 w-5",
    },
  };

  // --------------------------------
  // Current styles
  // --------------------------------

  const currentVariant =
    variants[variant] || variants.default;

  const currentSize =
    sizes[size] || sizes.md;

  // --------------------------------
  // Check active state
  // --------------------------------

  const isItemActive = (itemId) => {
    if (multiple) {
      return Array.isArray(currentActiveItem)
        ? currentActiveItem.includes(itemId)
        : false;
    }

    return currentActiveItem === itemId;
  };

  // --------------------------------
  // Toggle item
  // --------------------------------

  const handleToggle = (item) => {
    if (disabled || item.disabled) {
      return;
    }

    const itemId = item.id;

    let nextActiveItem;

    // Multiple mode
    if (multiple) {
      const currentItems = Array.isArray(
        currentActiveItem
      )
        ? currentActiveItem
        : [];

      if (currentItems.includes(itemId)) {
        nextActiveItem = currentItems.filter(
          (id) => id !== itemId
        );
      } else {
        nextActiveItem = [
          ...currentItems,
          itemId,
        ];
      }
    }

    // Single mode
    else {
      nextActiveItem =
        currentActiveItem === itemId
          ? null
          : itemId;
    }

    // Uncontrolled
    if (!isControlled) {
      setInternalActiveItem(nextActiveItem);
    }

    // Parent callback
    onChange?.(
      nextActiveItem,
      item
    );
  };

  // --------------------------------
  // Component
  // --------------------------------

  return (
    <div
      className={twMerge(
        clsx(
          "w-full",
          "space-y-2",

          disabled &&
            "cursor-not-allowed opacity-60",

          className
        )
      )}
      {...props}
    >
      {items.map((item) => {
        const isActive =
          isItemActive(item.id);

        return (
          <div
            key={item.id}
            className={twMerge(
              clsx(
                "overflow-hidden",
                "rounded-lg",

                currentVariant.item,

                itemClassName
              )
            )}
          >
            {/* ==========================
                TRIGGER
            ========================== */}

            <button
              type="button"
              disabled={
                disabled ||
                item.disabled
              }
              onClick={() =>
                handleToggle(item)
              }
              aria-expanded={isActive}
              aria-controls={`accordion-content-${item.id}`}
              className={twMerge(
                clsx(
                  "flex",
                  "w-full",
                  "items-center",
                  "justify-between",
                  "gap-4",
                  "text-left",
                  "font-medium",
                  "outline-none",

                  currentVariant.trigger,
                  currentSize.trigger,

                  "focus-visible:ring-2",
                  "focus-visible:ring-inset",
                  "focus-visible:ring-blue-500/40",

                  item.disabled &&
                    "cursor-not-allowed opacity-50",

                  triggerClassName
                )
              )}
            >
              <span className="flex-1">
                {item.title}
              </span>

              {/* ========================
                  ICON
              ======================== */}

              <span
                className={twMerge(
                  clsx(
                    "shrink-0",
                    "transition-transform",
                    "duration-200",

                    currentSize.icon,

                    isActive &&
                      "rotate-180",

                    iconClassName
                  )
                )}
              >
                ▼
              </span>
            </button>

            {/* ==========================
                CONTENT
            ========================== */}

            {isActive && (
              <div
                id={`accordion-content-${item.id}`}
                role="region"
                className={twMerge(
                  clsx(
                    currentVariant.content,
                    currentSize.content,

                    contentClassName
                  )
                )}
              >
                {item.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Accordion;