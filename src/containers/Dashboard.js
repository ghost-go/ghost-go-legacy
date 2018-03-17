import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap';

import DashboardFilterBar from '../components/DashboardFilterBar';
import { fetchDashboard } from '../actions/FetchActions';
import AuthService from '../common/AuthService';

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

  static buildScoreboardItem(userId, index, picture, nickname, count) {
    return (
      <tr key={userId}>
        <td>{index + 1}</td>
        <td><img width="24" height="24" src={picture} alt="" />&nbsp;&nbsp;{nickname}</td>
        <td>{count}</td>
      </tr>
    );
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

  render() {
    const loading = <div><i className="fa fa-spinner fa-pulse fa-fw" /></div>;
    const { dashboard } = this.props;

    return (
      <div>
        <DashboardFilterBar />
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
              {/* <Link className="tile-footer" to="/records?page=1&type=all">view details <i className="fa fa-arrow-right" /></Link> */}
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
            </div>
          </Col>
        </Row>
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
