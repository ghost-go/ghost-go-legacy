import axios from 'axios';
import _ from 'lodash';

export const baseURL = `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/v1`;
export const axiosInstance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

axiosInstance.interceptors.response.use(
  resp => {
    return resp;
  },
  err => {
    if (err.response) {
      err.statusCode = err.response.status;
      const {data} = err.response;
      if (data && data.message) {
        err.data = data;
        err.message = data.message;
      }
    }

    return Promise.reject(err);
  }
);

export function request(options = {}) {
  return axiosInstance(options);
}

export function authRequest(token: string, options: any) {
  const headers = _.assign({}, options.headers) || {};
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return axiosInstance({
    ...options,
    headers: headers,
  });
}
