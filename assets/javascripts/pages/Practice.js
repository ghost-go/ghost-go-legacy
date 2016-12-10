import React, { Component, PropTypes } from 'react'
import mainStyles from '../styles/main'

//external component
import { StyleSheet, css } from 'aphrodite'
import PuzzleList from '../presentations/PuzzleList'

export default class Practice extends Component {

  state = {

  }

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className={css(mainStyles.mainContainer)}>
        <div>
          <PuzzleList />
        </div>
			</div>
    )
  }
}

const styles = StyleSheet.create({

})

