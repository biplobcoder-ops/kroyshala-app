import clsx from "clsx";
import { twMerge } from "tailwind-merge";

const Pagination = ({
  // --------------------------------
  // State
  // --------------------------------
  currentPage = 1,
  totalPages = 1,

  // --------------------------------
  // Events
  // --------------------------------
  onPageChange,

  // --------------------------------
  // Behavior
  // --------------------------------
  siblingCount = 1,
  boundaryCount = 1,

  showFirstLast = true,
  showPrevNext = true,

  // --------------------------------
  // Appearance
  // --------------------------------
  size = "md",
  variant = "default",

  // --------------------------------
  // State
  // --------------------------------
  disabled = false,

  // --------------------------------
  // Custom classes
  // --------------------------------
  className = "",
  buttonClassName = "",
  activeClassName = "",

  ...props
}) => {
  // --------------------------------
  // Sizes
  // --------------------------------

  const sizes = {
    sm: {
      button:
        "h-8 min-w-8 px-2 text-sm",
    },

    md: {
      button:
        "h-9 min-w-9 px-3 text-sm",
    },

    lg: {
      button:
        "h-11 min-w-11 px-4 text-base",
    },
  };

  // --------------------------------
  // Variants
  // --------------------------------

  const variants = {
    default: {
      base: `
        border
        border-slate-200
        bg-white
        text-slate-700
        hover:bg-slate-50
      `,

      active: `
        border-blue-600
        bg-blue-600
        text-white
      `,
    },

    outline: {
      base: `
        border
        border-slate-300
        bg-transparent
        text-slate-700
        hover:bg-slate-100
      `,

      active: `
        border-blue-600
        bg-blue-50
        text-blue-700
      `,
    },

    dark: {
      base: `
        bg-slate-800
        text-slate-200
        hover:bg-slate-700
      `,

      active: `
        bg-blue-600
        text-white
      `,
    },
  };

  const currentSize =
    sizes[size] || sizes.md;

  const currentVariant =
    variants[variant] || variants.default;

  // --------------------------------
  // Page change
  // --------------------------------

  const handlePageChange = (page) => {
    if (disabled) {
      return;
    }

    if (
      page < 1 ||
      page > totalPages ||
      page === currentPage
    ) {
      return;
    }

    onPageChange?.(page);
  };

  // --------------------------------
  // Generate pages
  // --------------------------------

  const generatePages = () => {
    const pages = [];

    const startPage = Math.max(
      1,
      currentPage - siblingCount
    );

    const endPage = Math.min(
      totalPages,
      currentPage + siblingCount
    );

    // Left boundary
    for (
      let page = 1;
      page <= Math.min(boundaryCount, totalPages);
      page++
    ) {
      pages.push(page);
    }

    // Left ellipsis
    if (
      startPage >
      boundaryCount + 1
    ) {
      pages.push("left-ellipsis");
    }

    // Middle pages
    for (
      let page = startPage;
      page <= endPage;
      page++
    ) {
      if (
        page > boundaryCount &&
        page <=
          totalPages - boundaryCount
      ) {
        pages.push(page);
      }
    }

    // Right ellipsis
    if (
      endPage <
      totalPages - boundaryCount
    ) {
      pages.push("right-ellipsis");
    }

    // Right boundary
    for (
      let page =
        Math.max(
          boundaryCount + 1,
          totalPages - boundaryCount + 1
        );
      page <= totalPages;
      page++
    ) {
      if (!pages.includes(page)) {
        pages.push(page);
      }
    }

    return pages;
  };

  const pages = generatePages();

  // --------------------------------
  // Component
  // --------------------------------

  return (
    <nav
      aria-label="Pagination"
      className={twMerge(
        clsx(
          "flex",
          "items-center",
          "gap-1",

          disabled &&
            "pointer-events-none opacity-50",

          className
        )
      )}
      {...props}
    >
      {/* First */}

      {showFirstLast && (
        <button
          type="button"
          aria-label="First page"
          disabled={
            disabled ||
            currentPage === 1
          }
          onClick={() =>
            handlePageChange(1)
          }
          className={twMerge(
            clsx(
              "inline-flex",
              "items-center",
              "justify-center",
              "rounded-md",
              "transition-colors",

              currentSize.button,
              currentVariant.base,

              "disabled:cursor-not-allowed",
              "disabled:opacity-50",

              buttonClassName
            )
          )}
        >
          «
        </button>
      )}

      {/* Previous */}

      {showPrevNext && (
        <button
          type="button"
          aria-label="Previous page"
          disabled={
            disabled ||
            currentPage === 1
          }
          onClick={() =>
            handlePageChange(
              currentPage - 1
            )
          }
          className={twMerge(
            clsx(
              "inline-flex",
              "items-center",
              "justify-center",
              "rounded-md",
              "transition-colors",

              currentSize.button,
              currentVariant.base,

              "disabled:cursor-not-allowed",
              "disabled:opacity-50",

              buttonClassName
            )
          )}
        >
          ‹
        </button>
      )}

      {/* Pages */}

      {pages.map((page, index) => {
        if (
          page === "left-ellipsis" ||
          page === "right-ellipsis"
        ) {
          return (
            <span
              key={`${page}-${index}`}
              className={twMerge(
                clsx(
                  "inline-flex",
                  "items-center",
                  "justify-center",
                  currentSize.button
                )
              )}
            >
              …
            </span>
          );
        }

        const isActive =
          page === currentPage;

        return (
          <button
            key={page}
            type="button"
            aria-label={`Page ${page}`}
            aria-current={
              isActive
                ? "page"
                : undefined
            }
            disabled={disabled}
            onClick={() =>
              handlePageChange(page)
            }
            className={twMerge(
              clsx(
                "inline-flex",
                "items-center",
                "justify-center",
                "rounded-md",
                "font-medium",
                "transition-colors",

                currentSize.button,

                isActive
                  ? currentVariant.active
                  : currentVariant.base,

                "disabled:cursor-not-allowed",
                "disabled:opacity-50",

                buttonClassName,

                isActive &&
                  activeClassName
              )
            )}
          >
            {page}
          </button>
        );
      })}

      {/* Next */}

      {showPrevNext && (
        <button
          type="button"
          aria-label="Next page"
          disabled={
            disabled ||
            currentPage === totalPages
          }
          onClick={() =>
            handlePageChange(
              currentPage + 1
            )
          }
          className={twMerge(
            clsx(
              "inline-flex",
              "items-center",
              "justify-center",
              "rounded-md",
              "transition-colors",

              currentSize.button,
              currentVariant.base,

              "disabled:cursor-not-allowed",
              "disabled:opacity-50",

              buttonClassName
            )
          )}
        >
          ›
        </button>
      )}

      {/* Last */}

      {showFirstLast && (
        <button
          type="button"
          aria-label="Last page"
          disabled={
            disabled ||
            currentPage === totalPages
          }
          onClick={() =>
            handlePageChange(
              totalPages
            )
          }
          className={twMerge(
            clsx(
              "inline-flex",
              "items-center",
              "justify-center",
              "rounded-md",
              "transition-colors",

              currentSize.button,
              currentVariant.base,

              "disabled:cursor-not-allowed",
              "disabled:opacity-50",

              buttonClassName
            )
          )}
        >
          »
        </button>
      )}
    </nav>
  );
};

export default Pagination;