import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ButtonToolbar, ButtonGroup, Button } from 'react-bootstrap';

export default class BoardControlPanel extends Component {

  static propTypes = {
    setTheme: PropTypes.func.isRequired,
    theme: PropTypes.string.isRequired,
  }

  constructor() {
    super();
    this.handleTheme = this.handleTheme.bind(this);
  }

  handleTheme(e) {
    localStorage.setItem('theme', e.target.value);
    this.props.setTheme(e.target.value);
  }

  render() {
    return (
      <div className="board-toolbar">
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
              <Button>
                <span className="glyphicon glyphicon-align-left" aria-hidden="true" />
              </Button>
              <Button>
                <span className="glyphicon glyphicon-align-left" aria-hidden="true" />
              </Button>
              <Button>
                <span className="glyphicon glyphicon-align-left" aria-hidden="true" />
              </Button>
              <Button>
                <span className="glyphicon glyphicon-align-left" aria-hidden="true" />
              </Button>
            </ButtonGroup>
            <ButtonGroup>
              <Button>
                <span className="glyphicon glyphicon-align-left" aria-hidden="true" />
              </Button>
              <Button>
                <span className="glyphicon glyphicon-align-left" aria-hidden="true" />
              </Button>
              <Button>
                <span className="glyphicon glyphicon-align-left" aria-hidden="true" />
              </Button>
            </ButtonGroup>
            <ButtonGroup>
              <Button>
                <span className="glyphicon glyphicon-align-left" aria-hidden="true" />
              </Button>
            </ButtonGroup>
          </ButtonToolbar>
        </div>
      </div>
    );
  }

}
