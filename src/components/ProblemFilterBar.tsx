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
  levelFilter,
  tagFilter,
  isFilterMenuOpen,
  refetch
} : {
  ranges: Array<string>,
  tags: Array<any>,
  levelFilter: string,
  tagFilter: string,
  isFilterMenuOpen: boolean,
  relay: any,
  refetch: any
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
                  <li key={level} className={`tag ${levelFilter === level ? 'active' : ''}`}
                    onClick={(e) => { updateFilter(e.currentTarget.innerText, "levelFilter")}}>{level}</li>
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
      <li><span title={`Level: ${levelFilter}`}>{`Level: ${levelFilter}`}</span></li>
      <li><span title={`Tags: ${tagFilter}`}>{`Tags: ${tagFilter}`}</span></li>
      <li><button className="btn primary seemore" onClick={refetch}>See More</button></li>
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
