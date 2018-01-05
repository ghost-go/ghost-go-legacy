import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Helmet from 'react-helmet';
import {
  BrowserRouter as Router,
  Route,
  Link,
} from 'react-router-dom';

import Navigation from '../components/Navigation';
import Sidebar from '../components/Sidebar';
import Puzzle from './Puzzle';


export default class Container extends Component {
  static childContextTypes = {
    auth: PropTypes.object.isRequired,
  }

  static propTypes = {
    children: PropTypes.shape({}).isRequired,
    auth: PropTypes.shape({}).isRequired,
  }


  constructor() {
    super();

    this.state = {
      expanded: false,
    };

    this.handleClick = this.handleClick.bind(this);
  }

  getChildContext() {
    return {
      auth: this.props.auth,
    };
  }

  handleClick() {
    this.setState({ expanded: !this.state.expanded });
  }

  render() {
    return (
      <Router>
        <MuiThemeProvider muiTheme={getMuiTheme()}>
          <div
            style={{ marginLeft: this.state.expanded === true ? '235px' : '50px' }}
            className="page-container"
          >
            <Route path="/puzzles" render={Puzzle} />
            { this.props.children }
          </div>
        </MuiThemeProvider>
      </Router>
    );
  }
}

// <MuiThemeProvider muiTheme={getMuiTheme()}>
//   <div>
//     <Sidebar expanded={this.state.expanded} auth={this.props.auth} />
//     <div style={{ marginLeft: this.state.expanded === true ? '235px' : '50px' }}
//          className="page-container">
//       <Route path="/puzzles" render={Puzzle} />
//       { this.props.children }
//     </div>
//     <Footer />
//   </div>
// </MuiThemeProvider>
