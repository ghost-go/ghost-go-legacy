import React, { Component } from 'react'
import AuthService from '../utils/AuthService'
import Navigation from '../presentations/Navigation'
import Sidebar from '../presentations/Sidebar'
import { IntlProvider, FormattedMessage, addLocaleData } from 'react-intl'
//import lang from '../components/lang'

import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'


export default class Container extends Component {

  render() {
    let children = null
    if (this.props.children) {
      children = React.cloneElement(this.props.children, {
        auth: this.props.route.auth //sends auth instance from route to children
      })
    }
    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
      {/* <IntlProvider locale={lang.locale} messages={lang.messages}> */}
        <div>
          <Navigation auth={this.props.route.auth} />
          <section>
            <Sidebar />
          </section>
          { children }
        </div>
      {/* </IntlProvider> */}
      </MuiThemeProvider>
    )
  }

}
