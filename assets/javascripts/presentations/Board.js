import React, { Component, PropTypes as T } from 'react'
import { LETTERS_SGF, BLANK_ARRAY, GRID } from '../constants/Go'
import Piece from '../eboard/Piece'
import Sgf from '../eboard/Sgf'
import showKi from '../eboard/BoardCore'

import Paper from 'material-ui/Paper'

export default class Board extends Component {

  static propTypes = {
    kifu: T.object.isRequired,
    nextStep: T.func.isRequired,
    step: T.number.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      kifuArray: [],
      sgf: new Sgf({}),
    }
    this.currentKi = 1
  }

  initKifuArray() {
    let steps = this.props.kifu.data.steps.split(';').slice(0, this.props.step)
    let array = showKi(BLANK_ARRAY, steps)
    this.setState({ kifuArray: array })
  }


  nextStep() {
    this.props.nextStep()
    this.drawBoardWithResize()
  }

  moveTo(step) {
    this.setState({ step: step})
  }

  _getOffsetPos(x, y) {
    let offsetH = 0
    let offsetV = 0
    switch(this.state.direction) {
    case 1:
      break
    case 2:
      offsetH = GRID - this.state.maxhv
      break
    case 3:
      offsetH = GRID - this.state.maxhv
      offsetV = GRID - this.state.maxhv
      break
    case 4:
      offsetV = GRID - this.state.maxhv
      break
    }
    return {
      x: x - offsetH + 1,
      y: y - offsetV + 1
    }
  }

  markPiece() {
    let lastStep, il, jl

    let steps = this.props.kifu.data.steps.split(';')
    if (this.props.step > 0) {
      lastStep = steps.slice(0, this.props.step)[this.props.step - 1]
      il = LETTERS_SGF.indexOf(lastStep[2])
      jl = LETTERS_SGF.indexOf(lastStep[3])
    }

    for (let i = 0; i < GRID; i++) {
      for (let j = 0; j < GRID; j++) {
        const ki = this.state.kifuArray[i][j]
        let {x, y} = this._getOffsetPos(i, j)

        if (lastStep != null && il != null && il != null) {
          if (i == il && j == jl) {
            this._drawPiece(x, y, ki, true)
          } else {
            this._drawPiece(x, y, ki)
          }
        } else {
          this._drawPiece(x, y, ki)
        }
      }
    }
  }

  draw() {
    this._boardCtx.beginPath()
    for(let i = 1;i <= GRID; i++) {
      this._boardCtx.moveTo(i * this.size, this.size)
      this._boardCtx.lineTo(i * this.size, GRID * this.size)
      this._boardCtx.moveTo(this.size, i * this.size)
      this._boardCtx.lineTo(GRID * this.size, i * this.size)
    }
    this._boardCtx.stroke()
    let dot_size = 3
    if (GRID == 19) {
      [4, 16, 10].forEach((i) => {
        [4, 16, 10].forEach((j) => {
          this._boardCtx.beginPath()
          this._boardCtx.arc(this.size * i, this.size * j, dot_size, 0, 2 * Math.PI, true)
          this._boardCtx.fill()
        })
      })
    }
  }

  _drawPiece(x, y, type, isMarked) {
    let piece = new Piece(
      x * this.size,
      y * this.size,
      this.size / 2 - 2,
      type,
      isMarked
    )
    piece.draw(this._pieceCtx)
  }

  render() {
    return (
      <Paper>
        <div className="board" ref="board">
          <canvas id="board_layer" ref={(ref) => this.boardLayer = ref }></canvas>
          {(() => {
            //if (this.props.editable === 'true') {
              //return <canvas id= "cross_layer" ref={(ref) => this.crossLayer = ref}></canvas>
            //}
          })()}
          <canvas id="piece_layer" ref={(ref) => this.pieceLayer = ref}></canvas>
          <canvas id="top_layer" onClick={::this.nextStep} ref={(ref) => this.topLayer = ref }></canvas>
        </div>
      </Paper>
    )
  }


  drawBoardWithResize() {
    //TODO: This is need to refactor
    //let boardWidth = this.refs.board.parentElement.parentElement.offsetHeight / 20 * 18
    setTimeout(() => {
      let boardWidth = 0
      if (screen.width > screen.height) {
        boardWidth = window.innerHeight - 60
      } else {
        boardWidth = window.innerWidth
      }
      this.size =  boardWidth / 20
      this._boardCtx = this.boardLayer.getContext('2d')
      this._pieceCtx = this.pieceLayer.getContext('2d')
      this.refs.board.style.height = boardWidth + 'px'
      this.refs.board.style.width = boardWidth + 'px'
      this.refs.board.parentElement.style.height = boardWidth + 'px'
      this.refs.board.parentElement.style.width = boardWidth + 'px'
      this.boardLayer.width
      = this.boardLayer.height
      = this.pieceLayer.width
      = this.pieceLayer.height
      = boardWidth
      this.boardLayer.style.position
      = this.pieceLayer.style.position
      = 'absolute'
      this.topLayer.width
      = this.topLayer.height
      = boardWidth
      this.topLayer.style.position
      = 'absolute'
      this.drawBoard()
    }, 0)
  }

  drawBoard() {
    this.initKifuArray()
    this._pieceCtx.clearRect(0, 0, this.pieceLayer.width, this.pieceLayer.height)
    this._boardCtx.clearRect(0, 0, this.boardLayer.width, this.boardLayer.height)
    this.draw()
    this.markPiece()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.step !== this.props.step) {
      this.drawBoardWithResize()
    }
  }

  componentDidMount() {
    this.drawBoardWithResize()
    window.addEventListener('resize', this.drawBoardWithResize.bind(this), false)
  }

  componentUnmount() {
    window.removeEventListener('resize', this.drawBoardWithResize.bind(this), false)
  }
}

Board.childContextTypes = {
  muiTheme: React.PropTypes.object.isRequired
}
