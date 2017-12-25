/* eslint no-underscore-dangle:  */
/* [2, { "allow": ["__REDUX_DEVTOOLS_EXTENSION__", "_doAuthentication"] }] */

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Router, Route, browserHistory, IndexRedirect } from 'react-router';
import { routerMiddleware, syncHistoryWithStore, routerReducer } from 'react-router-redux';
import { reducer as uiReducer } from 'redux-ui';
import injectTapEventPlugin from 'react-tap-event-plugin';

import * as reducers from './reducers/Reducers';
import Puzzles from './containers/Puzzles';
import Puzzle from './containers/Puzzle';
import Kifus from './containers/Kifus';
import Kifu from './containers/Kifu';
import Practices from './containers/Practices';
import Practice from './containers/Practice';
import User from './containers/User';
import Container from './containers/Container';
import History from './containers/History';
import Dashboard from './containers/Dashboard';
import Rooms from './containers/Rooms';
import Room from './containers/Room';
import Favorite from './containers/Favorite';
import AuthService from './common/AuthService';
import App from './App';
import './index.css';

const AUTH0_CLIENT_ID = 'GydWO2877MMcpteCqgQEWSFGqtQOCiP5';
const AUTH0_DOMAIN = 'ghostgo.auth0.com';
const auth = new AuthService(AUTH0_CLIENT_ID, AUTH0_DOMAIN);

// create your main reducer
const historyMiddleware = routerMiddleware(browserHistory);
const reducer = combineReducers({
  ...reducers,
  ui: uiReducer,
  players: reducers.topPlayers,
  routing: routerReducer,
});

const middlewares = [thunkMiddleware, historyMiddleware];
if (process.env.NODE_ENV === 'development') {
  // const createLogger = require('redux-logger')
  // middlewares.push(createLogger())
}
const createStoreWithMiddleware = applyMiddleware(
  ...middlewares,
  // thunkMiddleware,
  // historyMiddleware,
)(createStore);
const store = createStoreWithMiddleware(
  reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
// const store = createStoreWithMiddleware(
// rootReducer,
// window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

const history = syncHistoryWithStore(browserHistory, store);

injectTapEventPlugin();

const hashString = window.location.hash;
if (hashString) {
  const idString = '&id_token';
  const firstIndex = hashString.indexOf(idString) + idString.length + 1;
  const lastIndex = hashString.indexOf('&token_type=');
  const idToken = hashString.substring(firstIndex, lastIndex);
  AuthService.setToken(idToken);
  auth.doAuthentication({
    idToken,
  });
}

ReactDOM.render(
  <Provider store={store} key="provider">
    <div>
      <Router history={history}>
        <Route path="/" component={Container} auth={auth}>
          <IndexRedirect to="/puzzles" />
          <Route path="/kifus" component={Kifus} />
          <Route path="/kifus/:id" component={Kifu} />
          <Route path="/puzzles" component={Puzzles} />
          <Route path="/puzzles/:id" component={Puzzle} />
          <Route path="/practices" component={Practices} />
          <Route path="/practices/:id" component={Practice} />
          <Route path="/practice_records/:id" component={Practice} />
          <Route path="/users" component={User} />
          <Route path="/records" component={History} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/favorites" component={Favorite} />
          <Route path="/rooms" component={Rooms} />
          <Route path="/rooms/:id" component={Room} />
        </Route>
      </Router>
      <App />
    </div>
  </Provider>,
  document.getElementById('root'),
);
