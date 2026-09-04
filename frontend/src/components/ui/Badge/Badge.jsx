import clsx from "clsx";

const Badge = ({
  children,

  variant = "default",

  size = "md",

  rounded = "full",

  dot = false,

  pulse = false,

  outline = false,

  leftIcon,

  rightIcon,

  className = "",

  ...props
}) => {
  const variants = {
    default: outline
      ? "border border-slate-300 text-slate-700 bg-white"
      : "bg-slate-100 text-slate-700",

    primary: outline
      ? "border border-blue-600 text-blue-600 bg-white"
      : "bg-blue-600 text-white",

    secondary: outline
      ? "border border-gray-600 text-gray-600 bg-white"
      : "bg-gray-600 text-white",

    success: outline
      ? "border border-green-600 text-green-600 bg-white"
      : "bg-green-600 text-white",

    warning: outline
      ? "border border-yellow-500 text-yellow-700 bg-white"
      : "bg-yellow-400 text-slate-900",

    danger: outline
      ? "border border-red-600 text-red-600 bg-white"
      : "bg-red-600 text-white",

    info: outline
      ? "border border-cyan-600 text-cyan-600 bg-white"
      : "bg-cyan-600 text-white",

    dark: outline
      ? "border border-slate-900 text-slate-900 bg-white"
      : "bg-slate-900 text-white",
  };

  const sizes = {
    sm: "px-2 py-0.5 text-xs gap-1",

    md: "px-3 py-1 text-sm gap-1.5",

    lg: "px-4 py-1.5 text-base gap-2",
  };

  const roundedStyles = {
    sm: "rounded",

    md: "rounded-md",

    lg: "rounded-lg",

    full: "rounded-full",
  };

  const dotColor = {
    default: "bg-slate-500",

    primary: "bg-blue-500",

    secondary: "bg-gray-500",

    success: "bg-green-500",

    warning: "bg-yellow-500",

    danger: "bg-red-500",

    info: "bg-cyan-500",

    dark: "bg-slate-900",
  };

  return (
    <span
      className={clsx(
        "inline-flex items-center",

        "font-medium",

        "whitespace-nowrap",

        "transition-all duration-300",

        variants[variant] || variants.default,

        sizes[size] || sizes.md,

        roundedStyles[rounded] || roundedStyles.full,

        className
      )}
      {...props}
    >
      {dot && (
        <span
          className={clsx(
            "relative flex h-2 w-2",

            pulse && "animate-pulse"
          )}
        >
          <span
            className={clsx(
              "h-2 w-2 rounded-full",

              dotColor[variant]
            )}
          />
        </span>
      )}

      {leftIcon && leftIcon}

      {children}

      {rightIcon && rightIcon}
    </span>
  );
};

export default Badge;