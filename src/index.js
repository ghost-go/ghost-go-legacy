/* eslint no-underscore-dangle:  */
/* [2, { "allow": ["__REDUX_DEVTOOLS_EXTENSION__", "_doAuthentication"] }] */

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { ConnectedRouter, routerMiddleware, routerReducer } from 'react-router-redux';

import * as reducers from './reducers/Reducers';
import uiReducers from './reducers/UIReducers';
import App from './App';
import history from './common/History';

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

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root'),
);
