import { useState, useEffect } from "react";
import { useSelector, TypedUseSelectorHook } from "react-redux";
import { GenericState } from "./reducers";
import { RootState } from "../slices";

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

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
