import { gql } from "@apollo/client";

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
      id
      identifier
      rank
      whofirst
      previewImgR1 {
        x300
      }
    }
  }
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
        id
        identifier
        rank
        whofirst
        updatedAt
        previewImgR1 {
          x300
        }
      }
      favoriteList {
        id
        identifier
        rank
        whofirst
        updatedAt
        previewImgR1 {
          x300
        }
      }
      recentList {
        id
        identifier
        rank
        whofirst
        updatedAt
        previewImgR1 {
          x300
        }
      }
    }
  }
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
