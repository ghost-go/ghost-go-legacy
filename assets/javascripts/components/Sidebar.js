import React, { Component, PropTypes as T } from 'react'
import { Tabs, Tab, Row, Col, Nav, NavItem } from 'react-bootstrap'

export default class Sidebar extends Component {

  static propTypes = {
    expanded: T.bool.isRequired,
  }

  static defaultProps = {
    expanded: false,
  }

  //state = { selectedIndex: 0 }

  //handleTouchTap(index) {
  //this.setState({ selectedIndex: index })
  //}


  render() {
    return (
      <div id="page-sidebar" className="rm-transition">
        <div className="page-sidebar-wrapper">
          <div id="sidebar-top">
            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
              <div>
                <Nav bsStyle="pills" justified="true" stacked>
                  <NavItem eventKey="first">
                    <a href="#tab-example-1" data-toggle="tab">
                      <i className="fa fa-users fa-lg"></i>
                    </a>
                  </NavItem>
                  <NavItem eventKey="second">
                    <a href="#tab-example-2" data-toggle="tab">
                      <i className="fa fa-bell fa-lg"></i>
                    </a>
                  </NavItem>
                  <NavItem eventKey="third">
                    <a href="#tab-example-3" data-toggle="tab">
                      <span className="small-badge bg-red"></span>
                      <i className="fa fa-bar-chart-o fa-lg"></i>
                    </a>
                  </NavItem>
                  <NavItem eventKey="fourth">
                    <a href="#tab-example-4" data-toggle="tab">
                      <i className="fa fa-cogs fa-lg"></i>
                    </a>
                  </NavItem>
                </Nav>
                <Tab.Content animation>
                  <Tab.Pane eventKey="first">
                    <div id="tab-example-1">
                      <div className="user-profile-sm clearfix">
                        <img width="45" className="img-rounded" src="assets/images/gravatar.jpg" alt="" />
                        <div className="user-welcome">
                          Welcome back, <b>John Appleseed</b>
                        </div>
                        <a href="#" title="" className="btn btn-sm btn-black-opacity-alt">
                          <i className="fa fa-cog"></i>
                        </a>
                      </div>
                    </div>
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
              <li>
                <a href="index.html" title="Dashboard">
                  <i className="fa fa-tachometer"></i> <span>Dashboard</span>
                </a>
              </li>
              <li className="divider"></li>
              <div className="divider-header">Resources</div>
              <li>
                <a href="index.html" title="Tsumego Library">
                  <i className="fa fa-television"></i> <span>Tsumego Library</span>
                </a>
              </li>
              <li>
                <a href="index.html" title="Kifu Library">
                  <i className="fa fa-television"></i> <span>Kifu Library</span>
                </a>
              </li>
              <li className="divider"></li>
              <div className="divider-header">Practices</div>
              <li>
                <a href="index.html" title="Practices">
                  <i className="fa fa-television"></i> <span>Practices</span>
                </a>
              </li>
              <li className="divider"></li>
              <div className="divider-header">Settings</div>
              <li>
                <a href="index.html" title="Profile">
                  <i className="fa fa-television"></i> <span>Profile</span>
                </a>
              </li>
              <li>
                <a href="index.html" title="History">
                  <i className="fa fa-television"></i> <span>History</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
