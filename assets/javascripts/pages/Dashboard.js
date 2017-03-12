import React, { Component, PropTypes as T } from 'react'
import { connect } from 'react-redux'
import { setDateRangeFilter, setUserRangeFilter } from '../actions/Actions'

import {Row, Col, Dropdown, Glyphicon} from 'react-bootstrap'

class Dashboard extends Component {

  static propTypes = {
    expanded: T.bool.isRequired,
    dispatch: T.func.isRequired,
    dateRangeFilter: T.string.isRequired,
    userRangeFilter: T.string.isRequired,
  }

  static defaultProps = {
    expanded: true,
    filterOpen: false,
  }

  state = {
    filterOpen: false,
  }

  handleToggle() {
    this.setState({filterOpen: !this.state.filterOpen})
  }

  handleSeeMore(dateRange, user) {
    this.props.dispatch(setDateRangeFilter(dateRange))
    this.props.dispatch(setUserRangeFilter(user))
    //this.props.dispatch(fetchPuzzles({
      //rank: rank || this.props.rangeFilter,
      //tags: tag || this.props.tagFilter,
    //}))
  }

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div style={{marginLeft: this.props.expanded === true ? '235px' : '50px'}} className="page-container">
        <div className="page-nav">
          <Dropdown id="filterMenu" title="filter-menu" className="filter" open={this.state.filterOpen} onToggle={::this.handleToggle}>
            <Dropdown.Toggle>
              <Glyphicon className="filter-icon" glyph="filter" />
            </Dropdown.Toggle>
            <Dropdown.Menu className="super-colors">
              <div className="popover-title">Date Range</div>
              <div className="popover-content">
                <ul className="tags">
                  <li onClick={this.handleSeeMore.bind(this, 'today', this.props.userRangeFilter)} className={`tag ${this.props.dateRangeFilter === 'today' ? 'active' : ''}`}>Today</li>
                  <li onClick={this.handleSeeMore.bind(this, 'yesterday', this.props.userRangeFilter)} className={`tag ${this.props.dateRangeFilter === 'yesterday' ? 'active' : ''}`}>Yesterday</li>
                  <li onClick={this.handleSeeMore.bind(this, 'last7days', this.props.userRangeFilter)} className={`tag ${this.props.dateRangeFilter === 'last7days' ? 'active' : ''}`}>Last 7 days</li>
                  <li onClick={this.handleSeeMore.bind(this, 'last30days', this.props.userRangeFilter)} className={`tag ${this.props.dateRangeFilter === 'last30days' ? 'active' : ''}`}>Last 30 days</li>
                  <li onClick={this.handleSeeMore.bind(this, 'all', this.props.userRangeFilter)} className={`tag ${this.props.dateRangeFilter === 'all' ? 'active' : ''}`}>All</li>
                </ul>
              </div>
              <div className="popover-title">Users</div>
              <div className="popover-content">
                <ul className="tags">
                  <li onClick={this.handleSeeMore.bind(this, this.props.dateRangeFilter, 'onlyme')} className={`tag ${this.props.userRangeFilter === 'onlyme' ? 'active' : ''}`}>Only me</li>
                  <li onClick={this.handleSeeMore.bind(this, this.props.dateRangeFilter, 'all')} className={`tag ${this.props.userRangeFilter === 'all' ? 'active' : ''}`}>All users</li>
                </ul>
              </div>
            </Dropdown.Menu>
          </Dropdown>
          <ul className="page-subnav">
            <li><a title="Date Range: xxx">{`Date Range: ${this.props.dateRangeFilter}`}</a></li>
            <li><a title="User: xxx">{`Users: ${this.props.userRangeFilter}`}</a></li>
          </ul>
        </div>
        <Row>
          <Col xs={8} md={4}>
            <div className="tile-box tile-box-alt bg-blue">
              <div className="tile-header">Total</div>
              <div className="tile-content-wrapper">
                <i className="fa fa-puzzle-piece"></i>
                <div className="tile-content"><i className="glyph-icon icon-caret-up font-red"></i> 185</div>
                <small>+7,6% email list penetration</small>
              </div>
              <a href="#" title="" className="tile-footer">view details <i className="glyph-icon icon-arrow-right"></i></a>
            </div>
          </Col>
          <Col xs={8} md={4}>
            <div className="tile-box tile-box-alt bg-green">
              <div className="tile-header">Right</div>
              <div className="tile-content-wrapper">
                <i className="fa fa-check"></i>
                <div className="tile-content"><i className="glyph-icon icon-caret-up font-red"></i> 185</div>
                <small>+7,6% email list penetration</small>
              </div>
              <a href="#" title="" className="tile-footer">view details <i className="glyph-icon icon-arrow-right"></i></a>
            </div>
          </Col>
          <Col xs={8} md={4}>
            <div className="tile-box tile-box-alt bg-red">
              <div className="tile-header">Wrong</div>
              <div className="tile-content-wrapper">
                <i className="fa fa-times"></i>
                <div className="tile-content"><i className="glyph-icon icon-caret-up font-red"></i> 185</div>
                <small>+7,6% email list penetration</small>
              </div>
              <a href="#" title="" className="tile-footer">view details <i className="glyph-icon icon-arrow-right"></i></a>
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}

function select(state) {
  return {
    dateRangeFilter: state.dateRangeFilter,
    userRangeFilter: state.userRangeFilter,
  }
}

export default connect(select)(Dashboard)
