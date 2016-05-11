import React, { Component, PropTypes } from 'react'
import Navigation from '../presentations/Navigation'
import Sidebar from '../presentations/Sidebar'
import { IntlProvider, FormattedMessage, addLocaleData } from 'react-intl'
import lang from '../components/lang'

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export default class Layout extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <IntlProvider locale={lang.locale} messages={lang.messages}>
          <div>
            <Navigation />
            <section>
              <Sidebar />
            </section>
            { this.props.children }
          </div>
        </IntlProvider>
      </MuiThemeProvider>
    )
  }
}
