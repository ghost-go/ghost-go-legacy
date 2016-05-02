import React from 'react'
import ReactDOM from 'react-dom'
import thunkMiddleware from 'redux-thunk'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { Router, Route, hashHistory, browserHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

import Puzzles from './pages/Puzzles'
import Games from './pages/Games'
import Kifus from './pages/Kifus'
import Sign from './pages/Sign'

import { kifus, kifu } from './reducers/KifuReducers'
import {authStateReducer} from 'redux-auth'

const reducer = combineReducers({
  authStateReducer,
  kifus,
  kifu,
  routing: routerReducer
})

const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware
)(createStore)

const store = createStoreWithMiddleware(reducer)

const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render((
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={Games}/>
      <Route path="/games" component={Games}/>
      <Route path="/kifus/:id" component={Kifus}/>
      <Route path="/puzzles" component={Puzzles}/>
      <Route path="/signup" component={Sign}/>
    </Router>
  </Provider>
), document.querySelector('.app'))
