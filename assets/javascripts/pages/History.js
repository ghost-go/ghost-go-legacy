import React, { Component } from 'react'

import mainStyles from '../styles/main'
import { connect } from 'react-redux'

//external component
import { StyleSheet, css } from 'aphrodite'
import RecordList from '../presentations/RecordList'
import { fetchPuzzleRecords } from '../actions/FetchActions'
import ReactPaginate from 'react-paginate'
import { push } from 'react-router-redux'

import Paper from 'material-ui/Paper'
import MenuItem from 'material-ui/MenuItem'

class History extends Component {

  state = {

  }

  constructor(props) {
    super(props)

    this.getRecordData()
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

  render() {
    let recordList, pagination
    if (this.props.records.data !== undefined) {
      recordList = <RecordList recordList={this.props.records.data.data} />
      let pageCount = this.props.records.data.total_pages
      if (pageCount > 1) {
        pagination = <ReactPaginate previousLabel={'previous'}
                                    nextLabel={'next'}
                                    breakLabel={<a href="">...</a>}
                                    breakClassName={'break-me'}
                                    pageCount={pageCount}
                                    marginPagesDisplayed={2}
                                    pageRangeDisplayed={5}
                                    onPageChange={this.handlePageClick}
                                    containerClassName={'pagination'}
                                    subContainerClassName={'pages pagination'}
                                    activeClassName={'active'} />
      }
    }
    return (
      <div className={css(mainStyles.mainContainer, styles.centerContainer)}>
        <div className={css(styles.titleContainer)}>
          <i className={`zmdi zmdi-alarm ${css(styles.icon)}`}></i>
          <span className={css(styles.title)}>Recently Viewed</span>
        </div>
        <div className={css(styles.historyContainer)}>
          <Paper className={css(styles.leftMenu)}>
            <MenuItem>Tsumegos</MenuItem>
            <MenuItem>Practices</MenuItem>
            <MenuItem>Practice Records</MenuItem>
            <MenuItem>Kifus</MenuItem>
          </Paper>
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
