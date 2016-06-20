import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

import IconButton from 'material-ui/IconButton'
import Paper from 'material-ui/Paper'

export default class AnswerBar extends Component {

  constructor(props) {
    super(props)
  }

  nextStep() {
    let step = this.props.board.state.step
    this.props.board.state.step = step + 1
  }

  prevStep() {
    let step = this.props.board.state.step
    this.props.board.state.step = step - 1
  }

  firstStep() {
    let step = this.props.board.state.step
    this.props.board.state.step = step - 1
  }

  lastStep() {
  }

  render() {
    return(
      <Paper style={styles.answerContainer}>
        <div style={styles.noInfo}>{`No.${this.props.id}`}</div>
        <div style={styles.stepInfo}>{`${this.props.current}/${this.props.total}`}</div>
        <IconButton ref="firstStep" iconStyle={styles.smallIcon} style={styles.small} iconClassName="fa fa-backward" />
        <IconButton ref="prevStep" iconStyle={styles.smallIcon} style={styles.small} iconClassName="fa fa-step-backward"  />
        <IconButton ref="nextStep" iconStyle={styles.smallIcon} style={styles.small} iconClassName="fa fa-play" />
        <IconButton ref="lastStep" iconStyle={styles.smallIcon} style={styles.small} iconClassName="fa fa-step-forward" />
        <div style={styles.voteInfo}>Vote</div>
        <IconButton iconStyle={styles.smallIcon} style={styles.vote} iconClassName="fa fa-thumbs-o-up" />
        <span>{this.props.up}</span>
        <IconButton iconStyle={styles.smallIcon} style={styles.vote} iconClassName="fa fa-thumbs-o-down" />
        <span>{this.props.down}</span>
      </Paper>
    )
  }
}

const styles = {

  answerContainer: {
  },

  noInfo: {
    display: 'inline-block',
    width: '70px',
    marginLeft: '25px',
    fontSize: '16px',
  },

  stepInfo: {
    display: 'inline-block',
    width: '40px',
    marginLeft: '15px',
    fontSize: '16px',
  },

  voteInfo: {
    display: 'inline-block',
    marginLeft: '20px',
    marginRight: '5px',
    fontSize: '16px',
  },

  vote: {
    width: 28,
    height: 28,
    padding: 0,
  },

  smallIcon: {
    fontSize: '16px'
  },

  small: {
    width: 36,
    height: 36,
    padding: 10,
  },
}
