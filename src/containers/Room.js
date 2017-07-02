import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { connect } from 'react-redux';
// import { push } from 'react-router-redux';
import ActionCable from 'actioncable';
import keydown, { Keys } from 'react-keydown';
import moment from 'moment';
import {
  // Button,
  // FieldGroup,
  // Checkbox,
  // Radio,
  Button,
  Col,
  Row,
  FormGroup,
  ControlLabel,
  FormControl,
  // HelpBlock,
} from 'react-bootstrap';
import Board from '../eboard/Board';

import { APP_DOMAIN } from '../constants/Config';

const { ENTER } = Keys;
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
      name: 'Guest',
    };

    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleSend = this.handleSend.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
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
      ownerId: this.state.name,
    }, {
      connected: () => {
        const msg = {
          type: 'msg',
          fromId: this.state.name,
          text: `${this.state.name} entered this room`,
          createdAt: Date.now(),
        };
        this.room.send(msg);
      },
      disconnected: () => {
        const msg = {
          type: 'msg',
          fromId: this.state.name,
          text: `${this.state.name} disconnection`,
          createdAt: Date.now(),
        };
        this.room.send(msg);
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
    window.addEventListener('beforeunload', (ev) => {
      ev.preventDefault();
      const msg = {
        type: 'msg',
        fromId: this.state.name,
        text: `${this.state.name} leaved this room`,
        createdAt: Date.now(),
      };
      this.room.send(msg);
    });
  }

  componentDidUpdate() {
    this.chatbox.scrollTop = this.chatbox.scrollHeight;
  }

  componentWillUnmount() {
    const msg = {
      type: 'msg',
      fromId: this.state.name,
      text: `${this.state.name} leaved this room`,
      createdAt: Date.now(),
    };
    this.room.send(msg);
  }

  @keydown(ENTER)
  handleKeyboardEvents(event) {
    if (event.which === ENTER) {
      this.handleSend();
    }
  }

  // isOwner() {
  // }

  handleSend() {
    const msg = {
      type: 'msg',
      fromId: this.state.name,
      text: this.state.text,
      createdAt: Date.now(),
    };
    if (_.isEmpty(this.state.text)) {
      alert('Cannot send empty message');
    } else if (_.isEmpty(this.state.name)) {
      alert('Cannot send message without name');
    } else {
      this.room.send(msg);
    }
    this.setState({
      text: '',
    });
  }

  handleKeyPress(e) {
    if (e.key === 'Enter') {
      this.handleSend();
    }
  }

  handleTextChange(e) {
    this.setState({ text: e.target.value });
  }

  handleNameChange(e) {
    this.setState({ name: e.target.value });
  }

  render() {
    const messages = this.state.messages.map((msg) => {
      let result;
      if (msg.message_type === 'notice') {
        result = <div className="notice" key={`${msg.fromId}_${msg.createdAt}`}>{msg.text}</div>;
      } else {
        result = (
          <div key={`${msg.fromId}_${msg.createdAt}`}>
            <div>
              <b>{msg.fromId}</b>
              <span>{moment(msg.createdAt).format('LT')}</span>
            </div>
            <div>
              <div>{msg.text}</div>
            </div>
          </div>
        );
      }
      return result;
    });
    return (
      <div className="flex room-container">
        <div className="room-board">
          <canvas id="puzzle_layer" ref={(elem) => { this.boardLayer = elem; }} />
        </div>
        <div className="room-panel">
          <div className="room-info">
            <Row>
              <Col xs={12} md={8}>
                <FormGroup controlId="topic">
                  <ControlLabel>Topic</ControlLabel>
                  <FormControl
                    type="text"
                    bsSize="small"
                    value={'Guest\'s Room'}
                    placeholder="Guest's Room"
                    readOnly
                  />
                </FormGroup>
              </Col>
              <Col xs={12} md={4}>
                <FormGroup controlId="host_name">
                  <ControlLabel>Your Name</ControlLabel>
                  <FormControl
                    type="text"
                    bsSize="small"
                    value={this.state.name}
                    placeholder="Guest"
                    onChange={this.handleNameChange}
                  />
                </FormGroup>
              </Col>
            </Row>
          </div>
          <div className="room-invitation">
            <FormGroup controlId="invitation">
              <ControlLabel>Invitation URL</ControlLabel>
              <FormControl
                type="text"
                bsSize="small"
                value={`${APP_DOMAIN}/rooms/${this.state.roomId}?from=invitation`}
                placeholder={APP_DOMAIN}
                readOnly
              />
            </FormGroup>
          </div>
          <div ref={(el) => { this.chatbox = el; }} className="chatbox">
            { messages }
          </div>
          <div className="sendbox">
            <FormControl
              type="text"
              value={this.state.text}
              placeholder=""
              onChange={this.handleTextChange}
              onKeyPress={this.handleKeyPress}
            />
            <Button bsStyle="primary" tabIndex={0} onClick={this.handleSend}>Send</Button>
          </div>
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
