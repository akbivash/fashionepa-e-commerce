import { useEffect, useState } from "react";

export const useDebounce = (fn, delay) => {
    let timer
    return function () {
        clearTimeout(timer);
        timer = setTimeout(() => {
            fn()
        }, delay);
    };
};


export const useThrottle = (fn, delay) => {
    let flag = false
    return function () {
        if (flag) return
        flag = true
        setTimeout(() => {
            fn()
            flag = false
        }, delay)
    }
}



export const useDebounceSearch = (keyword, delay) => {
    const [debouncedValue, setDebouncedValue] = useState();
  
    useEffect(() => {
      let timeout = setTimeout(() => {
        setDebouncedValue(keyword);
      }, delay);
  
      return () => clearTimeout(timeout);
    }, [keyword]);
  
    return debouncedValue;
  };