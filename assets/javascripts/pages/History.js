import React, { Component } from 'react'

import mainStyles from '../styles/main'
import { connect } from 'react-redux'

//external component
import { StyleSheet, css } from 'aphrodite'
import RecordList from '../presentations/RecordList'
import { fetchPuzzleRecords } from '../actions/FetchActions'

class History extends Component {

  state = {

  }

  constructor(props) {
    super(props)

    const { auth } = this.props
    let profile = auth.getProfile()
    if (auth.loggedIn()) {
      this.props.dispatch(fetchPuzzleRecords({ page: 1,
        user_id: profile.user_id
      }))
    }
  }

  render() {
    let recordList
    if (this.props.records.data !== undefined) {
      recordList = <RecordList recordList={this.props.records.data} />
    }
    return (
      <div className={css(mainStyles.mainContainer, styles.centerContainer)}>
        <div className={css(styles.historyContainer)}>
          <div className={css(styles.titleContainer)}>
            <i className={`zmdi zmdi-alarm ${css(styles.icon)}`}></i>
            <span className={css(styles.title)}>Tsumego History</span>
          </div>
          <div className={css(styles.listContainer)}>
            { recordList }
          </div>
        </div>
			</div>
    )
  }
}

const styles = StyleSheet.create({
  centerContainer: {
    justifyContent: 'center'
  },

  historyContainer: {
    display: 'flex',
    flexDirection: 'column',
  },

  titleContainer: {
    display: 'flex',
    fontSize: '28px',
    fontWeight: 'bold',
  },

  icon: {
    fontSize: '38px',
  },

  title: {
    marginLeft: '5px',
    lineHeight: '38px',
  },
  listContainer: {
    marginTop: '20px',
    display: 'flex',
  }
})

function select(state) {
  return {
    records: state.puzzleRecords
  }
}

export default connect(select)(History)
