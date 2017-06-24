import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { push } from 'react-router-redux';
import ActionCable from 'actioncable';

import {
  // Button,
  // FieldGroup,
  // Checkbox,
  // Radio,
  FormGroup,
  ControlLabel,
  FormControl,
  HelpBlock,
} from 'react-bootstrap';

import Board from '../eboard/Board';

const cable = ActionCable.createConsumer('ws://localhost:3000/cable');

class Room extends Component {

  static propTypes = {
    theme: PropTypes.string.isRequired,
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }

  constructor(props, context) {
    super(props, context);

    const { id } = this.props.params;
    this.state = {
      roomId: id,
    };
  }

  state = {
    roomId: '',
  }

  componentDidMount() {
    const room = cable.subscriptions.create({ channel: 'GamesChannel', room: this.state.roomId }, {
      connected: () => {
        console.log('connected');
      },
      disconnected: () => {
        console.log('disconnected');
      },
      received: (data) => {
        console.log('Received', data);
      },
    });
    room.send('aaa');

    let boardWidth = 0;
    if (screen.width > screen.height) {
      boardWidth = window.innerHeight - 60;
    } else {
      boardWidth = window.innerWidth;
    }
    this.boardLayer.width = boardWidth;
    this.boardLayer.height = boardWidth;

    const board = new Board({
      autofit: true,
      canvas: this.boardLayer,
      theme: this.props.theme,
      editable: true,
      setNextStoneType: this.setNextStoneType,
    });
    board.render();
  }


  render() {
    return (
      <div>
        <h1>{this.state.roomId}</h1>
        <div className="puzzle-board">
          <canvas id="puzzle_layer" ref={(elem) => { this.boardLayer = elem; }} />
        </div>
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
        <FormGroup controlId="invitation">
          <ControlLabel>Invitation URL</ControlLabel>
          <FormControl
            type="text"
            value={'aaa'}
            placeholder="aaa"
          />
          <FormControl.Feedback />
          <HelpBlock>Validation is based on string length.</HelpBlock>
        </FormGroup>
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

export default connect(select)(Room);
