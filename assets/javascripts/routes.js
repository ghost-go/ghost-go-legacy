import ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from 'react-router'
import Games from './pages/Games.js'
import Puzzles from './pages/Puzzles.js'

ReactDOM.render((
  <Router history={hashHistory}>
    <Route path="/" component={Games}/>
    <Route path="/games" component={Games}/>
    <Route path="/puzzles" component={Puzzles}/>
  </Router>
), document.querySelector('.app'))
