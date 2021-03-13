import { RootState } from "slices";
import { buildGenericReducer } from "utils/reducers";

export const {
  asyncThunk: fetchProblems,
  slice: problemsSlice,
} = buildGenericReducer<any>("problems/fetchProblems", "/problems");

export const {
  asyncThunk: fetchProblem,
  slice: problemSlice,
} = buildGenericReducer<any>("problems/fetchProblem", "/problems/:id");

export const selectProblems = (state: RootState) => state.problems;
export const selectProblem = (state: RootState) => state.problem;
