import React, { useState, useEffect } from "react";
import { Row, Col } from "antd";
import { Menu, Dropdown, Button, Pagination } from "antd";
import { DownOutlined, UserOutlined } from "@ant-design/icons";
import { useLazyQuery } from "@apollo/client";
import {
  GET_MOST_WRONG_LIST,
  GET_RECENT_VIEWED_PROBLEMS,
} from "../common/graphql";
import { useLocation, useHistory } from "react-router-dom";
import Record from "../components/Record";

const Records = () => {
  let { search } = useLocation();
  const query = new URLSearchParams(search);

  const [filter, setFilter] = useState("Recents");
  const history = useHistory();

  const [
    getMostWrongList,
    { data: mostWrongListData, fetchMore: fetchMoreMostWrongList },
  ] = useLazyQuery(GET_MOST_WRONG_LIST);

  const [
    getRecentViewedProblemsList,
    {
      data: recentViewedProblemsListData,
      fetchMore: fetchMoreRecentViewedProblems,
    },
  ] = useLazyQuery(GET_RECENT_VIEWED_PROBLEMS);

  useEffect(() => {
    window.onscroll = function () {
      if (
        window.innerHeight + window.pageYOffset >=
        document.body.offsetHeight
      ) {
        console.log("bottom");
      }
    };

    if (query.get("type") === "wrong") {
      getMostWrongList();
      setFilter("Most Wrong Problem");
    } else {
      getRecentViewedProblemsList({
        variables: {
          offset: 0,
          limit: 20,
        },
      });
      setFilter("Recents");
    }
  }, []);

  function handleMenuClick(e: any) {
    setFilter(e.item.node.innerText);
    if (e.key === "wrong") {
      getMostWrongList();
    } else if (e.key === "recents") {
      getRecentViewedProblemsList();
    }
    query.set("type", e.key);
    history.push({
      pathname: "/records",
      search: query.toString(),
    });
  }

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="wrong">
        <UserOutlined />
        Most Wrong Problem
      </Menu.Item>
      <Menu.Item key="recents">
        <UserOutlined />
        Recents
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="dashboard-container">
      <Row>
        <Col md={20}>
          <h1>Records</h1>
        </Col>
        <Col md={4} style={{ textAlign: "right" }}>
          <Dropdown overlay={menu}>
            <Button>
              {filter}
              <DownOutlined />
            </Button>
          </Dropdown>
        </Col>
      </Row>
      <Row gutter={20}>
        {filter === "Recents" &&
          recentViewedProblemsListData &&
          recentViewedProblemsListData.recentViewedProblems.map((i: any) => (
            <Col md={6}>
              <Record problem={i}></Record>
            </Col>
          ))}
        {filter === "Most Wrong Problem" &&
          mostWrongListData &&
          mostWrongListData.mostWrongList.map((i: any) => (
            <Col md={6}>
              <Record problem={i}></Record>
            </Col>
          ))}
      </Row>
    </div>
  );
};

export default Records;
