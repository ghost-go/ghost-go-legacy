import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import _ from 'lodash';
import { connect } from 'react-redux';
// import { push } from 'react-router-redux';
import ActionCable from 'actioncable';
import moment from 'moment';

import {
  // Button,
  // FieldGroup,
  // Checkbox,
  // Radio,
  Button,
  // Col,
  // Row,
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
      text: '',
      messages: [],
    };

    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleSend = this.handleSend.bind(this);
  }

  state = {
    roomId: '',
  }

  componentDidMount() {
    const room = cable.subscriptions.create({
      channel: 'GamesChannel',
      roomId: this.state.roomId,
      type: 'temp',
      topic: `Topic ${this.state.roomId}`,
      ownerId: 'Bai',
    }, {
      connected: () => {
        console.log('connected');
      },
      disconnected: () => {
        console.log('disconnected');
      },
      received: (data) => {
        const messages = this.state.messages.concat([data]);
        this.setState({ messages });
      },
    });
    this.room = room;

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

  handleSend() {
    const msg = {
      type: 'msg',
      fromId: 'Bai',
      text: this.state.text,
      createdAt: Date.now(),
    };
    this.room.send(msg);
  }

  handleTextChange(e) {
    this.setState({ text: e.target.value });
  }


  render() {
    const messages = this.state.messages.map(msg =>
      (
        <div key={`${msg.fromId}_${msg.createdAt}`}>
          <div>
            <b>{msg.fromId}</b>
            <span>{moment(msg.createdAt).format('LT')}</span>
          </div>
          <div>
            <div>{msg.text}</div>
          </div>
        </div>
      ),
    );
    return (
      <div className="flex room-container">
        <div className="room-board">
          <canvas id="puzzle_layer" ref={(elem) => { this.boardLayer = elem; }} />
        </div>
        <div>
          <h1>{this.state.roomId}</h1>
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
            <ControlLabel>Your Name</ControlLabel>
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
          <div className="chatbox">
            { messages }
          </div>
          <FormControl
            type="text"
            value={this.state.text}
            placeholder=""
            onChange={this.handleTextChange}
          />
          <Button autoFocus bsStyle="primary" onClick={this.handleSend}>Send</Button>
        </div>
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
