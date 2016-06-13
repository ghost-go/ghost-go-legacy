import React, { Component, PropTypes } from 'react'
import { IntlProvider, FormattedMessage, addLocaleData } from 'react-intl'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Router, Route, hashHistory, browserHistory } from 'react-router'
import lang from '../components/lang'

import PuzzleBoard from '../presentations/PuzzleBoard'
import ControlBar from '../presentations/ControlBar'
import Layout from './Layout'

import { fetchPuzzle } from '../actions/PuzzleActions'

import Paper from 'material-ui/Paper'
import { Table, TableBody, TableRow, TableRowColumn } from 'material-ui/Table'

import { StyleSheet, css } from 'aphrodite'

class Puzzle extends Component {
  constructor(props) {
    super(props)
    let { id } = this.props.params
    this.props.dispatch(fetchPuzzle(id))
  }

  render() {
    const { puzzle } = this.props
    return (
      <Layout>
        <div className={css(styles.puzzleContainer)}>
          <div className={css(styles.puzzleBoard)}>
            <PuzzleBoard className="board"
                   editable="false"
                   puzzle={puzzle.data.steps}
                   ref="board" />
          </div>
        </div>
        <div className="puzzle-info">
          <Paper>
            <h1 className={css(styles.red)}>{puzzle.data.name}</h1>
          </Paper>
        </div>
      </Layout>
    )
  }
}

const styles = StyleSheet.create({
  puzzleContainer: {
    height: 'calc(100vh - 50px)',
    display: 'flex'
  },

  puzzleBoard: {
    marginTop: '10px',
    marginLeft: '30px',
    flex: '1',
    order: '-1'
  },

  puzzleInfo: {
    marginTop: '30px',
    marginRight: '50px'
  }

})

function select(state) {
  return {
    puzzle: state.puzzle
  }
}

export default connect(select)(Puzzle)
