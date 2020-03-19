import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Dropdown, Button } from 'react-bootstrap';
import {
  closePuzzleFilter,
  togglePuzzleFilter,
  setTagFilter,
  setRangeFilter,
} from '../actions/Actions';
import { fetchPuzzles } from '../actions/FetchActions';

function mapStateToProps(state) {
  return {
    puzzles: state.puzzles,
    rangeFilter: state.rangeFilter,
    tagFilter: state.tagFilter,
    tags: state.tags.data,
    ranges: state.ranges,
    ui: state.ui,
  };
}

@connect(mapStateToProps)
class PuzzleFilterBar extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    tags: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      tagging_count: PropTypes.number,
    })).isRequired,
    ranges: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    rangeFilter: PropTypes.string.isRequired,
    ui: PropTypes.shape({
      puzzleFilter: PropTypes.shape({
        open: PropTypes.bool.isRequired,
      }),
    }).isRequired,
    tagFilter: PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props);

    this.handleToggle = this.handleToggle.bind(this);
  }

  handleToggle() {
    this.props.dispatch(togglePuzzleFilter());
  }

  handleTagChange(tag) {
    const { dispatch, rangeFilter } = this.props;
    dispatch(closePuzzleFilter());
    dispatch(setTagFilter(tag));
    dispatch(fetchPuzzles({
      rank: rangeFilter,
      tags: tag,
    }));
  }

  handleRangeChange(range) {
    const { dispatch, tagFilter } = this.props;
    dispatch(closePuzzleFilter());
    dispatch(setRangeFilter(range));
    dispatch(fetchPuzzles({
      rank: range,
      tags: tagFilter,
    }));
  }

  handleSeeMore() {
    const { dispatch, rangeFilter, tagFilter } = this.props;
    dispatch(closePuzzleFilter());
    dispatch(fetchPuzzles({
      rank: rangeFilter,
      tags: tagFilter,
    }));
  }

  render() {
    const { tags, ranges } = this.props;

    return (
      <div className="page-nav">
        <Dropdown id="filterMenu" title="filter-menu" className="filter" open={this.props.ui.puzzleFilter.open} onToggle={this.handleToggle}>
          <Dropdown.Toggle>
            <i className="fa fa-filter" />
          </Dropdown.Toggle>
          <Dropdown.Menu className="super-colors">
            <div key="level">
              <div className="popover-title">Level</div>
              <div className="popover-content">
                <ul className="tags">
                  {
                    ranges.map(level => (
                      <li key={level} className={`tag ${this.props.rangeFilter === level ? 'active' : ''}`}>
                        <a onClick={() => { this.handleRangeChange(level); }} tabIndex={0} onKeyPress={() => {}} role="button">{level}</a>
                      </li>
                    ))
                  }
                </ul>
              </div>
            </div>
            <div key="tag">
              <div className="popover-title">Tags</div>
              <div className="popover-content">
                <ul className="tags">
                  <li key="tag-all" className={`tag ${this.props.tagFilter === 'all' ? 'active' : ''}`}>
                    <a
                      onClick={() => { this.handleTagChange('all'); }}
                      tabIndex={0}
                      onKeyPress={() => {}}
                      role="button"
                    >
                      all
                    </a>
                  </li>
                  {
                    tags.map(tag => (
                      <li key={tag.id} className={`tag ${this.props.tagFilter === tag.name ? 'active' : ''}`}>
                        <a
                          onClick={() => { this.handleTagChange(tag.name); }}
                          tabIndex={0}
                          onKeyPress={() => {}}
                          role="button"
                        >
                          {tag.name}
                        </a>
                      </li>
                    ))
                }
                </ul>
              </div>
            </div>
          </Dropdown.Menu>
        </Dropdown>
        <ul className="page-subnav">
          <li><a title={`Level: ${this.props.rangeFilter}`}>{`Level: ${this.props.rangeFilter}`}</a></li>
          <li><a title={`Tags: ${this.props.tagFilter}`}>{`Tags: ${this.props.tagFilter}`}</a></li>
          <li><Button className="seemore" onClick={() => { this.handleSeeMore(); }} bsStyle="primary">See More</Button></li>
        </ul>
      </div>
    );
  }
}

export default PuzzleFilterBar;