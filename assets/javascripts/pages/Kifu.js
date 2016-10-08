import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Router, Route, hashHistory, browserHistory } from 'react-router'
//import lang from '../components/lang'

import Board from '../presentations/Board'
import ControlBar from '../presentations/ControlBar'
import Layout from './Layout'

import { fetchKifu } from '../actions/KifuActions'

import Paper from 'material-ui/Paper'
import { Table, TableBody, TableRow, TableRowColumn } from 'material-ui/Table'

class Kifu extends Component {

  static propTypes = {
    kifu: React.PropTypes.shape({
      isFetching: React.PropTypes.bool.isRequired,
      isFailure: React.PropTypes.bool.isRequired,
    })
  }

  constructor(props) {
    super(props)
    let { id } = this.props.params
    this.props.dispatch(fetchKifu(id))
  }

  render() {
    const colWidth = {
      width: 100
    }
    const { kifu } = this.props
    if (kifu.data == null) return null
    console.log(kifu)
    return (
      <div className="kifu-container">
        <div className="kifu-board">
          <Board className="board"
                 editable="false"
                 kifu={kifu.data.steps}
                 ref="board" />
        </div>
        <div className="kifu-info">
          <Paper>
            <Table style={{width: 400}} selectable={false}>
              <TableBody displayRowCheckbox={false}>
                <TableRow>
                  <TableRowColumn style={colWidth}>
                    Black
                  </TableRowColumn>
                  <TableRowColumn>
                    { this.props.kifu.data.player_b.en_name}
                    { this.props.kifu.data.b_rank }
                  </TableRowColumn>
                </TableRow>
                <TableRow>
                  <TableRowColumn style={colWidth}>
                    White
                  </TableRowColumn>
                  <TableRowColumn>
                    { this.props.kifu.data.player_w.en_name}
                    { this.props.kifu.data.w_rank }
                  </TableRowColumn>
                </TableRow>
                <TableRow>
                  <TableRowColumn style={colWidth}>
                    Result
                  </TableRowColumn>
                  <TableRowColumn>
                    { this.props.kifu.data.result }
                  </TableRowColumn>
                </TableRow>
                {/*
                <TableRow>
                  <TableRowColumn style={colWidth}>
                    Title
                  </TableRowColumn>
                  <TableRowColumn>
                    { this.props.kifu.data.title }
                  </TableRowColumn>
                </TableRow>
                */}
                <TableRow>
                  <TableRowColumn style={colWidth}>
                    Place
                  </TableRowColumn>
                  <TableRowColumn>
                    { this.props.kifu.data.place }
                  </TableRowColumn>
                </TableRow>
                <TableRow>
                  <TableRowColumn style={colWidth}>
                    Komi
                  </TableRowColumn>
                  <TableRowColumn>
                    { this.props.kifu.data.komi }
                  </TableRowColumn>
                </TableRow>
                <TableRow>
                  <TableRowColumn style={colWidth}>
                    Date
                  </TableRowColumn>
                  <TableRowColumn>
                    { this.props.kifu.data.date }
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
    )
  }
}

function select(state) {
  return {
    kifu: state.kifu
  }
}

export default connect(select)(Kifu)
