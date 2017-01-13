import React, { Component } from 'react'
import RankList from './RankList'
import { StyleSheet, css } from 'aphrodite'
import { setRangeFilter } from '../actions/Actions'

import Remove from 'material-ui/svg-icons/content/remove'

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
      <div className={css(styles.rangeContainer)}>
        <RankList
          floatingLabelText='FROM'
          rank={this.props.rankRange.start}
          onChange={this.handleRangeStart}
        />
        <Remove className={css(styles.remove)} />
        <RankList
          floatingLabelText='TO'
          inlineStyle={styles.customWidth}
          rank={this.props.rankRange.end}
          onChange={this.handleRangeEnd}
        />
      </div>
    )
  }

}

const styles = StyleSheet.create({

  rangeContainer: {
    alignItems: 'center'
  },

  remove: {
    margin: '0 15px',
  },

  customWidth: {
    width: 60,
  },
})
