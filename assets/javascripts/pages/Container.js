import React, { Component, PropTypes as T } from 'react'
import Navigation from '../components/Navigation'
import Sidebar from '../components/Sidebar'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Helmet from 'react-helmet'

const Footer = () => <div className='footer'>
  Source Code:  <a href="https://github.com/happybai/ghost-go">
    https://github.com/happybai/ghost-go
  </a>
</div>

export default class Container extends Component {

  static childContextTypes = {
    auth: T.object.isRequired,
  }

  static propTypes = {
    route: T.object.isRequired,
    children: T.object
  }

  state = {
    expanded: true,
  }

  getChildContext() {
    return {
      auth: this.props.route.auth,
    }
  }

  handleClick() {
    this.setState({ expanded: !this.state.expanded })
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <div>
          <Helmet
            htmlAttributes={{lang: 'en', amp: undefined}}
            title="A modern website to learn Go,Weiqi,Baduk - beta"
            titleTemplate="GhostGo - %s"
          />
          <Navigation expanded={this.state.expanded} collapseToggle={::this.handleClick} auth={this.props.route.auth} />
          <Sidebar expanded={this.state.expanded} auth={this.props.route.auth} />
          <div style={{marginLeft: this.state.expanded === true ? '235px' : '50px'}} className="page-container">
            { this.props.children }
          </div>
          <Footer />
        </div>
      </MuiThemeProvider>
    )
  }

}
