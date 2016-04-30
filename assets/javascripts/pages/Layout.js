import React, { Component, PropTypes } from 'react'
import Navigation from '../presentations/Navigation'
import Sidebar from '../presentations/Sidebar'
import { IntlProvider, FormattedMessage, addLocaleData } from 'react-intl'
import lang from '../components/lang'

export default class Layout extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <IntlProvider locale={lang.locale} messages={lang.messages}>
        <div>
          <Navigation />
          <section>
            <Sidebar />
          </section>
          { this.props.children }
        </div>
      </IntlProvider>
    )
  }
}
