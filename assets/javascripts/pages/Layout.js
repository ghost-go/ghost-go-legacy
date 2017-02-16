import React, { Component, PropTypes } from 'react'
import Navigation from '../components/Navigation'
import Sidebar from '../components/Sidebar'
import { IntlProvider, FormattedMessage, addLocaleData } from 'react-intl'
//import lang from '../components/lang'

import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'


export default class Layout extends Component {
  constructor(props) {
    super(props)
  }

  render() {

    //let children = null
    //console.log(children)
    //if (this.props.children) {
      //children = React.cloneElement(this.props.children, {
        //auth: this.props.route.auth
      //})
    //}

    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
      {/* <IntlProvider locale={lang.locale} messages={lang.messages}> */}
        <div>
          {
            //<Navigation />
          }
          <Sidebar />
          <section>
          </section>
          { this.props.children }
        </div>
      {/* </IntlProvider> */}
      </MuiThemeProvider>
    )
  }
}
