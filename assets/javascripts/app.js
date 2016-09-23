import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import { createStore, compose, applyMiddleware, combineReducers } from 'redux'
import { Router, Route, browserHistory, IndexRedirect} from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

import { kifus, kifu } from './reducers/KifuReducers'
import { puzzles, puzzle } from './reducers/PuzzleReducers'

import Puzzles from './pages/Puzzles'
import Puzzle from './pages/Puzzle'
import Kifus from './pages/Kifus'
import Kifu from './pages/Kifu'
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
  }
}

const __AUTH0_CLIENT_ID__ = 'GydWO2877MMcpteCqgQEWSFGqtQOCiP5'
const __AUTH0_DOMAIN__ = 'ghostgo.auth0.com'
const auth = new AuthService(__AUTH0_CLIENT_ID__, __AUTH0_DOMAIN__)

// create your main reducer
const reducer = combineReducers({
  routing: routerReducer,
  // ... add your own reducers here
  kifus,
  kifu,
  puzzles,
  puzzle,
})

const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware
)(createStore)

const store = createStoreWithMiddleware(reducer)

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
          <Route path="/games" component={Kifus} />
          <Route path="/kifus/:id" component={Kifu} />
          <Route path="/puzzles" component={Puzzles} />
          <Route path="/puzzles/:id" component={Puzzle}  />
          <Route path="/users" component={User} />
        </Route>
      </Router>
      <App>
      </App>
    </div>
  </Provider>,
  document.querySelector('.app')
)
