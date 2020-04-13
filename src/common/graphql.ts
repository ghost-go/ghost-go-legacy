import { gql } from "@apollo/client";

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
