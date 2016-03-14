import ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from 'react-router'
import Games from './pages/games.js'
import Puzzles from './pages/puzzles.js'

ReactDOM.render((
  <Router history={hashHistory}>
    <Route path="/" component={Games}/>
    <Route path="/games" component={Games}/>
    <Route path="/puzzles" component={Puzzles}/>
  </Router>
), document.querySelector('.app'))
