import React, { Component } from 'react'
//import { FormattedMessage } from 'react-intl'

import { StyleSheet, css } from 'aphrodite'

export default class Footer extends Component {

  render() {
    return (
      <div className={css(style.footer)}>
        Source Code:  <a href="https://github.com/happybai/ghost-go">
          https://github.com/happybai/ghost-go
        </a>
      </div>
    )
  }
}

const style = StyleSheet.create({
  footer: {
    backgroundColor: 'black',
    clear: 'both',
    padding: '20px',
    color: '#999',
    textAlign: 'center'
  }
})
