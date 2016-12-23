import React, { Component, PropTypes } from 'react'
import _ from 'lodash'

import mainStyles from '../styles/main'
import { connect } from 'react-redux'

//external component
import { StyleSheet, css } from 'aphrodite'
import PuzzleList from '../presentations/PuzzleList'
import { fetchPuzzles } from '../actions/FetchActions'
import { setPracticePuzzleId } from '../actions/Actions'
import PuzzleBoard from '../presentations/PuzzleBoard'
import Paper from 'material-ui/Paper'

import Favorite from 'material-ui/svg-icons/action/favorite'
import FavoriteBorder from 'material-ui/svg-icons/action/favorite-border'


class Practice extends Component {

  state = {

  }

  constructor(props) {
    super(props)

    this.props.dispatch(fetchPuzzles({
      page: 1,
      rank: '18k-10k'
    }))

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(id) {
    this.props.dispatch(setPracticePuzzleId(id))
  }

  render() {
    let puzzleList, puzzle, puzzleBoard
    if (this.props.puzzles.data !== undefined) {
      puzzleList = <PuzzleList puzzleListOnClick={this.handleClick} puzzleList={this.props.puzzles.data.puzzles} />
      puzzle = _.find(this.props.puzzles.data.puzzles, {id: this.props.currentPuzzleId || this.props.puzzles.data.puzzles[0].id})
      puzzleBoard = <PuzzleBoard researchMode={this.state.researchMode} className="board"
                                 whofirst={puzzle.whofirst}
                                 puzzle={puzzle.steps}
                                 right_answers={puzzle.right_answers}
                                 wrong_answers={puzzle.wrong_answers}
                                 answers={puzzle.answers}
                                 handleRight={this.handleRightTipOpen}
                                 handleWrong={this.handleWrongTipOpen}
                                 ref="board" />

    }
    return (
      <div className={css(mainStyles.mainContainer)}>
        <Paper className={css(styles.list)}>
          { puzzleList }
        </Paper>
        <Paper className={css(styles.board)}>
          { puzzleBoard }
        </Paper>
        <Paper className={css(styles.panel)}>
          <div>
            <h1>Life: </h1>
            <Favorite className={css(styles.favorite)} />
            <Favorite className={css(styles.favorite)} />
            <Favorite className={css(styles.favorite)} />
            <Favorite className={css(styles.favorite)} />
            <FavoriteBorder className={css(styles.favorite)} />
          </div>
          <div>
            <h1>Time Left: </h1>
          </div>
          <div>
            Research
          </div>
        </Paper>
			</div>
    )
  }
}

const styles = StyleSheet.create({

  list: {
    display: 'flex',
    height: 'calc(100vmin - 100px)',
    overflow: 'hidden',
    overflowY: 'visible',
  },

  board: {
    width: 'calc(100vmin - 100px)',
    height: 'calc(100vmin - 100px)',
    marginLeft: '20px',
  },

  panel: {
    padding: '20px',
    flex: '1 1 auto',
    height: 'calc(100vmin - 100px)',
    marginLeft: '20px',
  },

  favorite: {
    width: '40px',
    height: '40px',
    color: 'red',
  }

})

function select(state) {
  return {
    currentPuzzleId: state.practicePuzzleId,
    puzzles: state.puzzles
  }
}

export default connect(select)(Practice)
