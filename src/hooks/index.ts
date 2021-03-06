import { useEffect, useState, useRef } from "react";

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

export const useDocumentTitle = (
  title: string,
  keepOnUmount: boolean = true
) => {
  const oldTitle = useRef(document.title).current;
  useEffect(() => {
    document.title = title;
  }, [title]);
  useEffect(() => {
    return () => {
      if (!keepOnUmount) {
        // 不加依赖项读到的oldTitle是最初的
        document.title = oldTitle;
      }
    };
  }, [keepOnUmount, oldTitle]);
};

/**
 * 返回组件的挂载状态，如果还没挂载或者已经卸载，返回false，反之返回true
 */
export const useMountedRef = () => {
  const mountedRef = useRef(false);
  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  });
  return mountedRef;
};
