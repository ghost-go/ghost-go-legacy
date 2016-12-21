import React, { Component } from 'react'
import RankList from './RankList'
import { StyleSheet, css } from 'aphrodite'
import { setRangeFilter } from '../actions/Actions'

export default class RankRange extends Component {

  static propTypes = {
    rankRange: React.PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)

    this.handleRangeStart = this.handleRangeStart.bind(this)
    this.handleRangeEnd = this.handleRangeEnd.bind(this)
  }

  handleRangeStart(rank) {
    this.props.handleRangeChange({start: rank})
  }

  handleRangeEnd(rank) {
    this.props.handleRangeChange({end: rank})
  }

  render() {
    return (
      <div>
        <RankList
          inlineStyle={styles.customWidth}
          rank={this.props.rankRange.start}
          onChange={this.handleRangeStart}
        />
        <div style={{display: 'inline-block', padding: '18px', fontSize: '16px'}}>
          <i className="zmdi zmdi-minus"></i>
        </div>
        <RankList
          inlineStyle={styles.customWidth}
          rank={this.props.rankRange.end}
          onChange={this.handleRangeEnd}
        />
      </div>
    )
  }

}

const styles = {
  customWidth: {
    width: 90,
  },
}
