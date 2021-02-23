import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { request, authRequest } from "./api";

export interface GenericState<T> {
  payload?: T;
  headers?: T;
  status: "idle" | "loading" | "succeeded" | "failed";
  // TODO: Need to implement the GenericErrorType
  error?: any;
}

export interface ParamsType {
  [key: string]: string | number | boolean;
}

export interface PatternType {
  [key: string]: string;
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
        replacedUrl = replacedUrl.replace(re, pattern[key]);
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
  initialState: GenericState<T>
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
        console.log("action", action);
      });
      builder.addCase(asyncThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error;
      });
    },
  });

export const buildGenericReducer = <T>(
  name: string,
  url: string,
  method = "GET",
  initialState: GenericState<T> = initialGenericState
) => {
  const asyncThunk = buildGenericAsyncThunk(name, url, method);
  const slice = buildGenericSlice<T>(name, asyncThunk, initialState);
  return { asyncThunk, slice };
};
