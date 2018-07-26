import React, { Component } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { push } from 'react-router-redux';
import { connect } from 'react-redux'; import ReactPaginate from 'react-paginate';
import { StyleSheet, css } from 'aphrodite';

import { fetchPuzzleRecords } from '../actions/FetchActions';
import { setRecordTypeFilter } from '../actions/Actions';
import RecordList from '../components/RecordList';
import RecordFilterBar from '../components/RecordFilterBar';
import Auth from '../common/Auth';

const styles = StyleSheet.create({
  centerContainer: {
    justifyContent: 'center',
    flexDirection: 'column',
  },

  historyContainer: {
    padding: '10px',
    display: 'flex',
    flexDirection: 'row',
  },

  titleContainer: {
    display: 'flex',
    fontSize: '24px',
    fontWeight: 'bold',
  },

  leftMenu: {
    marginTop: '10px',
    flex: '0 0 250px',
    height: '600px',
  },

  right: {
    marginLeft: '40px',
  },

  icon: {
    fontSize: '38px',
  },

  title: {
    marginLeft: '5px',
    lineHeight: '38px',
  },

  listContainer: {
    display: 'flex',
  },

  pageContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
});

class History extends Component {
  static propTypes = {
    location: PropTypes.shape({
      search: PropTypes.string.isRequired,
    }).isRequired,
    auth: PropTypes.instanceOf(Auth).isRequired,
    dispatch: PropTypes.func.isRequired,
    records: PropTypes.shape({}).isRequired,
    recordTypeFilter: PropTypes.string.isRequired,
    profile: PropTypes.shape({}).isRequired,
  }

  constructor(props) {
    super(props);

    this.handleSeeMore = this.handleSeeMore.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
  }

  state = {
    filterOpen: false,
  }

  componentWillMount() {
    const query = new URLSearchParams(this.props.location.search);
    this.props.dispatch(setRecordTypeFilter(query.get('type') || 'all'));
    const { dispatch, auth, profile } = this.props;
    if (auth.isAuthenticated()) {
      dispatch(fetchPuzzleRecords({
        page: query.get('page') || 1,
        user_id: profile.sub || profile.user_id,
        record_type: 'all',
      }));
    }
  }

  componentDidUpdate(prevProps) {
    const { profile, dispatch } = this.props;
    if (_.isEmpty(prevProps.profile) && !_.isEmpty(profile)) {
      const query = new URLSearchParams(this.props.location.search);
      dispatch(fetchPuzzleRecords({
        page: query.get('page') || 1,
        user_id: profile.sub || profile.user_id,
        record_type: 'all',
      }));
    }
  }

  handleToggle() {
    this.setState({ filterOpen: !this.state.filterOpen });
  }

  handlePageClick(data) {
    const query = new URLSearchParams(this.props.location.search);
    const page = data.selected + 1;
    const { dispatch, profile } = this.props;
    dispatch(fetchPuzzleRecords({
      page,
      user_id: profile.sub || profile.user_id,
      record_type: query.get('type'),
    }));
    this.props.dispatch(push(`/records?page=${page}&type=${query.get('type') || 'all'}`));
  }

  handleSeeMore(filter, val) {
    const query = new URLSearchParams(this.props.location.search);
    this.setState({ filterOpen: false });
    this.props.dispatch(setRecordTypeFilter(val));
    const { dispatch, profile } = this.props;
    dispatch(fetchPuzzleRecords({
      page: query.get('page'),
      user_id: profile.sub || profile.user_id,
      record_type: val,
    }));
    this.props.dispatch(push(`/records?page=${query.get('page') || 1}&type=${val}`));
  }

  render() {
    let recordList;
    let pagination;
    let page = 0;
    let type = 'all';
    const query = new URLSearchParams(this.props.location.search);
    const { records, recordTypeFilter } = this.props;
    if (!records.data) return null;
    if (query && query.get('page')) {
      page = parseInt(query.get('page') - 1, 10);
    }
    if (query && query.get('type')) {
      type = query.get('type');
    } else {
      type = recordTypeFilter;
    }
    if (records.data !== undefined) {
      recordList = <RecordList type="records" recordList={records.data.data.map(i => i.puzzle)} />;
      const pageCount = records.data.total_pages;
      if (pageCount > 1) {
        pagination = (<ReactPaginate
          disableInitialCallback
          initialPage={page}
          previousLabel="previous"
          nextLabel="next"
          breakLabel={<div>...</div>}
          breakClassName="break-me"
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={10}
          onPageChange={this.handlePageClick}
          containerClassName="pagination"
          subContainerClassName="pages pagination"
          activeClassName="active"
        />);
      }
    } else {
      recordList = <h3><b>You must login to access this page.</b></h3>;
    }
    return (
      <div>
        <RecordFilterBar
          data={[{
            name: 'Record Type',
            tags: ['all', 'right', 'wrong'],
            filterName: 'recordTypeFilter',
            filterVal: type,
            handleSeeMore: this.handleSeeMore,
          }]}
        />
        <div className={css(styles.historyContainer)}>
          <div className={css(styles.right)}>
            <div className={css(styles.listContainer)}>
              { recordList }
            </div>
            <div className={css(styles.pageContainer)}>
              { pagination }
            </div>
          </div>
        </div>
      </div>
    );
  }
}


function select(state) {
  return {
    records: state.puzzleRecords,
    recordTypeFilter: state.recordTypeFilter,
    auth: state.ui.auth,
  };
}

export default connect(select)(History);
