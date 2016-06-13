import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import IconButton from 'material-ui/IconButton'

export default class AnswerBar extends Component {

  constructor(props) {
    super(props)
  }

  nextStep() {
    let step = this.props.board.state.step
    this.props.board.state.step = step + 1
    this.props.board.moveTo(step + 1)
  }

  prevStep() {
    let step = this.props.board.state.step
    this.props.board.state.step = step - 1
    this.props.board.moveTo(step - 1)
  }

  next10Step() {
    let step = this.props.board.state.step
    this.props.board.state.step = step + 10
    this.props.board.moveTo(step + 10)
  }

  prev10Step() {
    let step = this.props.board.state.step
    if (this.props.board.state.step <= 10) {
      this.props.board.state.step = 1
      this.props.board.moveTo(1)
    }
    else {
      this.props.board.state.step = step - 10
      this.props.board.moveTo(step - 10)
    }
  }

  firstStep() {
    this.props.board.state.step = 1
    this.props.board.moveTo(1)
  }

  lastStep() {
    let last = this.props.board.props.kifu.split(';').length
    this.props.board.state.step = last
    this.props.board.moveTo(last)
  }

  render() {
    return(
      <div style={styles.answerContainer}>
        <div style={styles.noInfo}>{`No.${this.props.id}`}</div>
        <div style={styles.stepInfo}>{`${this.props.current}/${this.props.total}`}</div>
        <IconButton iconStyle={styles.smallIcon} style={styles.small} iconClassName="fa fa-backward" />
        <IconButton iconStyle={styles.smallIcon} style={styles.small} iconClassName="fa fa-step-backward" />
        <IconButton iconStyle={styles.smallIcon} style={styles.small} iconClassName="fa fa-play" />
        <IconButton iconStyle={styles.smallIcon} style={styles.small} iconClassName="fa fa-step-forward" />
        <div style={styles.voteInfo}>Vote</div>
        <IconButton iconStyle={styles.smallIcon} style={styles.vote} iconClassName="fa fa-thumbs-o-up" />
        <span>{this.props.up}</span>
        <IconButton iconStyle={styles.smallIcon} style={styles.vote} iconClassName="fa fa-thumbs-o-down" />
        <span>{this.props.down}</span>
      </div>
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
