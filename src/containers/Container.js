import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Helmet from 'react-helmet';

import Navigation from '../components/Navigation';
import Sidebar from '../components/Sidebar';

const Footer = () => (
  <div className="footer">
    <span>Source Code:</span>
    <a href="https://github.com/happybai/ghost-go">
      https://github.com/happybai/ghost-go
    </a>
    &nbsp;&nbsp;&nbsp;
    <a href="http://www.w3.org/html/logo/">
      <img src="https://www.w3.org/html/logo/badge/html5-badge-h-solo.png" width="24" height="25" alt="HTML5 Powered" title="HTML5 Powered" />
    </a>
  </div>
);

export default class Container extends Component {

  static childContextTypes = {
    auth: PropTypes.object.isRequired,
  }

  static propTypes = {
    route: PropTypes.shape({
      auth: PropTypes.shape({}),
    }).isRequired,
    children: PropTypes.shape({}),
  }


  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);

    this.state = {
      expanded: true,
    };
  }

  getChildContext() {
    return {
      auth: this.props.route.auth,
    };
  }

  handleClick() {
    this.setState({ expanded: !this.state.expanded });
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <div>
          <Helmet
            htmlAttributes={{ lang: 'en', amp: undefined }}
            title="A modern website to learn Go,Weiqi,Baduk - beta"
            titleTemplate="GhostGo - %s"
          />
          <Navigation
            expanded={this.state.expanded}
            collapseToggle={this.handleClick}
            auth={this.props.route.auth}
          />
          <Sidebar expanded={this.state.expanded} auth={this.props.route.auth} />
          <div style={{ marginLeft: this.state.expanded === true ? '235px' : '50px' }} className="page-container">
            { this.props.children }
          </div>
          <Footer />
        </div>
      </MuiThemeProvider>
    );
  }
}
