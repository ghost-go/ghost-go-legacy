import {
  createSlice,
  createAsyncThunk,
  Dispatch,
} from '@reduxjs/toolkit';
import { RootState } from 'slices/index';
import { request, authRequest } from './api';
import { HeadersType, ParamsType, PatternType } from '.';

export interface GenericBaseReducerOptions {
  useToken?: boolean;
  dataKey?: string;
  didRequestCallback?: (result: {
    dispatch: Dispatch<any>;
    getState: () => RootState;
    data: any;
  }) => void;
}

export interface GenericBaseState<T> {
  data?: T;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  // TODO: Need to implement the GenericErrorType
  error?: any;
}

export const initialGenericBaseState: GenericBaseState<any> = {
  data: undefined,
  status: 'idle',
};

export const buildGenericBaseAsyncThunk = (
  name: string,
  url: string,
  method = 'GET',
  options?: GenericBaseReducerOptions,
) =>
  createAsyncThunk(
    name,
    async (
      {
        params,
        data,
        pattern,
        headers,
      }: {
        params?: ParamsType;
        data?: any;
        pattern?: PatternType;
        headers?: HeadersType;
      } = {},
      { dispatch, getState }: {dispatch: any; getState: any},
    ) => {
      let replacedUrl = url;
      for (let key in pattern) {
        const re = RegExp(`:${key}`);
        replacedUrl = replacedUrl.replace(re, pattern[key]);
      }
      let response;
      if (options?.useToken ?? false) {
        const token = getState().auth.token;
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
      const responseData = response.data;
      if (options?.didRequestCallback) {
        options?.didRequestCallback({
          dispatch,
          getState,
          data: responseData,
        });
      }
      return responseData;
    },
  );

export const buildGenericBaseSlice = <T>(
  name: string,
  asyncThunk: any,
  initialState: GenericBaseState<T>,
  options?: GenericBaseReducerOptions,
) =>
  createSlice<GenericBaseState<T>, any, any>({
    name,
    initialState: initialState,
    reducers: {
      reset: () => initialState,
    },
    extraReducers: (builder) => {
      builder.addCase(asyncThunk.pending, (state, action) => {
        state.status = 'loading';
      });
      builder.addCase(asyncThunk.fulfilled, (state, action) => {
        state.status = 'succeeded';
        let data = action.payload;
        if (data && Object.keys(data).length > 0) {
          let dataKey = Object.keys(data)[0];
          if (options?.dataKey) {
            dataKey = options?.dataKey;
          }
          data = data[dataKey];
        }
        state.data = data;
      });
      builder.addCase(asyncThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error;
      });
    },
  });

interface Props<T> {
  name: string;
  url: string;
  method?: string;
  initialState?: GenericBaseState<T>;
  options?: GenericBaseReducerOptions;
}

export function buildGenericBaseReducer<T>({
  name,
  url,
  method,
  initialState,
  options,
}: Props<T>) {
  const asyncThunk = buildGenericBaseAsyncThunk(name, url, method, options);
  const slice = buildGenericBaseSlice<T>(
    name,
    asyncThunk,
    initialState ?? initialGenericBaseState,
    options,
  );
  return { asyncThunk, slice };
}
