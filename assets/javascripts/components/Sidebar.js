import React, { Component, PropTypes as T } from 'react'
import { Tabs, Tab, Row, Col, Nav, NavItem } from 'react-bootstrap'

export default class Sidebar extends Component {

  static propTypes = {
    expanded: T.bool.isRequired,
  }

  static defaultProps = {
    expanded: false,
  }

  state = { selectedIndex: 0 }

  getTabClasses(index) {
    let classes = ['tab-pane', 'clearfix', 'fade']
    if (index === this.state.selectedIndex) {
      classes.push('active', 'in')
    }
    return classes.join(' ')
  }

  getTabHeaderClasses(index) {
    if (index === this.state.selectedIndex) {
      return 'active'
    }
  }

  handleTouchTap(index) {
    this.setState({ selectedIndex: index })
  }


  render() {
    return (
      <div id="page-sidebar" className="rm-transition">
        <div className="page-sidebar-wrapper">
          <div id="sidebar-top">
            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
              <div>
                <Nav bsStyle="pills" justified="true" stacked>
                  <NavItem eventKey="first">
                    <a href="#tab-example-1" onTouchTap={this.handleTouchTap.bind(this, 0)} data-toggle="tab">
                      <i className="fa fa-users fa-lg"></i>
                    </a>
                  </NavItem>
                  <NavItem eventKey="second">
                    <a href="#tab-example-2" onTouchTap={this.handleTouchTap.bind(this, 1)} data-toggle="tab">
                      <i className="fa fa-bell fa-lg"></i>
                    </a>
                  </NavItem>
                  <NavItem eventKey="third">
                    <a href="#tab-example-3" onTouchTap={this.handleTouchTap.bind(this, 2)} data-toggle="tab">
                      <span className="small-badge bg-red"></span>
                      <i className="fa fa-bar-chart-o fa-lg"></i>
                    </a>
                  </NavItem>
                  <NavItem eventKey="fourth">
                    <a href="#tab-example-4" onTouchTap={this.handleTouchTap.bind(this, 3)} data-toggle="tab">
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
                          <i className="glyph-icon icon-cog"></i>
                        </a>
                      </div>
                    </div>
                  </Tab.Pane>
                  <Tab.Pane eventKey="second">
                    <div className={this.getTabClasses(1)} id="tab-example-2">
                      <ul className="notifications-box notifications-box-alt">
                        <li>
                          <span className="bg-purple icon-notification glyph-icon icon-users"></span>
                          <span className="notification-text">This is an error notification</span>
                          <div className="notification-time">a few seconds ago <span className="glyph-icon icon-clock-o"></span></div><a href="#" className="notification-btn btn btn-xs btn-black tooltip-button" data-placement="right" title="" data-original-title="View details"><i className="glyph-icon icon-arrow-right"></i></a></li><li><span className="bg-warning icon-notification glyph-icon icon-ticket"></span> <span className="notification-text">This is a warning notification</span><div className="notification-time"><b>15</b> minutes ago <span className="glyph-icon icon-clock-o"></span></div><a href="#" className="notification-btn btn btn-xs btn-black tooltip-button" data-placement="right" title="" data-original-title="View details"><i className="glyph-icon icon-arrow-right"></i></a></li><li><span className="bg-green icon-notification glyph-icon icon-random"></span> <span className="notification-text font-green">A success message example.</span>
                          <div className="notification-time">
                            <b>2 hours</b> ago <span className="glyph-icon icon-clock-o"></span>
                          </div>
                          <a href="#" className="notification-btn btn btn-xs btn-black tooltip-button" data-placement="right" title="" data-original-title="View details">
                            <i className="glyph-icon icon-arrow-right"></i>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </Tab.Pane>
                  <Tab.Pane eventKey="third">
                    <div className={this.getTabClasses(2)} id="tab-example-3">
                      <div className="info-box remove-border">
                        <div className="chart-icon">
                          <div className="infobox-sparkline">
                          </div>
                        </div>
                        <b>Exchange rate</b>
                        <span className="stats font-size-23">
                          <i className="glyph-icon icon-chevron-down font-red"></i> 43.79 <span className="font-green">+0.9</span>
                        </span>
                      </div>
                    </div>
                  </Tab.Pane>
                  <Tab.Pane eventKey="fourth">
                    <div className={this.getTabClasses(3)} id="tab-example-4">
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
        </div>
      </div>
    )
  }
}
