import { RootState } from "slices";
import { buildGenericReducer } from "../utils/reducers";

export const {
  asyncThunk: fetchTags,
  slice: tagsSlice,
} = buildGenericReducer<any>({ name: "tags/fetchTags", endpoint: "/tags" });

export const selectTags = (state: RootState) => state.tags;
