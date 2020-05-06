// 1
import {
  ApolloClient,
  InMemoryCache,
  gql,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/link-context";

const link = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_: any, { headers }: { headers: any }) => {
  const data = client.readQuery({
    query: gql`
      {
        auth @client
      }
    `,
  });
  return {
    headers: {
      ...headers,
      authorization: data.auth.signinUser
        ? `Bearer ${data.auth.signinUser.token}`
        : "",
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
        signinUser {
          email
          name
          token
        }
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
  link: authLink.concat(link),
  cache,
});
