import { gql } from '@apollo/client';

const GlobalFragments: any = {};

GlobalFragments.fragments = {
  settings: gql`
    fragment Settings on Query @client {
      settings {
        tagFilter
        levelFilter
        isFilterMenuOpen
      }
    }
  `
}


export default GlobalFragments;