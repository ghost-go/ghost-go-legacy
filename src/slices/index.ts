import { combineReducers } from '@reduxjs/toolkit';
// import reduceReducers from 'reduce-reducers';

// import userReducer from './user';
// import appReducer from './app';
// import { authSlice } from './authSlice';
// import * as utils from '../utils';
import { problemSlice, problemsSlice } from './problemSlice';

// export * from './authSlice';
export * from './problemSlice';

// const { initialGenericState } = utils;

const rootReducer = combineReducers({
  // user: userReducer,
  // auth: authSlice.reducer,
  problems: problemsSlice.reducer,
  problem: problemSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
