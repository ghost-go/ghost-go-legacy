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

class Puzzle extends Component {
  constructor(props) {
    super(props)
    this.state = {
      puzzle: null
    }
    let { id } = this.props.params
    this.props.dispatch(fetchPuzzle(id))
  }

  render() {
    const colWidth = {
      width: 100
    }
    const { puzzle } = this.props
    return (
      <Layout>
        <div className="kifu-container">
          <div className="kifu-board">
            <PuzzleBoard className="board"
                   editable="false"
                   puzzle={this.puzzle}
                   ref="board" />
          </div>
        </div>
      </Layout>
    )
  }
}

function select(state) {
  return {
    puzzle: state.puzzle
  }
}

export default connect(select)(Puzzle)
