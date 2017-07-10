import _ from 'lodash';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { push } from 'react-router-redux';
import ActionCable from 'actioncable';
import keydown, { Keys } from 'react-keydown';
import moment from 'moment';
import faker from 'faker';
// import ui from 'redux-ui';
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
import { CoordsToTree } from '../constants/Go';
import Board from '../eboard/Board';

import { APP_DOMAIN } from '../constants/Config';
import {
  setToolbarHidden,
  // setNextStoneType,
  addSteps,
} from '../actions/Actions';

const { ENTER } = Keys;
const cable = ActionCable.createConsumer('ws://localhost:3000/cable');

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

const ALLOW_OUTPUT_MESSAGR_TYPE_LIST = [
  'msg',
  'notification#enter',
  'notification#leave',
  'notification#room_info_change',
  'notification#host_name_changed',
  'notification#name_changed',
  'notification#topic_changed',
];

// @ui({
  // state: {
    // isHost: false,
    // filters: [],
  // },
// })
@connect(mapStateToProps)
export default class Room extends Component {

  static propTypes = {
    theme: PropTypes.string.isRequired,
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
    dispatch: PropTypes.func.isRequired,
    steps: PropTypes.arrayOf(PropTypes.string).isRequired,
    boardStates: PropTypes.shape({
      showCoordinate: PropTypes.bool.isRequired,
      mark: PropTypes.string.isRequired,
      turn: PropTypes.string.isRequired,
    }).isRequired,
    // nextStoneType: PropTypes.number.isRequired,
  }

  constructor(props, context) {
    super(props, context);

    const { id } = this.props.params;
    if (!sessionStorage.currentName) {
      sessionStorage.currentName = faker.name.findName();
    }
    if (!sessionStorage.currentTopic) {
      sessionStorage.currentTopic = `${sessionStorage.currentName}'s Room`;
    }
    this.state = {
      nameIsEditable: false,
      topicIsEditable: false,
      roomId: id,
      text: '',
      messages: [],
      onlineList: [],
      name: sessionStorage.currentName,
      hostId: sessionStorage.currentName,
      hostName: sessionStorage.currentName,
      topic: sessionStorage.currentTopic,
      hostTopic: sessionStorage.currentTopic,
    };

    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleTopicChange = this.handleTopicChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleTopicEdit = this.handleTopicEdit.bind(this);
    this.handleNameEdit = this.handleNameEdit.bind(this);
    this.handleSend = this.handleSend.bind(this);
  }

  state = {
    roomId: '',
  }

  componentWillMount() {
    this.props.dispatch(setToolbarHidden(false));
  }

  componentDidMount() {
    const room = cable.subscriptions.create({
      channel: 'GamesChannel',
      roomId: this.state.roomId,
      type: 'temp',
      topic: this.state.topic,
      fromId: this.state.name,
      ownerId: this.state.name,
      hostId: this.state.name,
      hostName: this.state.name,
    }, {
      connected: () => {
        console.log('enter');
        const msg = {
          type: 'notification#enter',
          fromId: this.state.name,
          text: `${this.state.name} entered this room`,
          createdAt: Date.now(),
        };
        this.room.send(msg);
      },
      disconnected: () => {
        console.log('leave');
        const msg = {
          type: 'notification#leave',
          fromId: this.state.name,
          text: `${this.state.name} disconnection`,
          createdAt: Date.now(),
        };
        this.room.send(msg);
      },
      received: (data) => {
        if (ALLOW_OUTPUT_MESSAGR_TYPE_LIST.includes(data.type)) {
          if (!_.isEmpty(data.text)) {
            const messages = this.state.messages.concat([data]);
            this.setState({ messages });
          }
        }
        if (data.type === 'notification#refresh_room_info') {
          this.setState({
            hostId: data.hostId,
            hostName: data.hostName,
            onlineList: data.text,
            topic: data.topic,
          });
        } else if (data.type === 'op') {
          this.props.dispatch(addSteps(data.text));
        }
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

    window.addEventListener('beforeunload', (ev) => {
      ev.preventDefault();
      const msg = {
        type: 'notification#leave',
        fromId: this.state.name,
        text: `${this.state.name} leaved this room`,
        createdAt: Date.now(),
      };
      this.room.send(msg);
    });
  }

  componentDidUpdate() {
    this.chatbox.scrollTop = this.chatbox.scrollHeight;

    let nextStoneType = 'B';
    if (this.props.boardStates.turn === 'B') {
      nextStoneType = 1;
    } else if (this.props.boardStates.turn === 'W') {
      nextStoneType = -1;
    } else if (this.getLastStone() === 'B') {
      nextStoneType = -1;
    } else {
      nextStoneType = 1;
    }
    const board = new Board({
      autofit: false,
      canvas: this.boardLayer,
      theme: this.props.theme,
      editable: true,
      showCoordinate: this.props.boardStates.showCoordinate,
      nextStoneType,
      afterMove: (step) => {
        this.props.dispatch(addSteps(step));
        const msg = {
          type: 'op',
          fromId: this.state.name,
          text: step,
          createdAt: Date.now(),
        };
        this.room.send(msg);
      },
    });
    board.setStones(CoordsToTree(this.props.steps), true);
    board.render();
  }

  componentWillUnmount() {
    const msg = {
      type: 'notification#leave',
      fromId: this.state.name,
      text: `${this.state.name} leaved this room`,
      createdAt: Date.now(),
    };
    this.room.send(msg);
  }

  getLastStone() {
    const lastStone = this.props.steps.slice(-1)[0];
    if (lastStone) {
      return lastStone[0];
    }
    return '';
  }

  @keydown(ENTER)
  handleKeyboardEvents(event) {
    if (event.which === ENTER) {
      this.handleSend();
    }
  }

  isHost() {
    return this.state.hostName === sessionStorage.currentName;
  }

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
    this.setState({ text: '' });
  }

  handleKeyPress(e) {
    if (e.key === 'Enter') {
      this.handleSend();
    }
  }

  handleTopicChange(e) {
    this.setState({ topic: e.target.value });
  }

  handleTextChange(e) {
    this.setState({ text: e.target.value });
  }

  handleNameChange(e) {
    this.setState({ name: e.target.value });
  }

  handleTopicEdit() {
    this.setState(prevState => ({ topicIsEditable: !prevState.topicIsEditable }), () => {
      if (!this.state.topicIsEditable) {
        this.sendTopicChangedNotification();
      } else {
        this.topicBox.focus();
        this.topicBox.select();
      }
    });
  }

  handleNameEdit() {
    this.setState(prevState => ({ nameIsEditable: !prevState.nameIsEditable }), () => {
      if (!this.state.nameIsEditable) {
        this.sendNameChangedNotification();
      } else {
        this.nameBox.focus();
        this.nameBox.select();
      }
    });
  }

  sendTopicChangedNotification() {
    const msg = {
      type: 'notification#topic_changed',
      fromId: this.state.name,
      topic: this.state.topic,
      createdAt: Date.now(),
    };
    sessionStorage.currentTopic = this.state.topic;
    this.room.send(msg);
  }

  sendNameChangedNotification() {
    if (this.state.name !== sessionStorage.currentName) {
      const msg = {
        type: 'notification#name_changed',
        fromId: sessionStorage.currentName,
        originalName: sessionStorage.currentName,
        newName: this.state.name,
        createdAt: Date.now(),
      };
      this.room.send(msg);
      sessionStorage.currentName = this.state.name;
    }
  }

  render() {
    const messages = this.state.messages.map((msg) => {
      const result = (
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
      return result;
    });

    const onlineList = this.state.onlineList.map(msg => <div key={`${msg}`}>{msg === this.state.hostName ? `${msg}(Host)` : msg}</div>);
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
                    inputRef={(el) => { this.topicBox = el; }}
                    type="text"
                    bsSize="small"
                    value={this.state.topic}
                    placeholder={this.state.topic}
                    readOnly={!this.state.topicIsEditable || !this.isHost()}
                    onChange={this.handleTopicChange}
                  />
                  { this.isHost() && <a role="button" tabIndex={-1} onClick={this.handleTopicEdit} className="edit"><i className={`fa ${this.state.topicIsEditable ? 'fa-floppy-o' : 'fa-pencil'}`} /></a> }
                </FormGroup>
              </Col>
              <Col xs={12} md={4}>
                <FormGroup controlId="name">
                  <ControlLabel>{this.isHost() ? 'Host Name' : 'Your Name'}</ControlLabel>
                  <FormControl
                    inputRef={(el) => { this.nameBox = el; }}
                    type="text"
                    bsSize="small"
                    value={this.state.name}
                    placeholder="Guest"
                    readOnly={!this.state.nameIsEditable}
                    onChange={this.handleNameChange}
                  />
                  <a role="button" tabIndex={-2} onClick={this.handleNameEdit} className="edit"><i className={`fa ${this.state.nameIsEditable ? 'fa-floppy-o' : 'fa-pencil'}`} /></a>
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
            <div>
              { messages }
            </div>
            <div className="online-list">
              <b>{`ONLINE LIST (${onlineList.length})`}</b>
              { onlineList }
            </div>
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
