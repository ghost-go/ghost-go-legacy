import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";

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
      identifier
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
const PAGE_LIMIT = 30;

const Kifus = () => {
  const { data, loading, error, refetch } = useQuery(GET_KIFUS, {
    variables: {
      players: "all",
      limit: PAGE_LIMIT,
      offset: 0,
    },
  });
  const [kifus, setKifus] = useState([]);
  const [players, setPlayers] = useState([]);
  const [settings, setSettings] = useState({
    playerFilter: "all",
  });
  // TODO: page params need to extract from url params
  const [page, setPage] = useState(0);
  const [kifuTotalCount, setKifuTotalCount] = useState(0);

  useEffect(() => {
    if (!data) return;
    setKifus(data.kifus);
    setSettings(data.settings);
    setPlayers(data.players);
    setKifuTotalCount(data.kifuTotalCount);
  }, [data, settings]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;

  return (
    <div>
      <KifuFilterBar
        players={["all", ...players.map((player: any) => player.enName)]}
        refetch={refetch}
      />
      {kifus.map((i: any) => (
        <div key={i.id} className="kifu-card">
          <Link to={`/kifus/${i.identifier}`}>
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
        </div>
      ))}
      <div className="clearfix" />
      <ReactPaginate
        disableInitialCallback
        initialPage={page}
        previousLabel="previous"
        nextLabel="next"
        breakLabel={<span>...</span>}
        breakClassName="break-me"
        pageCount={kifuTotalCount / PAGE_LIMIT}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={(obj) => {
          setPage(obj.selected);
          refetch({
            offset: obj.selected * PAGE_LIMIT,
            limit: PAGE_LIMIT,
            players: settings.playerFilter,
          });
        }}
        containerClassName="pagination"
        activeClassName="active"
      />
      <div className="clearfix" />
    </div>
  );
};

export default Kifus;
