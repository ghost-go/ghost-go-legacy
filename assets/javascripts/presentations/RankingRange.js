import React, { Component } from 'react'
import RankingList from './RankingList'
import { StyleSheet, css } from 'aphrodite'

export default class RankingRange extends Component {

  static propTypes = {
    rankingRange: React.PropTypes.string.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      range: this.props.rankingRange
    }
  }

  handleRange() {
    this.setState({range: this.refs.start.state.ranking + '-' + this.refs.end.state.ranking})
  }

  render() {
    let ranges = this.props.rankingRange.split('-')
    return (
      <div>
        <RankingList
          inlineStyle={styles.customWidth}
          ranking={ranges[0]}
          onChange={this.handleRange.bind(this)}
          ref="start"
        />
        <div style={{display: 'inline-block', padding: '18px', fontSize: '16px'}}>
          <i className="zmdi zmdi-minus"></i>
        </div>
        <RankingList
          inlineStyle={styles.customWidth}
          onChange={this.handleRange.bind(this)}
          ranking={ranges[1]}
          ref="end"
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
