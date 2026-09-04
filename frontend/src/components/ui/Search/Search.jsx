import React, { useEffect, useState } from "react";

const SearchInput = ({
  value,
  onSearch,
  placeholder = "Search...",
  debounce = 500,
  disabled = false,
  loading = false,
}) => {
  const [inputValue, setInputValue] = useState(value || "");

  useEffect(() => {
    setInputValue(value || "");
  }, [value]);

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(inputValue);
    }, debounce);

    return () => clearTimeout(timer);
  }, [inputValue, debounce, onSearch]);

  const handleClear = () => {
    setInputValue("");
    onSearch("");
  };

  return (
    <div className="relative flex items-center">
      <input
        type="text"
        value={inputValue}
        placeholder={placeholder}
        disabled={disabled}
        onChange={(e) => setInputValue(e.target.value)}
        className="w-full rounded-lg border border-slate-300 px-4 py-2 pr-20 outline-none focus:border-blue-500"
      />

      {loading && (
        <span className="absolute right-10 text-sm text-slate-400">
          Loading...
        </span>
      )}

      {inputValue && !loading && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute right-3 text-slate-500 hover:text-slate-900"
        >
          ×
        </button>
      )}
    </div>
  );
};

export default SearchInput;