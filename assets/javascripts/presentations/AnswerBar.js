import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

import { convertSGFCoordToPos } from '../components/Helper'

import IconButton from 'material-ui/IconButton'
import Paper from 'material-ui/Paper'

export default class AnswerBar extends Component {

  constructor(props) {
    super(props)
    this.state = {
      current: 0
    }

    this.firstStep = this.firstStep.bind(this)
    this.prevStep = this.prevStep.bind(this)
    this.nextStep = this.nextStep.bind(this)
    this.lastStep = this.lastStep.bind(this)

  }

  firstStep() {
    this.setState({ current: 0 }, () => {
      this.props.board.refs.board.initPuzzleArray()
      this.props.board.refs.board.drawBoard()
    })
  }

  prevStep() {
    let steps = this.props.steps.split(';')
    if (this.state.current > 0) {
      this.props.board.refs.board.initPuzzleArray()
      this.setState({ current: this.state.current - 1 }, () => {
        for (let i = 0; i < this.state.current; i++) {
          let {x, y, ki} = convertSGFCoordToPos(steps[i])
          this.props.board.refs.board.move(x, y, ki)
        }
      })
    }
  }

  nextStep() {
    let steps = this.props.steps.split(';')
    if (this.state.current < steps.length) {
      console.log(this.props.board)
      this.props.board.refs.board.initPuzzleArray()
      this.setState({ current: this.state.current + 1 }, () => {
        for (let i = 0; i < this.state.current; i++) {
          let {x, y, ki} = convertSGFCoordToPos(steps[i])
          this.props.board.refs.board.move(x, y, ki)
        }
      })
    }
  }

  lastStep() {
    let steps = this.props.steps.split(';')
    this.setState({ current: steps.length }, () => {
      this.props.board.refs.board.initPuzzleArray()
      steps.forEach((step) => {
        let {x, y, ki} = convertSGFCoordToPos(step)
        this.props.board.refs.board.move(x, y, ki)
      })
    })
  }

  render() {
    return(
      <Paper style={styles.answerContainer} zDepth={0}>
        <div style={styles.noInfo}>{`No.${this.props.id}`}</div>
        <div style={styles.stepInfo}>{`${this.state.current}/${this.props.total}`}</div>
        <IconButton onClick={this.firstStep} ref="firstStep" iconStyle={styles.smallIcon} style={styles.small} iconClassName="fa fa-backward" />
        <IconButton onClick={this.prevStep} ref="prevStep" iconStyle={styles.smallIcon} style={styles.small} iconClassName="fa fa-step-backward"  />
        <IconButton onClick={this.nextStep} ref="nextStep" iconStyle={styles.smallIcon} style={styles.small} iconClassName="fa fa-play" />
        <IconButton onClick={this.lastStep} ref="lastStep" iconStyle={styles.smallIcon} style={styles.small} iconClassName="fa fa-step-forward" />
        {
          //<div style={styles.voteInfo}>Vote</div>
          //<IconButton iconStyle={styles.smallIcon} style={styles.vote} iconClassName="fa fa-thumbs-o-up" />
          //<span>{this.props.up}</span>
          //<IconButton iconStyle={styles.smallIcon} style={styles.vote} iconClassName="fa fa-thumbs-o-down" />
          //<span>{this.props.down}</span>
        }
      </Paper>
    )
  }
}

const styles = {

  answerContainer: {
    display: 'flex',
    flex: '1 1 auto'
  },

  noInfo: {
    display: 'flex',
    justifyContent: 'middle',
    width: '70px',
    marginLeft: '15px',
    fontSize: '16px',
    lineHeight: '32px',
  },

  stepInfo: {
    width: '40px',
    marginLeft: '10px',
    fontSize: '16px',
    lineHeight: '32px',
  },

  voteInfo: {
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
    width: 32,
    height: 32,
    padding: 5,
  },
}
