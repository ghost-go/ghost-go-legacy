import React from 'react';
import { gql, useQuery } from '@apollo/client';

import "./ProblemFilterBar.scss";

const ProblemFilterBar = () => {
  const GET_SETTINGS = gql`{
    tags(last: 100) {
      id
      name
    }
    ranges
    settings {
      tagFilter
      levelFilter
      isFilterMenuOpen
    }
  }`

  const { data, client } = useQuery(GET_SETTINGS);

  const updateSettings = (name: string, value: any) => {
    const settings = { ...data.settings }
    settings[name] = value;
    client.writeQuery({
      query: GET_SETTINGS,
      data: { settings }
    });
  }

  const {
    tagFilter,
    levelFilter,
    isFilterMenuOpen,
  } : {
    tagFilter: string,
    levelFilter: string
    isFilterMenuOpen: boolean,
  } = data.settings;
  return (
  <div className="page-nav">
    <div id="filterMenu" title="filter-menu" className={`filter dropdown btn-group ${isFilterMenuOpen ? 'open' : ''}`}>
      <button id="filterMenu" aria-haspopup="true" aria-expanded="false" type="button" className="dropdown-toggle btn btn-default" onClick={() => {
        updateSettings('isFilterMenuOpen', !isFilterMenuOpen)
      }}>
        <i className="fa fa-filter"></i>
        <span className="caret"></span>
      </button>
      <ul role="menu" className="super-colors dropdown-menu">
        <div key="level">
          <div className="popover-title">Level</div>
          <div className="popover-content">
            <ul className="tags">
              {
                data.ranges.map((level: any) => (
                  <li key={level} className={`tag ${data.settings.levelFilter === level ? 'active' : ''}`}
                    onClick={(e) => { updateSettings('levelFilter', e.currentTarget.innerText)}}>{level}</li>
                ))
              }
            </ul>
          </div>
        </div>
        <div key="tag">
          <div className="popover-title">Tags</div>
          <div className="popover-content">
            <ul className="tags">
              <li
                key="tag-all"
                className={`tag ${data.settings.tagFilter === 'all' ? 'active' : ''}`}
                onClick={() => { updateSettings("tagFilter", "all") }}>all</li>
              {
                data.tags.map((tag: any) => (
                  <li key={tag.id} className={`tag ${data.settings.tagFilter === tag.name ? 'active' : ''}`}
                    onClick={(e) => { updateSettings("tagFilter", e.currentTarget.innerText) }}>{tag.name}</li>
                ))
              }
            </ul>
          </div>
        </div>
      </ul>
    </div>
    <ul className="page-subnav">
      <li><span title={`Level: ${levelFilter}`}>{`Level: ${levelFilter}`}</span></li>
      <li><span title={`Tags: ${tagFilter}`}>{`Tags: ${tagFilter}`}</span></li>
      <li><button className="btn primary seemore" onClick={() => {}}>See More</button></li>
    </ul>
  </div>
  )
}

export default ProblemFilterBar;
