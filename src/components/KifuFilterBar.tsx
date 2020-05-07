import React, { useEffect, useState } from "react";
import { Popover, Button, Row, Col } from "antd";
import { FilterOutlined, CaretDownOutlined } from "@ant-design/icons";

import { updateSettings } from "../common/utils";
import { useQuery } from "@apollo/client";
import { GET_SETTINGS } from "../common/graphql";
import TagMenu from "./TagMenu";

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

  const popover = (
    <TagMenu
      tagGroup={[
        {
          title: "Players",
          tags: players,
          active: settings.playerFilter,
          callback: (tag) => {
            refetch({ players: tag });
            updateSettings({
              playerFilter: tag,
              isFilterMenuOpen: false,
            });
          },
        },
      ]}
    ></TagMenu>
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;

  return (
    <div className="filter-bar">
      <Row justify="start" align="middle" gutter={10}>
        <Col span={3}>
          <Popover
            placement="bottomRight"
            content={popover}
            trigger="click"
            visible={settings.isFilterMenuOpen}
            onVisibleChange={() => {
              updateSettings({ isFilterMenuOpen: !settings.isFilterMenuOpen });
            }}
          >
            <Button type="primary">
              <FilterOutlined />
              <CaretDownOutlined style={{ marginLeft: 2 }} />
            </Button>
          </Popover>
        </Col>
        <Col>
          <span>{`${"Player"}: ${settings.playerFilter}`}</span>
        </Col>
      </Row>
    </div>
  );
};

export default KifuFilterBar;
