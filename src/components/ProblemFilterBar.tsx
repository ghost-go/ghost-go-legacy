import React from "react";
import { gql, useQuery } from "@apollo/client";
import { Popover, Button, Row, Col } from "antd";
import { FilterOutlined, CaretDownOutlined } from "@ant-design/icons";

import { ProblemQueryVar, TagData } from "../common/types";
import { updateSettings } from "../common/utils";

import TagMenu from "./TagMenu";

import "../stylesheets/components/tags.scss";

const ProblemFilterBar = ({
  tags,
  refetch,
}: {
  tags: Array<TagData>;
  refetch: (variables: any) => {};
}) => {
  const GET_FILTER_DATA = gql`
    {
      ranges @client
      settings {
        tagFilter
        levelFilter
        isFilterMenuOpen
      }
    }
  `;
  const query = useQuery(GET_FILTER_DATA);
  const { ranges, settings } = query.data;
  const { tagFilter, levelFilter } = settings;
  let tagAll: TagData = { id: "0", name: "all" };
  const tagsWithAll = [tagAll].concat(tags);

  const queryParams = {
    tags: tagFilter,
    level: levelFilter,
    first: 100,
  };

  const handleSeeMore = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    refetch({ ...queryParams });
  };

  const popover = (
    <TagMenu
      tagGroup={[
        {
          title: "Level",
          tags: ranges,
          active: settings.levelFilter,
          callback: (tag: string) => {
            refetch({ ...queryParams, level: tag });
            updateSettings({
              levelFilter: tag,
              isFilterMenuOpen: false,
            });
          },
        },
        {
          title: "Tag",
          tags: tagsWithAll.map((tag) => tag.name),
          active: settings.tagFilter,
          callback: (tag: string) => {
            updateSettings({
              tagFilter: tag,
              isFilterMenuOpen: false,
            });
            refetch({
              ...queryParams,
              tags: tag,
            });
          },
        },
      ]}
    />
  );

  return (
    <div className="filter-bar">
      <Row justify="start" align="middle" gutter={10}>
        <Col xs={4} sm={4} md={3} lg={2} xl={2}>
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
        <Col xs={4} sm={4} md={4} lg={3} xl={3}>
          <span title={`Level: ${levelFilter}`}>{`Level: ${levelFilter}`}</span>
        </Col>
        <Col xs={4} sm={4} md={4} lg={3} xl={3}>
          <span title={`Tags: ${tagFilter}`}>{`Tags: ${tagFilter}`}</span>
        </Col>
        <Col xs={4} sm={4} md={4} lg={3} xl={3}>
          {/* <Button type="primary" onClick={handleSeeMore}>
            See More
          </Button> */}
        </Col>
      </Row>
    </div>
  );
};

export default ProblemFilterBar;
