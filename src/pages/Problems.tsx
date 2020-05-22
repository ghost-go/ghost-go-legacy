import React from "react";
import { useQuery } from "@apollo/client";
import ProblemFilterBar from "../components/ProblemFilterBar";
import { Link } from "react-router-dom";
import { ProblemsData, ProblemQueryVar } from "../common/types";
import { GET_PROBLEMS, GET_TAGS } from "../common/graphql";
import { Card, Row, Col } from "antd";

import "../stylesheets/containers/Problems.scss";

const Problems = () => {
  const problemQuery = useQuery<ProblemsData, ProblemQueryVar>(GET_PROBLEMS, {
    variables: {
      last: 36,
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

      <Row>
        {problemQuery.data &&
          problemQuery.data.problems.map((i: any) => (
            <Col key={`problem-${i.id}`} xs={12} sm={8} md={6} lg={4} xl={4}>
              <Card
                className="problem"
                bordered={false}
                bodyStyle={{
                  padding: 10,
                  paddingBottom: 24,
                }}
              >
                <Link to={`/problems/${i.identifier}`}>
                  <img src={i.previewImgR1.x300} alt="" />
                </Link>
                <span className="problem-level">Level: {i.rank}</span>
                <div
                  className={`${
                    i.whofirst === "Black First" ? "black" : "white"
                  } ki-shape`}
                />
              </Card>
            </Col>
          ))}
      </Row>
    </React.Fragment>
  );
};

export default Problems;
