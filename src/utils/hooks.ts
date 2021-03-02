import { useState, useEffect } from "react";
import { useSelector, TypedUseSelectorHook } from "react-redux";
import { GenericState } from "./reducers";
import { RootState } from "slices";
import { useDispatch as useReactReduxDispatch } from "react-redux";
import { store } from "utils";

export const useGenericData = <T>(
  rawData: GenericState<T>,
  initialValue?: any
) => {
  const [data, setData] = useState(initialValue);

  useEffect(() => {
    if (rawData.status === "succeeded") {
      setData(rawData.payload);
    }
  }, [rawData]);

  return [data, setData];
};

export const useOutsideClick = (ref: any, callback: any) => {
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
