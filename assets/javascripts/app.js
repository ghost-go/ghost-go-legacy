import React from 'react'
import {Provider} from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import { createStore, compose, applyMiddleware, combineReducers } from 'redux'
import { Router, Route, hashHistory, browserHistory, IndexRedirect } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

import { kifus, kifu } from './reducers/KifuReducers'
import { puzzles, puzzle } from './reducers/PuzzleReducers'

import Puzzles from './pages/Puzzles'
import Puzzle from './pages/Puzzle'
import Kifus from './pages/Kifus'
import Kifu from './pages/Kifu'
import Sign from './pages/Sign'
import Login from './pages/Login'
import User from './pages/User'
import Container from './pages/Container'

import AuthService from './utils/AuthService'

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
const options = {
  languageDictionary: {
    title: ''
  },
  theme: {
    primaryColor: 'black',
    logo: 'http://s3-ap-northeast-1.amazonaws.com/ghost-go/logo2x.png'
  }
}
const auth = new AuthService(__AUTH0_CLIENT_ID__, __AUTH0_DOMAIN__, options)

const requireAuth = (nextState, replace) => {
  if (!auth.loggedIn()) {
    replace({ pathname: '/login' })
  }
}
// create your main reducer
const reducer = combineReducers({
  kifus,
  kifu,
  puzzles,
  puzzle,
  routing: routerReducer
  // ... add your own reducers here
})

const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware
)(createStore)

const store = createStoreWithMiddleware(reducer)

const history = syncHistoryWithStore(browserHistory, store)

// a single function can be used for both client and server-side rendering.
// when run from the server, this function will need to know the cookies and
// url of the current request. also be sure to set `isServer` to true.
export function initialize({cookies, isServer, currentLocation} = {}) {
  // configure redux-auth BEFORE rendering the page
  return (
    <Provider store={store} key="provider">
      <div>
        <Router history={history}>
          <Route path="/" component={Container} auth={auth}>
            <IndexRedirect to="/puzzles" />
            <Route path="/games" component={Kifus} />
            <Route path="/kifus/:id" component={Kifu} />
            <Route path="/puzzles" component={Puzzles} />
            <Route path="/puzzles/:id" component={Puzzle} />
            <Route path="/users" component={User} />
          </Route>
        </Router>
        <App>
        </App>
      </div>
    </Provider>
  )

}
