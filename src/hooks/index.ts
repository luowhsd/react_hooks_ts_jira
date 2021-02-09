import { useEffect, useState } from "react";

export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
  }, []);
};

export const useDebounce = <T>(value: T, delay?: number) => {
  const [debounceValue, setDebounceValue] = useState(value);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebounceValue(value);
    }, delay);
    return () => clearTimeout(timeout);
  }, [value, delay]);
  return debounceValue;
};

export const useArray = <T>(arr: T[]) => {
  const [arrTemp, setArrTemp] = useState(arr);

  const clear = () => {
    setArrTemp([]);
  };

  const removeIndex = (idx: number) => {
    const temp = [...arrTemp];
    const newArr = temp.splice(idx, 1);
    setArrTemp(newArr);
  };

  const add = (value: T) => {
    setArrTemp([...arrTemp, value]);
  };

  return {
    arrTemp,
    clear,
    removeIndex,
    add,
  };
};
