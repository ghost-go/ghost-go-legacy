import React from 'react'
import { IntlProvider, FormattedMessage, addLocaleData } from 'react-intl'
import lang from '../components/lang'

import Layout from './Layout'
import { EmailSignUpForm,
         EmailSignInForm,
         OAuthSignInButton,
         SignOutButton,
         DestroyAccountButton,
         RequestPasswordResetForm,
         UpdatePasswordForm } from 'redux-auth/bootstrap-theme'

export default React.createClass({
  render() {
    return (
      <Layout>
        <EmailSignUpForm />
        <EmailSignInForm />
        <OAuthSignInButton />
        <SignOutButton />
        <DestroyAccountButton />
        <RequestPasswordResetForm />
        <UpdatePasswordForm />
      </Layout>
    )
  }
})

