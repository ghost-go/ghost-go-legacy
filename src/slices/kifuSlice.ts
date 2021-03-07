import { RootState } from "slices";
import { buildGenericReducer } from "utils/reducers";

export const {
  asyncThunk: fetchKifus,
  slice: kifusSlice,
} = buildGenericReducer<any>("kifus/fetchKifus", "/kifus");

export const {
  asyncThunk: fetchKifu,
  slice: kifuSlice,
} = buildGenericReducer<any>("kifus/fetchKifu", "/kifus/:id");

export const selectKifus = (state: RootState) => state.kifus;
export const selectKifu = (state: RootState) => state.kifu;
