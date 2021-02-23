import { buildGenericReducer } from "../utils/reducers";

export const {
  asyncThunk: fetchKifus,
  slice: kifusSlice,
} = buildGenericReducer<any>("kifus/fetchKifus", "/kifus");

export const {
  asyncThunk: fetchKifu,
  slice: kifuSlice,
} = buildGenericReducer<any>("kifus/fetchKifu", "/kifus/:id");
