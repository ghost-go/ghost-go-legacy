import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import ReactPaginate from 'react-paginate';
import { StyleSheet, css } from 'aphrodite';

import { fetchPuzzleRecords } from '../actions/FetchActions';
import { setRecordTypeFilter } from '../actions/Actions';
import RecordList from '../presentations/RecordList';
import FilterBar from '../components/FilterBar';

class History extends Component {

  static propTypes = {
    location: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    records: PropTypes.object.isRequired,
    recordTypeFilter: PropTypes.string.isRequired,
  }

  static contextTypes = {
    auth: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);

    this.handleSeeMore = this.handleSeeMore.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
  }

  state = {
    filterOpen: false,
  }

  getRecordData(page = 1, recordType = 'all') {
    const { dispatch } = this.props;
    const { auth } = this.context;
    const profile = auth.getProfile();
    if (auth.loggedIn()) {
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
    const { query } = this.props.location;
    const page = data.selected + 1;
    this.getRecordData(page, query.type);
    this.props.dispatch(push(`/records?page=${page}&type=${query.type || 'all'}`));
  }

  handleSeeMore(filter, val) {
    const { query } = this.props.location;
    this.setState({ filterOpen: false });
    this.props.dispatch(setRecordTypeFilter(val));
    this.getRecordData(query.page, val);
    this.props.dispatch(push(`/records?page=${query.page || 1}&type=${val}`));
  }

  componentWillMount() {
    const { query } = this.props.location;
    this.props.dispatch(setRecordTypeFilter(query.type || 'all'));
    this.getRecordData(query.page || 1, query.type || 'all');
  }

  render() {
    let recordList;
    let pagination;
    let page = 0;
    const { query } = this.props.location;
    const { records, recordTypeFilter } = this.props;
    if (query && query.page) {
      page = parseInt(query.page - 1);
    }
    if (records.data !== undefined) {
      recordList = <RecordList recordList={records.data.data} />;
      const pageCount = records.data.total_pages;
      if (pageCount > 1) {
        pagination = (<ReactPaginate
          disableInitialCallback
          initialPage={page}
          previousLabel={'previous'}
          nextLabel={'next'}
          breakLabel={<a href="">...</a>}
          breakClassName={'break-me'}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={10}
          onPageChange={::this.handlePageClick}
          containerClassName={'pagination'}
          subContainerClassName={'pages pagination'}
          activeClassName={'active'}
        />);
      }
    } else {
      recordList = <h3><b>You must login to access this page.</b></h3>;
    }
    return (
      <div>
        <FilterBar
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

function select(state) {
  return {
    records: state.puzzleRecords,
    recordTypeFilter: state.recordTypeFilter,
  };
}

export default connect(select)(History);
