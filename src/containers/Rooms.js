import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import {
   Button,
   // FieldGroup,
   // Checkbox,
   // Radio,
   FormGroup,
   ControlLabel,
   FormControl,
   HelpBlock,
 } from 'react-bootstrap';

class Rooms extends Component {

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
      <div>
        <FormGroup controlId="topic">
          <ControlLabel>Topic</ControlLabel>
          <FormControl
            type="text"
            value={'Guest\'s Room'}
            placeholder="Guest's Room"
          />
          <FormControl.Feedback />
          <HelpBlock>Validation is based on string length.</HelpBlock>
        </FormGroup>
        <FormGroup controlId="host_name">
          <ControlLabel>Host Name</ControlLabel>
          <FormControl
            type="text"
            value={'Guest'}
            placeholder="Guest"
          />
          <FormControl.Feedback />
          <HelpBlock>Validation is based on string length.</HelpBlock>
        </FormGroup>
        <Button onClick={this.handleClick}>Create Room</Button>
      </div>
    );
  }
}

function select(state) {
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

export default connect(select)(Rooms);
