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

export const initialGenericState: GenericState<any> = {
  payload: undefined,
  status: "idle",
};

export const buildGenericAsyncThunk = (
  name: string,
  url: string,
  method = "GET"
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
      if (token) {
        response = await authRequest(token, {
          method,
          url: replacedUrl,
          params,
          headers,
          data,
        });
      } else {
        response = await request({
          method,
          url: replacedUrl,
          params,
          headers,
          data,
        });
      }
      return response;
    }
  );

export const buildGenericSlice = <T>(
  name: string,
  asyncThunk: any,
  initialState: GenericState<T>,
  onFailure?: (error: any) => void
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
        if (onFailure) {
          onFailure(action.error);
        }
      });
    },
  });

// : {

// }) => {
export const buildGenericReducer = <T>({
  name,
  endpoint,
  method = "GET",
  initialState = initialGenericState,
  errorCentralized = false,
  onFailure,
}: {
  name: string;
  endpoint: string;
  method?: string;
  initialState?: GenericState<T>;
  errorCentralized?: boolean;
  onFailure?: (error: any) => void;
}) => {
  const asyncThunk = buildGenericAsyncThunk(name, endpoint, method);
  const slice = buildGenericSlice<T>(
    name,
    asyncThunk,
    initialState,
    errorCentralized
      ? (error) => {
          Toast.error(error.message);
        }
      : onFailure
  );
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
