import { combineReducers } from "@reduxjs/toolkit";
// import reduceReducers from 'reduce-reducers';

// import userReducer from './user';
// import appReducer from './app';
// import { authSlice } from './authSlice';
// import * as utils from '../utils';
import { problemSlice, problemsSlice } from "./problemSlice";
import { kifuSlice, kifusSlice } from "./kifuSlice";
import { uiSlice } from "./uiSlice";
import { tagsSlice } from "./tagSlice";
import { playersSlice } from "./playerSlice";

// export * from './authSlice';
export * from "./problemSlice";
export * from "./kifuSlice";
export * from "./uiSlice";
export * from "./tagSlice";
export * from "./playerSlice";

const rootReducer = combineReducers({
  // user: userReducer,
  // auth: authSlice.reducer,
  problems: problemsSlice.reducer,
  problem: problemSlice.reducer,
  kifus: kifusSlice.reducer,
  kifu: kifuSlice.reducer,
  players: playersSlice.reducer,
  tags: tagsSlice.reducer,
  ui: uiSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
