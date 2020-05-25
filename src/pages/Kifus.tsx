import React, { useState, useEffect } from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import { Card, Row, Col, Pagination } from "antd";

import KifuFilterBar from "../components/KifuFilterBar";
import { useQuery, gql } from "@apollo/client";

export const GET_KIFUS = gql`
  query getKifus($players: String!, $limit: Int!, $offset: Int!) {
    settings @client
    players {
      id
      enName
    }
    kifuTotalCount(players: $players)
    kifus(players: $players, limit: $limit, offset: $offset) {
      id
      title
      playerBId
      playerWId
      playerB {
        id
        enName
        name
      }
      playerW {
        id
        enName
        name
      }
      bName
      bRank
      wName
      wRank
      result
      place
      komi
      content
      steps
      previewImg {
        x300
      }
      createdAt
      shortDate
    }
  }
`;

// TODO: Loading style
const PAGE_LIMIT = 20;

const Kifus = () => {
  let { search } = useLocation();
  const history = useHistory();
  const query = new URLSearchParams(search);
  const page = parseInt(query.get("page") || "1");
  const pageSize = parseInt(query.get("pageSize") || PAGE_LIMIT.toString());
  const [kifus, setKifus] = useState([]);
  const [players, setPlayers] = useState([]);
  const [settings, setSettings] = useState({
    playerFilter: "all",
  });
  const { data, loading, error, refetch } = useQuery(GET_KIFUS, {
    variables: {
      players: "all",
      page: page,
      limit: pageSize,
      offset: (page - 1) * PAGE_LIMIT,
    },
  });
  // TODO: page params need to extract from url params
  const [kifuTotalCount, setKifuTotalCount] = useState(0);

  useEffect(() => {
    if (!data) return;
    setKifus(data.kifus);
    setSettings(data.settings);
    setPlayers(data.players);
    setKifuTotalCount(data.kifuTotalCount);
  }, [data, settings]);

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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;

  return (
    <div className="kifu-container">
      <KifuFilterBar
        players={["all", ...players.map((player: any) => player.enName)]}
        refetch={refetch}
      />
      <Row>
        {kifus.map((i: any) => (
          <Col key={`kifu-${i.id}`} xs={12} sm={8} md={8} lg={6} xl={6}>
            <Card
              className="problem"
              bordered={false}
              bodyStyle={{
                padding: 10,
                paddingBottom: 24,
              }}
            >
              <Link to={`/kifus/${i.id}`}>
                <img src={i.previewImg.x300} alt="" />
              </Link>
              <div className="kifu-info">
                <span>
                  {i.playerB && i.playerB.enName} <b>VS</b>{" "}
                  {i.playerW && i.playerW.enName}
                </span>
                <br />
                <span>{`Result: ${i.result}`}</span>
                <br />
                <span>{`Date: ${i.shortDate}`}</span>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
      <Row style={{ paddingLeft: 10 }}>
        <Pagination
          current={page}
          pageSize={pageSize}
          defaultPageSize={PAGE_LIMIT}
          total={kifuTotalCount}
          onChange={handlePageChange}
          onShowSizeChange={handlePageSizeChange}
        />
      </Row>
    </div>
  );
};

export default Kifus;
