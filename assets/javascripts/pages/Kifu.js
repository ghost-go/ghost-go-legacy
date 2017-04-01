import React, { Component, PropTypes as T } from 'react'
import { connect } from 'react-redux'
//import lang from '../components/lang'

import Board from '../presentations/Board'

import { fetchKifu } from '../actions/FetchActions'

import Paper from 'material-ui/Paper'
import { Table, TableBody, TableRow, TableRowColumn } from 'material-ui/Table'

//external component
import { StyleSheet, css } from 'aphrodite'
import keydown, { Keys } from 'react-keydown';

const { LEFT, RIGHT, SPACE, ENTER, TAB } = Keys

class Kifu extends Component {

  static propTypes = {
    params: T.object.isRequired,
    dispatch: T.func.isRequired,
    kifu: T.object.isRequired,
    expanded: T.bool.isRequired
  }

  state = {
    step: 0
  }

  constructor(props) {
    super(props)
    let { id } = this.props.params
    this.props.dispatch(fetchKifu({id: id}))
  }

  @keydown( ENTER, SPACE, LEFT, RIGHT )
  handleKeyboardEvents( event ) {
    if ( event.which === ENTER || event.which === RIGHT || event.which === SPACE) { this.nextStep() }
    if ( event.which === LEFT) { this.prevStep() }
  }

  prevStep() {
    if (this.state.step > 0) {
      this.setState({ step: --this.state.step})
    }
  }

  nextStep() {
    if (this.state.step < this.props.kifu.data.steps.split(';').length) {
      this.setState({ step: ++this.state.step})
    }
  }

  firstStep() {
    this.setState({ step: 1})
  }

  lastStep() {
    let last = this.props.kifu.data.steps.split(';').length - 1
    this.setState({ step: last})
  }

  next10Step() {
    this.setState({ step: this.state.step + 10})
  }

  prev10Step() {
    if (this.state.step < 10) {
      this.firstStep()
    } else {
      this.setState({ step: this.state.step - 10})
    }
  }

  render() {
    const { kifu, expanded } = this.props
    if (kifu.data == null) return null
    return (
      <div style={{marginLeft: expanded === true ? '235px' : '50px'}} className={css(styles.kifuContainer)} onKeyDown={::this.nextStep}>
        <div className={css(styles.kifuBoard)}>
          <Board className="board" editable="false" kifu={kifu} step={this.state.step} nextStep={::this.nextStep} />
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
                    { kifu.data.player_b.en_name}
                    ({ kifu.data.b_rank })
                  </TableRowColumn>
                </TableRow>
                <TableRow>
                  <TableRowColumn className={css(styles.fixedColumnWidth)}>
                    White
                  </TableRowColumn>
                  <TableRowColumn>
                    { kifu.data.player_w.en_name}
                    ({ kifu.data.w_rank })
                  </TableRowColumn>
                </TableRow>
                <TableRow>
                  <TableRowColumn className={css(styles.fixedColumnWidth)}>
                    Result
                  </TableRowColumn>
                  <TableRowColumn>
                    { kifu.data.result }
                  </TableRowColumn>
                </TableRow>
                <TableRow>
                  <TableRowColumn className={css(styles.fixedColumnWidth)}>
                    Komi
                  </TableRowColumn>
                  <TableRowColumn>
                    { kifu.data.komi }
                  </TableRowColumn>
                </TableRow>
                <TableRow>
                  <TableRowColumn className={css(styles.fixedColumnWidth)}>
                    Date
                  </TableRowColumn>
                  <TableRowColumn>
                    { kifu.data.short_date }
                  </TableRowColumn>
                </TableRow>
                <TableRow>
                  <TableRowColumn colSpan={2}>
                    <div className="control-bar">
                      <span className="move-control" onClick={::this.firstStep}>
                        <i className="fa fa-fast-backward"></i>
                      </span>
                      <span className="move-control" onClick={::this.prev10Step}>
                        <i className="fa fa-backward"></i>
                      </span>
                      <span className="move-control" onClick={::this.prevStep}>
                        <i className="fa fa-play rotate"></i>
                      </span>
                      <span className="move-control" onClick={::this.nextStep}>
                        <i className="fa fa-play"></i>
                      </span>
                      <span className="move-control" onClick={::this.next10Step}>
                        <i className="fa fa-forward"></i>
                      </span>
                      <span className="move-control" onClick={::this.lastStep}>
                        <i className="fa fa-fast-forward"></i>
                      </span>
                    </div>
                  </TableRowColumn>
                </TableRow>
                <TableRow>
                  <TableRowColumn colSpan={2}>
                    <div className="control-bar">
                      You can use the keyboard keys to control game records.
                    </div>
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
    flex: 'auto',
  },

  kifuInfo: {
    flex: 'auto',
  },

})

function select(state) {
  return {
    kifu: state.kifu
  }
}

export default connect(select)(Kifu)
