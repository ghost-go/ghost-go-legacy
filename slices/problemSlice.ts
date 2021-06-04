import {RootState} from 'slices';
import {buildGenericReducer} from 'utils/reducers';

export const {asyncThunk: fetchProblems, slice: problemsSlice} =
  buildGenericReducer<any>({
    name: 'problems/fetchProblems',
    endpoint: '/problems',
  });

export const {
  asyncThunk: fetchProblem,
  slice: problemSlice,
  request: problemRequest,
} = buildGenericReducer<any>({
  name: 'problems/fetchProblem',
  endpoint: '/problems/:id',
});

export const {
  asyncThunk: fetchProblemIds,
  slice: problemIdsSlice,
  request: problemIdsRequest,
} = buildGenericReducer<any>({
  name: 'problems/fetchProblemIds',
  endpoint: '/problems/ids',
});

export const {asyncThunk: fetchProblemNext, slice: problemNextSlice} =
  buildGenericReducer<unknown>({
    name: 'problems/fetchProblemNext',
    endpoint: '/problems/next',
  });

export const {asyncThunk: createRecord, slice: recordSlice} =
  buildGenericReducer<unknown>({
    name: 'records/createRecord',
    endpoint: '/records',
    method: 'POST',
    options: {useToken: true},
  });

export const selectProblems = (state: RootState) => state.problems;
export const selectProblem = (state: RootState) => state.problem;
