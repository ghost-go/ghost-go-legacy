import {
  createSlice,
  createAsyncThunk,
  SliceCaseReducers,
} from '@reduxjs/toolkit';
import {request, authRequest} from './api';
import * as Toast from './toast';

export interface GenericErrorType {
  message: string;
}

export interface GenericState<T> {
  payload?: T;
  headers?: T;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error?: GenericErrorType;
}

export interface JsonApiResponseType<T> {
  data: {
    id: string | number;
    type: string;
    attributes: T;
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
  status: 'idle',
};

export const initialGenericReducerOptions: GenericReducerOptions = {
  useToken: false,
  errorCentralized: true,
};

export const buildGenericRequest = <T>(
  url: string,
  method = 'GET',
  options: GenericReducerOptions
) => {
  return async ({
    params,
    data,
    pattern,
    token,
    headers,
  }: {
    params?: ParamsType;
    // TODO: any or T?
    data?: T;
    pattern?: PatternType;
    token?: string;
    headers?: HeadersType;
  } = {}) => {
    let replacedUrl = url;
    for (const key in pattern) {
      const re = RegExp(`:${key}`);
      replacedUrl = replacedUrl.replace(re, pattern[key].toString());
    }
    let response;
    const requestParmas = {
      method,
      url: replacedUrl,
      params,
      headers,
      data,
    };
    if (token || options.useToken) {
      const newToken: string = token || localStorage.getItem('token') || '';
      response = await authRequest(newToken, requestParmas);
    } else {
      response = await request(requestParmas);
    }
    return response;
  };
};

export const buildGenericAsyncThunk = <T>(
  name: string,
  url: string,
  method = 'GET',
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
      data?: T;
      pattern?: PatternType;
      token?: string;
      headers?: HeadersType;
    } = {}) => {
      let replacedUrl = url;
      for (const key in pattern) {
        const re = RegExp(`:${key}`);
        replacedUrl = replacedUrl.replace(re, pattern[key].toString());
      }
      let response;
      const requestParmas = {
        method,
        url: replacedUrl,
        params,
        headers,
        data,
      };
      if (token || options.useToken) {
        const newToken: string = token || localStorage.getItem('token') || '';
        response = await authRequest(newToken, requestParmas);
      } else {
        response = await request(requestParmas);
      }
      console.log('res', response);
      return {
        data: response.data,
        headers: response.headers,
        status: response.status,
        statusText: response.statusText,
      };
    }
  );

export const buildGenericSlice = <T>(
  name: string,
  asyncThunk: any,
  initialState: GenericState<T>,
  options: GenericReducerOptions
) =>
  createSlice<GenericState<T>, SliceCaseReducers<GenericState<T>>, string>({
    name,
    initialState: initialState,
    reducers: {
      reset: () => initialState,
    },
    extraReducers: builder => {
      builder.addCase(asyncThunk.pending, state => {
        state.status = 'loading';
      });
      builder.addCase(asyncThunk.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.payload = action.payload.data;
        state.headers = action.payload.headers;
      });
      builder.addCase(asyncThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error;
        if (options.errorCentralized) {
          Toast.error(action.error.message);
        }
      });
    },
  });

export const buildGenericReducer = <T>({
  name,
  endpoint,
  method = 'GET',
  initialState = initialGenericState,
  options,
}: {
  name: string;
  endpoint: string;
  method?: string;
  initialState?: GenericState<T>;
  options?: GenericReducerOptions;
}) => {
  const asyncThunk = buildGenericAsyncThunk<T>(name, endpoint, method, {
    ...initialGenericReducerOptions,
    ...options,
  });
  const slice = buildGenericSlice<T>(name, asyncThunk, initialState, {
    ...initialGenericReducerOptions,
    ...options,
  });

  const request = buildGenericRequest<T>(endpoint, method, {
    ...initialGenericReducerOptions,
    ...options,
  });
  return {asyncThunk, slice, request};
};

export const buildGenericBooleanSlice = (name: string) => {
  const slice = createSlice({
    name,
    initialState: false,
    reducers: {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      makeTrue: state => (state = true),
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      makeFalse: state => (state = false),
      toggle: state => (state = !state),
    },
  });
  return slice;
};
