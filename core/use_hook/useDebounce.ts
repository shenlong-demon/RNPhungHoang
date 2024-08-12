import { useEffect, useState } from 'react';

export const useDebounce = (value: any, delay: number = 500): string => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeoutID = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => clearTimeout(timeoutID);
  }, [value, delay]);

  return debouncedValue;
};
