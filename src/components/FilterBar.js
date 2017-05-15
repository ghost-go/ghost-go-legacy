import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Dropdown, Glyphicon } from 'react-bootstrap';

export default class FilterBar extends Component {

  static propTypes = {
    data: PropTypes.arrayOf({}).isRequired,
    children: PropTypes.shape({}).isRequired,
  }

  constructor(props) {
    super(props);

    this.handleToggle = this.handleToggle.bind(this);
  }

  state = {
    filterOpen: false,
  }

  handleToggle() {
    this.setState({ filterOpen: !this.state.filterOpen });
  }

  handleClick(fetchData, filter, val) {
    this.setState({ filterOpen: false });
    fetchData(filter, val);
  }

  render() {
    const { data } = this.props;
    return (
      <div className="page-nav">
        <Dropdown id="filterMenu" title="filter-menu" className="filter" open={this.state.filterOpen} onToggle={this.handleToggle}>
          <Dropdown.Toggle>
            <Glyphicon className="filter-icon" glyph="filter" />
          </Dropdown.Toggle>
          <Dropdown.Menu className="super-colors">
            {
              data.map(item =>
                <div key={item.name}>
                  <div className="popover-title">{item.name}</div>
                  <div className="popover-content">
                    <ul className="tags">
                      { item.tags.map(tag => <li role="button" key={tag} className={`tag ${item.filterVal === tag ? 'active' : ''}`} onClick={this.handleClick.bind(this, item.handleSeeMore, item.filterName, tag)}>{tag}</li>) }
                    </ul>
                  </div>
                </div>,
              )
            }
          </Dropdown.Menu>
        </Dropdown>
        <ul className="page-subnav">
          {
            data.map(item =>
              <li key={item.name}><a title={`${item.name}: ${item.filterVal}`}>{`${item.name}: ${item.filterVal}`}</a></li>,
            )
          }
          { this.props.children }
        </ul>
      </div>
    );
  }
}
