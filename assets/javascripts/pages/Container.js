import React, { Component, PropTypes as T } from 'react'
import Navigation from '../components/Navigation'
import Sidebar from '../components/Sidebar'
import Footer from '../presentations/Footer'
import { IntlProvider, FormattedMessage, addLocaleData } from 'react-intl'
//import lang from '../components/lang'

import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'


export default class Container extends Component {

  static propTypes = {
    route: T.object.isRequired,
    children: T.object
  }

  state = {
    expanded: true,
  }

  handleClick() {
    this.setState({ expanded: !this.state.expanded })
  }

  render() {
    let children = null
    if (this.props.children) {
      children = React.cloneElement(this.props.children, {
        auth: this.props.route.auth, //sends auth instance from route to children
        expanded: this.state.expanded
      })
    }
    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
      {/* <IntlProvider locale={lang.locale} messages={lang.messages}> */}
        <div>
          <svg id="svg-source" style={{display: 'none'}} version="1.1" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <symbol id="icon-star-empty" viewBox="0 0 1024 1024">
                <title>star-empty</title>
                <path className={'path1'} d="M1024 397.050l-353.78-51.408-158.22-320.582-158.216 320.582-353.784 51.408 256 249.538-60.432 352.352 316.432-166.358 316.432 166.358-60.434-352.352 256.002-249.538zM512 753.498l-223.462 117.48 42.676-248.83-180.786-176.222 249.84-36.304 111.732-226.396 111.736 226.396 249.836 36.304-180.788 176.222 42.678 248.83-223.462-117.48z"></path>
              </symbol>
              <symbol id="icon-star-full" viewBox="0 0 1024 1024">
                <title>star-full</title>
                <path className={'path1'} d="M1024 397.050l-353.78-51.408-158.22-320.582-158.216 320.582-353.784 51.408 256 249.538-60.432 352.352 316.432-166.358 316.432 166.358-60.434-352.352 256.002-249.538z"></path>
              </symbol>
            </defs>
          </svg>
          <Navigation expanded={this.state.expanded} onClick={::this.handleClick} auth={this.props.route.auth} />
          <Sidebar expanded={this.state.expanded} />
          <div>
            { children }
          </div>
          <Footer />
        </div>
      {/* </IntlProvider> */}
      </MuiThemeProvider>
    )
  }

}
