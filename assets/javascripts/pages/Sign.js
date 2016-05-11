import React from 'react'
import { IntlProvider, FormattedMessage, addLocaleData } from 'react-intl'
import lang from '../components/lang'

import Layout from './Layout'

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';

export default React.createClass({
  render() {
    let signWrapperStyle = {
      width: '400px',
      margin: '0 auto',
      marginTop: '30px'
    }
    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <Layout>
          <div style={signWrapperStyle} className="sign-wrapper">
            <RaisedButton label="Default" />
          </div>
        </Layout>
      </MuiThemeProvider>
    )
  }
})

