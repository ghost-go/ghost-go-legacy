import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import { withRouter } from 'react-router';
import Helmet from 'react-helmet';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Navigation from './components/Navigation';
import Sidebar from './components/Sidebar';
import Puzzles from './containers/Puzzles';
import Puzzle from './containers/Puzzle';
import Kifus from './containers/Kifus';
import Kifu from './containers/Kifu';
import User from './containers/User';
import Dashboard from './containers/Dashboard';
import History from './containers/History';
import Favorite from './containers/Favorite';

import './App.css';
import AuthService from './common/AuthService';

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

const App = props => (
  <MuiThemeProvider muiTheme={getMuiTheme()}>
    <div className="App">
      <Helmet
        htmlAttributes={{ lang: 'en', amp: undefined }}
        title="A modern website to learn Go,Weiqi,Baduk - beta"
        titleTemplate="GhostGo - %s"
      />
      <Navigation auth={props.auth} />
      <Sidebar auth={props.auth} />
      <div
        style={{ marginLeft: props.ui.sidebar.collpased !== true ? '235px' : '50px' }}
        className="page-container"
      >
        <Route exact path="/" component={() => <Redirect to="/puzzles" />} />
        <Route exact path="/" component={Puzzles} />
        <Route exact path="/puzzles" component={Puzzles} />
        <Route exact path="/kifus" component={Kifus} />
        <Route path="/puzzles/:id" component={Puzzle} />
        <Route path="/kifus/:id" component={Kifu} />
        <Route path="/users" component={User} />
        <Route path="/records" component={History} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/favorites" component={Favorite} />
      </div>
      <Footer />
    </div>
  </MuiThemeProvider>
);

App.propTypes = {
  auth: PropTypes.instanceOf(AuthService).isRequired,
  ui: PropTypes.shape({
    sidebar: PropTypes.shape({
      collpased: PropTypes.bool.isRequired,
    }).isRequired,
  }).isRequired,
};

function select(state) {
  return {
    ui: state.ui,
    auth: state.ui.auth,
  };
}

export default withRouter(connect(select)(App));
