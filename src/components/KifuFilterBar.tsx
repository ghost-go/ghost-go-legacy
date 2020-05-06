import React, { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import { Popover, Button } from 'antd';

import { updateSettings } from "../common/utils";
import { useQuery } from "@apollo/client";
import { GET_SETTINGS } from "../common/graphql";


const KifuFilterBar = (props: any) => {
  const { players, refetch } = props;
  const { data, loading, error } = useQuery(GET_SETTINGS);
  const [settings, setSettings] = useState({
    isFilterMenuOpen: false,
    playerFilter: "all",
  });

  useEffect(() => {
    setSettings(data.settings);
  }, [data.settings]);

  const popover = () => (
    <div>
      <div className="popover-title">Players</div>
      <div className="popover-content">
        <ul className="tags">
          {players.map((tag: string) => (
            <li
              key={tag}
              className={`tag ${
                settings.playerFilter === tag ? "active" : ""
              }`}
            >
              <span
                onClick={() => {
                  refetch({ players: tag });
                  updateSettings({
                    playerFilter: tag,
                    isFilterMenuOpen: false,
                  });
                }}
              >
                {tag}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;

  return (
    <div className="page-nav">
      <Popover
        content={popover}
        trigger="click"
        visible={settings.isFilterMenuOpen}
        onVisibleChange={() => { updateSettings({ isFilterMenuOpen: !settings.isFilterMenuOpen })} }
      >
        <Button type="primary">Click me</Button>
      </Popover>
      {/* <Dropdown
        id="filterMenu"
        title="filter-menu"
        className="filter"
        open={settings.isFilterMenuOpen}
        onToggle={() => {
          updateSettings({ isFilterMenuOpen: !settings.isFilterMenuOpen });
        }}
      >
        <Dropdown.Toggle>
          <i className="fa fa-filter" />
        </Dropdown.Toggle>
        <Dropdown.Menu className="super-colors">
        </Dropdown.Menu>
      </Dropdown> */}
      <ul className="page-subnav">
        <li>
          <span>{`${"Player"}: ${settings.playerFilter}`}</span>
        </li>
      </ul>
    </div>
  );
};

export default KifuFilterBar;
