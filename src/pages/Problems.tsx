import React from "react";
import { useQuery } from "@apollo/client";
import ProblemFilterBar from "../components/ProblemFilterBar";
import { Link } from "react-router-dom";
import { GET_PROBLEMS, GET_TAGS } from "../common/graphql";
import { Card, Row, Col, Spin } from "antd";
import InfiniteScroll from "../components/InfiniteScroll";

import "../stylesheets/containers/Problems.scss";

const Problems = () => {
  const { loading, data, fetchMore, refetch } = useQuery(GET_PROBLEMS, {
    variables: {
      first: 36,
      tags: "all",
      level: "all",
    },
  });
  const tagQuery = useQuery(GET_TAGS);

  const loadMore = (page: number) => {
    // if (loading) return;
    if (fetchMore) {
      fetchMore({
        variables: {
          first: 20,
          after: data.problems.pageInfo.endCursor,
        },
        updateQuery: (prev: any, { fetchMoreResult }: any) => {
          const newEdges = fetchMoreResult.problems.edges;
          const pageInfo = fetchMoreResult.problems.pageInfo;
          console.log(pageInfo);

          return newEdges.length
            ? {
                problems: {
                  __typename: prev.problems.__typename,
                  edges: [...prev.problems.edges, ...newEdges],
                  pageInfo,
                },
              }
            : prev;
        },
      });
    }
  };

  return (
    <React.Fragment>
      {tagQuery.data && (
        <ProblemFilterBar tags={tagQuery.data.tags} refetch={refetch} />
      )}
      {loading && (
        <div className="loading">
          <i className="fa fa-spinner fa-pulse fa-fw" />
        </div>
      )}

      <InfiniteScroll
        pageStart={1}
        loadMore={loadMore}
        hasMore={data?.problems.pageInfo.hasNextPage}
        useWindow={true}
        loader={<Spin size="default" style={{ margin: "10px auto" }} />}
      >
        {data?.problems.edges.map((i: any) => (
          <Col key={`problem-${i.node.id}`} xs={12} sm={8} md={6} lg={4} xl={4}>
            <Card
              className="problem"
              bordered={false}
              bodyStyle={{
                padding: 10,
                paddingBottom: 24,
              }}
            >
              <Link to={`/problems/${i.node.id}`}>
                <img src={i.node.previewImgR1.x300} alt="" />
              </Link>
              <span className="problem-level">Level: {i.node.rank}</span>
              <div
                className={`${
                  i.node.whofirst === "Black First" ? "black" : "white"
                } ki-shape`}
              />
            </Card>
          </Col>
        ))}
      </InfiniteScroll>
    </React.Fragment>
  );
};

export default Problems;
