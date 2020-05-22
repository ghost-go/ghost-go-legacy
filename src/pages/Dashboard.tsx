import React, { useEffect, useState, useContext } from "react";
import { Row, Col } from "antd";
import { useQuery } from "@apollo/client";
import { Menu, Dropdown, Button, Card } from "antd";
import { DownOutlined, UserOutlined } from "@ant-design/icons";

import RecordList from "../components/RecordList";

import "../stylesheets/containers/Dashboard.scss";
import AuthContext from "../contexts/auth-context";
import { GET_DASHBOARD } from "../common/graphql";

const Dashboard = () => {
  const [dashboard, setDashboard] = useState({
    wrong: 0,
    right: 0,
    total: 0,
    favoriteList: [],
    recentList: [],
    mostWrongList: [],
  });

  const { data, refetch } = useQuery(GET_DASHBOARD, {
    variables: {
      dateRange: "all",
      userRange: "onlyme",
    },
  });

  const [filter, setFilter] = useState("All");

  const { token } = useContext(AuthContext);
  console.log("token", token);

  useEffect(() => {
    if (!data) return;
    setDashboard(data.dashboard);
  }, [data]);

  function handleMenuClick(e: any) {
    setFilter(e.item.node.innerText);
    refetch({
      dateRange: e.key,
      userRange: "onlyme",
    });
  }

  if (!data) return null;
  if (!dashboard) return null;

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="today">
        <UserOutlined /> Today
      </Menu.Item>
      <Menu.Item key="yesterday">
        <UserOutlined /> Yesterday
      </Menu.Item>
      <Menu.Item key="last7days">
        <UserOutlined /> Last 7 days
      </Menu.Item>
      <Menu.Item key="last30days">
        <UserOutlined /> Last 30 days
      </Menu.Item>
      <Menu.Item key="all">
        <UserOutlined /> All
      </Menu.Item>
    </Menu>
  );

  const cardBodyStyle = { padding: 10 };

  return (
    <div className="dashboard-container">
      <Row>
        <Col md={20}>
          <h1>Dashboard</h1>
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
      <Row gutter={20} style={{ marginBottom: 10 }}>
        <Col xs={24} md={8}>
          <div className="tile-box bg-blue">
            <div>Total</div>
            <div>
              <div className="tile-content">{dashboard.total}</div>
              {/* <small>Well done!</small> */}
            </div>
            {/* <Link className="tile-footer" to="/records?page=1&type=all">
                view details <i className="fa fa-arrow-right" />
              </Link> */}
          </div>
        </Col>
        <Col xs={24} md={8}>
          <div className="tile-box bg-green">
            <div>Right</div>
            <div>
              <div className="tile-content">{dashboard.right}</div>
              {/* <small>{`take up ${(dashboard.total === 0
                ? 0
                : (dashboard.right * 100) / dashboard.total
              ).toFixed(2)}% of all`}</small> */}
            </div>
          </div>
        </Col>
        <Col xs={24} md={8}>
          <div className="tile-box bg-red">
            <div>Wrong</div>
            <div>
              <div className="tile-content">{dashboard.wrong}</div>
              {/* <small>{`take up ${(dashboard.total === 0
                ? 0
                : (dashboard.wrong * 100) / dashboard.total
              ).toFixed(2)}% of all`}</small> */}
            </div>
          </div>
        </Col>
      </Row>
      <Row gutter={20}>
        <Col xs={24} md={12}>
          <Card
            title="Most Wrong Problem"
            extra={<a href="/records?type=wrong">More</a>}
            bodyStyle={cardBodyStyle}
          >
            <Row gutter={50}>
              <Col span={12}>
                <RecordList recordList={dashboard.mostWrongList} />
              </Col>
              <Col span={12}>
                <RecordList recordList={dashboard.mostWrongList} />
              </Col>
            </Row>
          </Card>
        </Col>
        <Col xs={24} md={6}>
          <Card
            title="Favorites"
            extra={<a href="/records?type=wrong">More</a>}
            bodyStyle={cardBodyStyle}
          >
            <RecordList recordList={dashboard.favoriteList} />
          </Card>
        </Col>
        <Col xs={24} md={6}>
          <Card
            title="Recents"
            extra={<a href="/records?type=wrong">More</a>}
            bodyStyle={cardBodyStyle}
          >
            <RecordList recordList={dashboard.recentList} />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
