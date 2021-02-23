import { gql } from "@apollo/client";

const ProblemFragments: any = {};
ProblemFragments.fragments = {
  problem: gql`
    fragment ProblemFragment on Problem {
      id
      rank
      whofirst
      previewImgR1 {
        x300
      }
      imageUrl
      createdAt
    }
  `,
};

export { ProblemFragments };
