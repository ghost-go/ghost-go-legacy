import React from 'react'
import {Provider} from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import { createStore, compose, applyMiddleware, combineReducers } from 'redux'
import { Router, Route, hashHistory, browserHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

import { kifus, kifu } from './reducers/KifuReducers'
import { puzzles, puzzle } from './reducers/PuzzleReducers'

import Puzzles from './pages/Puzzles'
import Puzzle from './pages/Puzzle'
import Kifus from './pages/Kifus'
import Kifu from './pages/Kifu'
import Sign from './pages/Sign'

class App extends React.Component {
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    )
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
          <Route path="/" component={Puzzles}/>
          <Route path="/games" component={Kifus}/>
          <Route path="/kifus/:id" component={Kifu}/>
          <Route path="/puzzles" component={Puzzles}/>
          <Route path="/puzzles/:id" component={Puzzle}/>
          <Route path="/signup" component={Sign}/>
        </Router>
        <App>
        </App>
      </div>
    </Provider>
  )

}