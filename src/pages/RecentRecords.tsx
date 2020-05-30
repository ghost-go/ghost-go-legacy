import React, { useEffect } from "react";
import { Row, Col, Spin, Space } from "antd";
import { useLazyQuery } from "@apollo/client";
import { GET_RECENT_VIEWED_PROBLEMS } from "../common/graphql";
import Record from "../components/Record";
import InfiniteScroll from "../components/InfiniteScroll";

const RecentRecords = () => {
  const [
    getRecentViewedProblemsList,
    {
      data: recentViewedProblemsListData,
      fetchMore: fetchMoreRecentViewedProblems,
    },
  ] = useLazyQuery(GET_RECENT_VIEWED_PROBLEMS);

  useEffect(() => {
    getRecentViewedProblemsList({
      variables: {
        first: 20,
      },
    });
  }, []);

  const loadMore = (page: number) => {
    // if (loading) return;
    if (fetchMoreRecentViewedProblems) {
      console.log("fetch more, page", page);
      fetchMoreRecentViewedProblems({
        variables: {
          first: 20,
          after:
            recentViewedProblemsListData.recentViewedProblems.pageInfo
              .endCursor,
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          const newEdges = fetchMoreResult.recentViewedProblems.edges;
          const pageInfo = fetchMoreResult.recentViewedProblems.pageInfo;
          console.log(pageInfo);

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
      <Row gutter={20}>
        <InfiniteScroll
          pageStart={1}
          loadMore={loadMore}
          hasMore={
            recentViewedProblemsListData?.recentViewedProblems.pageInfo
              .hasNextPage
          }
          loader={<Spin size="default" />}
        >
          {recentViewedProblemsListData?.recentViewedProblems.edges.map(
            (i: any) => (
              <Col md={12} sm={12} lg={6}>
                <Record problem={i.node} showCreatedAt={true}></Record>
              </Col>
            )
          )}
        </InfiniteScroll>
      </Row>
    </div>
  );
};

export default RecentRecords;
