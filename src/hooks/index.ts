import { useEffect, useState } from "react";

export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
    // todo 依赖项里加上callback会造成无限循环， 这个和useCallback以及useMemo有关
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
