import { gql } from "@apollo/client";
import { ProblemFragments } from "./fragments";

export const GET_SETTINGS = gql`
  {
    settings @client
  }
`;

export const GET_MOVES = gql`
  {
    moves @client
  }
`;

export const GET_PROBLEMS = gql`
  query getProblems(
    $tags: String!
    $level: String!
    $first: Int!
    $after: String
  ) {
    problems(tags: $tags, level: $level, first: $first, after: $after) {
      pageInfo {
        endCursor
        startCursor
        hasPreviousPage
        hasNextPage
      }
      edges {
        node {
          ...ProblemFragment
        }
      }
    }
  }
  ${ProblemFragments.fragments.problem}
`;

export const GET_TAGS = gql`
  {
    tags(last: 100) {
      id
      name
    }
  }
`;

export const GET_DASHBOARD = gql`
  query getDashboard($dateRange: String!, $userRange: String!) {
    auth @client
    dashboard(dateRange: $dateRange, userRange: $userRange) {
      total
      right
      wrong
      mostWrongList {
        ...ProblemFragment
      }
      recentList {
        ...ProblemFragment
      }
    }
  }
  ${ProblemFragments.fragments.problem}
`;

export const SIGN_IN = gql`
  mutation signin($email: String!, $password: String!) {
    signinUser(credentials: { email: $email, password: $password }) {
      token
      user {
        id
        name
        email
      }
    }
  }
`;

export const GET_MOST_WRONG_LIST = gql`
  query getMostWrongProblems($first: Int!, $after: String) {
    mostWrongProblems(first: $first, after: $after)
      @connection(key: "recentViewedProblems") {
      pageInfo {
        endCursor
        startCursor
        hasPreviousPage
        hasNextPage
      }
      edges {
        node {
          ...ProblemFragment
        }
      }
    }
  }
  ${ProblemFragments.fragments.problem}
`;

export const GET_RECENT_VIEWED_PROBLEMS = gql`
  query getRecentViewedProblems($first: Int!, $after: String) {
    recentViewedProblems(first: $first, after: $after)
      @connection(key: "recentViewedProblems") {
      pageInfo {
        endCursor
        startCursor
        hasPreviousPage
        hasNextPage
      }
      edges {
        node {
          ...ProblemFragment
        }
      }
    }
  }
  ${ProblemFragments.fragments.problem}
`;
