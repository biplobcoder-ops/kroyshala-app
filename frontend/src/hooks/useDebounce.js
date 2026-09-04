import { useState, useEffect } from "react";

// ==========================================
// Custom Hook: useDebounce
// User type করা বন্ধ করলে delay পরে value return করে
// ==========================================

const useDebounce = (value, delay = 300) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Delay পরে value update হবে
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cleanup - নতুন value আসলে আগের timer cancel
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;