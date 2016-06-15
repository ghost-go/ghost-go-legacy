import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import { LETTERS, LETTERS_SGF, NUMBERS } from '../constants/Go'
import Piece from '../components/piece'
import Sgf from '../components/sgf'
import Cross from '../components/cross'

import Paper from 'material-ui/Paper'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

import { StyleSheet, css } from 'aphrodite'

export default class PuzzleBoard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      grid: 19,
      sgf: new Sgf({}),
      currentCoord: 'None',
      currentTurn: 1,
      step: 0,
      size: this.props.size,
      puzzle: this.props.puzzle,
      horizontal: 19,
      verical: 19,
      autofit: true,
      direction: 2,
      revert: false,
      dotSize: 3,
      _puzzleArray: [],
      sgf: new Sgf({})
    }
    this.clearKifuArray()
    this.state.minhv = this.state.verical > this.state.horizontal ? this.state.horizontal : this.state.verical
    this.state.maxhv = this.state.verical > this.state.horizontal ? this.state.verical : this.state.horizontal
    this.state.maxhv = this.state.verical > this.state.horizontal ? this.state.verical : this.state.horizontal
    this.getBoardWidth = this.getBoardWidth.bind(this)
  }

  autofit(expandH = 2, expandV = 2) {
    const steps = this.state.puzzle.split(';')

    let leftmost = 26
    let rightmost = 0
    let topmost = 26
    let bottommost = 0
    steps.forEach((i) => {
      const x = LETTERS_SGF.indexOf(i[2])
      const y = LETTERS_SGF.indexOf(i[3])
      if (x < leftmost)
        leftmost = x

      if (x > rightmost)
        rightmost = x

      if (y < topmost)
        topmost = y

      if (y > bottommost)
        bottommost = y
    })
    leftmost++
    rightmost++
    topmost++
    bottommost++

    const medianH = (leftmost + rightmost) / 2
    const medianV = (topmost + bottommost) / 2

    if (medianH <= 10 && medianV <= 10) {
      this.state.direction = 1
      this.state.horizontal = rightmost + expandH
      this.state.verical = bottommost + expandV
    }
    else if(medianH > 10 && medianV <= 10) {
      this.state.direction = 2
      this.state.horizontal = this.state.grid - leftmost + 1 + expandH
      this.state.verical = bottommost + expandV
    }
    else if(medianH > 10 && medianV > 10) {
      this.state.direction = 3
      this.state.horizontal = this.state.grid - leftmost + 1 + expandH
      this.state.verical = this.state.grid - bottommost + 1 + expandV
    }
    else {
      this.state.direction = 4
      this.state.horizontal = rightmost + expandH
      this.state.verical = this.state.grid - bottommost + 1 + expandV
    }

    this.state.minhv = this.state.verical > this.state.horizontal ? this.state.horizontal : this.state.verical
    this.state.maxhv = this.state.verical > this.state.horizontal ? this.state.verical : this.state.horizontal

    let boardWidth = this.getBoardWidth()
    this.state.size =  boardWidth / (this.state.maxhv + 1)
  }

  //Set default theme to pass the test
  getChildContext() {
    return { muiTheme: getMuiTheme() }
  }

  nextStep(e) {
    this.state.step ++
    let {x, y, posX, posY, ki} = this.getCoordByStep(this.state.step)
    if (this.state.step > 1) {
      let {posX, posY, ki} = this.getCoordByStep(this.state.step - 1)
      this.drawPiece(posX, posY, ki, false)
    }
    this._liberty = 0
    this._recursionPath = []
    this.move(x, y, posX, posY, ki, true)
  }

  moveTo(step) {
    this.state.step = step
    this.clearKifuArray()
    this.drawBoard()
  }

  move(x, y, posX, posY, ki, isCurrent) {
    if (this.canMove(x, y, ki)) {
      this.state._puzzleArray[x][y] = ki
      this.drawPiece(posX, posY, ki, isCurrent)
      this.execPonnuki(x, y, -ki)
    }
  }

  markCurrentPiece() {
    if (this.state.step > 0) {
      let {x, y, posX, posY, ki} = this.getCoordByStep(this.state.step)
      this.drawPiece(posX, posY, ki, true)
    }
  }

  getCoordByStep(step) {
    const steps = this.state.puzzle.split(';')
    const str = steps[step - 1]
    const ki = str[0] === 'B' ? 1 : -1
    const pos = /\[(.*)\]/.exec(str)[1]
    const x = LETTERS_SGF.indexOf(pos[0])
    const y = LETTERS_SGF.indexOf(pos[1])

    let offsetH = 0
    let offsetV = 0
    switch(this.state.direction) {
    case 1:
      break
    case 2:
      offsetH = this.state.grid - this.state.maxhv
      break
    case 3:
      offsetH = this.state.grid - this.state.maxhv
      offsetV = this.state.grid - this.state.maxhv
      break
    case 4:
      offsetV = this.state.grid - this.state.maxhv
      break
    }
    const posX = (x + 1 - offsetH) * this.state.size
    const posY = (y + 1 - offsetV) * this.state.size
    return {x, y, posX, posY, ki}
  }

  prevStep() {

  }

  clearKifuArray() {
    this.state._puzzleArray = []
    while(this.state._puzzleArray.push(new Array(19).fill(0)) < 19) { }
  }

  draw() {
    this._boardCtx.beginPath()
    this.state.puzzle = this.props.puzzle

    if (this.state.autofit && this.state.puzzle != null) {
      this.autofit(5, 5)
    }

    if (this.state.revert && this.state.puzzle != null) {
      this.state.puzzle = this.state.puzzle.replace(/B/g, 'X')
      this.state.puzzle = this.state.puzzle.replace(/W/g, 'B')
      this.state.puzzle = this.state.puzzle.replace(/X/g, 'W')
    }

    let size = this.state.size
    let grid = this.state.grid

    switch (this.state.direction) {
    case 1:
      for (let i = 1;i <= this.state.horizontal; i++) {
        this._boardCtx.moveTo(i * size, size)
        this._boardCtx.lineTo(i * size, this.state.verical * size)
      }
      for (let i = 1;i <= this.state.verical; i++) {
        this._boardCtx.moveTo(size, i * size)
        this._boardCtx.lineTo(this.state.horizontal * size, i * size)
      }
      break
    case 2:
      for (let i = 1;i <= this.state.horizontal; i++) {
        this._boardCtx.moveTo((this.state.maxhv - i + 1) * size, size)
        this._boardCtx.lineTo((this.state.maxhv - i + 1) * size, this.state.verical * size)
      }
      for (let i = 1;i <= this.state.verical; i++) {
        this._boardCtx.moveTo(this.state.maxhv * size, i * size)
        this._boardCtx.lineTo((this.state.maxhv - this.state.horizontal + 1) * size, i * size)
      }
      break
    case 3:
      for (let i = 1;i <= this.state.horizontal; i++) {
        this._boardCtx.moveTo((this.state.maxhv - i + 1) * size, (this.state.maxhv - this.state.verical + 1) * size)
        this._boardCtx.lineTo((this.state.maxhv - i + 1) * size, this.state.maxhv * size)
      }
      for (let i = 1;i <= this.state.verical; i++) {
        this._boardCtx.moveTo(this.state.maxhv * size, (this.state.maxhv - this.state.verical + i) * size)
        this._boardCtx.lineTo((this.state.maxhv - this.state.horizontal + 1) * size, (this.state.maxhv - this.state.verical + i) * size)
      }
      break
    case 4:
      for (let i = 1;i <= this.state.horizontal; i++) {
        this._boardCtx.moveTo(i * size, (this.state.maxhv - this.state.verical + 1) * size)
        this._boardCtx.lineTo(i * size, this.state.maxhv * size)
      }
      for (let i = 1;i <= this.state.verical; i++) {
        this._boardCtx.moveTo(size, (this.state.maxhv - this.state.verical + i) * size)
        this._boardCtx.lineTo(this.state.horizontal * size, (this.state.maxhv - this.state.verical + i) * size)
      }
      break
    }
    this._boardCtx.stroke()

    ;[4, 16, 10].forEach((i) => {
      [4, 16, 10].forEach((j) => {
        switch (this.state.direction) {
        case 1:
          if (i < this.state.horizontal && j < this.state.verical) {
            this._boardCtx.beginPath()
            this._boardCtx.arc(size * i, size * j, this.state.dotSize, 0, 2 * Math.PI, true)
            this._boardCtx.fill()
          }
          break
        case 2:
          if (i < this.state.horizontal && j < this.state.verical) {
            this._boardCtx.beginPath()
            this._boardCtx.arc(size * (this.state.maxhv - i + 1), size * j, this.state.dotSize, 0, 2 * Math.PI, true)
            this._boardCtx.fill()
          }
          break
        case 3:
          if (i < this.state.horizontal && j < this.state.verical) {
            this._boardCtx.beginPath()
            this._boardCtx.arc(size * (this.state.maxhv - i + 1), size * (this.state.maxhv - j + 1), this.state.dotSize, 0, 2 * Math.PI, true)
            this._boardCtx.fill()
          }
          break
        case 4:
          if (i < this.state.horizontal && j < this.state.verical) {
            this._boardCtx.beginPath()
            this._boardCtx.arc(size * i, size * (this.state.maxhv - j + 1), this.state.dotSize, 0, 2 * Math.PI, true)
            this._boardCtx.fill()
          }
          break
        }
      })
    })
  }

  canMove(i, j, ki) {
    if (this.state._puzzleArray[i][j] != 0) {
      return false
    }

    this.state._puzzleArray[i][j] = ki
    let {liberty, recursionPath} = this.calcLiberty(i, j, ki)
    if (this.canPonnuki(i, j, -ki)) {
      this.state._puzzleArray[i][j] = 0
      return true
    }
    if (this.canPonnuki(i, j, ki)) {
      this.state._puzzleArray[i][j] = 0
      return false
    }
    if (liberty === 0) {
      this.state._puzzleArray[i][j] = 0
      console.log('This place has been used')
      return false
    }
    this.state._puzzleArray[i][j] = 0
    return true
  }

  drawPiece(x, y, type, isCurrent) {
    let realPos = this.convertPosToRealPos(x, y)
    let coord_sgf = this.convertPosToSgfCoord(x, y, this.state.size)
    let piece = new Piece()

    piece.x = realPos.x
    piece.y = realPos.y
    piece.pieceSize = this.state.size / 2 - 3
    piece.type = type
    piece.isCurrent = isCurrent
    piece.draw(this._pieceCtx)
  }

  removePiece(coord) {
    let realPos = this.convertCoordToRealPos(coord)
    let {i, j} = this.convertCoordToIndex(coord)
    this.state._puzzleArray[i][j] = 0
    let piece = new Piece()
    piece.x = realPos.x
    piece.y = realPos.y
    piece.remove(this._pieceCtx, this.state.size)
  }

  convertPosToCoord(x, y) {
    let letter = LETTERS[Math.round((x - this.state.size) / this.state.size)]
    let number = NUMBERS[Math.round((y - this.state.size) / this.state.size)]
    return `${letter}${number}`
  }

  convertPosToSgfCoord(x, y, size) {
    let letter = LETTERS_SGF[Math.round((x - size) / size)]
    let number = LETTERS_SGF[Math.round((y - size) / size)]
    return `${letter}${number}`
  }

  convertCoordToPos(coord) {
    let results = []
    let {i, j} = this.convertCoordToIndex(coord)
    results[0] = (i + 1) * this.state.size
    results[1] = (j + 1) * this.state.size
    return {
      x: results[0],
      y: results[1]
    }
  }

  convertPosToRealPos(x, y) {
    let letter = LETTERS[Math.round((x - this.state.size) / this.state.size)]
    let number = NUMBERS[Math.round((y - this.state.size) / this.state.size)]

    let results = []
    let {i, j} = this.convertCoordToIndex(`${letter}${number}`)
    return {
      x: (i + 1) * this.state.size,
      y: (j + 1) * this.state.size
    }
  }

  convertCoordToRealPos(coord) {
    let pos = this.convertCoordToPos(coord)
    let realPos = this.convertPosToRealPos(pos.x, pos.y)
    return realPos
  }

  convertCoordToIndex (coord) {
    let letter = coord.charAt(0)
    let number = coord.slice(1)
    let i = LETTERS.indexOf(letter)
    let j = NUMBERS.indexOf(parseInt(number))
    return {i, j}
  }

  convertIndexToCoord(i, j) {
    return `${LETTERS[i]}${NUMBERS[j]}`
  }

  calcBlackOrWhite(x, y) {
    return this.state._puzzleArray[x][y]
  }

  _calcLibertyCore(x, y, ki) {
    if (x >= 0 && x < this.state.grid && y >= 0 && y < this.state.grid) {
      if (this.state._puzzleArray[x][y] == ki && !this._recursionPath.includes(`${LETTERS[x]}${NUMBERS[y]}`)) {
        this._recursionPath.push(`${LETTERS[x]}${NUMBERS[y]}`)
        this._calcLibertyCore(x - 1, y, ki)
        this._calcLibertyCore(x + 1, y, ki)
        this._calcLibertyCore(x, y - 1, ki)
        this._calcLibertyCore(x, y + 1, ki)
      }
      else if(this.state._puzzleArray[x][y] == 0) {
        this._liberty++
      }
    }
  }

  calcLiberty(x, y, ki) {
    this._liberty = 0
    this._recursionPath = []

    if (x < 0 || y < 0 || x > this.state.grid - 1 || y > this.state.grid - 1) {
      return {
        liberty: 4,
        recursionPath: []
      }
    }

    if (this.state._puzzleArray[x][y] == 0) {
      return {
        liberty: 4,
        recursionPath: []
      }
    }
    this._calcLibertyCore(x, y, ki)
    return {
      liberty: this._liberty,
      recursionPath: this._recursionPath
    }
  }

  execPonnuki(i, j, ki) {
    let {liberty: libertyUp, recursionPath: recursionPathUp} = this.calcLiberty(i, j - 1, ki)
    let {liberty: libertyDown, recursionPath: recursionPathDown} = this.calcLiberty(i, j + 1, ki)
    let {liberty: libertyLeft, recursionPath: recursionPathLeft} = this.calcLiberty(i - 1, j, ki)
    let {liberty: libertyRight, recursionPath: recursionPathRight} = this.calcLiberty(i + 1, j, ki)
    if (libertyUp === 0) {
      recursionPathUp.forEach((i) => {
        this.removePiece(i)
      })
    }
    if (libertyDown === 0) {
      recursionPathDown.forEach((i) => {
        this.removePiece(i)
      })
    }
    if (libertyLeft === 0) {
      recursionPathLeft.forEach((i) => {
        this.removePiece(i)
      })
    }
    if (libertyRight === 0) {
      recursionPathRight.forEach((i) => {
        this.removePiece(i)
      })
    }
  }

  canPonnuki(i, j, ki) {
    let {liberty: libertyUp, recursionPath: recursionPathUp} = this.calcLiberty(i, j - 1, ki)
    let {liberty: libertyDown, recursionPath: recursionPathDown} = this.calcLiberty(i, j + 1, ki)
    let {liberty: libertyLeft, recursionPath: recursionPathLeft} = this.calcLiberty(i - 1, j, ki)
    let {liberty: libertyRight, recursionPath: recursionPathRight} = this.calcLiberty(i + 1, j, ki)
    if (libertyUp === 0 && recursionPathUp.length > 0) {
      return true
    }
    if (libertyDown === 0 && recursionPathDown.length > 0) {
      return true
    }
    if (libertyLeft === 0 && recursionPathLeft.length > 0) {
      return true
    }
    if (libertyRight === 0 && recursionPathRight.length > 0) {
      return true
    }
    return false
  }

  showCross(coord, color) {
    let results = this.convertCoordToPos(coord, this.state.size)
    let cross = new Cross()
    cross.x = results.x
    cross.y = results.y
    cross.size = 5
    cross.color = color
    cross.draw(this._crossCtx)
  }

  render() {
    if (this.props.puzzle != null) {
      let lastStep = this.props.puzzle.split(';').length
      this.moveTo(lastStep)
    }
    return (
      <Paper>
        <div className={css(styles.board)} ref="board">
          <canvas id="board_layer" className={css(styles.boardCanvas)} ref={(ref) => this.boardLayer = ref }></canvas>
          {(() => {
            if (this.props.editable === 'true') {
              return <canvas id= "cross_layer" ref={(ref) => this.crossLayer = ref}></canvas>
            }
          })()}
          <canvas id="piece_layer" className={css(styles.boardCanvas)} ref="piece_layer" ref={(ref) => this.pieceLayer = ref}></canvas>
          <canvas id="top_layer" className={css(styles.boardCanvas)} onClick={this.nextStep.bind(this)} ref="top_layer" ref={(ref) => this.topLayer = ref }></canvas>
        </div>
      </Paper>
    )
  }

  getBoardWidth() {
    let boardWidth = this.refs.board.parentElement.parentElement.offsetHeight - 15
    if (boardWidth < 0) {
      boardWidth = 400 //set a default value to pass the test
    }
    return boardWidth
  }


  drawBoardWithResize() {
    //TODO: This need be refactored
    //The reason using setTimeout
    //https://github.com/Khan/aphrodite/blame/master/README.md#L128
    this.clearKifuArray()
    setTimeout(() => {
      this.refs.board.offsetHeight
      let boardWidth = this.getBoardWidth()
      this.state.size =  boardWidth / (this.state.maxhv + 1)
      this._boardCtx = this.boardLayer.getContext('2d')
      this._pieceCtx = this.pieceLayer.getContext('2d')
      this.refs.board.style.height = '100%'
      this.refs.board.style.width = '100%'
      this.refs.board.parentElement.style.height = boardWidth + 'px'
      this.refs.board.parentElement.style.width = boardWidth + 'px'

      this.boardLayer.width
      = this.boardLayer.height
      = this.pieceLayer.width
      = this.pieceLayer.height
      = this.topLayer.width
      = this.topLayer.height
      = boardWidth
      this.boardLayer.style.position
      = this.pieceLayer.style.position
      = this.topLayer.style.position
      = 'absolute'
      this.drawBoard()
    }, 0)
  }

  drawBoard() {
    if (this._pieceCtx != null && this._boardCtx != null) {
      this._pieceCtx.clearRect(0, 0, this.pieceLayer.width, this.pieceLayer.height)
      this._boardCtx.clearRect(0, 0, this.boardLayer.width, this.boardLayer.height)
      this.draw()
      for (let i = 1; i <= this.state.step; i++) {
        let {x, y, posX, posY, ki} = this.getCoordByStep(i)
        this.move(x, y, posX, posY, ki)
      }
    }
  }


  componentDidMount() {
    window.addEventListener('resize', this.drawBoardWithResize.bind(this))
    this.drawBoardWithResize()
  }

  componentUnmount() {
    window.removeEventListener('resize', this.drawBoardWithResize.bind(this))
  }
}

PuzzleBoard.childContextTypes = {
  muiTheme: React.PropTypes.object.isRequired
}

const styles = StyleSheet.create({
  boardCanvas: {
    position: 'absolute',
    height: '100%',
    width: '100%',
  },
  board: {
    position: 'relative',
  }
})
