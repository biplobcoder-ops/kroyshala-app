import { useState } from "react";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

const Switch = ({
  // --------------------------------
  // Content
  // --------------------------------
  label,
  description,
  helperText,

  // --------------------------------
  // State
  // --------------------------------
  checked,
  defaultChecked = false,
  onChange,

  // --------------------------------
  // Appearance
  // --------------------------------
  variant = "default",
  size = "md",

  // --------------------------------
  // Form
  // --------------------------------
  id,
  name,
  value,

  disabled = false,
  required = false,

  // --------------------------------
  // State styling
  // --------------------------------
  error = false,

  // --------------------------------
  // Custom classes
  // --------------------------------
  className = "",
  switchClassName = "",
  labelClassName = "",
  descriptionClassName = "",

  ...props
}) => {
  // --------------------------------
  // Internal state
  // --------------------------------

  const [internalChecked, setInternalChecked] =
    useState(defaultChecked);

  // --------------------------------
  // Controlled / Uncontrolled
  // --------------------------------

  const isControlled =
    checked !== undefined;

  const isChecked = isControlled
    ? checked
    : internalChecked;

  // --------------------------------
  // Variants
  // --------------------------------

  const variants = {
    default: {
      off: "bg-slate-300",
      on: "bg-blue-600",
    },

    success: {
      off: "bg-slate-300",
      on: "bg-green-600",
    },

    danger: {
      off: "bg-slate-300",
      on: "bg-red-600",
    },
  };

  // --------------------------------
  // Sizes
  // --------------------------------

  const sizes = {
    sm: {
      track: "h-5 w-9",
      thumb: "h-4 w-4",
      translate: "translate-x-4",
    },

    md: {
      track: "h-6 w-11",
      thumb: "h-5 w-5",
      translate: "translate-x-5",
    },

    lg: {
      track: "h-7 w-14",
      thumb: "h-6 w-6",
      translate: "translate-x-7",
    },
  };

  // --------------------------------
  // Current variant / size
  // --------------------------------

  const currentVariant =
    variants[variant] || variants.default;

  const currentSize =
    sizes[size] || sizes.md;

  // --------------------------------
  // Handle change
  // --------------------------------

  const handleChange = (event) => {
    const nextChecked =
      event.target.checked;

    // Uncontrolled
    if (!isControlled) {
      setInternalChecked(nextChecked);
    }

    // Parent callback
    onChange?.(
      nextChecked,
      event
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
          className
        )
      )}
    >
      <label
        htmlFor={id}
        className={clsx(
          "flex",
          "items-start",
          "gap-3",

          disabled &&
            "cursor-not-allowed opacity-60"
        )}
      >
        {/* =================================
            SWITCH
        ================================= */}

        <span
          className="
            relative
            inline-flex
            shrink-0
          "
        >
          <input
            id={id}
            type="checkbox"
            role="switch"

            name={name}
            value={value}

            checked={isChecked}
            onChange={handleChange}

            disabled={disabled}
            required={required}

            className="sr-only"

            {...props}
          />

          {/* =================================
              TRACK
          ================================= */}

          <span
            className={twMerge(
              clsx(
                "relative",
                "inline-flex",
                "shrink-0",
                "items-center",

                "rounded-full",
                "cursor-pointer",

                // --------------------------------
                // Background
                // --------------------------------

                isChecked
                  ? currentVariant.on
                  : currentVariant.off,

                // --------------------------------
                // Smooth background transition
                // --------------------------------

                "transition-colors",
                "duration-300",
                "ease-in-out",

                // --------------------------------
                // Size
                // --------------------------------

                currentSize.track,

                // --------------------------------
                // Focus
                // --------------------------------

                "focus-within:ring-2",
                "focus-within:ring-blue-500/30",

                // --------------------------------
                // Error
                // --------------------------------

                error &&
                  isChecked &&
                  "!bg-red-600",

                // --------------------------------
                // Disabled
                // --------------------------------

                disabled &&
                  "cursor-not-allowed",

                // --------------------------------
                // Custom
                // --------------------------------

                switchClassName
              )
            )}
          >
            {/* =================================
                THUMB / CIRCLE
            ================================= */}

            <span
              className={twMerge(
                clsx(
                  "pointer-events-none",

                  "absolute",
                  "left-0.5",

                  "rounded-full",
                  "bg-white",

                  "shadow-sm",

                  // --------------------------------
                  // Smooth movement
                  // --------------------------------

                  "transition-transform",
                  "duration-300",
                  "ease-in-out",

                  // --------------------------------
                  // Size
                  // --------------------------------

                  currentSize.thumb,

                  // --------------------------------
                  // OFF → LEFT
                  // ON  → RIGHT
                  // --------------------------------

                  isChecked
                    ? currentSize.translate
                    : "translate-x-0"
                )
              )}
            />
          </span>
        </span>

        {/* =================================
            LABEL + DESCRIPTION
        ================================= */}

        {(label || description) && (
          <span className="min-w-0">
            {/* Label */}

            {label && (
              <span
                className={twMerge(
                  clsx(
                    "block",
                    "font-medium",
                    "text-slate-800",

                    labelClassName
                  )
                )}
              >
                {label}

                {required && (
                  <span className="ml-1 text-red-500">
                    *
                  </span>
                )}
              </span>
            )}

            {/* Description */}

            {description && (
              <span
                className={twMerge(
                  clsx(
                    "mt-0.5",
                    "block",
                    "text-sm",
                    "text-slate-500",

                    descriptionClassName
                  )
                )}
              >
                {description}
              </span>
            )}
          </span>
        )}
      </label>

      {/* =================================
          HELPER TEXT
      ================================= */}

      {helperText && (
        <p
          className={twMerge(
            clsx(
              "mt-1.5",
              "text-sm",

              error
                ? "text-red-500"
                : "text-slate-500"
            )
          )}
        >
          {helperText}
        </p>
      )}
    </div>
  );
};

export default Switch;