"use client"
import { useState, useEffect } from 'react';

const useLocalStorage = <T>(key: string, initialValue: T): [T, React.Dispatch<React.SetStateAction<T>>] => {
  const [value, setValue] = useState(initialValue);
  const [isFirstRender, setIsFirstRender] = useState(true);

  useEffect(() => {
    try {
      if(isFirstRender) return
      const serializedValue = JSON.stringify(value);
      localStorage.setItem(key, serializedValue);
    } catch (error) {
      console.error(error);
    }
  }, [key, value]);

  useEffect(() => {
    try {
      const item = localStorage.getItem(key);
      console.log(item);
      setValue(item ? JSON.parse(item) as T : initialValue);
      setIsFirstRender(false);
    } catch (error) {
      setValue(initialValue);
    }
  }, []);

  return [value, setValue];
}

export default useLocalStorage;