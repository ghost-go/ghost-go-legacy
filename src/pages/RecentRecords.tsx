import React from "react";
import { Row, Col, Spin, Empty } from "antd";
import { useQuery } from "@apollo/client";
import { GET_RECENT_VIEWED_PROBLEMS } from "../common/graphql";
import Record from "../components/Record";
import InfiniteScroll from "../components/InfiniteScroll";

const RecentRecords = () => {
  const {
    data: recentViewedProblemsListData,
    fetchMore: fetchMoreRecentViewedProblems,
  } = useQuery(GET_RECENT_VIEWED_PROBLEMS, {
    variables: {
      first: 20,
      after: null,
    },
  });

  const loadMore = (page: number) => {
    if (fetchMoreRecentViewedProblems) {
      fetchMoreRecentViewedProblems({
        variables: {
          first: 20,
          after:
            recentViewedProblemsListData.recentViewedProblems.pageInfo
              .endCursor,
        },
        updateQuery: (prev: any, { fetchMoreResult }: any) => {
          const newEdges = fetchMoreResult.recentViewedProblems.edges;
          const pageInfo = fetchMoreResult.recentViewedProblems.pageInfo;

          return newEdges.length
            ? {
                recentViewedProblems: {
                  __typename: prev.recentViewedProblems.__typename,
                  edges: [...prev.recentViewedProblems.edges, ...newEdges],
                  pageInfo,
                },
              }
            : prev;
        },
      });
    }
  };

  return (
    <div className="dashboard-container">
      <Row>
        <Col md={20}>
          <h1>Recents</h1>
        </Col>
      </Row>
      <InfiniteScroll
        pageStart={1}
        loadMore={loadMore}
        hasMore={
          recentViewedProblemsListData?.recentViewedProblems.pageInfo
            .hasNextPage
        }
        loader={<Spin style={{ margin: "10px auto" }} />}
      >
        {recentViewedProblemsListData?.recentViewedProblems.edges.map(
          (i: any) => (
            <Col md={12} sm={12} lg={6}>
              <Record problem={i.node} showCreatedAt={true}></Record>
            </Col>
          )
        )}
        {recentViewedProblemsListData?.recentViewedProblems.edges.length ===
          0 && <Empty />}
      </InfiniteScroll>
    </div>
  );
};

export default RecentRecords;
