import React, {useEffect, useState} from 'react';

const useDebounce = (value, delay = 500) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const id = setTimeout(() => {
      console.log('Setting up delayed value');
      setDebouncedValue(value.trim());
    }, delay);

    return () => {
      console.log('Clearing with', debouncedValue, value);
      clearTimeout(id);
    };
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;
