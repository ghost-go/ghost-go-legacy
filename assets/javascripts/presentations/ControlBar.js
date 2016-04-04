import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router';

export default class ControlBar extends Component {

  constructor(props) {
    super(props)

    this.nextStep = this.nextStep.bind(this)
    this.prevStep = this.prevStep.bind(this)
    this.next10Step = this.next10Step.bind(this)
    this.prev10Step = this.prev10Step.bind(this)
    this.firstStep = this.firstStep.bind(this)
    this.lastStep = this.lastStep.bind(this)
  }

  nextStep() {
    console.log('next1')
    let handler = this.props.onNextStep
    if ( handler ) handler()
  }

  prevStep() {
    console.log('prev1')
  }

  next10Step() {
    console.log('next10')
  }

  prev10Step() {
    console.log('prev10')
  }

  firstStep() {
    console.log('first')
  }

  lastStep() {
    console.log('last')
  }

  render() {
    return(
      <div className="control-bar">
        <span className="move-control" onClick={this.firstStep}>
          <i className="fa fa-fast-backward"></i>
        </span>
        <span className="move-control" onClick={this.prev10Step}>
          <i className="fa fa-backward"></i>
        </span>
        <span className="move-control" onClick={this.prevStep}>
          <i className="fa fa-step-backward"></i>
        </span>
        <span className="move-control" onClick={this.nextStep}>
          <i className="fa fa-play"></i>
        </span>
        <span className="move-control" onClick={this.nextStep}>
          <i className="fa fa-step-forward"></i>
        </span>
        <span className="move-control" onClick={this.next10Step}>
          <i className="fa fa-forward"></i>
        </span>
        <span className="move-control" onClick={this.lastStep}>
          <i className="fa fa-fast-forward"></i>
        </span>
      </div>
    )
  }
}
