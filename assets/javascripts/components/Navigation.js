import React, { Component, PropTypes as T } from 'react'
import { Link } from 'react-router'

import { Dropdown, Glyphicon } from 'react-bootstrap'

import AuthService from '../utils/AuthService'

export default class Navigation extends Component {

  static propTypes = {
    auth: T.instanceOf(AuthService),
    expanded: T.bool.isRequired,
    collapseToggle: T.func.isRequired,
  }

  static defaultProps = {
    expanded: false,
  }

  constructor(props) {
    super(props)

    this.state = {
      profile: props.auth.getProfile(),
      navOpen: false,
    }

    props.auth.on('profile_updated', (newProfile) => {
      this.setState({profile: newProfile})
    })

  }

  handleToggle() {
    this.setState({navOpen: !this.state.navOpen})
  }

  mouseDownHandler() {
    this.mouseIsDownOnCalendar = true;
  }

  mouseUpHandler() {
    this.mouseIsDownOnCalendar = false;
  }

  componentDidMount() {
    window.addEventListener('mousedown', () => {
      if (this.mouseIsDownOnCalendar) {
        return;
      }
      this.setState({navOpen: false})
    }, false)
  }

  render() {
    const { auth } = this.props
    return (
      <div id="page-header">
        <div style={{marginLeft: this.props.expanded ? '0px' : '-185px'}} id="header-logo">
          <span>GHOSTGO <i className="opacity-80">- beta v0.1</i></span>
          <a onClick={this.props.collapseToggle} id="collapse-sidebar" href="#" title="">
            <i className="fa fa-chevron-left"></i>
          </a>
        </div>
        <div id="sidebar-search"></div>
        <div id="header-right" onMouseDown={::this.mouseDownHandler} onMouseUp={::this.mouseUpHandler}>
          {
            auth.loggedIn() ? (
              <div>
                <div className="user-profile dropdown">
                  <a onTouchTap={::this.handleToggle} className="user-ico clearfix" data-toggle="dropdown" aria-expanded="false">
                    <img width="36" src={this.state.profile.picture} alt="" />
                    <i className="fa fa-chevron-down"></i>
                  </a>
                  <div style={{display: this.state.navOpen ? 'block' : 'none'}} className="dropdown-menu account">
                    <div className="box-sm">
                      <div className="login-box clearfix">
                        <div className="user-img"><img src={this.state.profile.picture} alt="" /></div>
                        <div className="user-info">
                          <span>{this.state.profile.nickname}<i>Front-end web developer</i></span>
                          <a href="#" title="">Edit profile</a>
                          {/*
                          <a href="#" title="">View notifications</a>
                          */}
                        </div>
                      </div>
                      {/*
                      <div className="divider"></div>
                      <ul className="reset-ul mrg5B">
                        <li><a href="#">View login page example <Glyphicon className="icon" glyph="menu-right" /></a></li>
                        <li><a href="#">View lockscreen example <Glyphicon className="icon" glyph="menu-right" /></a></li>
                        <li><a href="#">View account details <Glyphicon className="icon" glyph="menu-right" /></a></li>
                      </ul>
                      */}
                      <div onTouchTap={this.props.auth.logout} className="text-center button-pane">
                        <a href="#" className="btn display-block font-normal btn-danger"><i className="glyph-icon icon-power-off"></i>Logout</a>
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
                <a href="#" onClick={auth.login.bind(this)} title="Login" className="user-ico clearfix" data-toggle="dropdown" aria-expanded="false">
                  Login
                </a>
              </div>
            )
          }
        </div>
      </div>
    )
  }
}
