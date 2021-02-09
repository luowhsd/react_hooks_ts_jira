import { clearTimeout } from "timers";

export const isFalsy = (value: any) => (value === 0 ? false : !value);

export const cleanObject = (object: Object) => {
  const result = { ...object };
  Object.keys(result).forEach((key) => {
    // @ts-ignore
    const value = result[key];
    if (isFalsy(value)) {
      // @ts-ignore
      delete result[key];
    }
  });
  return result;
};

/* export const debounce = (func: () => void, delay?: number) => {
  let timeout: number;
  return (...param) => {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      func(...param);
    }, delay);
  };
}; */
