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

//external component
import { StyleSheet, css } from 'aphrodite'

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
    const { kifu } = this.props
    if (kifu.data == null) return null
    return (
      <div className={css(styles.kifuContainer)}>
        <div className={css(styles.kifuBoard)}>
          <Board className="board"
            editable="false"
            kifu={kifu}
            ref="board" />
        </div>
        <div className={css(styles.kifuInfo)}>
          <Paper>
            <Table selectable={false}>
              <TableBody displayRowCheckbox={false}>
                <TableRow>
                  <TableRowColumn className={css(styles.fixedColumnWidth)}>
                    Black
                  </TableRowColumn>
                  <TableRowColumn>
                    { this.props.kifu.data.player_b.en_name}
                    ({ this.props.kifu.data.b_rank })
                  </TableRowColumn>
                </TableRow>
                <TableRow>
                  <TableRowColumn className={css(styles.fixedColumnWidth)}>
                    White
                  </TableRowColumn>
                  <TableRowColumn>
                    { this.props.kifu.data.player_w.en_name}
                    ({ this.props.kifu.data.w_rank })
                  </TableRowColumn>
                </TableRow>
                <TableRow>
                  <TableRowColumn className={css(styles.fixedColumnWidth)}>
                    Result
                  </TableRowColumn>
                  <TableRowColumn>
                    { this.props.kifu.data.result }
                  </TableRowColumn>
                </TableRow>
                {/*
                  <TableRow>
                  <TableRowColumn>
                  Title
                  </TableRowColumn>
                  <TableRowColumn>
                  { this.props.kifu.data.title }
                  </TableRowColumn>
                  </TableRow>
                  <TableRow>
                    <TableRowColumn>
                      Place
                    </TableRowColumn>
                    <TableRowColumn>
                      { this.props.kifu.data.place }
                    </TableRowColumn>
                  </TableRow>
                  */}
                  <TableRow>
                    <TableRowColumn className={css(styles.fixedColumnWidth)}>
                      Komi
                    </TableRowColumn>
                    <TableRowColumn>
                      { this.props.kifu.data.komi }
                    </TableRowColumn>
                  </TableRow>
                  <TableRow>
                    <TableRowColumn className={css(styles.fixedColumnWidth)}>
                      Date
                    </TableRowColumn>
                    <TableRowColumn>
                      { this.props.kifu.data.short_date }
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

const styles = StyleSheet.create({

  fixedColumnWidth: {
    width: '20%'
  },

  kifuContainer: {
    padding: '10px',
    display: 'flex',
    '@media (max-width: 992px)': {
      padding: '0px',
      flexDirection: 'column',
    }
  },

  kifuBoard: {
    margin: '0 10px 0 10px',
    '@media (max-width: 992px)': {
      margin: '10px 0 10px 0',
    },
    flex: '1 1 1 50%',
  },

  kifuInfo: {
    flex: '1 1 auto',
  },

})

function select(state) {
  return {
    kifu: state.kifu
  }
}

export default connect(select)(Kifu)
