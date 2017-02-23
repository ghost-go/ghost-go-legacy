import React, { Component, PropTypes as T } from 'react'
import { Link } from 'react-router'

import { Glyphicon } from 'react-bootstrap'

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
      profile: props.auth.getProfile()
    }

    props.auth.on('profile_updated', (newProfile) => {
      this.setState({profile: newProfile})
    })

  }


  render() {
    const { auth } = this.props
    console.log(this.state.profile)
    console.log(auth.loggedIn())
    return (
      <div id="page-header">
        <div style={{marginLeft: this.props.expanded ? '0px' : '-185px'}} id="header-logo">
          <span>GHOSTGO <i className="opacity-80">- beta v0.1</i></span>
          <a onClick={this.props.collapseToggle} id="collapse-sidebar" href="#" title="">
            <i className="fa fa-chevron-left"></i>
          </a>
        </div>
        <div id="sidebar-search"></div>
        <div id="header-right">
          {
            auth.loggedIn() ? (
              <div>
                <div className="user-profile dropdown">
                  <a title="" className="user-ico clearfix" data-toggle="dropdown" aria-expanded="false">
                    <img width="36" src={this.state.profile.picture} alt="" />
                    <i className="fa fa-chevron-down"></i>
                  </a>
                  {/*
                  <div class="dropdown-menu pad0B float-right">
                    <div class="box-sm">
                      <div class="login-box clearfix">
                        <div class="user-img"><a href="#" title="" class="change-img">Change photo</a> <img src="assets-minified/dummy-images/gravatar.jpg" alt="" /></div>
                        <div class="user-info"><span>Horia Simon <i>Front-end web developer</i></span> <a href="#" title="">Edit profile</a> <a href="#" title="">View notifications</a></div>
                      </div>
                      <div class="divider"></div>
                      <ul class="reset-ul mrg5B">
                        <li><a href="#">View login page example <i class="glyph-icon float-right icon-caret-right"></i></a></li>
                        <li><a href="#">View lockscreen example <i class="glyph-icon float-right icon-caret-right"></i></a></li>
                        <li><a href="#">View account details <i class="glyph-icon float-right icon-caret-right"></i></a></li>
                      </ul>
                      <div class="pad5A button-pane button-pane-alt text-center"><a href="#" class="btn display-block font-normal btn-danger"><i class="glyph-icon icon-power-off"></i> Logout</a></div>
                    </div>
                  </div>
                  */}
                </div>
                <div className="top-icon-bar">
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
