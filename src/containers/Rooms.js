import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
// import ActionCable from 'actioncable';
import {
 Button,
 // FieldGroup,
 // Checkbox,
 // Radio,
 // FormGroup,
 // ControlLabel,
 // FormControl,
 // HelpBlock,
} from 'react-bootstrap';

// const cable = ActionCable.createConsumer('ws://localhost:3000/cable');
function mapStateToProps(state) {
  return {
    puzzle: state.puzzle,
    rangeFilter: state.rangeFilter,
    steps: state.steps,
    currentAnswerId: state.currentAnswerId,
    currentMode: state.currentMode,
    theme: state.theme,
    nextStoneType: state.nextStoneType,
    boardStates: state.boardStates,
  };
}

@connect(mapStateToProps)
export default class Rooms extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  }

  constructor(props, context) {
    super(props, context);
    this.state = { };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const roomId = Math.random().toString(36).substr(2, 6);
    const roomUrl = `/rooms/${roomId}`;
    this.props.dispatch(push(roomUrl));
  }

  render() {
    return (
      <div className="rooms-container">
        <div className="rooms-wrapper">
          <Button
            bsStyle="primary"
            className="rooms-btn"
            onClick={this.handleClick}
          >
            19x19
          </Button>
          <span>Start with 19x19</span>
        </div>
        <div className="rooms-wrapper">
          <Button
            bsStyle="primary"
            className="rooms-btn"
            onClick={this.handleClick}
          >
            13x13
          </Button>
          <span>Start with 13x13</span>
        </div>
        <div className="rooms-wrapper">
          <Button
            bsStyle="primary"
            className="rooms-btn"
            onClick={this.handleClick}
          >
            9x9
          </Button>
          <span>Start with 9x9</span>
        </div>
      </div>
    );
  }
}
