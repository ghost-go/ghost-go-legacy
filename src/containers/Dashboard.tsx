import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { gql, useQuery } from "@apollo/client";

import DashboardFilterBar from "../components/DashboardFilterBar";
import RecordList from "../components/RecordList";

const GET_DASHBOARD = gql`
  query getDashboard($dateRange: String!, $userRange: String!) {
    auth @client
    dashboard(dateRange: $dateRange, userRange: $userRange) {
      total
      right
      wrong
      mostWrongList {
        id
        identifier
        whofirst
        updatedAt
        previewImgR1 {
          x300
        }
      }
      favoriteList {
        id
        identifier
        whofirst
        updatedAt
        previewImgR1 {
          x300
        }
      }
      recentList {
        id
        identifier
        whofirst
        updatedAt
        previewImgR1 {
          x300
        }
      }
    }
  }
`;

const Dashboard = () => {
  const { data } = useQuery(GET_DASHBOARD, {
    variables: {
      dateRange: "last7days",
      userRange: "onlyme",
    },
  });

  const [dashboard, setDashboard] = useState({
    wrong: 0,
    right: 0,
    total: 0,
    favoriteList: [],
    recentList: [],
    mostWrongList: [],
  });
  const [auth, setAuth] = useState({
    signinUser: null,
  });

  useEffect(() => {
    if (!data) return;
    setDashboard(data.dashboard);
    setAuth(data.auth);
  }, [data]);

  if (auth.signinUser === null) {
    console.log(auth);
    console.log(dashboard);
    return <div>no permission</div>;
  }

  if (!dashboard) return null;

  return (
    <div>
      {/* <DashboardFilterBar profile={auth.signinUser} /> */}
      <Row style={{ marginTop: "40px" }}>
        <Col xs={8} md={4}>
          <div className="tile-box tile-box-alt bg-blue">
            <div className="tile-header">Total</div>
            <div className="tile-content-wrapper">
              <i className="fa fa-puzzle-piece" />
              <div className="tile-content">{dashboard.total}</div>
              <small>Well done!</small>
            </div>
            {/* <Link className="tile-footer" to="/records?page=1&type=all">
                view details <i className="fa fa-arrow-right" />
              </Link> */}
          </div>
        </Col>
        <Col xs={8} md={4}>
          <div className="tile-box tile-box-alt bg-green">
            <div className="tile-header">Right</div>
            <div className="tile-content-wrapper">
              <i className="fa fa-check" />
              <div className="tile-content">{dashboard.right}</div>
              <small>{`take up ${(dashboard.total === 0
                ? 0
                : (dashboard.right * 100) / dashboard.total
              ).toFixed(2)}% of all`}</small>
            </div>
          </div>
        </Col>
        <Col xs={8} md={4}>
          <div className="tile-box tile-box-alt bg-red">
            <div className="tile-header">Wrong</div>
            <div className="tile-content-wrapper">
              <i className="fa fa-times" />
              <div className="tile-content">{dashboard.wrong}</div>
              <small>{`take up ${(dashboard.total === 0
                ? 0
                : (dashboard.wrong * 100) / dashboard.total
              ).toFixed(2)}% of all`}</small>
            </div>
          </div>
        </Col>
      </Row>
      <Row>
        <Col xs={8} md={4}>
          <b>Most Wrong</b> <a href="/records?type=wrong">View details</a>
          {/* <RecordList type="most_wrong" recordList={dashboard.mostWrongList} /> */}
          <RecordList />
        </Col>
        <Col xs={8} md={4}>
          <b>Favorites</b> <a href="/favorites">View details</a>
          {/* <RecordList type="favorites" recordList={dashboard.favoriteList} /> */}
          <RecordList />
        </Col>
        <Col xs={8} md={4}>
          <b>Recents</b> <a href="/records?type=all">View details</a>
          {/* <RecordList type="recents" recordList={dashboard.recentList} /> */}
          <RecordList />
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
