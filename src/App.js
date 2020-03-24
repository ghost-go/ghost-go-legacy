import React, { Component, Suspense } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import { withRouter } from 'react-router';
import Helmet from 'react-helmet';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import ActionCable from 'actioncable';

import Navigation from './components/Navigation';
import Sidebar from './components/Sidebar';
import MessageBox from './components/MessageBox';
import Problems from './containers/Problems';
import Problem from './containers/Problem';
import Kifus from './containers/Kifus';
import Kifu from './containers/Kifu';
import Dashboard from './containers/Dashboard';
import History from './containers/History';
import Favorite from './containers/Favorite';
import Callback from './containers/Callback';
// import { WS_DOMAIN } from './common/Config';
// import { setRoom, setMessage, openMessageBox } from './actions/Actions';
// import { a1ToSGF } from './common/Helper';

import './App.css';
import Auth from './common/Auth';

const auth = new Auth();
// const cable = ActionCable.createConsumer(`wss://${DOMAIN}/cable`);
// const cable = ActionCable.createConsumer(`${WS_DOMAIN}/cable`);

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
    dispatch: PropTypes.func.isRequired,
    message: PropTypes.shape({
      type: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      duration: PropTypes.number.isRequired,
      open: PropTypes.bool.isRequired,
    }).isRequired,
  };

  componentWillMount() {
    const { isAuthenticated } = this.props.auth;
    const { dispatch } = this.props;
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

    // const room = cable.subscriptions.create({
    //   channel: 'GlobalChannel',
    //   room: btoa(Math.random()).substr(6, 6),
    // }, {
    //   received: (data) => {
    //     // eslint-disable-next-line no-console
    //     console.log(data);
    //     dispatch(setMessage({
    //       title: `The calculating task for P-${data.puzzle_id} has been done`,
    //       text: 'Click the message will show the AI result',
    //       action: `/problems/${data.puzzle_id}?moves=${data.moves}&genmove=${a1ToSGF(data.genmove)}`,
    //     }));
    //     dispatch(openMessageBox());
    //   },
    // });
    // dispatch(setRoom(room));
  }

  render() {
    const { profile } = this.state;
    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <div className="App">
          <Helmet
            htmlAttributes={{ lang: 'en', amp: undefined }}
            title="A modern website to learn Go,Weiqi,Baduk - beta"
            titleTemplate="GhostGo - %s"
          />
          <Navigation auth={auth} profile={profile} />
          <Sidebar auth={auth} profile={profile} />
          <MessageBox />
          <div
            style={{ marginLeft: this.props.ui.sidebar.collpased !== true ? '235px' : '50px' }}
            className="page-container"
          >
            <Route exact path="/" component={() => <Redirect to="/problems" />} />
            <Route exact path="/" component={Problems} />
            {/* <Route exact path="/problems" component={Puzzles} /> */}
            <Suspense fallback={
              <div className="loading">
                <i className="fa fa-spinner fa-pulse fa-fw" />
              </div>
            }>
              <Route exact path="/puzzles" render={props => <Problems auth={auth} profile={this.state.profile} {...props} />} />
              <Route exact path="/problems" render={props => <Problems auth={auth} profile={this.state.profile} {...props} />} />
            </Suspense>
            <Route exact path="/kifus" component={Kifus} />
            <Route path="/kifus/:id" component={Kifu} />
            <Route path="/problems/:id" render={props => <Problem auth={auth} profile={this.state.profile} {...props} />} />
            <Route path="/puzzles/:id" render={props => <Problem auth={auth} profile={this.state.profile} {...props} />} />
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
    message: state.message,
  };
}

export default withRouter(connect(select)(App));
