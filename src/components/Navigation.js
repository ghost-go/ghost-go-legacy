import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Button } from 'react-bootstrap';

import { setTheme, setBoardStates } from '../actions/Actions';
import AuthService from '../utils/AuthService';
import BoardToolbar from './BoardToolbar';

class Navigation extends Component {

  static propTypes = {
    auth: PropTypes.instanceOf(AuthService).isRequired,
    expanded: PropTypes.bool.isRequired,
    collapseToggle: PropTypes.func.isRequired,
    theme: PropTypes.string.isRequired,
    setTheme: PropTypes.func.isRequired,
    setBoardStates: PropTypes.func.isRequired,
    toolbarHidden: PropTypes.bool.isRequired,
    boardStates: PropTypes.shape({
      showCoordinate: PropTypes.bool.isRequired,
      mark: PropTypes.string.isRequired,
    }).isRequired,
  }

  static defaultProps = {
    expanded: false,
  }

  constructor(props) {
    super(props);

    this.state = {
      profile: AuthService.getProfile(),
      navOpen: false,
    };

    props.auth.on('profile_updated', (newProfile) => {
      this.setState({ profile: newProfile });
    });

    this.handleToggle = this.handleToggle.bind(this);
    this.mouseDownHandler = this.mouseDownHandler.bind(this);
    this.mouseUpHandler = this.mouseUpHandler.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  componentDidMount() {
    window.addEventListener('mousedown', () => {
      if (this.mouseIsDownOnCalendar) {
        return;
      }
      this.setState({ navOpen: false });
    }, false);
  }

  handleToggle() {
    this.setState({ navOpen: !this.state.navOpen });
  }

  handleLogout() {
    this.setState({ navOpen: false });
    AuthService.logout();
  }

  mouseDownHandler() {
    this.mouseIsDownOnCalendar = true;
  }

  mouseUpHandler() {
    this.mouseIsDownOnCalendar = false;
  }

  render() {
    const { auth, theme, boardStates, toolbarHidden } = this.props;
    return (
      <div id="page-header">
        <div style={{ marginLeft: this.props.expanded ? '0px' : '-185px' }} id="header-logo">
          <span>GHOSTGO <i className="opacity-80">&nbsp;- &nbsp;beta.2</i></span>
          <a role="button" tabIndex={0} onClick={this.props.collapseToggle} id="collapse-sidebar" title="">
            <i className="fa fa-chevron-left" />
          </a>
        </div>
        <div id="sidebar-search" />
        <div style={{ paddingLeft: this.props.expanded ? '235px' : '50px' }} className="theme">
          <BoardToolbar
            setBoardStates={this.props.setBoardStates}
            setTheme={this.props.setTheme}
            theme={theme}
            hidden={toolbarHidden}
            boardStates={boardStates}
          />
        </div>
        <div id="header-right" onMouseDown={this.mouseDownHandler} onMouseUp={this.mouseUpHandler}>
          {
            AuthService.loggedIn() ? (
              <div>
                <div className="user-profile dropdown">
                  <a onTouchTap={this.handleToggle} className="user-ico clearfix" data-toggle="dropdown" aria-expanded="false">
                    <img width="36" src={this.state.profile.picture} alt="" />
                    <i className="fa fa-chevron-down" />
                  </a>
                  <div style={{ display: this.state.navOpen ? 'block' : 'none' }} className="dropdown-menu account">
                    <div className="box-sm">
                      <div className="login-box clearfix">
                        <div className="user-img"><img src={this.state.profile.picture} alt="" /></div>
                        <div className="user-info">
                          <span>{this.state.profile.nickname}<i>Welcome back!</i></span>
                          <Link to="/users">
                            Edit profile
                          </Link>
                          {/*
                          <a href="#" title="">View notifications</a>
                          */}
                        </div>
                      </div>
                      {/*
                      <div className="divider"></div>
                      <ul className="reset-ul mrg5B">
                        <li>
                          <a href="#">
                            View login page example
                            <Glyphicon className="icon" glyph="menu-right" />
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            View lockscreen example
                            <Glyphicon className="icon" glyph="menu-right" />
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            View account details
                            <Glyphicon className="icon" glyph="menu-right" />
                          </a>
                        </li>
                      </ul>
                      */}
                      <div onTouchTap={this.handleLogout} className="text-center button-pane">
                        <a className="btn display-block font-normal btn-danger"><i className="glyph-icon icon-power-off" />Logout</a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="top-icon-bar">
                  {/*
                  <div className="dropdown">
                    <a data-toggle="dropdown" href="#" title="">
                      <Glyphicon glyph="linecons-cog" />
                      <Glyphicon glyph="align-left" />
                      <Glyphicon glyph="star" />
                      <Glyphicon glyph="linecons-cog" />
                      <Glyphicon glyph="linecons-megaphone" /> </a>
                  </div>
                  <div className="dropdown">
                    <a data-toggle="dropdown" href="#" title="">
                      <Glyphicon glyph="linecons-cog" />
                      <Glyphicon glyph="linecons-megaphone" />
                      <i className="fa fa-cog"></i>
                    </a>
                  </div>
                  */}
                </div>
              </div>
            ) : (
              <div className="user-profile dropdown login">
                <Button onClick={auth.login} className="signin clearfix" bsStyle="primary">
                  Sign in
                </Button>
              </div>
            )
          }
        </div>
      </div>
    );
  }
}

function select(state) {
  return {
    theme: state.theme,
    toolbarHidden: state.toolbarHidden,
    boardStates: state.boardStates,
  };
}

const mapDispatchToProps = dispatch => ({
  setTheme: (theme) => {
    dispatch(setTheme(theme));
  },
  setBoardStates: (state) => {
    dispatch(setBoardStates(state));
  },
});

export default connect(select, mapDispatchToProps)(Navigation);