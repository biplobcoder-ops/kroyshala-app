import clsx from "clsx";

const Avatar = ({
  src,
  alt = "Avatar",
  name = "",
  size = "md",
  rounded = "full",
  border = false,
  shadow = false,
  ring = false,
  status,
  className = "",
  avatarClassName = "",
  ...props
}) => {
  const sizes = {
    sm: "w-8 h-8 text-xs",
    md: "w-12 h-12 text-sm",
    lg: "w-16 h-16 text-lg",
    xl: "w-24 h-24 text-2xl",
  };

  const roundedStyles = {
    none: "rounded-none",
    sm: "rounded",
    md: "rounded-md",
    lg: "rounded-lg",
    full: "rounded-full",
  };

  const statusColor = {
    online: "bg-green-500",
    offline: "bg-slate-400",
    away: "bg-yellow-400",
    busy: "bg-red-500",
  };

  const initials = name
    ? name
        .trim()
        .split(" ")
        .slice(0, 2)
        .map((word) => word[0])
        .join("")
        .toUpperCase()
    : "?";

  return (
    <div
      className={clsx(
        "relative inline-flex items-center justify-center",
        sizes[size] || sizes.md,
        className
      )}
    >
      {src ? (
        <img
          src={src}
          alt={alt}
          className={clsx(
            "w-full h-full object-cover",
            roundedStyles[rounded] || roundedStyles.full,
            border && "border-2 border-white",
            shadow && "shadow-md",
            ring && "ring-2 ring-blue-500 ring-offset-2",
            avatarClassName
          )}
          {...props}
        />
      ) : (
        <div
          className={clsx(
            "w-full h-full",
            "flex items-center justify-center",
            "bg-slate-200",
            "font-semibold",
            "text-slate-700",
            "select-none",
            roundedStyles[rounded] || roundedStyles.full,
            border && "border-2 border-white",
            shadow && "shadow-md",
            ring && "ring-2 ring-blue-500 ring-offset-2",
            avatarClassName
          )}
        >
          {initials}
        </div>
      )}

      {status && (
        <span
          className={clsx(
            "absolute bottom-0 right-0",
            "w-3 h-3",
            "rounded-full",
            "border-2 border-white",
            statusColor[status]
          )}
        />
      )}
    </div>
  );
};

export default Avatar;