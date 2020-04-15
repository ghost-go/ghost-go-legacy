// 1
import {
  ApolloClient,
  InMemoryCache,
  gql,
  createHttpLink,
} from "@apollo/client";

const link = createHttpLink({
  uri: "/graphql",
});

export const cache = new InMemoryCache();

cache.writeQuery({
  query: gql`
    query {
      moves
      ranges
      themes
      settings {
        tagFilter
        levelFilter
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
    settings: {
      __typename: "Settings",
      tagFilter: "all",
      levelFilter: "all",
      levelRange: "18k-6d",
      isFilterMenuOpen: false,
      currentMode: "normal",
      currentAnswerId: 0,
      theme: localStorage.getItem("theme") || "shell-stone",
    },
  },
});

export const client = new ApolloClient({ link, cache });
