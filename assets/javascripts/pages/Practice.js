import React, { Component, PropTypes } from 'react'
import mainStyles from '../styles/main'
import { connect } from 'react-redux'

//external component
import { StyleSheet, css } from 'aphrodite'
import PuzzleList from '../presentations/PuzzleList'
import { fetchPuzzles } from '../actions/FetchActions'

class Practice extends Component {

  state = {

  }

  constructor(props) {
    super(props)

    this.props.dispatch(fetchPuzzles({
      page: 1,
      rank: '18k-10k'
    }))
  }

  render() {
    let puzzleList
    if (this.props.puzzles.data !== undefined) {
      puzzleList = <PuzzleList puzzleList={this.props.puzzles.data.puzzles} />
    }
    return (
      <div className={css(mainStyles.mainContainer)}>
        <div>
          { puzzleList }
        </div>
			</div>
    )
  }
}

const styles = StyleSheet.create({

})

function select(state) {
  return {
    puzzles: state.puzzles
  }
}

export default connect(select)(Practice)
