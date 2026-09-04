import clsx from "clsx";

const Button = ({
  children,
  type = "button",
  disabled = false,
  loading = false,
  fullWidth = false,
  variant = "primary",
  size = "md",
  rounded = "lg",
  className = "",
  rightIcon,
  leftIcon,
  ...props
}) => {
  const variants = {
    primary:
      "bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800",

    secondary:
      "bg-slate-600 text-white hover:bg-slate-700",

    outline:
      "border border-slate-300 bg-white text-slate-800 hover:bg-slate-100",

    danger:
      "bg-red-500 text-white hover:bg-red-600",
  };

  const sizes = {
    sm: {
      button: "px-3 py-1.5 text-sm",
      icon: "w-4 h-4",
      gap: "gap-1.5",
    },

    md: {
      button: "px-5 py-2 text-base",
      icon: "w-5 h-5",
      gap: "gap-2",
    },

    lg: {
      button: "px-6 py-2.5 text-lg",
      icon: "w-6 h-6",
      gap: "gap-2.5",
    },
  };

  const roundedStyles = {
    sm: "rounded",
    md: "rounded-md",
    lg: "rounded-lg",
    full: "rounded-full",
  };

  const currentSize = sizes[size] || sizes.md;

  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={clsx(
        "inline-flex items-center justify-center shrink-0",
        "font-medium",
        "transition-all duration-300",
        "focus:outline-none",
        "focus:ring-2",
        "focus:ring-blue-500",
        "focus:ring-offset-2",
        "disabled:cursor-not-allowed",
        "disabled:opacity-60",

        variants[variant] || variants.primary,

        currentSize.button,
        currentSize.gap,

        roundedStyles[rounded] || roundedStyles.lg,

        fullWidth && "w-full",

        className
      )}
      {...props}
    >
      {loading ? (
        <>
          <svg
            className={clsx(
              "animate-spin",
              currentSize.icon
            )}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-20"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />

            <path
              className="opacity-100"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            />
          </svg>

          <span>Loading...</span>
        </>
      ) : (
        <>
          {leftIcon && (
            <span
              className={clsx(
                "flex items-center justify-center",
                currentSize.icon
              )}
            >
              {leftIcon}
            </span>
          )}

          <span>{children}</span>

          {rightIcon && (
            <span
              className={clsx(
                "flex items-center justify-center",
                currentSize.icon
              )}
            >
              {rightIcon}
            </span>
          )}
        </>
      )}
    </button>
  );
};

export default Button;