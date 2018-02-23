/* eslint no-underscore-dangle:  */
/* [2, { "allow": ["__REDUX_DEVTOOLS_EXTENSION__", "_doAuthentication"] }] */

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import createHistory from 'history/createBrowserHistory';
import { ConnectedRouter, routerMiddleware, routerReducer } from 'react-router-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';

import * as reducers from './reducers/Reducers';
import uiReducers from './reducers/UIReducers';
import AuthService from './common/AuthService';
import App from './App';


const history = createHistory();
const historyMiddleware = routerMiddleware(history);

const reducer = combineReducers({
  ...reducers,
  players: reducers.topPlayers,
  router: routerReducer,
  ui: uiReducers,
});

const middlewares = [thunkMiddleware, historyMiddleware];
if (process.env.NODE_ENV === 'development') {
  // const createLogger = require('redux-logger')
  // middlewares.push(createLogger())
}
const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);
const store = createStoreWithMiddleware(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

injectTapEventPlugin();

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root'),
);
