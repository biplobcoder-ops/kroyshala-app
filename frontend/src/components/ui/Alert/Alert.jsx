import clsx from "clsx";

import {
  LuCircleAlert,
  LuInfo,
  LuCircleCheck,
  LuTriangleAlert,
  LuX,
} from "react-icons/lu";

const Alert = ({
  title,
  message,
  children,

  variant = "info",

  icon,

  dismissible = false,
  onClose,

  action,
  actionLabel = "Action",

  size = "md",
  rounded = "lg",

  fullWidth = false,

  className = "",

  ...props
}) => {

  // ============================================
  // Variants
  // ============================================

  const variants = {
    info: {
      wrapper:
        "bg-blue-50 border-blue-200 text-blue-800",

      icon:
        "text-blue-600",

      title:
        "text-blue-900",

      close:
        "text-blue-500 hover:bg-blue-100 hover:text-blue-700",

      action:
        "bg-blue-600 text-white hover:bg-blue-700",
    },

    success: {
      wrapper:
        "bg-green-50 border-green-200 text-green-800",

      icon:
        "text-green-600",

      title:
        "text-green-900",

      close:
        "text-green-500 hover:bg-green-100 hover:text-green-700",

      action:
        "bg-green-600 text-white hover:bg-green-700",
    },

    warning: {
      wrapper:
        "bg-yellow-50 border-yellow-200 text-yellow-800",

      icon:
        "text-yellow-600",

      title:
        "text-yellow-900",

      close:
        "text-yellow-500 hover:bg-yellow-100 hover:text-yellow-700",

      action:
        "bg-yellow-600 text-white hover:bg-yellow-700",
    },

    error: {
      wrapper:
        "bg-red-50 border-red-200 text-red-800",

      icon:
        "text-red-600",

      title:
        "text-red-900",

      close:
        "text-red-500 hover:bg-red-100 hover:text-red-700",

      action:
        "bg-red-600 text-white hover:bg-red-700",
    },
  };


  // ============================================
  // Sizes
  // ============================================

  const sizes = {
    sm: {
      wrapper:
        "px-3 py-2 text-sm",

      icon:
        "w-4 h-4",

      title:
        "text-sm",

      message:
        "text-xs",

      close:
        "w-7 h-7",

      action:
        "px-2.5 py-1 text-xs",
    },

    md: {
      wrapper:
        "px-4 py-3",

      icon:
        "w-5 h-5",

      title:
        "text-sm",

      message:
        "text-sm",

      close:
        "w-8 h-8",

      action:
        "px-3 py-1.5 text-sm",
    },

    lg: {
      wrapper:
        "px-5 py-4 text-base",

      icon:
        "w-6 h-6",

      title:
        "text-base",

      message:
        "text-sm",

      close:
        "w-9 h-9",

      action:
        "px-4 py-2 text-sm",
    },
  };


  // ============================================
  // Rounded
  // ============================================

  const roundedStyles = {
    none:
      "rounded-none",

    sm:
      "rounded-sm",

    md:
      "rounded-md",

    lg:
      "rounded-lg",

    full:
      "rounded-full",
  };


  // ============================================
  // Current Styles
  // ============================================

  const currentVariant =
    variants[variant] || variants.info;

  const currentSize =
    sizes[size] || sizes.md;

  const currentRounded =
    roundedStyles[rounded] || roundedStyles.lg;


  // ============================================
  // Default Icons
  // ============================================

  const defaultIcons = {
    info: LuInfo,
    success: LuCircleCheck,
    warning: LuTriangleAlert,
    error: LuCircleAlert,
  };

  const DefaultIcon =
    defaultIcons[variant] || LuInfo;


  // ============================================
  // Close Handler
  // ============================================

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };


  // ============================================
  // Return
  // ============================================

  return (
    <div
      role="alert"
      className={clsx(
        "flex items-start gap-3",
        "border",
        "transition-all duration-200",

        currentSize.wrapper,

        currentRounded,

        fullWidth
          ? "w-full"
          : "w-full max-w-xl",

        currentVariant.wrapper,

        className
      )}

      {...props}
    >

      {/* ========================================
          Icon
      ======================================== */}

      <span
        className={clsx(
          "mt-0.5 shrink-0",
          currentVariant.icon
        )}
      >
        {icon || (
          <DefaultIcon
            className={currentSize.icon}
          />
        )}
      </span>


      {/* ========================================
          Content
      ======================================== */}

      <div className="min-w-0 flex-1">

        {/* Title */}

        {title && (
          <h3
            className={clsx(
              "font-semibold",
              currentSize.title,
              currentVariant.title
            )}
          >
            {title}
          </h3>
        )}


        {/* Message */}

        {message && (
          <p
            className={clsx(
              "mt-1 leading-5",
              currentSize.message
            )}
          >
            {message}
          </p>
        )}


        {/* Children */}

        {children && (
          <div
            className={clsx(
              "mt-1 leading-5",
              currentSize.message
            )}
          >
            {children}
          </div>
        )}


        {/* Action */}

        {action && (
          <button
            type="button"
            onClick={action}
            className={clsx(
              "mt-3",
              "rounded-md",
              "font-medium",
              "transition-colors duration-200",
              "cursor-pointer",

              currentSize.action,
              currentVariant.action
            )}
          >
            {actionLabel}
          </button>
        )}

      </div>


      {/* ========================================
          Close Button
      ======================================== */}

      {dismissible && (
        <button
          type="button"
          aria-label="Close alert"
          onClick={handleClose}
          className={clsx(
            "flex shrink-0",
            "items-center justify-center",
            "rounded-md",
            "transition-colors duration-200",
            "cursor-pointer",

            currentSize.close,
            currentVariant.close
          )}
        >
          <LuX
            className={currentSize.icon}
          />
        </button>
      )}

    </div>
  );
};

export default Alert;