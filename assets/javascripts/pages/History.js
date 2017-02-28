import React, { Component } from 'react'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'

import { fetchPuzzleRecords } from '../actions/FetchActions'
import mainStyles from '../styles/main'

import RecordList from '../presentations/RecordList'
import LeftMenu from '../presentations/LeftMenu'

import Paper from 'material-ui/Paper'
import MenuItem from 'material-ui/MenuItem'
import {grey300} from 'material-ui/styles/colors'
import ReactPaginate from 'react-paginate'


import { StyleSheet, css } from 'aphrodite'

class History extends Component {

  state = {
    filter: 'Kifu',
    page: 1,
  }

  constructor(props) {
    super(props)

    let { query } = this.props.location
    this.getRecordData(query.page)
    this.handlePageClick = this.handlePageClick.bind(this)
  }

  getRecordData(page = 1) {
    const { auth } = this.props
    let profile = auth.getProfile()
    if (auth.loggedIn()) {
      this.props.dispatch(fetchPuzzleRecords({
        page: page,
        user_id: profile.user_id
      }))
    }
  }

  handlePageClick(data) {
    let page = data.selected + 1
    this.getRecordData(page)
    this.props.dispatch(push(`/history?page=${page}`))
  }

  handleSelectedStyle(key) {
    if (key === this.state.filter) {
      return { backgroundColor: grey300 }
    } else {
      return { }
    }
  }

  handleMenuClick(filter) {
    this.setState({filter: filter})
  }

  componentWillMount() {
  }

  render() {
    let recordList, pagination, page = 0
    let { query } = this.props.location
    if (query && query.page) {
      page = parseInt(query.page - 1)
    }
    if (this.props.records.data !== undefined) {
      recordList = <RecordList recordList={this.props.records.data.data} />
      let pageCount = this.props.records.data.total_pages
      if (pageCount > 1) {
        pagination = <ReactPaginate initialPage={page}
                                    previousLabel={'previous'}
                                    nextLabel={'next'}
                                    breakLabel={<a href="">...</a>}
                                    breakClassName={'break-me'}
                                    pageCount={pageCount}
                                    marginPagesDisplayed={2}
                                    pageRangeDisplayed={10}
                                    onPageChange={this.handlePageClick}
                                    containerClassName={'pagination'}
                                    subContainerClassName={'pages pagination'}
                                    activeClassName={'active'} />
      }
    }
    return (
      <div style={{marginLeft: this.props.expanded === true ? '235px' : '50px'}} className={css(mainStyles.mainContainer, styles.centerContainer)}>
        <div className="page-nav">
          <ul className="page-subnav">
            <li><a title="Tsumego History">{`Tsumego History`}</a></li>
          </ul>
        </div>
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
    )
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
    height: '600px'
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
  }

})

function select(state) {
  return {
    records: state.puzzleRecords
  }
}

export default connect(select)(History)
