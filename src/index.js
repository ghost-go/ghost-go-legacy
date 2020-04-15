import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import thunkMiddleware from "redux-thunk";
import { createStore, applyMiddleware, combineReducers } from "redux";
import {
  ConnectedRouter,
  routerMiddleware,
  routerReducer,
} from "react-router-redux";

import * as reducers from "./reducers/Reducers";
import uiReducers from "./reducers/UIReducers";
import App from "./App";
import history from "./common/History";

import { ApolloProvider } from "@apollo/client";
import { client } from "./common/ApolloClient.ts";

const historyMiddleware = routerMiddleware(history);

const reducer = combineReducers({
  ...reducers,
  players: reducers.topPlayers,
  router: routerReducer,
  ui: uiReducers,
});

const middlewares = [thunkMiddleware, historyMiddleware];
const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);
const store = createStoreWithMiddleware(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </Provider>
  </ApolloProvider>,
  document.getElementById("root")
);
