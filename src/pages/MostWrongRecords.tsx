import React, { useEffect } from "react";
import { Row, Col, Spin, Empty } from "antd";
import { useLazyQuery } from "@apollo/client";
import { GET_MOST_WRONG_LIST } from "../common/graphql";
import Record from "../components/Record";
import InfiniteScroll from "../components/InfiniteScroll";

const MostWrongRecords = () => {
  const [
    getMostWrongProblemsList,
    { data: mostWrongProblemsListData, fetchMore: fetchMoreMostWrongProblems },
  ] = useLazyQuery(GET_MOST_WRONG_LIST);

  useEffect(() => {
    getMostWrongProblemsList({
      variables: {
        first: 20,
      },
    });
  }, []);

  const loadMore = (page: number) => {
    // if (loading) return;
    if (fetchMoreMostWrongProblems) {
      fetchMoreMostWrongProblems({
        variables: {
          first: 20,
          after: mostWrongProblemsListData.mostWrongProblems.pageInfo.endCursor,
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          const newEdges = fetchMoreResult.mostWrongProblems.edges;
          const pageInfo = fetchMoreResult.mostWrongProblems.pageInfo;
          console.log(pageInfo);

          return newEdges.length
            ? {
                mostWrongProblems: {
                  __typename: prev.mostWrongProblems.__typename,
                  edges: [...prev.mostWrongProblems.edges, ...newEdges],
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
          mostWrongProblemsListData?.mostWrongProblems.pageInfo.hasNextPage
        }
        loader={
          <div>
            <Spin size="default" style={{ margin: "10px auto" }} />
          </div>
        }
      >
        {mostWrongProblemsListData?.mostWrongProblems.edges.map((i: any) => (
          <Col md={12} sm={12} lg={6}>
            <Record problem={i.node}></Record>
          </Col>
        ))}
        {mostWrongProblemsListData?.mostWrongProblems.edges.length === 0 && (
          <Empty />
        )}
      </InfiniteScroll>
    </div>
  );
};

export default MostWrongRecords;
