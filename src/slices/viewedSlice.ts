import { RootState } from "slices";
import { buildGenericReducer } from "../utils/reducers";

export const {
  asyncThunk: createViewedProblems,
  slice: createdViewedProblemsSlice,
} = buildGenericReducer<any>({
  name: "viewedProblems/createViewedProblems",
  endpoint: "/viewed_problems",
  method: "POST",
});

export const {
  asyncThunk: createViewedKifus,
  slice: createdViewedKifusSlice,
} = buildGenericReducer<any>({
  name: "viewedKifus/createViewedKifus",
  endpoint: "/viewed_kifus",
  method: "POST",
});

export const {
  asyncThunk: fetchViewedProblems,
  slice: viewedProblemsSlice,
} = buildGenericReducer<any>({
  name: "viewedProblems/fetchViewedProblems",
  endpoint: "/viewed_problems",
});

export const {
  asyncThunk: fetchViewedKifus,
  slice: viewedKifusSlice,
} = buildGenericReducer<any>({
  name: "viewedKifus/fetchViewedKifus",
  endpoint: "/viewed_kifus",
});

export const selectViewedProblems = (state: RootState) => state.viewedProblems;
export const selectViewedKifus = (state: RootState) => state.viewedKifus;
