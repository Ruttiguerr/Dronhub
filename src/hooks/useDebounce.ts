import { useEffect, useState } from 'react';

/**
 * Debounce hook.  Returns a debounced value that only updates after
 * the specified delay has elapsed since the last change.  Useful
 * when you don't want to run expensive operations (like filtering
 * lists) on every keystroke.
 *
 * @param value The value to debounce
 * @param delay The delay in milliseconds
 */
export function useDebounce<T>(value: T, delay: number = 300): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}