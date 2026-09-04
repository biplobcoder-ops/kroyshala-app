import { useId } from "react";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

const Textarea = ({
  // --------------------------------
  // Content
  // --------------------------------
  label,
  description,
  helperText,

  // --------------------------------
  // Input
  // --------------------------------
  value,
  defaultValue,
  placeholder,

  // --------------------------------
  // Form
  // --------------------------------
  id,
  name,

  disabled = false,
  required = false,
  readOnly = false,

  // --------------------------------
  // Validation
  // --------------------------------
  error = false,
  errorMessage,

  // --------------------------------
  // Textarea
  // --------------------------------
  rows = 4,
  cols,

  minLength,
  maxLength,

  resize = "vertical",

  // --------------------------------
  // Appearance
  // --------------------------------
  variant = "default",
  size = "md",

  fullWidth = true,

  // --------------------------------
  // Character counter
  // --------------------------------
  showCount = false,

  // --------------------------------
  // Custom classes
  // --------------------------------
  className = "",
  textareaClassName = "",
  labelClassName = "",
  descriptionClassName = "",
  helperTextClassName = "",

  // --------------------------------
  // Events
  // --------------------------------
  onChange,
  onFocus,
  onBlur,

  ...props
}) => {
  // --------------------------------
  // Unique ID
  // --------------------------------

  const generatedId = useId();

  const textareaId =
    id || `textarea-${generatedId}`;

  const descriptionId =
    `${textareaId}-description`;

  const helperId =
    `${textareaId}-helper`;

  // --------------------------------
  // Variants
  // --------------------------------

  const variants = {
    default: {
      base: `
        border-slate-300
        bg-white
        text-slate-900
        placeholder:text-slate-400
        focus:border-blue-500
        focus:ring-blue-500/20
      `,
    },

    filled: {
      base: `
        border-transparent
        bg-slate-100
        text-slate-900
        placeholder:text-slate-400
        focus:border-blue-500
        focus:bg-white
        focus:ring-blue-500/20
      `,
    },

    ghost: {
      base: `
        border-transparent
        bg-transparent
        text-slate-900
        placeholder:text-slate-400
        focus:border-blue-500
        focus:ring-blue-500/20
      `,
    },
  };

  // --------------------------------
  // Sizes
  // --------------------------------

  const sizes = {
    sm: {
      textarea:
        "px-3 py-2 text-sm",
    },

    md: {
      textarea:
        "px-3.5 py-2.5 text-base",
    },

    lg: {
      textarea:
        "px-4 py-3 text-lg",
    },
  };

  // --------------------------------
  // Resize
  // --------------------------------

  const resizeClasses = {
    none: "resize-none",
    vertical: "resize-y",
    horizontal: "resize-x",
    both: "resize",
  };

  // --------------------------------
  // Current styles
  // --------------------------------

  const currentVariant =
    variants[variant] || variants.default;

  const currentSize =
    sizes[size] || sizes.md;

  const currentResize =
    resizeClasses[resize] ||
    resizeClasses.vertical;

  // --------------------------------
  // Error message
  // --------------------------------

  const finalHelperText =
    error && errorMessage
      ? errorMessage
      : helperText;

  // --------------------------------
  // Render
  // --------------------------------

  return (
    <div
      className={twMerge(
        clsx(
          fullWidth
            ? "w-full"
            : "w-auto",

          className
        )
      )}
    >
      {/* =================================
          LABEL
      ================================= */}

      {label && (
        <label
          htmlFor={textareaId}
          className={twMerge(
            clsx(
              "mb-1.5",
              "block",
              "text-sm",
              "font-medium",
              "text-slate-800",

              disabled &&
                "cursor-not-allowed opacity-60",

              labelClassName
            )
          )}
        >
          {label}

          {required && (
            <span
              className="ml-1 text-red-500"
              aria-hidden="true"
            >
              *
            </span>
          )}
        </label>
      )}

      {/* =================================
          DESCRIPTION
      ================================= */}

      {description && (
        <p
          id={descriptionId}
          className={twMerge(
            clsx(
              "mb-2",
              "text-sm",
              "text-slate-500",

              descriptionClassName
            )
          )}
        >
          {description}
        </p>
      )}

      {/* =================================
          TEXTAREA
      ================================= */}

      <textarea
        id={textareaId}
        name={name}

        value={value}
        defaultValue={defaultValue}

        placeholder={placeholder}

        rows={rows}
        cols={cols}

        minLength={minLength}
        maxLength={maxLength}

        disabled={disabled}
        required={required}
        readOnly={readOnly}

        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}

        aria-invalid={
          error || undefined
        }

        aria-describedby={clsx(
          description &&
            descriptionId,

          finalHelperText &&
            helperId
        ) || undefined}

        className={twMerge(
          clsx(
            // --------------------------------
            // Base
            // --------------------------------

            "block",
            "w-full",

            "rounded-lg",
            "border",

            "outline-none",

            "transition-all",
            "duration-200",

            // --------------------------------
            // Textarea style
            // --------------------------------

            currentVariant.base,

            // --------------------------------
            // Size
            // --------------------------------

            currentSize.textarea,

            // --------------------------------
            // Resize
            // --------------------------------

            currentResize,

            // --------------------------------
            // Focus
            // --------------------------------

            "focus:ring-2",

            // --------------------------------
            // Error
            // --------------------------------

            error && `
              border-red-500
              focus:border-red-500
              focus:ring-red-500/20
            `,

            // --------------------------------
            // Disabled
            // --------------------------------

            disabled && `
              cursor-not-allowed
              bg-slate-100
              text-slate-400
              opacity-60
            `,

            // --------------------------------
            // Read only
            // --------------------------------

            readOnly && `
              cursor-default
              bg-slate-50
            `,

            // --------------------------------
            // Custom
            // --------------------------------

            textareaClassName
          )
        )}

        {...props}
      />

      {/* =================================
          BOTTOM AREA
      ================================= */}

      {(finalHelperText ||
        (showCount &&
          maxLength)) && (
        <div
          className="
            mt-1.5
            flex
            items-start
            justify-between
            gap-3
          "
        >
          {/* Helper / Error */}

          {finalHelperText ? (
            <p
              id={helperId}
              className={twMerge(
                clsx(
                  "text-sm",

                  error
                    ? "text-red-500"
                    : "text-slate-500",

                  helperTextClassName
                )
              )}
            >
              {finalHelperText}
            </p>
          ) : (
            <span />
          )}

          {/* Character count */}

          {showCount &&
            maxLength && (
              <span
                className="
                  shrink-0
                  text-xs
                  text-slate-400
                "
              >
                {value?.length || 0}/
                {maxLength}
              </span>
            )}
        </div>
      )}
    </div>
  );
};

export default Textarea;