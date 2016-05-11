import React from 'react'
import { IntlProvider, FormattedMessage, addLocaleData } from 'react-intl'
import lang from '../components/lang'

import Layout from './Layout'

import RaisedButton from 'material-ui/RaisedButton';

export default React.createClass({
  render() {
    let signWrapperStyle = {
      width: 400,
      margin: '0 auto',
      marginTop: 30
    }
    return (
      <Layout>
        <div style={signWrapperStyle} className="sign-wrapper">
          <RaisedButton label="Default" />
        </div>
      </Layout>
    )
  }
})

