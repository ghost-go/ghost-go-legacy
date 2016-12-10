import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import { createStore, compose, applyMiddleware, combineReducers } from 'redux'
import { Router, Route, browserHistory, IndexRedirect} from 'react-router'
import { routerMiddleware, syncHistoryWithStore, routerReducer } from 'react-router-redux'

import { puzzles,
  puzzle,
  puzzleNext,
  practice,
  rating,
  //puzzleRecord,
  kifus,
  kifu,
  topPlayers,
  puzzleFilter,
  kifuFilter,
  rangeFilter,
} from './reducers/Reducers'

import Puzzles from './pages/Puzzles'
import Puzzle from './pages/Puzzle'
import Kifus from './pages/Kifus'
import Kifu from './pages/Kifu'
import Practices from './pages/Practices'
import Practice from './pages/Practice'
import Login from './pages/Login'
import User from './pages/User'
import Container from './pages/Container'

import AuthService from './utils/AuthService'
import injectTapEventPlugin from 'react-tap-event-plugin'

require('../stylesheets/base.scss')
require('../stylesheets/home.scss')
require('../stylesheets/navigation.scss')

class App extends React.Component {
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    )
  } }

const __AUTH0_CLIENT_ID__ = 'GydWO2877MMcpteCqgQEWSFGqtQOCiP5'
const __AUTH0_DOMAIN__ = 'ghostgo.auth0.com'
const auth = new AuthService(__AUTH0_CLIENT_ID__, __AUTH0_DOMAIN__)

// create your main reducer
const historyMiddleware = routerMiddleware(browserHistory)
const reducer = combineReducers({
  // ... add your own reducers here
  kifus,
  kifu,
  puzzles,
  puzzle,
  practice,
  rating,
  //puzzleRecord,
  puzzleFilter,
  kifuFilter,
  rangeFilter,
  players: topPlayers,
  routing: routerReducer,
})

const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware,
  historyMiddleware
)(createStore)

const store = createStoreWithMiddleware(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
//const store = createStoreWithMiddleware(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

const history = syncHistoryWithStore(browserHistory, store)

injectTapEventPlugin()

const hashString = window.location.hash;
if (hashString) {
  const idString = '&id_token';
  const firstIndex = hashString.indexOf(idString) + idString.length + 1;
  const lastIndex = hashString.indexOf('&token_type=');
  let idToken = hashString.substring(firstIndex, lastIndex)
  auth.setToken(idToken)
  auth._doAuthentication({
    idToken: idToken
  })
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
          <Route path="/puzzles/:id" component={Puzzle}  />
          <Route path="/practices" component={Practices}  />
          <Route path="/parctice" component={Practice} />
          <Route path="/users" component={User} />
        </Route>
      </Router>
      <App>
      </App>
    </div>
  </Provider>,
  document.querySelector('.app')
)
