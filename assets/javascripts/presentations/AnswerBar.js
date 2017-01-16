import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

import { convertSGFCoordToPos } from '../components/Helper'

import IconButton from 'material-ui/IconButton'
import Paper from 'material-ui/Paper'

export default class AnswerBar extends Component {

  static propTypes = {
    answer: PropTypes.string,
    steps: PropTypes.array,
    addSteps: PropTypes.func,
    resetSteps: PropTypes.func,
  }

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
    let steps = this.props.answer.split(';')
    this.props.resetSteps()
    this.props.addSteps(steps[0])
  }

  prevStep() {
    let steps = this.props.answer.split(';')
    this.props.resetSteps()
    this.props.addSteps(steps.slice(0, this.props.steps.length - 1))
  }

  nextStep() {
    let steps = this.props.answer.split(';')
    this.props.resetSteps()
    this.props.addSteps(steps.slice(0, this.props.steps.length + 1))
  }

  lastStep() {
    let steps = this.props.answer.split(';')
    this.props.resetSteps()
    this.props.addSteps(steps)
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
