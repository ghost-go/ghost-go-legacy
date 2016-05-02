import React from 'react'
import { IntlProvider, FormattedMessage, addLocaleData } from 'react-intl'
import lang from '../components/lang'

import Layout from './Layout'
import { EmailSignUpForm } from 'redux-auth'

export default React.createClass({
  render() {
    return (
      <Layout>
        <EmailSignUpForm />
      </Layout>
    )
  }
})

