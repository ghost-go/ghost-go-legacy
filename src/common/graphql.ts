import { gql } from "@apollo/client";
import { ProblemFragments } from "./fragments";

export const GET_SETTINGS = gql`
  {
    settings @client
  }
`;

export const GET_UI = gql`
  {
    ui @client
  }
`;

export const GET_AUTH = gql`
  {
    auth @client
  }
`;

export const GET_MOVES = gql`
  {
    moves @client
  }
`;

export const GET_PROBLEMS = gql`
  query getProblems($last: Int!, $tags: String!, $level: String!) {
    problems(last: $last, tags: $tags, level: $level) {
      ...ProblemFragment
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
      favoriteList {
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
  mutation CreateProblemRecord($email: String!, $password: String!) {
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
  query {
    mostWrongList {
      ...ProblemFragment
    }
  }
  ${ProblemFragments.fragments.problem}
`;

export const GET_RECENT_LIST = gql`
  query {
    recentList {
      ...ProblemFragment
    }
  }
  ${ProblemFragments.fragments.problem}
`;
