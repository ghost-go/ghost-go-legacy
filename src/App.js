import React, { Component } from 'react';
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
import Dashboard from './containers/Dashboard';
import History from './containers/History';
import Favorite from './containers/Favorite';
import Callback from './containers/Callback';

import './App.css';
import Auth from './common/Auth';

const auth = new Auth();

const handleAuthentication = (nextState) => {
  if (/access_token|id_token|error/.test(nextState.location.hash)) {
    auth.handleAuthentication();
  }
};

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

class App extends Component {
  static propTypes = {
    auth: PropTypes.instanceOf(Auth).isRequired,
    ui: PropTypes.shape({
      sidebar: PropTypes.shape({
        collpased: PropTypes.bool.isRequired,
      }).isRequired,
    }).isRequired,
  };

  componentWillMount() {
    const { isAuthenticated } = this.props.auth;
    this.setState({ profile: {} });
    setTimeout(() => {
      if (isAuthenticated()) {
        const { userProfile, getProfile } = this.props.auth;
        if (!userProfile) {
          getProfile((err, profile) => {
            this.setState({ profile });
          });
        } else {
          this.setState({ profile: userProfile });
        }
      }
    }, 0);
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <div className="App">
          <Helmet
            htmlAttributes={{ lang: 'en', amp: undefined }}
            title="A modern website to learn Go,Weiqi,Baduk - beta"
            titleTemplate="GhostGo - %s"
          />
          <Navigation auth={this.props.auth} profile={this.state.profile} />
          <Sidebar auth={this.props.auth} profile={this.state.profile} />
          <div
            style={{ marginLeft: this.props.ui.sidebar.collpased !== true ? '235px' : '50px' }}
            className="page-container"
          >
            <Route exact path="/" component={() => <Redirect to="/problems" />} />
            <Route exact path="/" component={Puzzles} />
            {/* <Route exact path="/problems" component={Puzzles} /> */}
            <Route exact path="/puzzles" render={props => <Puzzles auth={auth} profile={this.state.profile} {...props} />} />
            <Route exact path="/problems" render={props => <Puzzles auth={auth} profile={this.state.profile} {...props} />} />
            <Route exact path="/kifus" component={Kifus} />
            <Route path="/kifus/:id" component={Kifu} />
            <Route path="/problems/:id" render={props => <Puzzle auth={auth} profile={this.state.profile} {...props} />} />
            <Route path="/puzzles/:id" render={props => <Puzzle auth={auth} profile={this.state.profile} {...props} />} />
            <Route path="/records" render={props => <History auth={auth} profile={this.state.profile} {...props} />} />
            <Route path="/dashboard" render={props => <Dashboard auth={auth} profile={this.state.profile} {...props} />} />
            <Route path="/favorites" render={props => <Favorite auth={auth} profile={this.state.profile} {...props} />} />
            <Route
              path="/callback"
              component={() => {
                handleAuthentication(this.props);
                return <Callback {...this.props} />;
              }}
            />
          </div>
          <Footer />
        </div>
      </MuiThemeProvider>
    );
  }
}

function select(state) {
  return {
    ui: state.ui,
    auth: state.ui.auth,
  };
}

export default withRouter(connect(select)(App));
