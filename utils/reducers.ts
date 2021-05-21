import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { request, authRequest } from "./api";
import * as Toast from "./toast";

export interface GenericState<T> {
  payload?: T;
  headers?: T;
  status: "idle" | "loading" | "succeeded" | "failed";
  // TODO: Need to implement the GenericErrorType
  error?: any;
}

export interface JsonApiResponseType {
  data: {
    id: string | number;
    type: string;
    attributes: any;
  };
}

export interface ParamsType {
  [key: string]: string | number | boolean;
}

export interface PatternType {
  [key: string]: string | number;
}

export interface HeadersType {
  [key: string]: string;
}

export interface GenericReducerOptions {
  useToken?: boolean;
  errorCentralized?: boolean;
}

export const initialGenericState: GenericState<any> = {
  payload: undefined,
  status: "idle",
};

export const initialGenericReducerOptions: GenericReducerOptions = {
  useToken: false,
  errorCentralized: true,
};

export const buildGenericAsyncThunk = (
  name: string,
  url: string,
  method = "GET",
  options: GenericReducerOptions
) =>
  createAsyncThunk(
    name,
    async ({
      params,
      data,
      pattern,
      token,
      headers,
    }: {
      params?: ParamsType;
      // TODO: any or T?
      data?: any;
      pattern?: PatternType;
      token?: string;
      headers?: HeadersType;
    } = {}) => {
      let replacedUrl = url;
      for (let key in pattern) {
        const re = RegExp(`:${key}`);
        replacedUrl = replacedUrl.replace(re, pattern[key].toString());
      }
      let response;
      let requestParmas = {
        method,
        url: replacedUrl,
        params,
        headers,
        data,
      };
      if (token || options.useToken) {
        let newToken: string = token || localStorage.getItem("token") || "";
        response = await authRequest(newToken, requestParmas);
      } else {
        response = await request(requestParmas);
      }
      return response;
    }
  );

export const buildGenericSlice = <T>(
  name: string,
  asyncThunk: any,
  initialState: GenericState<T>,
  options: GenericReducerOptions
) =>
  createSlice<GenericState<T>, any, any>({
    name,
    initialState: initialState,
    reducers: {
      reset: () => initialState,
    },
    extraReducers: (builder) => {
      builder.addCase(asyncThunk.pending, (state, action) => {
        state.status = "loading";
      });
      builder.addCase(asyncThunk.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.payload = action.payload.data;
        state.headers = action.payload.headers;
      });
      builder.addCase(asyncThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error;
        if (options.errorCentralized) {
          Toast.error(state.error.message);
        }
      });
    },
  });

export const buildGenericReducer = <T>({
  name,
  endpoint,
  method = "GET",
  initialState = initialGenericState,
  options,
}: {
  name: string;
  endpoint: string;
  method?: string;
  initialState?: GenericState<T>;
  options?: GenericReducerOptions;
}) => {
  const asyncThunk = buildGenericAsyncThunk(name, endpoint, method, {
    ...initialGenericReducerOptions,
    ...options,
  });
  const slice = buildGenericSlice<T>(name, asyncThunk, initialState, {
    ...initialGenericReducerOptions,
    ...options,
  });
  return { asyncThunk, slice };
};

export const buildGenericBooleanSlice = (name: string) => {
  const slice = createSlice({
    name,
    initialState: false,
    reducers: {
      makeTrue: (state) => (state = true),
      makeFalse: (state) => (state = false),
      toggle: (state) => (state = !state),
    },
  });
  return slice;
};
