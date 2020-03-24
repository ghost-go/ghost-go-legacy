import { gql } from '@apollo/client';

export const GET_SETTINGS = gql`{
  fragment 
  settings {
    tagFilter
    levelFilter
    isFilterMenuOpen
  }
}`
