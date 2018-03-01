import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Dropdown, MenuItem, ButtonToolbar, DropdownButton } from 'react-bootstrap';
import { openPuzzleFilter, closePuzzleFilter, togglePuzzleFilter } from '../actions/Actions';

const ListItem = props => (
  <li className={`tag ${props.active ? 'active' : ''}`}>
    <a tabIndex={0} onKeyPress={() => {}} role="button">{props.tag}</a>
  </li>
);
ListItem.propTypes = {
  tag: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  return {
    puzzles: state.puzzles,
    rangeFilter: state.rangeFilter,
    tagFilter: state.tagFilter,
    tags: state.tags.data,
    ui: state.ui,
  };
}

@connect(mapStateToProps)
export default class PuzzleFilterBar extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    tags: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      taggings_count: PropTypes.number.isRequired,
    })).isRequired,
    rangeFilter: PropTypes.shape({
      text: PropTypes.string,
    }).isRequired,
    ui: PropTypes.shape({
      puzzleFilter: PropTypes.shape({
        open: PropTypes.bool.isRequired,
      }),
    }).isRequired,
    tagFilter: PropTypes.string.isRequired,
  }

  static defaultProps = {
    children: null,
  }

  // constructor(props) {
  //   super(props);

  //   this.handleToggle = this.handleToggle.bind(this);
  //   this.handleClick = this.handleClick.bind(this);
  // }

  // handleToggle() {
  // this.props.dispatch(togglePuzzleFilter());
  // }

  // handleClick(fetchData, filter, val) {
  // this.props.dispatch(openPuzzleFilter());
  // fetchData(filter, val);
  // }

  render() {
    return (
      <div className="page-nav">
        <ButtonToolbar>
          <DropdownButton
            bsStyle="default"
            title="No caret"
            noCaret
            id="dropdown-no-caret"
          >
            <MenuItem eventKey="1">Action</MenuItem>
            <MenuItem eventKey="2">Another action</MenuItem>
            <MenuItem eventKey="3">Something else here</MenuItem>
            <MenuItem divider />
            <MenuItem eventKey="4">Separated link</MenuItem>
          </DropdownButton>
        </ButtonToolbar>
        <Dropdown id="dropdown-custom-1">
          <Dropdown.Toggle>
            Pow! Zoom!
          </Dropdown.Toggle>
          <Dropdown.Menu className="super-colors">
            <MenuItem eventKey="1">Action</MenuItem>
            <MenuItem eventKey="2">Another action</MenuItem>
            <MenuItem eventKey="3" active>
              Active Item
            </MenuItem>
            <MenuItem divider />
            <MenuItem eventKey="4">Separated link</MenuItem>
          </Dropdown.Menu>
        </Dropdown>

        {/* <Dropdown id="dropdown-custom-2">
          <Dropdown.Toggle bsStyle="success" />
          <Dropdown.Menu className="super-colors">
            <MenuItem eventKey="1">Action</MenuItem>
            <MenuItem eventKey="2">Another action</MenuItem>
            <MenuItem eventKey="3" active>
              Active Item
            </MenuItem>
            <MenuItem divider />
            <MenuItem eventKey="4">Separated link</MenuItem>
          </Dropdown.Menu>
        </Dropdown> */}
        {/* <Dropdown
          id="filterMenu"
          title="filter-menu"
          className="filter"
          // open={this.props.ui.puzzleFilter.open}
          open
          onToggle={this.handleToggle}
        >
          <Dropdown.Toggle>
            <i className="fa fa-filter" />
          </Dropdown.Toggle>
          <Dropdown.Menu className="super-colors">
            <MenuItem eventKey="1">Action</MenuItem>
            <MenuItem eventKey="2">Another action</MenuItem>
            <MenuItem eventKey="3" active>
              Active Item
            </MenuItem>
            <MenuItem divider />
            <MenuItem eventKey="4">Separated link</MenuItem>
            <div key="level">
              <div className="popover-title">Level</div>
              <div className="popover-content">
                <ul className="tags">
                  <ListItem key="all" tag="all" />
                  <ListItem key="18k-10k" tag="18k-10k" />
                  <ListItem key="9k-5k" tag="9k-5k" />
                  <ListItem key="4k-1k" tag="4k-1k" />
                  <ListItem key="1d-3d" tag="1d-3d" />
                  <ListItem key="4d-6d" tag="4d-6d" />
                </ul>
              </div>
            </div>
            <div key="tag">
              <div className="popover-title">Level</div>
              <div className="popover-content">
                <ul className="tags">
                  { this.props.tags.map(tag => (<ListItem key={tag.name} tag={tag.name} />)) }
                </ul>
              </div>
            </div>
          </Dropdown.Menu>
        </Dropdown> */}
        <ul className="page-subnav">
          <li><a title={`Level: ${this.props.rangeFilter}`}>{`Level: ${this.props.rangeFilter}`}</a></li>
          <li><a title={`Tags: ${this.props.tagFilter}`}>{`Tags: ${this.props.tagFilter}`}</a></li>
        </ul>
      </div>
    );
  }
}
