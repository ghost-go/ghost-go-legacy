import React, { Component, PropTypes } from 'react';

import IconButton from 'material-ui/IconButton';
import Paper from 'material-ui/Paper';

const styles = {
  answerContainer: {
    display: 'flex',
    flex: '1 1 auto',
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
    fontSize: '16px',
  },

  small: {
    width: 32,
    height: 32,
    padding: 5,
  },
};

export default class AnswerBar extends Component {

  static propTypes = {
    id: PropTypes.number.isRequired,
    answer: PropTypes.string.isRequired,
    steps: PropTypes.arrayOf(PropTypes.string).isRequired,
    addSteps: PropTypes.func.isRequired,
    resetSteps: PropTypes.func.isRequired,
    setCurrentAnswerId: PropTypes.func.isRequired,
    currentAnswerId: PropTypes.number,
    setCurrentMode: PropTypes.func.isRequired,
  }

  static defaultProps = {
    currentAnswerId: 0,
  }

  constructor(props) {
    super(props);
    this.state = {
      current: 0,
    };

    this.firstStep = this.firstStep.bind(this);
    this.lastStep = this.lastStep.bind(this);
    this.prevStep = this.prevStep.bind(this);
    this.nextStep = this.nextStep.bind(this);
  }

  firstStep() {
    const steps = this.props.answer.split(';');
    this.props.setCurrentMode('research');
    this.props.setCurrentAnswerId(this.props.id);
    this.props.resetSteps();
    this.props.addSteps(steps[0]);
  }

  prevStep() {
    const steps = this.props.answer.split(';');
    this.props.setCurrentMode('research');
    this.props.resetSteps();
    this.props.addSteps(steps.slice(0, this.props.steps.length - 1));
  }

  nextStep() {
    const steps = this.props.answer.split(';');
    this.props.setCurrentMode('research');
    if (this.props.currentAnswerId !== this.props.id) {
      this.firstStep();
    } else {
      this.props.resetSteps();
      this.props.addSteps(steps.slice(0, this.props.steps.length + 1));
    }
  }

  lastStep() {
    const steps = this.props.answer.split(';');
    this.props.setCurrentMode('research');
    this.props.resetSteps();
    this.props.addSteps(steps);
  }

  render() {
    const current = this.props.currentAnswerId === this.props.id ? this.props.steps.length : 0;
    return (
      <Paper style={styles.answerContainer} zDepth={0}>
        <div style={styles.noInfo}>{`No.${this.props.id}`}</div>
        <div style={styles.stepInfo}>{`${current}/${this.props.answer.split(';').length}`}</div>
        {
          // TODO: ref is deprecated
        }
        <IconButton onClick={this.firstStep} iconStyle={styles.smallIcon} style={styles.small} iconClassName="fa fa-backward" />
        <IconButton onClick={this.prevStep} iconStyle={styles.smallIcon} style={styles.small} iconClassName="fa fa-step-backward" />
        <IconButton onClick={this.nextStep} iconStyle={styles.smallIcon} style={styles.small} iconClassName="fa fa-play" />
        <IconButton onClick={this.lastStep} iconStyle={styles.smallIcon} style={styles.small} iconClassName="fa fa-step-forward" />
        {
          // <div style={styles.voteInfo}>Vote</div>
          // <IconButton
          // iconStyle={styles.smallIcon} style={styles.vote} iconClassName="fa fa-thumbs-o-up" />
          // <span>{this.props.up}</span>
          // <IconButton
          // iconStyle={styles.smallIcon} style={styles.vote} iconClassName="fa fa-thumbs-o-down" />
          // <span>{this.props.down}</span>
        }
      </Paper>
    );
  }
}
