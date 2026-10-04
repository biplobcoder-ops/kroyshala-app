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
      "bg-primary-600 text-white hover:bg-primary-700 active:bg-primary-800 shadow-sm hover:shadow-md",

    secondary:
      "bg-neutral-900 text-white hover:bg-neutral-800 active:bg-neutral-950 shadow-sm hover:shadow-md",

    outline:
      "border border-neutral-300 bg-white text-neutral-800 hover:bg-neutral-50 hover:border-neutral-400 active:bg-neutral-100",

    ghost:
      "bg-transparent text-neutral-700 hover:bg-neutral-100 active:bg-neutral-200",

    danger:
      "bg-red-600 text-white hover:bg-red-700 active:bg-red-800 shadow-sm hover:shadow-md",

    success:
      "bg-green-600 text-white hover:bg-green-700 active:bg-green-800 shadow-sm hover:shadow-md",
  };

  const sizes = {
    xs: {
      button: "px-2.5 py-1 text-xs",
      icon: "w-3.5 h-3.5",
      gap: "gap-1",
    },

    sm: {
      button: "px-3.5 py-1.5 text-sm",
      icon: "w-4 h-4",
      gap: "gap-1.5",
    },

    md: {
      button: "px-5 py-2.5 text-sm",
      icon: "w-4.5 h-4.5",
      gap: "gap-2",
    },

    lg: {
      button: "px-6 py-3 text-base",
      icon: "w-5 h-5",
      gap: "gap-2",
    },

    xl: {
      button: "px-8 py-4 text-base",
      icon: "w-5 h-5",
      gap: "gap-2.5",
    },
  };

  const roundedStyles = {
    sm: "rounded-md",
    md: "rounded-lg",
    lg: "rounded-xl",
    full: "rounded-full",
  };

  const currentSize = sizes[size] || sizes.md;

  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={clsx(
        "inline-flex items-center justify-center shrink-0",
        "font-semibold tracking-tight",
        "transition-all duration-200 ease-out",
        "focus:outline-none",
        "focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2",
        "disabled:cursor-not-allowed",
        "disabled:opacity-50",
        "disabled:hover:shadow-none",
        "disabled:transform-none",
        "active:scale-[0.98]",

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
            className={clsx("animate-spin", currentSize.icon)}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-90"
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
                "flex items-center justify-center shrink-0",
                currentSize.icon
              )}
            >
              {leftIcon}
            </span>
          )}

          <span className="truncate">{children}</span>

          {rightIcon && (
            <span
              className={clsx(
                "flex items-center justify-center shrink-0",
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
