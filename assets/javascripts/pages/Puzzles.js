import React from 'react'
import Layout from './Layout'
import { IntlProvider, FormattedMessage, addLocaleData } from 'react-intl'
import lang from '../components/lang'

export default React.createClass({
  render() {
    return (
      <Layout>
        <div>Puzzles</div>
      </Layout>
    )
  }
})

