import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Row, Col } from 'react-bootstrap';

import { setDateRangeFilter, setUserRangeFilter } from '../actions/Actions';
import { fetchDashboard } from '../actions/FetchActions';
import FilterBar from '../components/FilterBar';
import AuthService from '../utils/AuthService';

class Dashboard extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    dateRangeFilter: PropTypes.string.isRequired,
    userRangeFilter: PropTypes.string.isRequired,
    dashboard: PropTypes.shape({}).isRequired,
  }

  static contextTypes = {
    auth: PropTypes.object.isRequired,
  }

  static defaultProps = {
    filterOpen: false,
  }

  constructor(props) {
    super(props);
    this.handleSeeMore = this.handleSeeMore.bind(this);
  }

  state = {
    filterOpen: false,
  }

  componentDidMount() {
    const { dispatch, dateRangeFilter, userRangeFilter } = this.props;
    const profile = AuthService.getProfile();
    dispatch(fetchDashboard({
      date_range: dateRangeFilter,
      user_range: userRangeFilter,
      user_id: profile.user_id,
    }));
  }

  handleToggle() {
    this.setState({ filterOpen: !this.state.filterOpen });
  }

  handleSeeMore(filter, val) {
    const { dispatch, dateRangeFilter, userRangeFilter } = this.props;
    const { auth } = this.context;
    const profile = auth.getProfile();
    if (filter === 'dateRangeFilter') {
      dispatch(setDateRangeFilter(val));
    } else if (filter === 'userRangeFilter') {
      dispatch(setUserRangeFilter(val));
    }
    dispatch(fetchDashboard({
      date_range: filter === 'dateRangeFilter' ? val : dateRangeFilter,
      user_range: filter === 'userRangeFilter' ? val : userRangeFilter,
      user_id: profile.user_id,
    }));
  }


  render() {
    const loading = <div><i className="fa fa-spinner fa-pulse fa-fw" /></div>;
    const { userRangeFilter, dateRangeFilter, dashboard } = this.props;
    return (
      <div>
        <FilterBar
          data={[{
            name: 'Date Range',
            tags: ['today', 'yesterday', 'last7days', 'last30days', 'all'],
            filterName: 'dateRangeFilter',
            filterVal: dateRangeFilter,
            handleSeeMore: this.handleSeeMore,
          }, {
            name: 'Users',
            tags: ['onlyme', 'all'],
            filterName: 'userRangeFilter',
            filterVal: userRangeFilter,
            handleSeeMore: this.handleSeeMore,
          }]}
        />
        {
          !AuthService.loggedIn() ? <div>You must login to access this page</div> :
          <Row style={{ marginTop: '40px' }}>
            <Col xs={8} md={4}>
              <div className="tile-box tile-box-alt bg-blue">
                <div className="tile-header">Total</div>
                <div className="tile-content-wrapper">
                  <i className="fa fa-puzzle-piece" />
                  <div className="tile-content">
                    { dashboard.isFetching === true ? loading : dashboard.data.total }
                  </div>
                  <small>Well done!</small>
                </div>
                <Link className="tile-footer" to={'/records?page=1&type=all'}>view details <i className="fa fa-arrow-right" /></Link>
              </div>
            </Col>
            <Col xs={8} md={4}>
              <div className="tile-box tile-box-alt bg-green">
                <div className="tile-header">Right</div>
                <div className="tile-content-wrapper">
                  <i className="fa fa-check" />
                  <div className="tile-content">
                    { dashboard.isFetching === true ? loading : dashboard.data.right }
                  </div>
                  <small>{`take up ${((dashboard.data.right * 100) / dashboard.data.total).toFixed(2)}% of all`}</small>
                </div>
                <Link className="tile-footer" to={'/records?page=1&type=right'}>view details <i className="fa fa-arrow-right" /></Link>
              </div>
            </Col>
            <Col xs={8} md={4}>
              <div className="tile-box tile-box-alt bg-red">
                <div className="tile-header">Wrong</div>
                <div className="tile-content-wrapper">
                  <i className="fa fa-times" />
                  <div className="tile-content">
                    { dashboard.isFetching === true ? loading : dashboard.data.wrong }
                  </div>
                  <small>{`take up ${((dashboard.data.wrong * 100) / dashboard.data.total).toFixed(2)}% of all`}</small>
                </div>
                <Link className="tile-footer" to={'/records?page=1&type=wrong'}>view details <i className="fa fa-arrow-right" /></Link>
              </div>
            </Col>
          </Row>
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    dateRangeFilter: state.dateRangeFilter,
    userRangeFilter: state.userRangeFilter,
    dashboard: state.dashboard,
  };
}

export default connect(mapStateToProps)(Dashboard);
