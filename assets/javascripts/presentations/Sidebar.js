import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import { Link } from 'react-router'

export default class Sidebar extends Component {

  render() {
    return (
      <div className="left-side sticky-left-side">
        <div className="logo">
          <a href="#"><img src="images/logo2.png" width="220px" alt="" /></a>
        </div>

        <div className="logo-icon text-center">
          <a href="#"><img src="images/logo_sm.png" width="35px" height="35px" alt="" /></a>
        </div>

        <div className="left-side-inner">
          <ul className="nav nav-pills nav-stacked custom-nav">
            <li className="menu-list nav-active"><a href="#"><i className="fa fa-th-list"></i> <span>Servers Directory</span></a>
              <ul className="sub-menu-list">
                <li className="active">
                  <Link to="/games" activeClassName="active">
                    <FormattedMessage
                      id="app.nav.menu.games"
                      defaultMessage="Games"
                    />
                  </Link>
                </li>
                <li className="active">
                  <Link to="/puzzles" activeClassName="active">
                    <FormattedMessage
                      id='app.nav.menu.puzzles'
                      defaultMessage="Puzzles"
                    />
                  </Link>
                </li>
                <li className="active">
                  <Link to="/help" activeClassName="active">
                    <FormattedMessage
                      id='app.nav.menu.help'
                      defaultMessage="Help"
                    />
                  </Link>
                </li>
                <li className="active">
                  <Link to="/me" activeClassName="active">
                    <FormattedMessage
                      id='app.nav.menu.me'
                      defaultMessage="Me"
                    />
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

