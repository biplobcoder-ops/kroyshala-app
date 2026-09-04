import { useState } from "react";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";
import { LuCheck } from "react-icons/lu";

const Checkbox = ({
  label,

  checked,
  defaultChecked = false,
  onChange,

  disabled = false,
  required = false,

  error = false,
  helperText = "",

  variant = "default",
  size = "md",

  className = "",
  checkboxClassName = "",
  labelClassName = "",
  helperTextClassName = "",

  ...props
}) => {
  // --------------------------------
  // Controlled / Uncontrolled
  // --------------------------------

  const [internalChecked, setInternalChecked] =
    useState(defaultChecked);

  const isControlled =
    checked !== undefined;

  const isChecked = isControlled
    ? checked
    : internalChecked;

  // --------------------------------
  // Sizes
  // --------------------------------

  const sizes = {
    sm: {
      box: "h-4 w-4",
      icon: "h-3 w-3",
      label: "text-sm",
    },

    md: {
      box: "h-5 w-5",
      icon: "h-4 w-4",
      label: "text-base",
    },

    lg: {
      box: "h-6 w-6",
      icon: "h-5 w-5",
      label: "text-lg",
    },
  };

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
    onChange?.(nextChecked, event);
  };

  // --------------------------------
  // Wrapper
  // --------------------------------

  const wrapperClassName = twMerge(
    clsx(
      "w-full",
      className
    )
  );

  // =================================
  // DEFAULT VARIANT
  // Native browser checkbox
  // =================================

  if (variant === "default") {
    return (
      <div className={wrapperClassName}>
        <label
          className={clsx(
            "flex w-fit items-center gap-2",

            disabled
              ? "cursor-not-allowed opacity-60"
              : "cursor-pointer",

            labelClassName
          )}
        >
          <input
            type="checkbox"

            checked={
              isControlled
                ? isChecked
                : undefined
            }

            defaultChecked={
              !isControlled
                ? defaultChecked
                : undefined
            }

            onChange={handleChange}

            disabled={disabled}
            required={required}

            {...props}
          />

          {label && (
            <span
              className={sizes[size]?.label}
            >
              {label}

              {required && (
                <span className="ml-1 text-red-500">
                  *
                </span>
              )}
            </span>
          )}
        </label>

        {helperText && (
          <p
            className={twMerge(
              clsx(
                "mt-1.5 text-sm",

                error
                  ? "text-red-500"
                  : "text-slate-500",

                helperTextClassName
              )
            )}
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }

  // =================================
  // CUSTOM VARIANT
  // =================================

  return (
    <div className={wrapperClassName}>
      <label
        className={clsx(
          "flex w-fit items-center gap-2",

          disabled
            ? "cursor-not-allowed opacity-60"
            : "cursor-pointer",

          labelClassName
        )}
      >
        {/* =============================
            Native Input
        ============================= */}

        <input
          type="checkbox"

          checked={
            isControlled
              ? isChecked
              : undefined
          }

          defaultChecked={
            !isControlled
              ? defaultChecked
              : undefined
          }

          onChange={handleChange}

          disabled={disabled}
          required={required}

          className="peer sr-only"

          {...props}
        />

        {/* =============================
            Custom Checkbox
        ============================= */}

        <span
          aria-hidden="true"
          className={twMerge(
            clsx(
              // Base
              "flex",
              "shrink-0",
              "items-center",
              "justify-center",

              "rounded-md",
              "border-2",

              "transition-all",
              "duration-200",

              // Size
              sizes[size]?.box,

              // Unchecked
              !isChecked && [
                "border-slate-300",
                "bg-white",
                "hover:border-blue-500",
              ],

              // Checked
              isChecked && [
                "border-blue-600",
                "bg-blue-600",
                "text-white",
              ],

              // Error
              error &&
                !isChecked && [
                  "border-red-500",
                ],

              // Keyboard focus
              "peer-focus-visible:ring-2",
              "peer-focus-visible:ring-blue-500/30",

              // Disabled
              disabled &&
                "cursor-not-allowed",

              // Custom classes
              checkboxClassName
            )
          )}
        >
          {isChecked && (
            <LuCheck
              className={
                sizes[size]?.icon
              }
            />
          )}
        </span>

        {/* =============================
            Label
        ============================= */}

        {label && (
          <span
            className={clsx(
              "select-none",
              "text-slate-700",
              sizes[size]?.label
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
      </label>

      {/* =============================
          Helper Text
      ============================= */}

      {helperText && (
        <p
          className={twMerge(
            clsx(
              "mt-1.5 text-sm",

              error
                ? "text-red-500"
                : "text-slate-500",

              helperTextClassName
            )
          )}
        >
          {helperText}
        </p>
      )}
    </div>
  );
};

export default Checkbox;