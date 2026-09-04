
import { useState } from "react";
import clsx from "clsx";
import { LuEye, LuEyeOff, LuLoaderCircle } from "react-icons/lu";

const Input = ({
  label,
  required = false,

  type = "text",
  placeholder = "",

  variant = "default",
  state = "default",

  size = "md",
  rounded = "lg",

  disabled = false,
  readOnly = false,
  loading = false,

  passwordToggle = false,

  fullWidth = false,

  leftIcon,
  rightIcon,

  helperText,
  errorMessage,

  className = "",

  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const inputType =
    passwordToggle
      ? showPassword
        ? "text"
        : "password"
      : type;

  const variants = {
    default: "bg-white border",

    filled: "bg-slate-100 border",

    outline: "bg-white border-2",

    underlined:
      "bg-transparent border-0 border-b rounded-none",
  };

  const states = {
    default:
      "border-slate-300 text-slate-700 focus:border-blue-500 focus:ring-blue-500",

    success:
      "border-green-500 text-slate-700 focus:border-green-500 focus:ring-green-500",

    warning:
      "border-yellow-500 text-slate-700 focus:border-yellow-500 focus:ring-yellow-500",

    error:
      "border-red-500 text-slate-700 focus:border-red-500 focus:ring-red-500",
  };

  const sizes = {
    sm: {
      input: "h-9 px-3 text-sm",
      icon: "w-4 h-4",
    },

    md: {
      input: "h-11 px-4 text-base",
      icon: "w-5 h-5",
    },

    lg: {
      input: "h-12 px-5 text-lg",
      icon: "w-6 h-6",
    },
  };

  const roundedStyles = {
    none: "rounded-none",

    sm: "rounded",

    md: "rounded-md",

    lg: "rounded-lg",

    full: "rounded-full",
  };

  const currentSize = sizes[size] || sizes.md;

  return (
    <div
      className={clsx(
        "flex flex-col",
        fullWidth && "w-full"
      )}
    >
      {label && (
        <label
          className="
            mb-2
            text-sm
            font-medium
            text-slate-700
          "
        >
          {label}

          {required && (
            <span className="ml-1 text-red-500">
              *
            </span>
          )}
        </label>
      )}

      <div
        className="
          relative
          flex
          items-center
        "
      >
        {leftIcon && (
          <span
            className={clsx(
              "absolute left-3",
              "flex items-center justify-center",
              "text-slate-400",
              currentSize.icon
            )}
          >
            {leftIcon}
          </span>
        )}

        <input
          type={inputType}
          placeholder={placeholder}
          disabled={disabled || loading}
          readOnly={readOnly}
          className={clsx(
            "w-full",

            "outline-none",

            "transition-all duration-300",

            "placeholder:text-slate-400",

            "focus:ring-2",

            "disabled:cursor-not-allowed",

            "disabled:opacity-60",

            readOnly &&
              "bg-slate-100 cursor-default focus:ring-0",

            leftIcon && "pl-10",

            (rightIcon ||
              passwordToggle ||
              loading) &&
              "pr-10",

            variants[variant] || variants.default,

            states[state] || states.default,

            currentSize.input,

            roundedStyles[rounded] ||
              roundedStyles.lg,

            className
          )}
          {...props}
        />
            {/* Loading */}
        {loading && (
          <span
            className={clsx(
              "absolute right-3",
              "flex items-center justify-center",
              "text-slate-400",
              currentSize.icon
            )}
          >
            <LuLoaderCircle
              className="animate-spin"
            />
          </span>
        )}

        {/* Password Toggle */}
        {!loading && passwordToggle && (
          <button
            type="button"
            onClick={() =>
              setShowPassword((prev) => !prev)
            }
            className={clsx(
              "absolute right-3",
              "flex items-center justify-center",
              "text-slate-400",
              "hover:text-slate-700",
              "transition-colors duration-200",
              "cursor-pointer",
              currentSize.icon
            )}
          >
            {showPassword ? (
              <LuEyeOff />
            ) : (
              <LuEye />
            )}
          </button>
        )}

        {/* Right Icon */}
        {!loading &&
          !passwordToggle &&
          rightIcon && (
            <span
              className={clsx(
                "absolute right-3",
                "flex items-center justify-center",
                "text-slate-400",
                currentSize.icon
              )}
            >
              {rightIcon}
            </span>
          )}
      </div>

      {/* Helper Text */}
      {helperText && !errorMessage && (
        <p className="mt-2 text-sm text-slate-500">
          {helperText}
        </p>
      )}

      {/* Error Message */}
      {errorMessage && (
        <p className="mt-2 text-sm text-red-500">
          {errorMessage}
        </p>
      )}
    </div>
  );
};

export default Input;