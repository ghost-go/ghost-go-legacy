import React from "react";
import { gql, useQuery } from "@apollo/client";

import { ProblemQueryVar, TagData } from "../common/types";
import GlobalFragments from "../common/fragments";
import { updateSettings } from "../common/utils";

const ProblemFilterBar = ({
  tags,
  refetch,
}: {
  tags: Array<TagData>;
  refetch: (variables?: ProblemQueryVar) => {};
}) => {
  const GET_FILTER_DATA = gql`
    {
      ranges @client
      ...Settings
    }
    ${GlobalFragments.fragments.settings}
  `;
  const query = useQuery(GET_FILTER_DATA);
  const { ranges, settings } = query.data;
  const { tagFilter, levelFilter, isFilterMenuOpen } = settings;
  let tagAll: TagData = { id: "0", name: "all" };
  const tagsWithAll = [tagAll].concat(tags);

  const queryParams = {
    tags: tagFilter,
    level: levelFilter,
    last: 100,
  };

  const isFilterMenuOpenFalseObj = {
    name: "isFilterMenuOpen",
    value: false,
  };

  const handleLevelChange = (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>
  ) => {
    updateSettings({
      levelFilter: e.currentTarget.innerText,
      isFilterMenuOpenFalseObj,
    });
    refetch({
      ...queryParams,
      level: e.currentTarget.innerText,
    });
  };

  const handleTagChange = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    updateSettings({
      tagFilter: e.currentTarget.innerText,
      isFilterMenuOpenFalseObj,
    });
    refetch({
      ...queryParams,
      tags: e.currentTarget.innerText,
    });
  };

  const handleSeeMore = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    refetch({ ...queryParams });
  };

  return (
    <div className="page-nav">
      <div
        id="filterMenu"
        title="filter-menu"
        className={`filter dropdown btn-group ${
          isFilterMenuOpen ? "open" : ""
        }`}
      >
        <button
          id="filterMenu"
          aria-haspopup="true"
          aria-expanded="false"
          type="button"
          className="dropdown-toggle btn btn-default"
          onClick={() => {
            updateSettings({ isFilterMenuOpen: !isFilterMenuOpen });
          }}
        >
          <i className="fa fa-filter"></i>
          <span className="caret"></span>
        </button>
        <ul role="menu" className="super-colors dropdown-menu">
          <div key="level">
            <div className="popover-title">Level</div>
            <div className="popover-content">
              <ul className="tags">
                {ranges.map((level: any) => (
                  <li
                    key={level}
                    className={`tag ${levelFilter === level ? "active" : ""}`}
                    onClick={handleLevelChange}
                  >
                    {level}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div key="tag">
            <div className="popover-title">Tags</div>
            <div className="popover-content">
              <ul className="tags">
                {tagsWithAll.map((tag: any) => (
                  <li
                    key={tag.id}
                    className={`tag ${tagFilter === tag.name ? "active" : ""}`}
                    onClick={handleTagChange}
                  >
                    {tag.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </ul>
      </div>
      <ul className="page-subnav">
        <li>
          <span title={`Level: ${levelFilter}`}>{`Level: ${levelFilter}`}</span>
        </li>
        <li>
          <span title={`Tags: ${tagFilter}`}>{`Tags: ${tagFilter}`}</span>
        </li>
        <li>
          <button className="btn primary seemore" onClick={handleSeeMore}>
            See More
          </button>
        </li>
      </ul>
    </div>
  );
};

export default ProblemFilterBar;
