import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tab } from 'react-bootstrap';
import { Link } from 'react-router';

import AuthService from '../utils/AuthService';

export default class Sidebar extends Component {
  static propTypes = {
    auth: PropTypes.instanceOf(AuthService).isRequired,
    expanded: PropTypes.bool,
  }

  static defaultProps = {
    // expanded: true,
    expanded: false,
  }

  constructor(props) {
    super(props);

    this.state = {
      profile: AuthService.getProfile(),
    };

    props.auth.on('profile_updated', (newProfile) => {
      this.setState({ profile: newProfile });
    });
  }

  // state = {
  // expanded: true,
  // }

  // handleTouchTap(index) {
  // this.setState({ selectedIndex: index })
  // }
  //
  // handleClick() {
  // this.setState({ expanded: !this.state.expanded })
  // }

  render() {
    const { auth } = this.props;
    return (
      <div style={{ marginLeft: this.props.expanded ? '0px' : '-185px' }} id="page-sidebar" className="rm-transition">
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
                        <i className="fa fa-cogs fa-lg"></i> </NavItem>
                    </Nav>
                          */}
                    <Tab.Content animation>
                      <Tab.Pane eventKey="first">
                        {
                          AuthService.loggedIn() ? (
                            <div id="tab-example-1">
                              <div className="user-profile-sm clearfix">
                                <img width="45" className="img-rounded" src={this.state.profile.picture} alt="" />
                                <div className="user-welcome">
                                  Welcome back, <b>{this.state.profile.nickname}</b>
                                </div>
                                <Link to="/users" className="btn btn-sm btn-black-opacity-alt">
                                  <i className="fa fa-cog" />
                                </Link>
                              </div>
                            </div>
                          ) : (
                            <div id="tab-example-1">
                              <div className="user-profile-sm clearfix">
                                <div className="user-welcome">
                                  <a role="button" tabIndex={0} onClick={auth.login} title="Login" className="user-ico clearfix">
                                    With an account you will enjoy more features.
                                  </a>
                                </div>
                              </div>
                            </div>
                          ) }
                      </Tab.Pane>
                      <Tab.Pane eventKey="second">
                        <div id="tab-example-2">
                          <ul className="notifications-box notifications-box-alt">
                            <li>
                              <span className="bg-purple icon-notification fa fa-users" />
                              <span className="notification-text">This is an error notification</span>
                              <div className="notification-time">
                                a few seconds ago <span className="fa fa-clock-o" />
                              </div>
                              <a className="notification-btn btn btn-xs btn-black tooltip-button" data-placement="right" title="" data-original-title="View details">
                                <i className="fa fa-arrow-right" />
                              </a>
                            </li>
                            <li>
                              <span className="bg-warning icon-notification fa fa-ticket" />
                              <span className="notification-text">This is a warning notification</span>
                              <div className="notification-time">
                                <b>15</b> minutes ago <span className="fa fa-clock-o" />
                              </div>
                              <a className="notification-btn btn btn-xs btn-black tooltip-button" data-placement="right" title="" data-original-title="View details">
                                <i className="fa fa-arrow-right" />
                              </a>
                            </li>
                            <li>
                              <span className="bg-green icon-notification fa fa-random" />
                              <span className="notification-text font-green">A success message example.</span>
                              <div className="notification-time">
                                <b>2 hours</b> ago <span className="fa fa-clock-o" />
                              </div>
                              <a className="notification-btn btn btn-xs btn-black tooltip-button" data-placement="right" title="" data-original-title="View details">
                                <i className="fa fa-arrow-right" />
                              </a>
                            </li>
                          </ul>
                        </div>
                      </Tab.Pane>
                      <Tab.Pane eventKey="third">
                        <div id="tab-example-3">
                          <div className="info-box remove-border">
                            <div className="chart-icon">
                              <div className="infobox-sparkline" />
                            </div>
                            <b>Exchange rate</b>
                            <span className="stats font-size-23">
                              <i className="fa fa-chevron-down font-red" /> 43.79 <span className="font-green">+0.9</span>
                            </span>
                          </div>
                        </div>
                      </Tab.Pane>
                      <Tab.Pane eventKey="fourth">
                        <div id="tab-example-4">
                          <div className="complete-user-profile">
                            <h4>Complete your profile</h4>
                            <div className="progressbar-small progressbar" data-value="75">
                              <div className="progressbar-value bg-azure tooltip-button" title="" data-original-title="45%" />
                            </div><b>Next step:</b> <a title="Verify identity">Verify identity</a>
                          </div>
                        </div>
                      </Tab.Pane>
                    </Tab.Content>
                  </div>
                </Tab.Container>
              </div>

              <div id="sidebar-menu">
                <ul className="sf-js-enabled sf-arrows">
                  { AuthService.loggedIn() ? (
                    <div>
                      <div className="divider-header">Dashboard</div>
                      <li>
                        <Link activeClassName="active" to="/dashboard">
                          <i className="fa fa-tachometer" /> <span>Dashboard</span>
                        </Link>
                      </li>
                      <li className="divider" />
                    </div>
                    ) : null
                  }
                  <div className="divider-header">Resources</div>
                  <li>
                    <Link activeClassName="active" to="/puzzles">
                      <i className="fa fa-puzzle-piece" /> <span>Tsumego Library</span>
                    </Link>
                  </li>
                  <li>
                    <Link activeClassName="active" to="/kifus">
                      <i className="fa fa-book" /> <span>Kifu Library</span>
                    </Link>
                  </li>
                  <li>
                    <Link activeClassName="active" to="/rooms">
                      <i className="fa fa-home" /> <span>Create Room(beta)</span>
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
                  /*
                  <li>
                    <Link activeClassName="active" to="/favorites">
                      <i className="fa fa-heart"></i> <span>Favorites</span>
                    </Link>
                  </li>
                  <li className="divider"></li>
                  */
                  }
                  { AuthService.loggedIn() ? (
                    <div>
                      <li className="divider" />
                      <div className="divider-header">Others</div>
                      <li>
                        <Link activeClassName="active" to="/users">
                          <i className="fa fa-users" /> <span>Profile</span>
                        </Link>
                      </li>
                      <li>
                        <Link activeClassName="active" to="/records">
                          <i className="fa fa-history" /> <span>Records</span>
                        </Link>
                      </li>
                    </div>
                    ) : null
                  }
                </ul>
              </div>
            </div>
          ) : (
            <div>
              <div id="collapse-sidebar-menu">
                <ul className="sf-js-enabled sf-arrows">
                  { AuthService.loggedIn() ? (
                    <div>
                      <li>
                        <Link activeClassName="active" to="/dashboard">
                          <i className="fa fa-tachometer" /> <span>Dashboard</span>
                        </Link>
                      </li>
                      <li className="divider" />
                    </div>
                    ) : null
                  }
                  <li>
                    <Link activeClassName="active" to="/puzzles">
                      <i className="fa fa-puzzle-piece" /> <span>Tsumego Library</span>
                    </Link>
                  </li>
                  <li>
                    <Link activeClassName="active" to="/kifus">
                      <i className="fa fa-book" /> <span>Kifu Library</span>
                    </Link>
                  </li>
                  <li>
                    <Link activeClassName="active" to="/rooms">
                      <i className="fa fa-home" /> <span>Create Room(beta)</span>
                    </Link>
                  </li>
                  {/*
                  <li className="divider"></li>
                  <li>
                    <Link to="/practices">
                      <i className="fa fa-television"></i> <span>Practices</span>
                    </Link>
                  </li>
                  */}
                  { AuthService.loggedIn() ? (
                    <div>
                      <li className="divider" />
                      <li>
                        <Link activeClassName="active" to="/users">
                          <i className="fa fa-users" /> <span>Profile</span>
                        </Link>
                      </li>
                      {/*
                      <li>
                        <Link activeClassName="active" to="/favorites">
                          <i className="fa fa-heart"></i> <span>Favorites</span>
                        </Link>
                      </li>
                      */}
                      <li>
                        <Link activeClassName="active" to="/records">
                          <i className="fa fa-history" /> <span>Records</span>
                        </Link>
                      </li>
                    </div>
                  ) : null
                  }
                </ul>
              </div>
            </div>
          )
        }
      </div>
    );
  }
}
