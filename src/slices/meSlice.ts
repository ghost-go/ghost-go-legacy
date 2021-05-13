import { RootState } from "slices";
import { buildGenericReducer, JsonApiResponseType } from "utils/reducers";

export const { asyncThunk: fetchProfile, slice: profileSlice } =
  buildGenericReducer<JsonApiResponseType>({
    name: "fetchProfile",
    endpoint: "/profile",
    options: { useToken: true },
  });

export const { asyncThunk: fetchStatistics, slice: statisticsSlice } =
  buildGenericReducer<any>({
    name: "fetchStatistics",
    endpoint: "/statistics",
    options: { useToken: true },
  });

export const { asyncThunk: fetchWrongs, slice: wrongsSlice } =
  buildGenericReducer<any>({
    name: "fetchWrongs",
    endpoint: "/wrongs",
    options: { useToken: true },
  });

export const { asyncThunk: fetchTried, slice: triedSlice } =
  buildGenericReducer<any>({
    name: "fetchTried",
    endpoint: "/tried",
    options: { useToken: true },
  });
