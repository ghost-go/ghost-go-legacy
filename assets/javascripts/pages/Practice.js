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
                                 scaleOffset={188}
                                 ref="board" />

    }
    return (
      <div className={css(mainStyles.mainContainer)}>
        <Paper className={css(styles.puzzleList)}>
          { puzzleList }
        </Paper>
        <Paper className={css(styles.puzzleBoard)}>
          { puzzleBoard }
        </Paper>
			</div>
    )
  }
}

const styles = StyleSheet.create({

  puzzleList: {
    display: 'flex',
    height: 'calc(100vmin - 100px)',
    overflow: 'hidden',
    overflowY: 'visible',
    //height: '300px',
    //overflowY: 'visible',
  },
  puzzleBoard: {
    marginLeft: '20px',
  }

})

function select(state) {
  return {
    currentPuzzleId: state.practicePuzzleId,
    puzzles: state.puzzles
  }
}

export default connect(select)(Practice)
