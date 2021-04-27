import { combineReducers } from "@reduxjs/toolkit";
import reduceReducers from "reduce-reducers";

import { userSlice } from "./userSlice";
// import appReducer from './app';
// import { authSlice } from './authSlice';
// import * as utils from '../utils';
import { problemNextSlice, problemSlice, problemsSlice } from "./problemSlice";
import { kifuSlice, kifusSlice } from "./kifuSlice";
import { uiSlice } from "./uiSlice";
import { tagsSlice } from "./tagSlice";
import { playersSlice } from "./playerSlice";
import { authSlice, signUpSlice } from "./authSlice";
import {
  openSignInSlice,
  openSignUpSlice,
  openCommentsSlice,
  openUserMenuSlice,
} from "./genericSlice";

// export * from './authSlice';
export * from "./problemSlice";
export * from "./kifuSlice";
export * from "./uiSlice";
export * from "./tagSlice";
export * from "./playerSlice";
export * from "./genericSlice";
export * from "./authSlice";

const rootReducer = combineReducers({
  user: userSlice.reducer,
  auth: authSlice.reducer,
  signup: signUpSlice.reducer,
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
  openUserMenu: openUserMenuSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
