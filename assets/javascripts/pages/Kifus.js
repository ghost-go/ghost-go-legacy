import React, { Component, PropTypes } from 'react'
import Navigation from '../presentations/Navigation'
import { IntlProvider, FormattedMessage, addLocaleData } from 'react-intl'
import Board from '../presentations/Board'
import ControlBar from '../presentations/ControlBar'
import lang from '../components/lang'
import { connect } from 'react-redux'
import { fetchKifu } from '../actions/KifuActions'
import { Link } from 'react-router'
import { Router, Route, hashHistory, browserHistory } from 'react-router'
import Layout from './Layout'

import Paper from 'material-ui/Paper'
import {Table, TableBody, TableRow, TableRowColumn } from 'material-ui/Table'

class Kifus extends Component {
  constructor(props) {
    super(props)
    this.state = {
      kifu: null
    }
    let { id } = this.props.params
    this.props.dispatch(fetchKifu(id))
  }

  render() {
    const colWidth = {
      width: 100
    }
    const { kifu } = this.props
    //const kifuPaperStyle = {
      //width: this.refs.board.style.width,
      //height: this.refs.board.style.height
    //}
    return (
      <Layout>
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
                      <FormattedMessage id='app.kifu.black' defaultMessage="Black" />
                    </TableRowColumn>
                    <TableRowColumn>
                      { this.props.kifu.data.b_name }&nbsp;&nbsp;&nbsp;
                      { this.props.kifu.data.b_rank }
                    </TableRowColumn>
                  </TableRow>
                  <TableRow>
                    <TableRowColumn style={colWidth}>
                      <FormattedMessage id='app.kifu.white' defaultMessage="White" />
                    </TableRowColumn>
                    <TableRowColumn>
                      { this.props.kifu.data.w_name }&nbsp;&nbsp;&nbsp;
                      { this.props.kifu.data.w_rank }
                    </TableRowColumn>
                  </TableRow>
                  <TableRow>
                    <TableRowColumn style={colWidth}>
                      <FormattedMessage id='app.kifu.result' defaultMessage="Result" />
                    </TableRowColumn>
                    <TableRowColumn>
                      { this.props.kifu.data.result }
                    </TableRowColumn>
                  </TableRow>
                  <TableRow>
                    <TableRowColumn style={colWidth}>
                      <FormattedMessage id='app.kifu.title' defaultMessage="Title" />
                    </TableRowColumn>
                    <TableRowColumn>
                      { this.props.kifu.data.title }
                    </TableRowColumn>
                  </TableRow>
                  <TableRow>
                    <TableRowColumn style={colWidth}>
                      <FormattedMessage id='app.kifu.place' defaultMessage="Place" />
                    </TableRowColumn>
                    <TableRowColumn>
                      { this.props.kifu.data.place }
                    </TableRowColumn>
                  </TableRow>
                  <TableRow>
                    <TableRowColumn style={colWidth}>
                      <FormattedMessage id='app.kifu.komi' defaultMessage="Komi" />
                    </TableRowColumn>
                    <TableRowColumn>
                      { this.props.kifu.data.komi }
                    </TableRowColumn>
                  </TableRow>
                  <TableRow>
                    <TableRowColumn style={colWidth}>
                      <FormattedMessage id='app.kifu.date' defaultMessage="Date" />
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
      </Layout>
    )
  }
}

function select(state) {
  return {
    kifu: state.kifu
  }
}

export default connect(select)(Kifus)
