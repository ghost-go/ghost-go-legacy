import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router';

export default class ControlBar extends Component {

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
    this.props.board.state.step = step - 10
    this.props.board.moveTo(step - 10)
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
      <div className="control-bar">
        <span className="move-control" ref="firstStep" onClick={this.firstStep.bind(this)}>
          <i className="fa fa-fast-backward"></i>
        </span>
        <span className="move-control" ref="prev10Step" onClick={this.prev10Step.bind(this)}>
          <i className="fa fa-backward"></i>
        </span>
        <span className="move-control" ref="prevStep" onClick={this.prevStep.bind(this)}>
          <i className="fa fa-step-backward"></i>
        </span>
        <span className="move-control" ref="nextStep" onClick={this.nextStep.bind(this)}>
          <i className="fa fa-play"></i>
        </span>
        <span className="move-control" onClick={this.nextStep.bind(this)}>
          <i className="fa fa-step-forward"></i>
        </span>
        <span className="move-control" ref="next10Step" onClick={this.next10Step.bind(this)}>
          <i className="fa fa-forward"></i>
        </span>
        <span className="move-control" ref="lastStep" onClick={this.lastStep.bind(this)}>
          <i className="fa fa-fast-forward"></i>
        </span>
      </div>
    )
  }
}
