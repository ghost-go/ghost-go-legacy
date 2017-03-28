import React, { Component, PropTypes as T } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { setDateRangeFilter, setUserRangeFilter } from '../actions/Actions'
import { fetchDashboard } from '../actions/FetchActions'

import {Row, Col, Dropdown, Glyphicon} from 'react-bootstrap'

class Dashboard extends Component {

  static propTypes = {
    dispatch: T.func.isRequired,
    dateRangeFilter: T.string.isRequired,
    userRangeFilter: T.string.isRequired,
    dashboard: T.object.isRequired,
  }

  static contextTypes = {
    auth: T.object.isRequired,
  }

  static defaultProps = {
    filterOpen: false,
  }

  state = {
    filterOpen: false,
  }

  handleToggle() {
    this.setState({filterOpen: !this.state.filterOpen})
  }

  handleSeeMore(dateRange, userRange) {
    const { dispatch } = this.props
    const { auth } = this.context
    let profile = auth.getProfile()
    this.setState({filterOpen: false})
    dispatch(setDateRangeFilter(dateRange))
    dispatch(setUserRangeFilter(userRange))
    dispatch(fetchDashboard({
      date_range: dateRange,
      user_range: userRange,
      user_id: profile.user_id
    }))
  }

  componentDidMount() {
    const { dispatch, dateRangeFilter, userRangeFilter } = this.props
    const { auth } = this.context
    let profile = auth.getProfile()
    dispatch(fetchDashboard({
      date_range: dateRangeFilter,
      user_range: userRangeFilter,
      user_id: profile.user_id
    }))
  }

  constructor(props) {
    super(props)
  }

  render() {
    let loading = <div><i className="fa fa-spinner fa-pulse fa-fw"></i></div>
    const { userRangeFilter, dateRangeFilter, dashboard } = this.props
    const { auth } = this.context
    return (
      <div>
        <div className="page-nav">
          <Dropdown id="filterMenu" title="filter-menu" className="filter" open={this.state.filterOpen} onToggle={::this.handleToggle}>
            <Dropdown.Toggle>
              <Glyphicon className="filter-icon" glyph="filter" />
            </Dropdown.Toggle>
            <Dropdown.Menu className="super-colors">
              <div className="popover-title">Datesharklasers Range</div>
              <div className="popover-content">
                <ul className="tags">
                  <li onClick={this.handleSeeMore.bind(this, 'today', userRangeFilter)} className={`tag ${dateRangeFilter === 'today' ? 'active' : ''}`}>Today</li>
                  <li onClick={this.handleSeeMore.bind(this, 'yesterday', userRangeFilter)} className={`tag ${dateRangeFilter === 'yesterday' ? 'active' : ''}`}>Yesterday</li>
                  <li onClick={this.handleSeeMore.bind(this, 'last7days', userRangeFilter)} className={`tag ${dateRangeFilter === 'last7days' ? 'active' : ''}`}>Last 7 days</li>
                  <li onClick={this.handleSeeMore.bind(this, 'last30days', userRangeFilter)} className={`tag ${dateRangeFilter === 'last30days' ? 'active' : ''}`}>Last 30 days</li>
                  <li onClick={this.handleSeeMore.bind(this, 'all', userRangeFilter)} className={`tag ${dateRangeFilter === 'all' ? 'active' : ''}`}>All</li>
                </ul>
              </div>
              <div className="popover-title">Users</div>
              <div className="popover-content">
                <ul className="tags">
                  <li onClick={this.handleSeeMore.bind(this, dateRangeFilter, 'onlyme')} className={`tag ${userRangeFilter === 'onlyme' ? 'active' : ''}`}>Only me</li>
                  <li onClick={this.handleSeeMore.bind(this, dateRangeFilter, 'all')} className={`tag ${userRangeFilter === 'all' ? 'active' : ''}`}>All users</li>
                </ul>
              </div>
            </Dropdown.Menu>
          </Dropdown>
          <ul className="page-subnav">
            <li><a title="Date Range: xxx">{`Date Range: ${dateRangeFilter}`}</a></li>
            <li><a title="User: xxx">{`Users: ${userRangeFilter}`}</a></li>
          </ul>
        </div>
        {
          !auth.loggedIn() ? <div>You must login to access this page</div> :
            <Row style={{marginTop: '40px'}}>
              <Col xs={8} md={4}>
                <div className="tile-box tile-box-alt bg-blue">
                  <div className="tile-header">Total</div>
                  <div className="tile-content-wrapper">
                    <i className="fa fa-puzzle-piece"></i>
                    <div className="tile-content">
                      { dashboard.isFetching === true ? loading : dashboard.data.total }
                    </div>
                    <small>Well done!</small>
                  </div>
                  <Link className="tile-footer" to={'/records?page=1&type=all'}>view details <i className="fa fa-arrow-right"></i></Link>
                </div>
              </Col>
              <Col xs={8} md={4}>
                <div className="tile-box tile-box-alt bg-green">
                  <div className="tile-header">Right</div>
                  <div className="tile-content-wrapper">
                    <i className="fa fa-check"></i>
                    <div className="tile-content">
                      { dashboard.isFetching === true ? loading : dashboard.data.right }
                    </div>
                    <small>{`take up ${(dashboard.data.right * 100 / dashboard.data.total).toFixed(2)}% of all`}</small>
                  </div>
                  <Link className="tile-footer" to={'/records?page=1&type=right'}>view details <i className="fa fa-arrow-right"></i></Link>
                </div>
              </Col>
              <Col xs={8} md={4}>
                <div className="tile-box tile-box-alt bg-red">
                  <div className="tile-header">Wrong</div>
                  <div className="tile-content-wrapper">
                    <i className="fa fa-times"></i>
                    <div className="tile-content">
                      { dashboard.isFetching === true ? loading : dashboard.data.wrong }
                    </div>
                    <small>{`take up ${(dashboard.data.wrong * 100 / dashboard.data.total).toFixed(2)}% of all`}</small>
                  </div>
                  <Link className="tile-footer" to={'/records?page=1&type=wrong'}>view details <i className="fa fa-arrow-right"></i></Link>
                </div>
              </Col>
            </Row>
        }
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    dateRangeFilter: state.dateRangeFilter,
    userRangeFilter: state.userRangeFilter,
    dashboard: state.dashboard,
  }
}

export default connect(mapStateToProps)(Dashboard)
