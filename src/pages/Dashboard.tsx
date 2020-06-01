import React, { useEffect, useState, useContext } from "react";
import { Row, Col } from "antd";
import { useQuery } from "@apollo/client";
import { Card } from "antd";

import RecordList from "../components/RecordList";

import "../stylesheets/containers/Dashboard.scss";
import AuthContext from "../contexts/auth-context";
import { GET_DASHBOARD } from "../common/graphql";

const Dashboard = () => {
  const [dashboard, setDashboard] = useState({
    wrong: 0,
    right: 0,
    total: 0,
    recentList: [],
    mostWrongList: [],
  });

  const { data } = useQuery(GET_DASHBOARD, {
    variables: {
      dateRange: "all",
      userRange: "onlyme",
    },
    fetchPolicy: "cache-and-network",
  });

  // const [filter, setFilter] = useState("All");

  const { token } = useContext(AuthContext);
  console.log("token", token);

  useEffect(() => {
    if (!data) return;
    setDashboard(data.dashboard);
  }, [data]);

  // function handleMenuClick(e: any) {
  //   setFilter(e.item.node.innerText);
  //   refetch({
  //     dateRange: e.key,
  //     userRange: "onlyme",
  //   });
  // }

  if (!data) return null;
  if (!dashboard) return null;

  // const menu = (
  //   <Menu onClick={handleMenuClick}>
  //     <Menu.Item key="today">
  //       <UserOutlined /> Today
  //     </Menu.Item>
  //     <Menu.Item key="yesterday">
  //       <UserOutlined /> Yesterday
  //     </Menu.Item>
  //     <Menu.Item key="last7days">
  //       <UserOutlined /> Last 7 days
  //     </Menu.Item>
  //     <Menu.Item key="last30days">
  //       <UserOutlined /> Last 30 days
  //     </Menu.Item>
  //     <Menu.Item key="all">
  //       <UserOutlined /> All
  //     </Menu.Item>
  //   </Menu>
  // );

  const cardBodyStyle = { padding: 10 };

  return (
    <div className="dashboard-container">
      <Row>
        <Col md={20}>
          <h1>Dashboard</h1>
        </Col>
        {/* <Col md={4} style={{ textAlign: "right" }}>
          <Dropdown overlay={menu}>
            <Button>
              {filter}
              <DownOutlined />
            </Button>
          </Dropdown>
        </Col> */}
      </Row>
      <Row gutter={20} style={{ marginBottom: 10 }}>
        <Col xs={24} md={8}>
          <div className="tile-box bg-blue">
            <div>Total</div>
            <div>
              <div className="tile-content">{dashboard.total}</div>
            </div>
          </div>
        </Col>
        <Col xs={24} md={8}>
          <div className="tile-box bg-green">
            <div>Right</div>
            <div>
              <div className="tile-content">{dashboard.right}</div>
            </div>
          </div>
        </Col>
        <Col xs={24} md={8}>
          <div className="tile-box bg-red">
            <div>Wrong</div>
            <div>
              <div className="tile-content">{dashboard.wrong}</div>
            </div>
          </div>
        </Col>
      </Row>
      <Row gutter={20}>
        <Col span={24}>
          <Card
            title="Most Wrong Problem"
            extra={<a href="/mostwrongs">More</a>}
            bodyStyle={cardBodyStyle}
          >
            <Row gutter={60}>
              <RecordList recordList={dashboard.mostWrongList} />
            </Row>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Card
            title="Recent Viewed Problem"
            extra={<a href="/recents">More</a>}
            bodyStyle={cardBodyStyle}
          >
            <Row gutter={60}>
              <RecordList
                recordList={dashboard.recentList}
                showCreatedAt={true}
              />
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
