import { useCallback, useEffect } from "react";

type useDebounceParamsType = {
  func: (params?: any) => void;
  delay: number;
  deps: any[];
};

export const useDebounce = ({ func, delay, deps }: useDebounceParamsType) => {
  const callback = useCallback(func, deps);

  useEffect(() => {
    const timer = setTimeout(() => {
      callback();
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [callback, delay]);
};
