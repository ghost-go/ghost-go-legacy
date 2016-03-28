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

import { kifus, kifu } from './reducers/KifuReducers'

const reducer = combineReducers({
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
    </Router>
  </Provider>
), document.querySelector('.app'))
