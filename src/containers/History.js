import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import ReactPaginate from 'react-paginate';
import { StyleSheet, css } from 'aphrodite';

import { fetchPuzzleRecords } from '../actions/FetchActions';
import { setRecordTypeFilter } from '../actions/Actions';
import RecordList from '../components/RecordList';
import RecordFilterBar from '../components/RecordFilterBar';
import AuthService from '../common/AuthService';

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
      query: PropTypes.shape({}).isRequired,
    }).isRequired,
    dispatch: PropTypes.func.isRequired,
    records: PropTypes.shape({}).isRequired,
    recordTypeFilter: PropTypes.string.isRequired,
  }

  static contextTypes = {
    auth: PropTypes.object.isRequired,
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
    const query = new URLSearchParams(this.props.location);
    this.props.dispatch(setRecordTypeFilter(query.get('type') || 'all'));
    this.getRecordData(query.get('page') || 1, query.get('type') || 'all');
  }

  getRecordData(page = 1, recordType = 'all') {
    const { dispatch } = this.props;
    const profile = AuthService.getProfile();
    if (AuthService.loggedIn()) {
      dispatch(fetchPuzzleRecords({
        page,
        user_id: profile.user_id,
        record_type: recordType,
      }));
    }
  }

  handleToggle() {
    this.setState({ filterOpen: !this.state.filterOpen });
  }

  handlePageClick(data) {
    const query = new URLSearchParams(this.props.location);
    const page = data.selected + 1;
    this.getRecordData(page, query.get('type'));
    this.props.dispatch(push(`/records?page=${page}&type=${query.get('type') || 'all'}`));
  }

  handleSeeMore(filter, val) {
    const query = new URLSearchParams(this.props.location);
    this.setState({ filterOpen: false });
    this.props.dispatch(setRecordTypeFilter(val));
    this.getRecordData(query.get('page'), val);
    this.props.dispatch(push(`/records?page=${query.get('page') || 1}&type=${val}`));
  }

  render() {
    let recordList;
    let pagination;
    let page = 0;
    const query = new URLSearchParams(this.props.location);
    const { records, recordTypeFilter } = this.props;
    if (query && query.get('page')) {
      page = parseInt(query.get('page') - 1, 10);
    }
    if (records.data !== undefined) {
      recordList = <RecordList recordList={records.data.data} />;
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
            filterVal: recordTypeFilter,
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
  };
}

export default connect(select)(History);
