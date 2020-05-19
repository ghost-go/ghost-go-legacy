import {
  ApolloClient,
  InMemoryCache,
  gql,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/link-context";
import { onError } from "@apollo/link-error";
import { updateAuth } from "./utils";
import jwtDecode from "jwt-decode";

const link = createHttpLink({
  uri: "/graphql",
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
});

const logoutLink = onError(({ networkError }) => {
  if (
    networkError &&
    "statusCode" in networkError &&
    networkError.statusCode === 401
  ) {
    logout();
  }
});
let inMemoryToken: { token: string } | null = null;
const authLink = setContext((_: any, { headers }: { headers: any }) => {
  return {
    headers: {
      ...headers,
      Authorization: inMemoryToken ? `Bearer ${inMemoryToken.token}` : "",
    },
  };
});

export const cache = new InMemoryCache();
cache.writeQuery({
  query: gql`
    query {
      moves
      ranges
      themes
      auth {
        signinUser
      }
      ui {
        collapsed
        signInModalVisible
        signUpModalVisible
      }
      settings {
        tagFilter
        levelFilter
        playerFilter
        levelRange
        isFilterMenuOpen
        theme
        currentMode
        currentAnswerId
      }
    }
  `,
  data: {
    moves: [],
    ranges: ["all", "18k-10k", "9k-5k", "4k-1k", "1d-3d"],
    themes: [
      "black-and-white",
      "subdued-theme",
      "photorealistic-theme",
      "shell-stone",
      "walnut-theme",
      "flat-theme",
    ],
    auth: {
      signinUser: null,
    },
    ui: {
      collapsed: false,
      signInModalVisible: false,
      signUpModalVisible: false,
    },
    settings: {
      __typename: "Settings",
      tagFilter: "all",
      playerFilter: "all",
      levelFilter: "all",
      levelRange: "18k-6d",
      isFilterMenuOpen: false,
      currentMode: "normal",
      currentAnswerId: 0,
      theme: localStorage.getItem("theme") || "shell-stone",
    },
  },
});

export const client = new ApolloClient({
  link: authLink.concat(errorLink).concat(logoutLink).concat(link),
  cache,
});

// export const refreshToken = (token) => {};
const updateAuthFromToken = (token: string) => {
  if (!token) return;
  const decodedData: any = jwtDecode(token);
  // TODO: Workaround for not updating component if call function synchonizely
  // setTimeout(() => {
  updateAuth({
    signinUser: {
      ...decodedData,
      token: token,
    },
  });
  // }, 0);
};

let refreshTokenInterval: number;
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
    console.log("update token data");
    login(data.token);
    setTimeout(() => {
      updateAuthFromToken(data.token);
    }, 10000);
  }
};

export const setRefreshAccessTokenInterval = () => {
  refreshTokenInterval = setInterval(() => {
    refreshAccessToken();
  }, 100000);
};

export const clearRefreshAccessTokenInterval = () => {
  clearInterval(refreshTokenInterval);
};

export const login = (jwt_token: string) => {
  inMemoryToken = { token: jwt_token };
};

export const logout = async () => {
  updateAuth({ signinUser: null });
  const url = "/api/logout";
  await fetch(url, { method: "POST", credentials: "include" });
  clearRefreshAccessTokenInterval();
  localStorage.setItem("logout", Date.now().toString());
};

const syncLogout = (event: any) => {
  if (event.key === "logout") {
    inMemoryToken = null;
    updateAuth({ signinUser: null });
  }
};

window.addEventListener("storage", syncLogout);
