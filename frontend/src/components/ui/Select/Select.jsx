import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";

import {
  LuCheck,
  LuChevronDown,
  LuSearch,
  LuX,
} from "react-icons/lu";

const Select = ({
  label,
  required = false,

  options = [],
  value,
  onChange,

  placeholder = "Select option",

  searchable = false,
  multiple = false,

  disabled = false,
  loading = false,

  variant = "default",
  state = "default",

  size = "md",
  rounded = "lg",

  fullWidth = false,

  clearable = true,

  helperText,
  errorMessage,

  leftIcon,
  rightIcon,

  emptyMessage = "No option found",

  triggerClassName = "",
  dropdownClassName = "",
  className = "",

  ...props
}) => {
  // ==============================
  // Styles
  // ==============================

  const variants = {
    default: "bg-white border",
    filled: "bg-slate-100 border",
    outline: "bg-white border-2",
    underlined:
      "bg-transparent border-0 border-b rounded-none",
  };

  const states = {
    default:
      "border-slate-300 focus-within:border-blue-500",

    success:
      "border-green-500 focus-within:border-green-500",

    warning:
      "border-yellow-500 focus-within:border-yellow-500",

    error:
      "border-red-500 focus-within:border-red-500",
  };

  const sizes = {
    sm: {
      trigger: "min-h-9 px-3 text-sm",
      option: "px-3 py-2 text-sm",
      icon: "w-4 h-4",
    },

    md: {
      trigger: "min-h-11 px-4 text-base",
      option: "px-4 py-2 text-base",
      icon: "w-5 h-5",
    },

    lg: {
      trigger: "min-h-12 px-5 text-lg",
      option: "px-5 py-3 text-lg",
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

  // ==============================
  // State
  // ==============================

  const [isOpen, setIsOpen] = useState(false);

  const [search, setSearch] = useState("");

  const [highlightedIndex, setHighlightedIndex] =
    useState(-1);

  // ==============================
  // Refs
  // ==============================

  const selectRef = useRef(null);

  const searchInputRef = useRef(null);

  // ==============================
  // Filter Options
  // ==============================

  const filteredOptions = useMemo(() => {
    if (!searchable || search.trim() === "") {
      return options;
    }

    return options.filter((option) =>
      option.label
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [options, search, searchable]);

  // ==============================
  // Selected Values
  // ==============================

  const selectedValues = useMemo(() => {
    if (!multiple) {
      return value === undefined ||
        value === null ||
        value === ""
        ? []
        : [value];
    }

    return Array.isArray(value) ? value : [];
  }, [value, multiple]);

  // ==============================
  // Selected Options
  // ==============================

  const selectedOptions = useMemo(() => {
    return options.filter((option) =>
      selectedValues.includes(option.value)
    );
  }, [options, selectedValues]);

  // ==============================
  // Selected Label
  // ==============================

  const selectedLabel = useMemo(() => {
    if (selectedOptions.length === 0) {
      return placeholder;
    }

    if (multiple) {
      return selectedOptions
        .map((option) => option.label)
        .join(", ");
    }

    return selectedOptions[0].label;
  }, [
    selectedOptions,
    multiple,
    placeholder,
  ]);

  // ==============================
  // Outside Click
  // ==============================

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target)
      ) {
        setIsOpen(false);
        setSearch("");
        setHighlightedIndex(-1);
      }
    };

    document.addEventListener(
      "mousedown",
      handleOutsideClick
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleOutsideClick
      );
    };
  }, []);

  // ==============================
  // Search Focus
  // ==============================

  useEffect(() => {
    if (isOpen && searchable) {
      searchInputRef.current?.focus();
    }
  }, [isOpen, searchable]);

  // ==============================
  // Open Dropdown
  // ==============================

  const handleOpen = () => {
    if (disabled || loading) {
      return;
    }

    setIsOpen((prev) => !prev);

    if (!isOpen) {
      setHighlightedIndex(0);
    }
  };

  // ==============================
  // Select Option
  // ==============================

  const handleSelect = (option) => {
    if (option.disabled) {
      return;
    }

    if (multiple) {
      const currentValues = Array.isArray(value)
        ? value
        : [];

      const exists = currentValues.includes(
        option.value
      );

      if (exists) {
        onChange(
          currentValues.filter(
            (item) => item !== option.value
          )
        );
      } else {
        onChange([
          ...currentValues,
          option.value,
        ]);
      }

      return;
    }

    onChange(option.value);

    setIsOpen(false);
    setSearch("");
    setHighlightedIndex(-1);
  };

  // ==============================
  // Clear Selection
  // ==============================

  const handleClear = (event) => {
    event.stopPropagation();

    if (disabled || loading) {
      return;
    }

    onChange(multiple ? [] : "");

    setSearch("");
    setHighlightedIndex(-1);
  };

  // ==============================
  // Keyboard Navigation
  // ==============================

  const handleKeyDown = (event) => {
    if (disabled || loading) {
      return;
    }

    // Open with Enter / Space
    if (
      !isOpen &&
      (event.key === "Enter" ||
        event.key === " ")
    ) {
      event.preventDefault();

      setIsOpen(true);
      setHighlightedIndex(0);

      return;
    }

    // Close with Escape
    if (event.key === "Escape") {
      event.preventDefault();

      setIsOpen(false);
      setSearch("");
      setHighlightedIndex(-1);

      return;
    }

    if (!isOpen) {
      return;
    }

    // Arrow Down
    if (event.key === "ArrowDown") {
      event.preventDefault();

      setHighlightedIndex((prev) => {
        const next = prev + 1;

        return next >= filteredOptions.length
          ? 0
          : next;
      });

      return;
    }

    // Arrow Up
    if (event.key === "ArrowUp") {
      event.preventDefault();

      setHighlightedIndex((prev) => {
        const next = prev - 1;

        return next < 0
          ? filteredOptions.length - 1
          : next;
      });

      return;
    }

    // Select with Enter
    if (
      event.key === "Enter" &&
      highlightedIndex >= 0 &&
      filteredOptions[highlightedIndex]
    ) {
      event.preventDefault();

      handleSelect(
        filteredOptions[highlightedIndex]
      );
    }
  };

  // ==============================
  // Render
  // ==============================

  return (
    <div
      ref={selectRef}
      className={clsx(
        "relative",
        fullWidth ? "w-full" : "w-72",
        className
      )}
    >
      {/* Label */}

      {label && (
        <label className="mb-2 block font-medium text-slate-700">
          {label}

          {required && (
            <span className="ml-1 text-red-500">
              *
            </span>
          )}
        </label>
      )}

      {/* Trigger */}

      <button
        type="button"
        disabled={disabled || loading}
        onClick={handleOpen}
        onKeyDown={handleKeyDown}
        className={twMerge(
          clsx(
            "w-full",
            "flex items-center justify-between gap-2",
            "outline-none",
            "transition-all duration-200",
            "focus:ring-2 focus:ring-blue-500/20",

            disabled &&
            "cursor-not-allowed opacity-60",

            variants[variant] ||
            variants.default,

            states[state] ||
            states.default,

            currentSize.trigger,

            roundedStyles[rounded] ||
            roundedStyles.lg,

            triggerClassName
          )
        )}
      >
        {/* Left Content */}

        <div className="flex min-w-0 flex-1 items-center gap-2">
          {leftIcon && (
            <span className="shrink-0 text-slate-400">
              {leftIcon}
            </span>
          )}

          <span
            className={clsx(
              "truncate text-left",
              selectedOptions.length === 0 &&
              "text-slate-400"
            )}
          >
            {selectedLabel}
          </span>
        </div>

        {/* Right Content */}

        <div className="flex shrink-0 items-center gap-2">
          {/* Clear */}

          {clearable &&
            selectedOptions.length > 0 &&
            !loading && (
              <span
                role="button"
                tabIndex={-1}
                onClick={handleClear}
                className="
            flex
            items-center
            justify-center
            rounded-full
            text-slate-400
            hover:bg-slate-100
            hover:text-slate-700
          "
              >
                <LuX
                  className={currentSize.icon}
                />
              </span>
            )}

          {/* Loading */}

          {loading ? (
            <span
              className="
          h-4
          w-4
          animate-spin
          rounded-full
          border-2
          border-blue-500
          border-t-transparent
        "
            />
          ) : (
            <>
              {rightIcon && (
                <span className="text-slate-400">
                  {rightIcon}
                </span>
              )}

              <LuChevronDown
                className={clsx(
                  currentSize.icon,
                  "transition-transform duration-200",
                  isOpen && "rotate-180"
                )}
              />
            </>
          )}
        </div>
      </button>

      {/* Dropdown */}

      {isOpen && !disabled && (
        <div
          className={twMerge(clsx(
            `
              absolute
              left-0
              z-50
              mt-2
              w-full
              overflow-hidden
              rounded-lg
              border
              border-slate-200
              bg-white
              shadow-lg
            `,
            dropdownClassName
          ))}
        >
          {/* Search */}

          {searchable && (
            <div className="border-b border-slate-200 p-2">
              <div className="relative">
                <LuSearch
                  className="
                    absolute
                    left-3
                    top-1/2
                    h-4
                    w-4
                    -translate-y-1/2
                    text-slate-400
                  "
                />

                <input
                  ref={searchInputRef}
                  type="text"
                  value={search}
                  onChange={(event) =>
                    setSearch(event.target.value)
                  }
                  onKeyDown={handleKeyDown}
                  placeholder="Search..."
                  className="
                    w-full
                    rounded-md
                    border
                    border-slate-300
                    py-2
                    pl-9
                    pr-3
                    text-sm
                    outline-none
                    transition
                    focus:border-blue-500
                    focus:ring-2
                    focus:ring-blue-500/20
                  "
                />
              </div>
            </div>
          )}

          {/* Options */}

          <div className="max-h-60 overflow-y-auto">
            {filteredOptions.length === 0 ? (
              <div className="px-4 py-4 text-center text-sm text-slate-400">
                {emptyMessage}
              </div>
            ) : (
              filteredOptions.map(
                (option, index) => {
                  const isSelected =
                    selectedValues.includes(
                      option.value
                    );

                  const isHighlighted =
                    index === highlightedIndex;

                  return (
                    <button
                      key={option.value}
                      type="button"
                      disabled={option.disabled}
                      onClick={() =>
                        handleSelect(option)
                      }
                      className={clsx(
                        "flex w-full items-center justify-between gap-3",

                        "text-left",

                        "transition-colors duration-150",

                        currentSize.option,

                        option.disabled &&
                        "cursor-not-allowed opacity-40",

                        !option.disabled &&
                        "hover:bg-slate-100",

                        isHighlighted &&
                        !option.disabled &&
                        "bg-slate-100",

                        isSelected &&
                        "bg-blue-50 text-blue-700"
                      )}
                    >
                      <span className="truncate">
                        {option.label}
                      </span>

                      {isSelected && (
                        <LuCheck
                          className={clsx(
                            "shrink-0",
                            currentSize.icon,
                            "text-blue-600"
                          )}
                        />
                      )}
                    </button>
                  );
                }
              )
            )}
          </div>
        </div>
      )}

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

export default Select;