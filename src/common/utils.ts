import _ from "lodash";
import jwtDecode from "jwt-decode";

import { cache } from "./ApolloClient";
import { GET_MOVES, GET_SETTINGS, GET_UI, GET_AUTH } from "./graphql";

export const updateSettings = (obj: object) => {
  const query: any = cache.readQuery({
    query: GET_SETTINGS,
  });
  const settings = _.cloneDeep(query.settings);
  console.log("settings", obj);
  for (let [key, value] of Object.entries(obj)) {
    if (settings.hasOwnProperty(key)) {
      settings[key] = value;
    } else {
      console.error(`key '${key}' not in the settings object`);
    }
  }

  cache.writeQuery({
    query: GET_SETTINGS,
    data: { settings },
  });
};

export const updateAuth = (obj: object) => {
  const query: any = cache.readQuery({
    query: GET_AUTH,
  });
  const auth = _.cloneDeep(query.auth);
  console.log("auth", obj);
  for (let [key, value] of Object.entries(obj)) {
    if (auth.hasOwnProperty(key)) {
      auth[key] = value;
    } else {
      console.error(`key '${key}' not in the auth object`);
    }
  }

  cache.writeQuery({
    query: GET_AUTH,
    data: { auth },
  });
};

export const updateUi = (obj: object) => {
  const query: any = cache.readQuery({
    query: GET_UI,
  });
  const ui = _.cloneDeep(query.ui);
  console.log("ui", obj);
  for (let [key, value] of Object.entries(obj)) {
    if (ui.hasOwnProperty(key)) {
      ui[key] = value;
    } else {
      console.error(`key '${key}' not in the ui object`);
    }
  }

  cache.writeQuery({
    query: GET_UI,
    data: { ui },
  });
};

export const addMoves = (moves: Array<string>) => {
  const query: any = cache.readQuery({ query: GET_MOVES });
  const res = query.moves.concat(moves);
  cache.writeQuery({
    query: GET_MOVES,
    data: { moves: res },
  });
  return res;
};

export const clearMoves = () => {
  cache.writeQuery({
    query: GET_MOVES,
    data: { moves: [] },
  });
};

// export const refreshToken = (token) => {};

export const updateAuthFromToken = (token: string) => {
  if (!token) return;
  const decodedData: any = jwtDecode(token);
  updateAuth({
    signinUser: {
      ...decodedData,
      token: token,
    },
  });
};

let refreshTokenInterval: NodeJS.Timeout;
export const refreshAccessToken = async () => {
  const url = "/api/refresh_token";
  const response = await fetch(url, {
    method: "GET",
    credentials: "include",
  });
  const data = await response.json();
  if (data.errors && data.errors[0].status === 401) {
    clearInterval(refreshTokenInterval);
  } else {
    updateAuthFromToken(data.token);
  }
};

export const setRefreshAccessTokenInterval = () => {
  refreshTokenInterval = setInterval(async () => {
    await refreshAccessToken();
  }, 10000);
};

export const clearRefreshAccessTokenInterval = () => {
  clearInterval(refreshTokenInterval);
};

export const logout = async () => {
  updateAuth({ signinUser: null });
  const url = "/api/logout";
  await fetch(url, { method: "POST", credentials: "include" });
  clearRefreshAccessTokenInterval();
  localStorage.setItem("logout", Date.now().toString());
};
