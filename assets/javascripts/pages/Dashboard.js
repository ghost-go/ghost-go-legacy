import React, { Component, PropTypes as T } from 'react'
import { connect } from 'react-redux'
import { setDateRangeFilter, setUserRangeFilter } from '../actions/Actions'
import { fetchDashboard } from '../actions/FetchActions'

import {Row, Col, Dropdown, Glyphicon} from 'react-bootstrap'

class Dashboard extends Component {

  static propTypes = {
    expanded: T.bool.isRequired,
    dispatch: T.func.isRequired,
    dateRangeFilter: T.string.isRequired,
    userRangeFilter: T.string.isRequired,
    auth: T.object.isRequired,
    dashboard: T.object.isRequired,
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

  handleSeeMore(dateRange, userRange) {
    const { auth } = this.props
    let profile = auth.getProfile()
    this.setState({filterOpen: false})
    this.props.dispatch(setDateRangeFilter(dateRange))
    this.props.dispatch(setUserRangeFilter(userRange))
    this.props.dispatch(fetchDashboard({
      date_range: dateRange,
      user_range: userRange,
      user_id: profile.user_id
    }))
  }

  componentDidMount() {
    const { auth } = this.props
    let profile = auth.getProfile()
    this.props.dispatch(fetchDashboard({
      date_range: this.props.dateRangeFilter,
      user_range: this.props.userRangeFilter,
      user_id: profile.user_id
    }))
  }

  constructor(props) {
    super(props)
  }

  render() {
    let loading = <div><i className="fa fa-spinner fa-pulse fa-fw"></i></div>
    return (
      <div style={{marginLeft: this.props.expanded === true ? '235px' : '50px'}} className="page-container">
        <div className="page-nav">
          <Dropdown id="filterMenu" title="filter-menu" className="filter" open={this.state.filterOpen} onToggle={::this.handleToggle}>
            <Dropdown.Toggle>
              <Glyphicon className="filter-icon" glyph="filter" />
            </Dropdown.Toggle>
            <Dropdown.Menu className="super-colors">
              <div className="popover-title">Datesharklasers Range</div>
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
        {
          !this.props.auth.loggedIn() ? <div>You must login to access this page</div> :
            <Row style={{marginTop: '40px'}}>
              <Col xs={8} md={4}>
                <div className="tile-box tile-box-alt bg-blue">
                  <div className="tile-header">Total</div>
                  <div className="tile-content-wrapper">
                    <i className="fa fa-puzzle-piece"></i>
                    <div className="tile-content">
                      <i className="glyph-icon icon-caret-up font-red"></i>
                      { this.props.dashboard.isFetching === true ? loading : this.props.dashboard.data.total }
                    </div>
                    <small>Well done!</small>
                  </div>
                  <a href="#" title="" className="tile-footer">&nbsp;&nbsp;&nbsp;</a>
                  {/*
                  <a href="#" title="" className="tile-footer">view details <i className="glyph-icon icon-arrow-right"></i></a>
                  */}
                </div>
              </Col>
              <Col xs={8} md={4}>
                <div className="tile-box tile-box-alt bg-green">
                  <div className="tile-header">Right</div>
                  <div className="tile-content-wrapper">
                    <i className="fa fa-check"></i>
                    <div className="tile-content">
                      <i className="glyph-icon icon-caret-up font-red"></i>
                      { this.props.dashboard.isFetching === true ? loading : this.props.dashboard.data.right }
                    </div>
                    <small>{`take up ${(this.props.dashboard.data.right * 100 / this.props.dashboard.data.total).toFixed(2)}& of all`}</small>
                  </div>
                  <a href="#" title="" className="tile-footer">&nbsp;&nbsp;&nbsp;</a>
                </div>
              </Col>
              <Col xs={8} md={4}>
                <div className="tile-box tile-box-alt bg-red">
                  <div className="tile-header">Wrong</div>
                  <div className="tile-content-wrapper">
                    <i className="fa fa-times"></i>
                    <div className="tile-content">
                      <i className="glyph-icon icon-caret-up font-red"></i>
                      { this.props.dashboard.isFetching === true ? loading : this.props.dashboard.data.wrong }
                    </div>
                    <small>{`take up ${(this.props.dashboard.data.wrong * 100 / this.props.dashboard.data.total).toFixed(2)}% of all`}</small>
                  </div>
                  <a href="#" title="" className="tile-footer">&nbsp;&nbsp;&nbsp;</a>
                </div>
              </Col>
            </Row>
        }
      </div>
    )
  }
}

function select(state) {
  return {
    dateRangeFilter: state.dateRangeFilter,
    userRangeFilter: state.userRangeFilter,
    dashboard: state.dashboard,
  }
}

export default connect(select)(Dashboard)
