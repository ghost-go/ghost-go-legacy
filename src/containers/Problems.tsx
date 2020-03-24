import React from "react";
import "./Problems.scss";
import { useQuery, gql } from "@apollo/client";
import ProblemFilterBar from "../components/ProblemFilterBar";
import { Link } from "react-router-dom";
import { ProblemsData, ProblemQueryVar } from "../common/types";

const FEED_QUERY = gql`
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

const TAG_QUERY = gql`
  {
    tags(last: 100) {
      id
      name
    }
  }
`;

const Problems = () => {
  const problemQuery = useQuery<ProblemsData, ProblemQueryVar>(FEED_QUERY, {
    variables: {
      last: 10,
      tags: "all",
      level: "all"
    }
  });
  const tagQuery = useQuery(TAG_QUERY);
  return (
    <React.Fragment>
      {tagQuery.data && (
        <ProblemFilterBar
          tags={tagQuery.data.tags}
          refetch={problemQuery.refetch}
        />
      )}
      {problemQuery.loading && (
        <div className="loading">
          <i className="fa fa-spinner fa-pulse fa-fw" />
        </div>
      )}

      {problemQuery.data &&
        problemQuery.data.problems.map((i: any) => (
          <div key={i.id} className="puzzle-card">
            <Link to={`/problems/${i.identifier}`}>
              <img src={i.previewImgR1.x300} alt="" />
            </Link>
            <div className="puzzle-info">
              <span>Level: {i.rank}</span>
              <div
                className={`${
                  i.whofirst === "Black First" ? "black" : "white"
                }-ki-shape`}
              />
            </div>
          </div>
        ))}
    </React.Fragment>
  );
};

export default Problems;
