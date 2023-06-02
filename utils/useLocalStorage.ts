import { useState, useEffect } from 'react';

const useLocalStorage = <T>(key: string, initialValue: T): [T, React.Dispatch<React.SetStateAction<T>>] => {
  const [value, setValue] = useState<T>(() => {
    try{
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) as T : initialValue;
    } catch(error) {
      return initialValue;
    }
  });
  useEffect(() => {
    try {
      const serializedValue = JSON.stringify(value);
      localStorage.setItem(key, serializedValue);
    } catch (error) {
      console.error(error);
    }
  }, [key, value]);

  return [value, setValue];
}

export default useLocalStorage;