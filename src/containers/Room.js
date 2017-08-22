/* global tracking */

import _ from 'lodash';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { push } from 'react-router-redux';
import ActionCable from 'actioncable';
import keydown, { Keys } from 'react-keydown';
import moment from 'moment'; import faker from 'faker';
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
  Modal,
  // HelpBlock,
} from 'react-bootstrap';
import { GoBanDetection } from '../constants/Go';
import SgfBoard from '../eboard/SgfBoard';

import { APP_DOMAIN } from '../constants/Config';
import {
  setToolbarHidden,
  setBoardStates,
  // setNextStoneType,
  addSteps,
  removeSteps,
} from '../actions/Actions';

import { fetchRoomMessages } from '../actions/FetchActions';

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

const mapDispatchToProps = dispatch => ({
  setBoardStates: state => dispatch(setBoardStates(state)),
  addSteps: state => dispatch(addSteps(state)),
  removeSteps: state => dispatch(removeSteps(state)),
  setToolbarHidden: state => dispatch(setToolbarHidden(state)),
  fetchRoomMessages: state => dispatch(fetchRoomMessages(state)),
});

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
@connect(mapStateToProps, mapDispatchToProps)
export default class Room extends Component {

  static propTypes = {
    theme: PropTypes.string.isRequired,
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
    setBoardStates: PropTypes.func.isRequired,
    setToolbarHidden: PropTypes.func.isRequired,
    addSteps: PropTypes.func.isRequired,
    removeSteps: PropTypes.func.isRequired,
    fetchRoomMessages: PropTypes.func.isRequired,
    steps: PropTypes.arrayOf(PropTypes.string).isRequired,
    boardStates: PropTypes.shape({
      showCoordinate: PropTypes.bool.isRequired,
      showAnalysisModal: PropTypes.bool.isRequired,
      mark: PropTypes.string.isRequired,
      turn: PropTypes.string.isRequired,
    }).isRequired,
  }

  constructor(props, context) {
    super(props, context);

    const { id } = this.props.params;
    if (!sessionStorage.currentName) {
      sessionStorage.currentName = faker.name.firstName();
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
      sgf: `
        (;FF[4]GM[1]SZ[19]
        GN[Copyright goproblems.com]
        PB[Black]
        HA[0]
        PW[White]
        KM[5.5]
        DT[1999-07-21]
        TM[1800]
        RU[Japanese]
        ;AW[bb][cb][cc][cd][de][df][cg][ch][dh][ai][bi][ci]
        AB[ba][ab][ac][bc][bd][be][cf][bg][bh]
        C[Black to play and live.]
        (;B[af];W[ah]
        (;B[ce];W[ag]C[only one eye this way])
        (;B[ag];W[ce]))
        (;B[ah];W[af]
        (;B[ae];W[bf];B[ag];W[bf]
        (;B[af];W[ce]C[oops! you can't take this stone])
        (;B[ce];W[af];B[bg]C[RIGHT black plays under the stones and lives]))
        (;B[bf];W[ae]))
        (;B[ae];W[ag]))
      `,
    };

    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleTopicChange = this.handleTopicChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleTopicEdit = this.handleTopicEdit.bind(this);
    this.handleNameEdit = this.handleNameEdit.bind(this);
    this.handleSend = this.handleSend.bind(this);
    this.handleCloseAnalysisModal = this.handleCloseAnalysisModal.bind(this);
  }

  state = {
    roomId: '',
  }

  componentWillMount() {
    this.props.setToolbarHidden(false);
    this.props.fetchRoomMessages({ identifier: this.state.roomId }).then((data) => {
      this.handleReceivedNotifications(data.payload.data);
    });

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
        const msg = {
          message_type: 'notification#enter',
          fromId: this.state.name,
          text: `${this.state.name} entered this room`,
          createdAt: Date.now(),
        };
        this.room.send(msg);
      },
      disconnected: () => {
        const msg = {
          message_type: 'notification#leave',
          fromId: this.state.name,
          text: `${this.state.name} disconnection`,
          createdAt: Date.now(),
        };
        this.room.send(msg);
      },
      received: (data) => {
        this.handleReceivedNotifications(data);
      },
    });
    this.room = room;

    window.addEventListener('beforeunload', (ev) => {
      ev.preventDefault();
      const msg = {
        message_type: 'notification#leave',
        fromId: this.state.name,
        text: `${this.state.name} leaved this room`,
        createdAt: Date.now(),
      };
      this.room.send(msg);
    });
  }

  componentDidMount() {
    document.addEventListener('paste', (e) => {
      // if (e.clipboardData.types.indexOf('text/html') > -1) {
      console.log(e.clipboardData.types);
      if (e.clipboardData.types.indexOf('Files') > -1) {
        if (this.props.boardStates.showAnalysisModal) {
          // console.log(e.clipboardData.getData('image/png'));
          if (e.clipboardData.files.length > 0) {
            const file = e.clipboardData.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function () {
              const canvas = document.getElementById('preview');
              const ctx = canvas.getContext('2d');
              const image = new Image();
              image.onload = () => {
                canvas.width = image.width;
                canvas.height = image.height;
                ctx.drawImage(image, 0, 0);
                // const imageData = ctx.getImageData(0, 0, image.width, image.height);
                // const results = GoBanDetection(imageData.data, canvas);
                // GoBanDetection(imageData.data, canvas);
                // ctx.putImageData(imageData, 0, 0);
              };
              image.src = reader.result;

              // debugger;

              // const tracker = new tracking.ColorTracker(['magenta', 'cyan', 'yellow']);
              //
              tracking.ColorTracker.registerColor('black', (r, g, b) => {
                if (r < 50 && g < 50 && b < 50) {
                  return true;
                }
                return false;
              });

              tracking.ColorTracker.registerColor('white', (r, g, b) => {
                if (r > 100 && g > 100 && b > 100) {
                  return true;
                }
                return false;
              });

              const tracker = new tracking.ColorTracker(['black', 'white']);

              tracker.on('track', (event) => {
                event.data.forEach((rect) => {
                  console.log(rect);
                  // window.plot(rect.x, rect.y, rect.width, rect.height, rect.color);
                });
              });

              tracking.track('#preview', tracker);
            };
            reader.onerror = function (error) {
              console.log('Error: ', error);
            };
          }
        }
        e.preventDefault();
      }
    });
    let boardWidth = 0;
    if (screen.width > screen.height) {
      boardWidth = window.innerHeight - 60;
    } else {
      boardWidth = window.innerWidth;
    }
    this.boardLayer.width = boardWidth;
    this.boardLayer.height = boardWidth;
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
    const sgfBoard = new SgfBoard({
      autofit: false,
      canvas: this.boardLayer,
      theme: this.props.theme,
      editable: true,
      boardStates: this.props.boardStates,
      showCoordinate: this.props.boardStates.showCoordinate,
      nextStoneType,
      sgf: this.state.sgf,
      movedStones: this.props.steps,
      addStep: (step) => {
        const msg = {
          message_type: 'op#add',
          fromId: this.state.name,
          text: step,
          createdAt: Date.now(),
        };
        this.room.send(msg);
      },
      removeStep: (step) => {
        const msg = {
          message_type: 'op#rm',
          fromId: this.state.name,
          text: step,
          createdAt: Date.now(),
        };
        this.room.send(msg);
      },
    });
    sgfBoard.render();
  }

  componentWillUnmount() {
    const msg = {
      message_type: 'notification#leave',
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

  handleReceivedNotifications(notifications) {
    console.log(notifications);
    if (!notifications) return;
    let notificationList = [];
    if (notifications.constructor === Array) {
      notificationList = notifications;
    } else if (notifications.constructor === Object) {
      notificationList = [notifications];
    }

    notificationList.forEach((data) => {
      if (ALLOW_OUTPUT_MESSAGR_TYPE_LIST.includes(data.message_type)) {
        if (!_.isEmpty(data.text)) {
          const messages = this.state.messages.concat([data]);
          this.setState({ messages });
        }
      }
      if (data.message_type === 'notification#refresh_room_info') {
        this.setState({
          hostId: data.hostId,
          hostName: data.hostName,
          onlineList: data.text,
          topic: data.topic,
        });
      } else if (data.message_type === 'op#add') {
        this.props.addSteps(data.text);
      } else if (data.message_type === 'op#rm') {
        // this.props.dispatch(addSteps(data.text));
        let AB = [];
        let AW = [];
        AB = /\[.*\]/.exec(/(AB.*?)[A-Z|\n|\r]/mg.exec(this.state.sgf)[1]);
        if (AB) {
          AB = AB[0]
            .split('][')
            .map(n => `B[${n.replace('[', '').replace(']', '')}]`);
        } else {
          AB = [];
        }
        AW = /\[.*\]/.exec(/(AW.*?)[A-Z|\n|\r]/mg.exec(this.state.sgf)[1]);
        if (AW) {
          AW = AW[0]
            .split('][')
            .map(n => `W[${n.replace('[', '').replace(']', '')}]`);
        } else {
          AW = [];
        }
        const ABAW = AB.concat(AW);
        if (ABAW.includes(data.text)) {
          const re = new RegExp(`(.*A${data.text[0]}.*)\\[${data.text.substr(2, 2)}\\](.*)`, 'gm');
          this.setState(prevState => ({ sgf: prevState.sgf.replace(re, '$1$2') }));
        } else {
          this.props.removeSteps(data.text);
        }
      }
    });
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
      message_type: 'msg',
      fromId: this.state.name,
      text: this.state.text,
      createdAt: Date.now(),
    };
    if (_.isEmpty(this.state.text)) {
      // alert('Cannot send empty message');
    } else if (_.isEmpty(this.state.name)) {
      // alert('Cannot send message without name');
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

  handleCloseAnalysisModal() {
    this.props.setBoardStates({ showAnalysisModal: false });
  }

  sendTopicChangedNotification() {
    const msg = {
      message_type: 'notification#topic_changed',
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
        message_type: 'notification#name_changed',
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
          <Modal
            show={this.props.boardStates.showAnalysisModal}
            onHide={this.handleCloseAnalysisModal}
          >
            <Modal.Header closeButton>
              <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <canvas id="preview" width="320px" height="240px" is="canvas-color-tracking" target="magenta cyan yellow" />
              <h4>Text in a modal</h4>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.handleCloseAnalysisModal}>Close</Button>
            </Modal.Footer>
          </Modal>
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
