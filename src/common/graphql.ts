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
