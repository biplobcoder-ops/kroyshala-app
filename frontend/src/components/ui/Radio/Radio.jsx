import { useState } from "react";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

const Radio = ({
  label,

  name,
  value,

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
  radioClassName = "",
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
      radio: "h-4 w-4",
      dot: "h-2 w-2",
      label: "text-sm",
    },

    md: {
      radio: "h-5 w-5",
      dot: "h-2.5 w-2.5",
      label: "text-base",
    },

    lg: {
      radio: "h-6 w-6",
      dot: "h-3 w-3",
      label: "text-lg",
    },
  };

  // --------------------------------
  // Handle change
  // --------------------------------

  const handleChange = (event) => {
    const nextChecked =
      event.target.checked;

    if (!isControlled) {
      setInternalChecked(nextChecked);
    }

    onChange?.(
      event.target.value,
      event
    );
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
            type="radio"

            name={name}
            value={value}

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
        {/* Native radio */}

        <input
          type="radio"

          name={name}
          value={value}

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

        {/* Custom radio */}

        <span
          aria-hidden="true"
          className={twMerge(
            clsx(
              // Base
              "flex",
              "shrink-0",
              "items-center",
              "justify-center",

              "rounded-full",
              "border-2",

              "transition-all",
              "duration-200",

              // Size
              sizes[size]?.radio,

              // Unchecked
              !isChecked && [
                "border-slate-300",
                "bg-white",
                "hover:border-blue-500",
              ],

              // Checked
              isChecked && [
                "border-blue-600",
                "bg-white",
              ],

              // Error
              error &&
                !isChecked && [
                  "border-red-500",
                ],

              // Focus
              "peer-focus-visible:ring-2",
              "peer-focus-visible:ring-blue-500/30",

              // Disabled
              disabled &&
                "cursor-not-allowed",

              // Custom
              radioClassName
            )
          )}
        >
          {isChecked && (
            <span
              className={clsx(
                "rounded-full",
                "bg-blue-600",
                sizes[size]?.dot
              )}
            />
          )}
        </span>

        {/* Label */}

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

      {/* Helper */}

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

export default Radio;