import { gql } from "@apollo/client";

const ProblemFragments: any = {};
ProblemFragments.fragments = {
  problem: gql`
    fragment ProblemFragment on Problem {
      id
      identifier
      rank
      whofirst
      previewImgR1 {
        x300
      }
    }
  `,
};

export { ProblemFragments };
