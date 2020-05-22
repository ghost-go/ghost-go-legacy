import React, { useState, useEffect } from "react";
import { Row, Col } from "antd";
import { Menu, Dropdown, Button, Pagination } from "antd";
import { DownOutlined, UserOutlined } from "@ant-design/icons";
import { useLazyQuery } from "@apollo/client";
import { GET_MOST_WRONG_LIST, GET_RECENT_LIST } from "../common/graphql";
import { useLocation, useHistory } from "react-router-dom";
import Record from "../components/Record";

const PAGE_LIMIT = 30;

const Records = () => {
  let { search } = useLocation();
  const query = new URLSearchParams(search);

  const [filter, setFilter] = useState("Recents");
  const page = parseInt(query.get("page") || "1");
  const pageSize = parseInt(query.get("pageSize") || PAGE_LIMIT.toString());
  const history = useHistory();

  const [getMostWrongList, { data: mostWrongListData }] = useLazyQuery(
    GET_MOST_WRONG_LIST
  );

  const [getRecentList, { data: recentListData }] = useLazyQuery(
    GET_RECENT_LIST
  );

  useEffect(() => {
    if (query.get("type") === "wrong") {
      getMostWrongList();
      setFilter("Most Wrong Problem");
    } else {
      getRecentList();
      setFilter("Recents");
    }
  }, []);

  function handleMenuClick(e: any) {
    setFilter(e.item.node.innerText);
    if (e.key === "wrong") {
      getMostWrongList();
    } else if (e.key === "recents") {
      getRecentList();
    }
    query.set("type", e.key);
    history.push({
      pathname: "/records",
      search: query.toString(),
    });
  }

  const handlePageChange = (page: number, pageSize?: number) => {
    query.set("page", page.toString());
    query.set("pageSize", (pageSize || PAGE_LIMIT).toString());
    history.push({
      pathname: "/kifus",
      search: query.toString(),
    });
  };

  const handlePageSizeChange = (current: number, pageSize: number) => {
    query.set("page", page.toString());
    query.set("pageSize", (pageSize || PAGE_LIMIT).toString());
    history.push({
      pathname: "/kifus",
      search: query.toString(),
    });
  };

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
          recentListData &&
          recentListData.recentList.map((i: any) => (
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
      <Row style={{ paddingLeft: 10 }}>
        <Pagination
          current={page}
          pageSize={pageSize}
          defaultPageSize={PAGE_LIMIT}
          total={100}
          onChange={handlePageChange}
          onShowSizeChange={handlePageSizeChange}
        />
      </Row>
    </div>
  );
};

export default Records;
