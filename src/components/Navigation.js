import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Button } from 'react-bootstrap';

import { setTheme } from '../actions/Actions';
import AuthService from '../utils/AuthService';

class Navigation extends Component {

  static propTypes = {
    auth: PropTypes.instanceOf(AuthService).isRequired,
    expanded: PropTypes.bool.isRequired,
    collapseToggle: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
    theme: PropTypes.string.isRequired,
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

    this.handleTheme = this.handleTheme.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.mouseDownHandler = this.mouseDownHandler.bind(this);
    this.mouseUpHandler = this.mouseUpHandler.bind(this);
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

  handleTheme(e) {
    localStorage.setItem('theme', e.target.value);
    this.props.dispatch(setTheme(e.target.value));
  }

  mouseDownHandler() {
    this.mouseIsDownOnCalendar = true;
  }

  mouseUpHandler() {
    this.mouseIsDownOnCalendar = false;
  }

  render() {
    const { auth, theme } = this.props;
    return (
      <div id="page-header">
        <div style={{ marginLeft: this.props.expanded ? '0px' : '-185px' }} id="header-logo">
          <span>GHOSTGO <i className="opacity-80">&nbsp;- &nbsp;beta.2</i></span>
          <a onClick={this.props.collapseToggle} id="collapse-sidebar" title="">
            <i className="fa fa-chevron-left" />
          </a>
        </div>
        <div id="sidebar-search" />
        <div className="theme">
          <select className="form-control" onChange={this.handleTheme} defaultValue={theme}>
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
                      <div onTouchTap={this.props.auth.logout} className="text-center button-pane">
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
  };
}
export default connect(select)(Navigation);
