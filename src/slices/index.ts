import { combineReducers } from "@reduxjs/toolkit";
import reduceReducers from "reduce-reducers";

// import userReducer from './user';
// import appReducer from './app';
// import { authSlice } from './authSlice';
// import * as utils from '../utils';
import { problemNextSlice, problemSlice, problemsSlice } from "./problemSlice";
import { kifuSlice, kifusSlice } from "./kifuSlice";
import { uiSlice } from "./uiSlice";
import { tagsSlice } from "./tagSlice";
import { playersSlice } from "./playerSlice";
import {
  openSignInSlice,
  openSignUpSlice,
  openCommentsSlice,
} from "./genericSlice";

// export * from './authSlice';
export * from "./problemSlice";
export * from "./kifuSlice";
export * from "./uiSlice";
export * from "./tagSlice";
export * from "./playerSlice";
export * from "./genericSlice";

const rootReducer = combineReducers({
  // user: userReducer,
  // auth: authSlice.reducer,
  problems: problemsSlice.reducer,
  problem: reduceReducers<any>(
    {},
    problemSlice.reducer,
    problemNextSlice.reducer
  ),
  kifus: kifusSlice.reducer,
  kifu: kifuSlice.reducer,
  players: playersSlice.reducer,
  tags: tagsSlice.reducer,
  ui: uiSlice.reducer,
  openSignIn: openSignInSlice.reducer,
  openSignUp: openSignUpSlice.reducer,
  openComments: openCommentsSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
