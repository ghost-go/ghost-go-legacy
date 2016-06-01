import React, { Component, PropTypes } from 'react'
import { IntlProvider, FormattedMessage, addLocaleData } from 'react-intl'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Router, Route, hashHistory, browserHistory } from 'react-router'
import lang from '../components/lang'

import Board from '../presentations/Board'
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
            <Board className="board"
                   editable="false"
                   puzzle={this.puzzle}
                   ref="board" />
          </div>
          <div className="kifu-info">
            <Paper>
              <Table style={{width: 400}} selectable={false}>
                <TableBody displayRowCheckbox={false}>
                  <TableRow>
                    <TableRowColumn style={colWidth}>
                      <FormattedMessage id='app.kifu.black' defaultMessage="Black" />
                    </TableRowColumn>
                    <TableRowColumn>
                      { this.props.puzzle.number }&nbsp;&nbsp;&nbsp;
                      { this.props.puzzle.number }
                    </TableRowColumn>
                  </TableRow>
                  <TableRow>
                    <TableRowColumn style={colWidth}>
                      <FormattedMessage id='app.kifu.white' defaultMessage="White" />
                    </TableRowColumn>
                    <TableRowColumn>
                      { this.props.puzzle.number }&nbsp;&nbsp;&nbsp;
                      { this.props.puzzle.number }
                    </TableRowColumn>
                  </TableRow>
                  <TableRow>
                    <TableRowColumn style={colWidth}>
                      <FormattedMessage id='app.kifu.result' defaultMessage="Result" />
                    </TableRowColumn>
                    <TableRowColumn>
                      { this.props.puzzle.number }
                    </TableRowColumn>
                  </TableRow>
                  <TableRow>
                    <TableRowColumn style={colWidth}>
                      <FormattedMessage id='app.kifu.title' defaultMessage="Title" />
                    </TableRowColumn>
                    <TableRowColumn>
                      { this.props.puzzle.number }
                    </TableRowColumn>
                  </TableRow>
                  <TableRow>
                    <TableRowColumn style={colWidth}>
                      <FormattedMessage id='app.kifu.place' defaultMessage="Place" />
                    </TableRowColumn>
                    <TableRowColumn>
                      { this.props.puzzle.number }
                    </TableRowColumn>
                  </TableRow>
                  <TableRow>
                    <TableRowColumn style={colWidth}>
                      <FormattedMessage id='app.kifu.komi' defaultMessage="Komi" />
                    </TableRowColumn>
                    <TableRowColumn>
                      { this.props.puzzle.number }
                    </TableRowColumn>
                  </TableRow>
                  <TableRow>
                    <TableRowColumn style={colWidth}>
                      <FormattedMessage id='app.kifu.date' defaultMessage="Date" />
                    </TableRowColumn>
                    <TableRowColumn>
                      { this.props.puzzle.number }
                    </TableRowColumn>
                  </TableRow>
                  <TableRow>
                    <TableRowColumn colSpan={2}>
                      <ControlBar board={this.refs.board} />
                    </TableRowColumn>
                  </TableRow>
                </TableBody>
              </Table>
            </Paper>
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
