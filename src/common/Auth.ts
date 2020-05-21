import {
  ApolloClient,
  InMemoryCache,
  gql,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/link-context";
import { onError } from "@apollo/link-error";
import { message as msesageBox } from 'antd';


const link = createHttpLink({
  uri: "/graphql",
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, path, extensions }) => {
      console.log(extensions)
      if (extensions?.code === "AUTHENTICATION_ERROR") {
        msesageBox.error("Your session has expired. Please login again")
        localStorage.removeItem('token')
        localStorage.removeItem('signinUser')
        setTimeout(() => {
          document.location.href="/";
        }, 2000)
      }
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    });
  }
});

const logoutLink = onError(({ networkError }) => {
  console.log(networkError)
  if (
    networkError &&
    "statusCode" in networkError &&
    networkError.statusCode === 401
  ) {
    localStorage.removeItem('token')
    localStorage.removeItem('signinUser')
  }
});

const authLink = setContext((_: any, { headers }: { headers: any }) => {
  const token = localStorage.getItem('token') ? localStorage.getItem('token') : ''
  return {
    headers: {
      ...headers,
      Authorization: `Bearer ${token}`,
    },
  };
});

export const cache = new InMemoryCache();
cache.writeQuery({
  query: gql`
    query {
      moves
      ranges
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
