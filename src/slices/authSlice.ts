import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import { buildGenericReducer } from "utils/reducers";

import { request } from "utils/api";

// TODO: The auth object need to be refactored after integrating the Wechat login
interface AuthState {
  token?: string;
  // TODO: UserType
  user: any;
  status: "idle" | "loading" | "succeeded" | "failed";
  // TODO: ErrorType
  error?: any;
}

const initialState: AuthState = {
  token: undefined,
  user: undefined,
  status: "idle",
  error: undefined,
};

interface EmailSignInParams {
  email?: string;
  password?: string;
}

interface GoogleSignInParams {
  meta: any;
}

export const signIn = createAsyncThunk(
  "auth/signin",
  async (data: EmailSignInParams) => {
    const response = await request({
      method: "POST",
      url: "auth/signin",
      data: data,
    });
    return response.data;
  }
);

export const {
  asyncThunk: signUp,
  slice: signUpSlice,
} = buildGenericReducer<any>({
  name: "auth/signup",
  endpoint: "/auth/signup",
  method: "POST",
});

export const googleSignIn = createAsyncThunk(
  "auth/google_signin",
  async (data: GoogleSignInParams) => {
    const response = await request({
      method: "POST",
      url: "auth/google_signin",
      data: data,
    });
    return response.data;
  }
);

export const googleSignUp = createAsyncThunk(
  "auth/google_signup",
  async (data: GoogleSignInParams) => {
    const response = await request({
      method: "POST",
      url: "auth/google_signup",
      data: data,
    });
    return response.data;
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signOut: (state) => {
      state.status = "idle";
      state.token = undefined;
      state.user = undefined;
      state.error = undefined;
    },
  },
  extraReducers: (builder) => {
    const sharedPendingReducer = (state: AuthState) => {
      state.status = "loading";
    };
    const sharedFulfilledReducer = (state: AuthState, action: any) => {
      state.status = "succeeded";
      const token = action.payload.token;
      const user = action.payload.user;
      state.token = token;
      state.user = user;
    };
    const sharedRejectedReducer = (state: AuthState, action: any) => {
      state.status = "failed";
      state.error = action.error;
    };

    builder.addCase(signIn.pending, sharedPendingReducer);
    builder.addCase(googleSignIn.pending, sharedPendingReducer);

    builder.addCase(signIn.fulfilled, sharedFulfilledReducer);
    builder.addCase(googleSignIn.fulfilled, sharedFulfilledReducer);

    builder.addCase(signIn.rejected, sharedRejectedReducer);
    builder.addCase(googleSignIn.rejected, sharedRejectedReducer);
  },
});

export const { signOut } = authSlice.actions;
