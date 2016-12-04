import React, { Component, PropTypes } from 'react'
import mainStyles from '../styles/main'

//external component
import { StyleSheet, css } from 'aphrodite'

export default class Test extends Component {

  state = {

  }

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className={css(mainStyles.mainContainer)}>
			</div>
    )
  }
}

const styles = StyleSheet.create({

})

