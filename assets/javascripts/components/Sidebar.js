import React, { Component, PropTypes as T } from 'react'
import { Tab } from 'react-bootstrap'
import { Link } from 'react-router'

import AuthService from '../utils/AuthService'

export default class Sidebar extends Component {

  static propTypes = {
    auth: T.instanceOf(AuthService),
    expanded: T.bool.isRequired,
  }

  static defaultProps = {
    expanded: true,
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

  //state = {
  //expanded: true,
  //}

  //handleTouchTap(index) {
  //this.setState({ selectedIndex: index })
  //}
  //
  //handleClick() {
  //this.setState({ expanded: !this.state.expanded })
  //}


  render() {
    const { auth } = this.props
    return (
      <div style={{marginLeft: this.props.expanded ? '0px' : '-185px'}} id="page-sidebar" className="rm-transition">
        {
          this.props.expanded ? (
            <div className="page-sidebar-wrapper">
              <div id="sidebar-top">
                <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                  <div>
                      {/*
                    <Nav bsStyle="pills" justified={true} stacked>
                      <NavItem eventKey="first">
                        <i className="fa fa-users fa-lg"></i>
                      </NavItem>
                      <NavItem eventKey="second">
                        <i className="fa fa-bell fa-lg"></i>
                      </NavItem>
                      <NavItem eventKey="third">
                        <span className="small-badge bg-red"></span>
                        <i className="fa fa-bar-chart-o fa-lg"></i>
                      </NavItem>
                      <NavItem eventKey="fourth">
                        <i className="fa fa-cogs fa-lg"></i>
                      </NavItem>
                    </Nav>
                          */}
                    <Tab.Content animation>
                      <Tab.Pane eventKey="first">
                        {
                          auth.loggedIn() ? (
                            <div id="tab-example-1">
                              <div className="user-profile-sm clearfix">
                                <img width="45" className="img-rounded" src={this.state.profile.picture} alt="" />
                                <div className="user-welcome">
                                  Welcome back, <b>{this.state.profile.nickname}</b>
                                </div>
                                <Link to="/users" className="btn btn-sm btn-black-opacity-alt">
                                  <i className="fa fa-cog"></i>
                                </Link>
                              </div>
                            </div>
                          ) : (
                            <div id="tab-example-1">
                              <div className="user-profile-sm clearfix">
                                <div className="user-welcome">
                                  <a onClick={auth.login.bind(this)} title="Login" className="user-ico clearfix" data-toggle="dropdown" aria-expanded="false">
                                    Login
                                  </a>
                                </div>
                              </div>
                            </div>
                          )
                        }
                      </Tab.Pane>
                      <Tab.Pane eventKey="second">
                        <div id="tab-example-2">
                          <ul className="notifications-box notifications-box-alt">
                            <li>
                              <span className="bg-purple icon-notification fa fa-users"></span>
                              <span className="notification-text">This is an error notification</span>
                              <div className="notification-time">
                                a few seconds ago <span className="fa fa-clock-o"></span>
                              </div>
                              <a href="#" className="notification-btn btn btn-xs btn-black tooltip-button" data-placement="right" title="" data-original-title="View details">
                                <i className="fa fa-arrow-right"></i>
                              </a>
                            </li>
                            <li>
                              <span className="bg-warning icon-notification fa fa-ticket"></span>
                              <span className="notification-text">This is a warning notification</span>
                              <div className="notification-time">
                                <b>15</b> minutes ago <span className="fa fa-clock-o"></span>
                              </div>
                              <a href="#" className="notification-btn btn btn-xs btn-black tooltip-button" data-placement="right" title="" data-original-title="View details">
                                <i className="fa fa-arrow-right"> </i>
                              </a>
                            </li>
                            <li>
                              <span className="bg-green icon-notification fa fa-random"></span> 
                              <span className="notification-text font-green">A success message example.</span>
                              <div className="notification-time">
                                <b>2 hours</b> ago <span className="fa fa-clock-o"></span>
                              </div>
                              <a href="#" className="notification-btn btn btn-xs btn-black tooltip-button" data-placement="right" title="" data-original-title="View details">
                                <i className="fa fa-arrow-right"></i>
                              </a>
                            </li>
                          </ul>
                        </div>
                      </Tab.Pane>
                      <Tab.Pane eventKey="third">
                        <div id="tab-example-3">
                          <div className="info-box remove-border">
                            <div className="chart-icon">
                              <div className="infobox-sparkline">
                              </div>
                            </div>
                            <b>Exchange rate</b>
                            <span className="stats font-size-23">
                              <i className="fa fa-chevron-down font-red"></i> 43.79 <span className="font-green">+0.9</span>
                            </span>
                          </div>
                        </div>
                      </Tab.Pane>
                      <Tab.Pane eventKey="fourth">
                        <div id="tab-example-4">
                          <div className="complete-user-profile">
                            <h4>Complete your profile</h4>
                            <div className="progressbar-small progressbar" data-value="75">
                              <div className="progressbar-value bg-azure tooltip-button" title="" data-original-title="45%">
                              </div>
                            </div><b>Next step:</b> <a href="#" title="Verify identity">Verify identity</a>
                          </div>
                        </div>
                      </Tab.Pane>
                    </Tab.Content>
                  </div>
                </Tab.Container>
              </div>

              <div id="sidebar-menu">
                <ul className="sf-js-enabled sf-arrows">
                  {/*
                  <li>
                    <Link to="/dashboard">
                      <i className="fa fa-tachometer"></i> <span>Dashboard</span>
                    </Link>
                  </li>
                  */}
                  <li className="divider"></li>
                  <div className="divider-header">Resources</div>
                  <li>
                    <Link to="/puzzles">
                      <i className="fa fa-television"></i> <span>Tsumego Library</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/kifus">
                      <i className="fa fa-television"></i> <span>Kifu Library</span>
                    </Link>
                  </li>
                  {/*
                  <li className="divider"></li>
                  <div className="divider-header">Practices</div>
                  <li>
                    <Link to="/practices">
                      <i className="fa fa-television"></i> <span>Practices(beta)</span>
                    </Link>
                  </li>
                  */}
                  <li className="divider"></li>
                  <div className="divider-header">Settings</div>
                  <li>
                    <Link to="/users">
                      <i className="fa fa-television"></i> <span>Profile</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/history">
                      <i className="fa fa-television"></i> <span>Visited</span>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <div>
              <div id="collapse-sidebar-menu">
                <ul className="sf-js-enabled sf-arrows">
                  <li>
                    <Link to="/dashboard">
                      <i className="fa fa-tachometer"></i> <span>Dashboard</span>
                    </Link>
                  </li>
                  <li className="divider"></li>
                  <li>
                    <Link to="/puzzles">
                      <i className="fa fa-television"></i> <span>Tsumego Library</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/kifus">
                      <i className="fa fa-television"></i> <span>Kifu Library</span>
                    </Link>
                  </li>
                  <li className="divider"></li>
                  <li>
                    <Link to="/practices">
                      <i className="fa fa-television"></i> <span>Practices</span>
                    </Link>
                  </li>
                  <li className="divider"></li>
                  <li>
                    <Link to="/users">
                      <i className="fa fa-television"></i> <span>Profile</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/history">
                      <i className="fa fa-television"></i> <span>History</span>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          )
        }
      </div>
    )
  }
}
