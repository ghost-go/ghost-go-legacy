import React, { Component, PropTypes as T } from 'react'
import { connect } from 'react-redux'
import Paper from 'material-ui/Paper'
import { Table, TableBody, TableRow, TableRowColumn } from 'material-ui/Table'
import keydown, { Keys } from 'react-keydown'
import { CoordsToTree } from '../constants/Go'

import Board from '../eboard/Board'
import { fetchKifu } from '../actions/FetchActions'

const { LEFT, RIGHT, SPACE, ENTER } = Keys

class Kifu extends Component {

  static propTypes = {
    params: T.object.isRequired,
    dispatch: T.func.isRequired,
    kifu: T.object.isRequired,
    theme: T.string.isRequired,
    themeMaterial: T.object.isRequired,
  }

  state = {
    step: 0
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
    if (this.state.step < this.props.kifu.data.total) {
      this.setState({ step: ++this.state.step})
    }
  }

  firstStep() {
    this.setState({ step: 1})
  }

  lastStep() {
    let last = this.props.kifu.data.total - 1
    this.setState({ step: last})
  }

  next10Step() {
    this.setState({ step: this.state.step + 10})
  }

  prev10Step() {
    this.state.step < 10 ? this.firstStep() : this.setState({ step: this.state.step - 10})
  }

  componentDidMount() {
    let { id } = this.props.params
    this.props.dispatch(fetchKifu({id: id}))
    let boardWidth = 0
    if (screen.width > screen.height) {
      boardWidth = window.innerHeight - 60
    } else {
      boardWidth = window.innerWidth
    }
    this.boardLayer.width = this.boardLayer.height = boardWidth
  }

  componentDidUpdate() {
    const { kifu } = this.props
    let steps = kifu.data.steps.split(';').slice(0, this.state.step)
    let board = new Board({
      theme: this.props.theme,
      material: this.props.themeMaterial,
    })
    board.move(CoordsToTree(steps))
    board.render(this.boardLayer)
  }

  render() {
    const { kifu } = this.props
    return (
      <div ref={input => this.textInput = input}>
        <div className="kifu-board">
          <canvas id="board_layer"ref={(elem) => { this.boardLayer = elem }} onClick={::this.nextStep}></canvas>
        </div>
        <div className="kifu-panel">
          <Paper>
            <Table selectable={false}>
              <TableBody displayRowCheckbox={false}>
                <TableRow>
                  <TableRowColumn className="fixed-width">
                    Black
                  </TableRowColumn>
                  <TableRowColumn>
                    { kifu.data.player_b.en_name}
                    ({ kifu.data.b_rank })
                  </TableRowColumn>
                </TableRow>
                <TableRow>
                  <TableRowColumn className="fixed-width">
                    White
                  </TableRowColumn>
                  <TableRowColumn>
                    { kifu.data.player_w.en_name}
                    ({ kifu.data.w_rank })
                  </TableRowColumn>
                </TableRow>
                <TableRow>
                  <TableRowColumn className="fixed-width">
                    Result
                  </TableRowColumn>
                  <TableRowColumn>
                    { kifu.data.result }
                  </TableRowColumn>
                </TableRow>
                <TableRow>
                  <TableRowColumn className="fixed-width">
                    Komi
                  </TableRowColumn>
                  <TableRowColumn>
                    { kifu.data.komi }
                  </TableRowColumn>
                </TableRow>
                <TableRow>
                  <TableRowColumn className="fixed-width">
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
                  </TableRowColumn> </TableRow>
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
        <div className="clearfix"></div>
      </div>
    )
  }
}

function select(state) {
  return {
    kifu: state.kifu,
    theme: state.theme,
    themeMaterial: state.themeMaterial,
  }
}

export default connect(select)(Kifu)
