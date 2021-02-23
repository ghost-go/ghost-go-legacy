import { buildGenericReducer } from '../utils/reducers';

export const {
  asyncThunk: fetchProblems,
  slice: problemsSlice,
} = buildGenericReducer<any>('problems/fetchProblems', '/problems');

export const {
  asyncThunk: fetchProblem,
  slice: problemSlice,
} = buildGenericReducer<any>('problems/fetchProblem', '/problem/:id');
