import React from "react";
import "./Problems.scss";
import { useQuery, gql } from "@apollo/client";
import ProblemFilterBar from "../components/ProblemFilterBar";
import { Link } from "react-router-dom";
import { ProblemsData, ProblemQueryVar } from "../common/types";
import { GET_PROBLEMS, GET_TAGS } from "../common/graphql";

const Problems = () => {
  const problemQuery = useQuery<ProblemsData, ProblemQueryVar>(GET_PROBLEMS, {
    variables: {
      last: 10,
      tags: "all",
      level: "all",
    },
  });
  const tagQuery = useQuery(GET_TAGS);
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
