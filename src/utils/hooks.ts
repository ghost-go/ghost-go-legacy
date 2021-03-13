import { useState, useEffect } from "react";
import { useSelector, TypedUseSelectorHook } from "react-redux";
import { GenericState } from "./reducers";
import { RootState } from "slices";
import { useDispatch as useReactReduxDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { store } from "utils";

export const useGenericData = <T>(
  rawData: GenericState<T>,
  initialValue?: any
) => {
  const [data, setData] = useState(initialValue);

  useEffect(() => {
    if (rawData.status === "succeeded") {
      if (rawData.payload) {
        setData(rawData.payload);
      }
    }
  }, [rawData]);

  return [data, setData];
};

export const useOutsideClick = (ref: any, callback: any) => {
  console.log(ref.current);
  const handleClick = (e: any) => {
    if (ref.current && !ref.current.contains(e.target)) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  });
};

export type AppDispatch = typeof store.dispatch;
export const useDispatch = () => useReactReduxDispatch<AppDispatch>();

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export function useQuery() {
  return new URLSearchParams(useLocation().search);
}
