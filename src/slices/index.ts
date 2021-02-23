import { combineReducers } from "@reduxjs/toolkit";
// import reduceReducers from 'reduce-reducers';

// import userReducer from './user';
// import appReducer from './app';
// import { authSlice } from './authSlice';
// import * as utils from '../utils';
import { problemSlice, problemsSlice } from "./problemSlice";
import { kifuSlice, kifusSlice } from "./kifuSlice";

// export * from './authSlice';
export * from "./problemSlice";
export * from "./kifuSlice";

// const { initialGenericState } = utils;

const rootReducer = combineReducers({
  // user: userReducer,
  // auth: authSlice.reducer,
  problems: problemsSlice.reducer,
  problem: problemSlice.reducer,
  kifus: kifusSlice.reducer,
  kifu: kifuSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
