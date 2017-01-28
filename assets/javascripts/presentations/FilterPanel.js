import React, { Component, PropTypes } from 'react'

import {Card, CardHeader, CardText} from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'

import { StyleSheet, css } from 'aphrodite'

export default class PuzzlePanel extends Component {

  static propTypes = {
    range: PropTypes.string,
    rank_18k_10k_count: PropTypes.number,
    rank_9k_5k_count: PropTypes.number,
    rank_4k_1k_count: PropTypes.number,
    rank_1d_3d_count: PropTypes.number,
    rank_4d_6d_count: PropTypes.number,
  }

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <Card expanded={true}>
          <CardHeader
            title="RANKS"
            actAsExpander={true}
            showExpandableButton={true}
          />
          <CardText expandable={true}>
            <FlatButton
              backgroundColor={ this.props.range == '18k-9d' ? 'rgb(235, 235, 235)' : '' }
              onClick={this.props.handleSeeMore.bind(this, 'all')}
              className={css(styles.button)}
              style={{textAlign: 'left'}} label="all" />
            <FlatButton
              backgroundColor={ this.props.range == '18k-10k' ? 'rgb(235, 235, 235)' : '' }
              onClick={this.props.handleSeeMore.bind(this, '18k-10k')}
              className={css(styles.button)}
              style={{textAlign: 'left'}} label={`18k-10k (${this.props.rank_18k_10k_count})`} />
            <FlatButton
              backgroundColor={ this.props.range == '9k-5k' ? 'rgb(235, 235, 235)' : '' }
              onClick={this.props.handleSeeMore.bind(this, '9k-5k')} className={css(styles.button)}
              style={{textAlign: 'left'}} label={ `9k-5k (${this.props.rank_9k_5k_count})`} />
            <FlatButton
              backgroundColor={ this.props.range == '4k-1k' ? 'rgb(235, 235, 235)' : '' }
              onClick={this.props.handleSeeMore.bind(this, '4k-1k')} className={css(styles.button)}
              style={{textAlign: 'left'}} label={ `4k-1k (${this.props.rank_4k_1k_count})`} />
            <FlatButton
              backgroundColor={ this.props.range == '1d-3d' ? 'rgb(235, 235, 235)' : '' }
              onClick={this.props.handleSeeMore.bind(this, '1d-3d')} className={css(styles.button)}
              style={{textAlign: 'left'}} label={`1d-3d (${this.props.rank_1d_3d_count})` } />
            <FlatButton
              backgroundColor={ this.props.range == '4d-6d' ? 'rgb(235, 235, 235)' : '' }
              onClick={this.props.handleSeeMore.bind(this, '4d-6d')} className={css(styles.button)}
              style={{textAlign: 'left'}} label={`4d-6d (${this.props.rank_4d_6d_count})`} />
          </CardText>
        </Card>
        <Card expanded={true}>
          <CardHeader
            title="TAGS"
            actAsExpander={true}
            showExpandableButton={true}
          />
          <CardText expandable={true}>
            No Tags(Not Open)
          </CardText>
        </Card>
      </div>
    )
  }

}

const styles = StyleSheet.create({

  buttonGroup: {
    marginBottom: '30px'
  },

  button: {
    width: '100%',
    marginBottom: '15px',
  },

})
