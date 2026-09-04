import {
  useEffect,
  useState,
} from "react";

import clsx from "clsx";

import { LuX } from "react-icons/lu";

const Modal = ({
  open = false,
  onClose,

  title,
  children,
  footer,

  size = "md",

  closeOnOverlayClick = true,
  closeOnEscape = true,

  showCloseButton = true,
  centered = true,

  className = "",
  overlayClassName = "",

  ...props
}) => {
  // --------------------------------
  // Modal sizes
  // --------------------------------

  const sizes = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    "2xl": "max-w-2xl",
  };

  // --------------------------------
  // Mounted state
  // --------------------------------

  const [mounted, setMounted] =
    useState(open);

  // --------------------------------
  // Animation state
  // --------------------------------

  const [visible, setVisible] =
    useState(false);

  // --------------------------------
  // Open / Close animation
  // --------------------------------

  useEffect(() => {
    let frame;

    let timer;

    if (open) {
      // Mount modal first
      setMounted(true);

      // Wait until browser paints
      frame = requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setVisible(true);
        });
      });
    } else {
      // Start closing animation
      setVisible(false);

      // Remove after animation
      timer = setTimeout(() => {
        setMounted(false);
      }, 300);
    }

    return () => {
      cancelAnimationFrame(frame);

      clearTimeout(timer);
    };
  }, [open]);

  // --------------------------------
  // Escape key
  // --------------------------------

  useEffect(() => {
    if (!open || !closeOnEscape) {
      return;
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose?.();
      }
    };

    document.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      document.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [
    open,
    closeOnEscape,
    onClose,
  ]);

  // --------------------------------
  // Don't render when unmounted
  // --------------------------------

  if (!mounted) {
    return null;
  }

  // --------------------------------
  // Render
  // --------------------------------

  return (
    <div
      className={clsx(
        // Position
        "fixed inset-0 z-50",

        // Layout
        "flex",

        centered
          ? "items-center justify-center"
          : "items-start justify-center pt-20",

        // Spacing
        "p-4",

        // Overlay animation
        "transition-opacity",
        "duration-300",
        "ease-out",

        visible
          ? "bg-black/50 opacity-100"
          : "bg-black/0 opacity-0",

        overlayClassName
      )}

      onMouseDown={(event) => {
        if (
          closeOnOverlayClick &&
          event.target ===
            event.currentTarget
        ) {
          onClose?.();
        }
      }}
    >
      {/* --------------------------------
          Modal
      -------------------------------- */}

      <div
        className={clsx(
          // Width
          "w-full",

          sizes[size] ||
            sizes.md,

          // Appearance
          "overflow-hidden",
          "rounded-xl",
          "bg-white",
          "shadow-2xl",

          // Animation
          "transform",
          "transition-all",
          "duration-300",
          "ease-out",

          visible
            ? "scale-100 opacity-100"
            : "scale-[0.96] opacity-0",

          className
        )}

        {...props}
      >
        {/* --------------------------------
            Header
        -------------------------------- */}

        {(title ||
          showCloseButton) && (
          <div
            className="
              flex
              items-center
              justify-between
              border-b
              border-slate-200
              px-5
              py-4
            "
          >
            {/* Title */}

            {title && (
              <h2
                className="
                  text-lg
                  font-semibold
                  text-slate-900
                "
              >
                {title}
              </h2>
            )}

            {/* Close */}

            {showCloseButton && (
              <button
                type="button"
                onClick={() =>
                  onClose?.()
                }
                className="
                  rounded-md
                  p-2
                  text-slate-500
                  transition
                  duration-200
                  hover:bg-slate-100
                  hover:text-slate-800
                  focus:outline-none
                  focus:ring-2
                  focus:ring-blue-500/30
                "
                aria-label="Close modal"
              >
                <LuX className="h-5 w-5" />
              </button>
            )}
          </div>
        )}

        {/* --------------------------------
            Body
        -------------------------------- */}

        <div className="px-5 py-5">
          {children}
        </div>

        {/* --------------------------------
            Footer
        -------------------------------- */}

        {footer && (
          <div
            className="
              border-t
              border-slate-200
              px-5
              py-4
            "
          >
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;