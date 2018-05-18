import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap';

import DashboardFilterBar from '../components/DashboardFilterBar';
import { fetchDashboard } from '../actions/FetchActions';
import { setToolbarHidden } from '../actions/Actions';
import Auth from '../common/Auth';
import RecordList from '../components/RecordList';

class Dashboard extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    dateRangeFilter: PropTypes.string.isRequired,
    userRangeFilter: PropTypes.string.isRequired,
    dashboard: PropTypes.shape({}).isRequired,
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

  constructor(props) {
    super(props);

    this.state = {
      profile: Auth.getProfile(),
    };
  }

  componentWillMount() {
    this.props.dispatch(setToolbarHidden(true));
  }

  componentDidMount() {
    this.fetchDashboardData(this.state.profile.sub || this.state.profile.user_id);
  }

  fetchDashboardData(sub) {
    const { dispatch, dateRangeFilter, userRangeFilter } = this.props;
    dispatch(fetchDashboard({
      date_range: dateRangeFilter,
      user_range: userRangeFilter,
      user_id: sub,
    }));
  }

  render() {
    const loading = <div><i className="fa fa-spinner fa-pulse fa-fw" /></div>;
    const { dashboard } = this.props;
    if (!dashboard.data.most_wrong_list) return null;

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
              {/* <Link className="tile-footer" to="/records?page=1&type=all">
                view details <i className="fa fa-arrow-right" />
              </Link> */}
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
        <Row>
          <Col xs={8} md={4}>
            <b>Most Wrong</b> <a href="/records?type=wrong">View details</a>
            <RecordList type="most_wrong" recordList={dashboard.data.most_wrong_list.map(i => i[0])} />
          </Col>
          <Col xs={8} md={4}>
            <b>Favoriates</b> <a href="/favorites">View details</a>
            <RecordList type="favorites" recordList={dashboard.data.favorites_list} />
          </Col>
          <Col xs={8} md={4}>
            <b>Recents</b> <a href="/records?type=all">View details</a>
            <RecordList type="recents" recordList={dashboard.data.recents_list.map(i => i.puzzle)} />
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
