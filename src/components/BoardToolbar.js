import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  // DropdownButton,
  ButtonToolbar,
  ButtonGroup,
  Button,
  // MenuItem,
} from 'react-bootstrap';

import { setTheme, setBoardStates } from '../actions/Actions';

function mapStateToProps(state) {
  return {
    steps: state.steps,
    currentAnswerId: state.currentAnswerId,
    currentMode: state.currentMode,
    toolbarHidden: state.toolbarHidden,
    theme: state.theme,
    boardStates: state.boardStates,
  };
}

const mapDispatchToProps = dispatch => ({
  setTheme: theme => dispatch(setTheme(theme)),
  setBoardStates: state => dispatch(setBoardStates(state)),
});

@connect(mapStateToProps, mapDispatchToProps)
export default class BoardToolbar extends Component {
  static propTypes = {
    setTheme: PropTypes.func.isRequired,
    setBoardStates: PropTypes.func.isRequired,
    theme: PropTypes.string.isRequired,
    toolbarHidden: PropTypes.bool.isRequired,
    boardStates: PropTypes.shape({
      showCoordinate: PropTypes.bool.isRequired,
      showAnalysisModal: PropTypes.bool.isRequired,
      mark: PropTypes.string.isRequired,
      turn: PropTypes.string.isRequired,
      clear: PropTypes.bool.isRequired,
    }).isRequired,
  }

  constructor() {
    super();

    this.handleTheme = this.handleTheme.bind(this);
    this.handleShowCoordinate = this.handleShowCoordinate.bind(this);
    this.handleShowAnalysisModal = this.handleShowAnalysisModal.bind(this);
    this.handleTurn = this.handleTurn.bind(this);
    this.handleClear = this.handleClear.bind(this);
  }

  componentDidMount() {
  }

  handleTheme(e) {
    localStorage.setItem('theme', e.target.value);
    this.props.setTheme(e.target.value);
  }

  handleShowCoordinate() {
    this.props.setBoardStates({
      showCoordinate: !this.props.boardStates.showCoordinate,
    });
  }

  handleShowAnalysisModal() {
    this.props.setBoardStates({
      showAnalysisModal: !this.props.boardStates.showAnalysisModal,
    });
  }

  handleTurn() {
    let nextState = 'B';
    if (this.props.boardStates.turn === 'B') {
      nextState = 'W';
    } else if (this.props.boardStates.turn === 'W') {
      nextState = 'B-W';
    } else if (this.props.boardStates.turn === 'B-W') {
      nextState = 'B';
    }
    this.props.setBoardStates({ turn: nextState });
  }

  handleClear() {
    this.props.setBoardStates({ clear: !this.props.boardStates.clear });
  }

  render() {
    let turnIcon;
    if (this.props.boardStates.turn === 'B') {
      turnIcon = <i className="fa fa-circle" aria-hidden="true" />;
    } else if (this.props.boardStates.turn === 'W') {
      turnIcon = <i className="fa fa-circle-thin" aria-hidden="true" />;
    } else {
      turnIcon = <i className="fa fa-adjust fa-rotate-180" aria-hidden="true" />;
    }
    return (
      <div className={`board-toolbar ${this.props.toolbarHidden ? 'hidden' : ''}`}>
        <div className="section">
          <select className="form-control" onChange={this.handleTheme} defaultValue={this.props.theme}>
            <option>black-and-white</option>
            <option>subdued-theme</option>
            <option>photorealistic-theme</option>
            <option>shell-stone</option>
            {/*
            <option>slate-and-shell-theme</option>
            */}
            <option>walnut-theme</option>
            <option>flat-theme</option>
          </select>
        </div>
        <div className="section">
          <ButtonToolbar>
            <ButtonGroup>
              <Button
                title="coordinate"
                bsStyle="default"
                onClick={this.handleShowCoordinate}
                active={this.props.boardStates.showCoordinate}
              >
                <b>XY</b>
              </Button>
              <Button
                title="analysis"
                bsStyle="default"
                onClick={this.handleShowAnalysisModal}
                active={this.props.boardStates.showAnalysisModal}
              >
                <i className="fa fa-picture-o" aria-hidden="true" />
              </Button>
              <Button
                title="turn"
                bsStyle="default"
                onClick={this.handleTurn}
              >
                { turnIcon }
              </Button>
              <Button
                title="clear"
                bsStyle="default"
                onClick={this.handleClear}
                active={this.props.boardStates.clear}
              >
                <i className="fa fa-eraser" aria-hidden="true" />
              </Button>
            </ButtonGroup>
            {/*
            <ButtonGroup>
              <Button>
                <i className="fa fa-circle" aria-hidden="true" />
              </Button>
              <Button>
                <span className="fa fa-square" aria-hidden="true" />
              </Button>
              <Button>
                <span className="glyphicon glyphicon-remove" aria-hidden="true" />
              </Button>
              <Button><b>A</b></Button>
              <Button><b>B</b></Button>
              <Button><b>C</b></Button>
              <Button><b>D</b></Button>
              <Button><b>E</b></Button>
              <Button><b>F</b></Button>
              <Button><b>G</b></Button>
            </ButtonGroup>
            <ButtonGroup>
              <Button>Clear</Button>
            </ButtonGroup>
            <ButtonGroup>
              <Button>AI Help</Button>
            </ButtonGroup>
            <ButtonGroup>
              <Button><div className="black-ki-shape" /></Button>
            </ButtonGroup>
            */}
          </ButtonToolbar>
        </div>
      </div>
    );
  }
}
