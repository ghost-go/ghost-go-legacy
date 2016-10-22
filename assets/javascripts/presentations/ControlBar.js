import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router';

export default class ControlBar extends Component {

  constructor(props) {
    super(props)
    this.state = {
      board: null
    }
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
    let last = this.props.board.props.kifu.data.steps.split(';').length
    this.props.board.state.step = last
    this.props.board.moveTo(last)
  }

  render() {
    return(
      <div className="control-bar">
        <span className="move-control" onClick={this.firstStep.bind(this)}>
          <i className="fa fa-fast-backward"></i>
        </span>
        <span className="move-control" onClick={this.prev10Step.bind(this)}>
          <i className="fa fa-backward"></i>
        </span>
        <span className="move-control" onClick={this.prevStep.bind(this)}>
          <i className="fa fa-play rotate"></i>
        </span>
        <span className="move-control" onClick={this.nextStep.bind(this)}>
          <i className="fa fa-play"></i>
        </span>
        <span className="move-control" onClick={this.next10Step.bind(this)}>
          <i className="fa fa-forward"></i>
        </span>
        <span className="move-control" onClick={this.lastStep.bind(this)}>
          <i className="fa fa-fast-forward"></i>
        </span>
      </div>
    )
  }
}
