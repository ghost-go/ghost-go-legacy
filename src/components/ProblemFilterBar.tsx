import React from 'react';
import { graphql, createFragmentContainer, commitLocalUpdate } from 'react-relay';

import environment from '../environment';

import "./ProblemFilterBar.scss";

const toggleFilterMenu = (isFilterMenuOpen: boolean) => {
  commitLocalUpdate(environment, store => {
    const record = store.getRoot().getLinkedRecord("settings");
    if (record) {
      record.setValue(!isFilterMenuOpen, "isFilterMenuOpen");
    }
  });
}

const updateFilter = (value: string | never, filterName: string | never) => {
  commitLocalUpdate(environment, store => {
    const query = store.getRoot();
    query.setValue(value, filterName);
  })
  toggleFilterMenu(true)
}

const ProblemFilterBar = ({
  ranges,
  tags,
  rangeFilter,
  tagFilter,
  isFilterMenuOpen
} : {
  ranges: Array<string>,
  tags: Array<any>,
  rangeFilter: string,
  tagFilter: string,
  isFilterMenuOpen: boolean,
}) => (
  <div className="page-nav">
    <div id="filterMenu" title="filter-menu" className={`filter dropdown btn-group ${isFilterMenuOpen ? 'open' : ''}`} onClick={toggleFilterMenu.bind(null, isFilterMenuOpen)}>
      <button id="filterMenu" aria-haspopup="true" aria-expanded="false" type="button" className="dropdown-toggle btn btn-default">
        <i className="fa fa-filter"></i>
        <span className="caret"></span>
      </button>
      <ul role="menu" className="super-colors dropdown-menu">
        <div key="level">
          <div className="popover-title">Level</div>
          <div className="popover-content">
            <ul className="tags">
              {
                ranges.map(level => (
                  <li key={level} className={`tag ${rangeFilter === level ? 'active' : ''}`}
                    onClick={(e) => { updateFilter(e.currentTarget.innerText, "rangeFilter")}}>{level}</li>
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
                className={`tag ${tagFilter === 'all' ? 'active' : ''}`}
                onClick={() => { updateFilter("all", "tagFilter") }}>all</li>
              {
                tags.map(tag => (
                  <li key={tag.id} className={`tag ${tagFilter === tag.name ? 'active' : ''}`}
                    onClick={(e) => { updateFilter(e.currentTarget.innerText, "tagFilter") }}>{tag.name}</li>
                ))
              }
            </ul>
          </div>
        </div>
      </ul>
    </div>
    <ul className="page-subnav">
      <li><span title={`Level: ${rangeFilter}`}>{`Level: ${rangeFilter}`}</span></li>
      <li><span title={`Tags: ${tagFilter}`}>{`Tags: ${tagFilter}`}</span></li>
      <li><button className="btn primary seemore" onClick={() => { }}>See More</button></li>
    </ul>
  </div>
)

export default createFragmentContainer(ProblemFilterBar, {
  tags: graphql`
    fragment ProblemFilterBar_tags on Tag @relay(plural: true) {
      id
      name
    }
  `,
})
