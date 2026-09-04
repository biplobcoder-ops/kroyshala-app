import clsx from "clsx";

const Card = ({
  children,

  // Content
  title,
  description,
  image,
  imageAlt = "Card image",

  // Layout
  header,
  footer,

  // Styling
  padding = "md",
  rounded = "lg",
  shadow = "md",
  bordered = true,

  // Behavior / visual
  hoverable = false,


  className = "",

  ...props
}) => {
  // --------------------------------
  // Padding styles
  // --------------------------------

  const paddings = {
    none: "p-0",
    sm: "p-3",
    md: "p-5",
    lg: "p-6",
    xl: "p-8",
  };

  // --------------------------------
  // Rounded styles
  // --------------------------------

  const roundedStyles = {
    none: "rounded-none",
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    xl: "rounded-xl",
    "2xl": "rounded-2xl",
    full: "rounded-full",
  };

  // --------------------------------
  // Shadow styles
  // --------------------------------

  const shadows = {
    none: "shadow-none",
    sm: "shadow-sm",
    md: "shadow-md",
    lg: "shadow-lg",
    xl: "shadow-xl",
    "2xl": "shadow-2xl",
  };

  // --------------------------------
  // Current styles
  // --------------------------------

  const currentPadding =
    paddings[padding] || paddings.md;

  const currentRounded =
    roundedStyles[rounded] ||
    roundedStyles.lg;

  const currentShadow =
    shadows[shadow] || shadows.md;

  // --------------------------------
  // Return
  // --------------------------------

  return (
    <div
      className={clsx(
        // Base
        "overflow-hidden",
        "bg-white",

        // Styling
        currentPadding,
        currentRounded,
        currentShadow,

        // Border
        bordered &&
          "border border-slate-200",

        // Hover
        hoverable && [
          "transition-all duration-200",
          "hover:-translate-y-1",
          "hover:shadow-xl",
        ],

        // Custom
        className
      )}
      {...props}
    >
      {/* --------------------------------
          Image
      -------------------------------- */}

      {image && (
        <div className="mb-4 overflow-hidden rounded-md">
          <img
            src={image}
            alt={imageAlt}
            className={clsx(
              "h-48 w-full",
              "object-cover",
              hoverable &&
                "transition-transform duration-300 hover:scale-105"
            )}
          />
        </div>
      )}

      {/* --------------------------------
          Header
      -------------------------------- */}

      {header && (
        <div className="mb-4">
          {header}
        </div>
      )}

      {/* --------------------------------
          Title
      -------------------------------- */}

      {title && (
        <h3 className="text-lg font-semibold text-slate-900">
          {title}
        </h3>
      )}

      {/* --------------------------------
          Description
      -------------------------------- */}

      {description && (
        <p className="mt-1 text-sm leading-5 text-slate-500">
          {description}
        </p>
      )}

      {/* --------------------------------
          Main Content
      -------------------------------- */}

      {children && (
        <div className="mt-4">
          {children}
        </div>
      )}

      {/* --------------------------------
          Footer
      -------------------------------- */}

      {footer && (
        <div
          className={clsx(
            "mt-5",
            "border-t border-slate-200",
            "pt-4"
          )}
        >
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card;