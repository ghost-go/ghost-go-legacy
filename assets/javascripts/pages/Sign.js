import React from 'react'
import { IntlProvider, FormattedMessage, addLocaleData } from 'react-intl'
import lang from '../components/lang'

import Layout from './Layout'

export default React.createClass({
  render() {
    let signWrapperStyle = {
      width: '400px',
      margin: '0 auto',
      marginTop: '30px'
    }
    return (
      <Layout>
        <div style={signWrapperStyle} className="sign-wrapper">
        </div>
      </Layout>
    )
  }
})

