import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  // DropdownButton,
  ButtonToolbar,
  ButtonGroup,
  Button,
  // MenuItem,
} from 'react-bootstrap';

export default class BoardToolbar extends Component {

  static propTypes = {
    setTheme: PropTypes.func.isRequired,
    setBoardStates: PropTypes.func.isRequired,
    theme: PropTypes.string.isRequired,
    hidden: PropTypes.bool.isRequired,
    boardStates: PropTypes.shape({
      showCoordinate: PropTypes.bool.isRequired,
      mark: PropTypes.string.isRequired,
    }).isRequired,
  }

  constructor() {
    super();

    this.handleTheme = this.handleTheme.bind(this);
    this.handleShowCoordinate = this.handleShowCoordinate.bind(this);
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

  render() {
    return (
      <div className={`board-toolbar ${this.props.hidden ? 'hidden' : ''}`}>
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
                onClick={this.handleShowCoordinate}
                active={this.props.boardStates.showCoordinate}
              >
                <b>XY</b>
              </Button>
            </ButtonGroup>
            {/*
            <ButtonGroup>
              <Button>
                <span className="fa fa-circle" aria-hidden="true" />
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
