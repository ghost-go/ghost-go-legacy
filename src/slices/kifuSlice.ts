import { buildGenericReducer } from '../utils/reducers';

export const {
  asyncThunk: fetchProblems,
  slice: problemsSlice,
} = buildGenericReducer<any>('problems/fetchProblems', '/problems');
