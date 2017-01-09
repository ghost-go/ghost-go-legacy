import React, {Component, PropTypes} from 'react'
import _ from 'lodash'
import { LETTERS_SGF } from '../constants/Go'
import Piece from '../components/piece'
import Sgf from '../components/sgf'
import Cross from '../components/cross'

import { StyleSheet, css } from 'aphrodite'

export default class PuzzleBoard extends Component {

  static propTypes = {
    size: PropTypes.number.isRequired,
    puzzle: PropTypes.string.isRequired,
    whofirst: PropTypes.string.isRequired,
    researchMode: PropTypes.bool.isRequired,
  }

  static childContextTypes = {
    muiTheme: React.PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      grid: 19,
      sgf: new Sgf({}),
      size: this.props.size,
      horizontal: 19,
      verical: 19,
      autofit: true,
      direction: 0,
      revert: false,
      dotSize: 3,
      puzzleArray: _.chunk(new Array(361).fill(0), 19),
      currentKi: 0,
      step: 0,
      steps: [],
      expandH: 5,
      expandV: 5,
      isRatio1: true,
      rightTipOpen: false,
      wrongTipOpen: false,
    }
    this.setState({
      minhv: this.state.verical > this.state.horizontal ? this.state.horizontal : this.state.verical,
      maxhv: this.state.verical > this.state.horizontal ? this.state.verical : this.state.horizontal
    })
    this.reset = this.reset.bind(this)
    this.drawBoardWithResize = this.drawBoardWithResize.bind(this)
  }

  handleRightTipOpen() {
    this.setState({
      rightTipOpen: true,
      wrongTipOpen: false,
    }, () => {
      this.forceUpdate()
    })
  }

  handleWrongTipOpen() {
    this.setState({
      wrongTipOpen: true,
      rightTipOpen: false,
    }, () => {
      this.forceUpdate()
    })
  }

  handleTipsReset() {
    this.setState({
      wrongTipOpen: false,
      rightTipOpen: false,
    }, () => {
      this.forceUpdate()
    })
  }

  move(x, y, ki, isMarked) {
    if (this.canMove(x, y, ki)) {
      let array = this.state.puzzleArray.slice()
      array[x][y] = ki
      this.setState({
        puzzleArray: array
      }, () => {
        if (this.state.currentKi != 0) {
          this.setState({
            currentKi: -this.state.currentKi
          })
        }
        this._drawPiece(x, y, ki, isMarked)
        this._execPonnuki(x, y, -ki)
        this.drawBoard()
      })
      return true
    }
    return false
  }

  reset() {
    this.setState({
      step: 0,
      steps: []
    }, () => {
      this.initPuzzleArray()
      this.drawBoard()
    })
  }

  initPuzzleArray() {
    this.setState({puzzleArray: _.chunk(new Array(361).fill(0), 19)}, () => {
      const steps = this.props.puzzle.split(';')
      let newArray = this.state.puzzleArray.slice()
      steps.forEach((str) => {
        const ki = str[0] === 'B' ? 1 : -1
        const pos = /\[(.*)\]/.exec(str)[1]
        const x = LETTERS_SGF.indexOf(pos[0])
        const y = LETTERS_SGF.indexOf(pos[1])
        newArray[x][y] = ki
      })
      this.setState({
        currentKi: this.props.whofirst == 'Black First' ? 1 : -1,
        puzzleArray: newArray
      })
    })
  }

  draw() {
    this._boardCtx.beginPath()

    if (this.state.revert && this.state.puzzle != null) {
      this.setState({
        puzzle: this.state.puzzle.replace(/B/g, 'X').replace(/W/g, 'B').replace(/X/g, 'W')
      })
    }

    if (this.state.autofit) {
      this._autofit(this.state.expandH, this.state.expandV)
    }

    let size = this.state.size

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
    if (this.state.puzzleArray[i][j] != 0) {
      return false
    }

    this.state.puzzleArray[i][j] = ki
    let {liberty, recursionPath} = this.calcLiberty(i, j, ki)
    if (this.canPonnuki(i, j, -ki)) {
      this.state.puzzleArray[i][j] = 0
      return true
    }
    if (this.canPonnuki(i, j, ki)) {
      this.state.puzzleArray[i][j] = 0
      return false
    }
    if (liberty === 0) {
      this.state.puzzleArray[i][j] = 0
      console.log('This place has been used')
      return false
    }
    this.state.puzzleArray[i][j] = 0
    return true
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

    if (this.state.puzzleArray[x][y] == 0) {
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

  showCross(x, y, color) {
    let cross = new Cross()
    cross.x = x * this.state.size
    cross.y = y * this.state.size
    cross.size = 5
    cross.color = color
    cross.draw(this._crossCtx)
  }

  render() {
    return (
      <div className={css(styles.board)} ref="board">
          {
            this.state.rightTipOpen ?
              <div ref="tipRight" className={css(styles.tipRight)}>
                <i className="zmdi zmdi-check"></i>
              </div>
            : null
          }
          {
            this.state.wrongTipOpen ?
              <div ref="tipWrong" className={css(styles.tipWrong)}>
                <i className="zmdi zmdi-close"></i>
              </div>
                : null
          }
        <canvas id="board_layer" className={css(styles.boardCanvas)} ref={(ref) => this.boardLayer = ref }></canvas>
        <canvas id="cross_layer" className={css(styles.boardCanvas)} ref={(ref) => this.crossLayer = ref }></canvas>
        <canvas id="piece_layer" className={css(styles.boardCanvas)} ref={(ref) => this.pieceLayer = ref }></canvas>
        <canvas id="top_layer" className={css(styles.boardCanvas)} ref={(ref) => this.topLayer = ref }></canvas>
      </div>
    )
  }

  response() {
    if (this.props.researchMode) return
    let rights = []
    let wrongs = []
    this.props.right_answers.forEach((i) => {
      if (i.steps.indexOf(this.state.steps.join(';')) == 0) {
        rights.push(i)
      }
    })
    this.props.wrong_answers.forEach((i) => {
      if (i.steps.indexOf(this.state.steps.join(';')) == 0) {
        wrongs.push(i)
      }
    })

    if (rights.length > 0) {
      const i = Math.floor(Math.random() * rights.length)
      let stepsStr = this.state.steps.join(';')
      if (rights[i].steps === stepsStr) {
        this.props.handleRight()
      }
      else {
        const step = rights[i].steps.split(';')[this.state.step]
        const x = LETTERS_SGF.indexOf(step[2])
        const y = LETTERS_SGF.indexOf(step[3])
        const ki = step[0] == 'B' ? 1 : -1
        this.state.steps.push(step)
        this.move(x, y, ki)
        this.state.step++
        let stepsStr = this.state.steps.join(';')
        if (rights[i].steps === stepsStr) {
          this.props.handleRight()
        }
      }
    }
    else if (wrongs.length > 0) {
      const i = Math.floor(Math.random() * wrongs.length)
      let stepsStr = this.state.steps.join(';')
      if (wrongs[i].steps === stepsStr) {
        this.props.handleWrong()
      }
      else {
        const step = wrongs[i].steps.split(';')[this.state.step]
        const x = LETTERS_SGF.indexOf(step[2])
        const y = LETTERS_SGF.indexOf(step[3])
        const ki = step[0] == 'B' ? 1 : -1
        this.state.steps.push(step)
        this.move(x, y, ki)
        this.state.step++
        let stepsStr = this.state.steps.join(';')
        if (wrongs[i].steps === stepsStr) {
          this.props.handleWrong()
        }
      }
    }
    else {
      this.props.handleWrong()
    }
  }

  drawBoardWithResize() {
    //TODO: This need to be refactored
    //The reason that using setTimeout is the following url
    //https://github.com/Khan/aphrodite/blame/master/README.md#L128
    setTimeout(() => {

      this._boardCtx = this.boardLayer.getContext('2d')
      this._pieceCtx = this.pieceLayer.getContext('2d')
      this._crossCtx = this.crossLayer.getContext('2d')

      this.boardLayer.width = this.boardLayer.offsetWidth
      this.boardLayer.height = this.boardLayer.offsetHeight
      this.pieceLayer.width = this.pieceLayer.offsetWidth
      this.pieceLayer.height = this.pieceLayer.offsetHeight
      this.crossLayer.width = this.crossLayer.offsetWidth
      this.crossLayer.height = this.crossLayer.offsetHeight
      this.topLayer.width = this.topLayer.offsetWidth
      this.topLayer.height = this.topLayer.offsetHeight


      var clickEventName = (function() {
        if ('ontouchstart' in document.documentElement === true)
          return 'touchstart'
        else
          return 'click'
      })()

      let mousemoveEvent = (e) => {
        let p = this._convertCtxposToPos(e.offsetX, e.offsetY)
        let {x, y} = this._getOffsetPos(p.posX, p.posY)
        this._crossCtx.clearRect(0, 0, this.boardLayer.width, this.boardLayer.height)
        if (this._isPosInTheBoard(p.posX, p.posY)) {
          this.showCross(x, y, '#ff0000')
        }
      }

      let clickEvent = (e) => {
        e.stopPropagation()
        e.preventDefault()
        if (this.props.afterClickEvent) {
          this.props.afterClickEvent()
        }
        let p = {}
        if (e.type == 'touchstart') {
          p = this._convertCtxposToPos(
            e.touches[0].pageX,
            e.touches[0].pageY - this.state.size
          )
        } else {
          p = this._convertCtxposToPos(e.offsetX, e.offsetY)
        }
        let {x, y} = this._getOffsetPos(p.posX, p.posY)
        let hasMoved = false
        if (this._isPosInTheBoard(p.posX, p.posY)) {
          this.topLayer.removeEventListener('mousemove', mousemoveEvent, false)
          this.topLayer.removeEventListener(clickEventName, clickEvent, false)
          this.topLayer.onmousemove = () => false
          hasMoved = this.move(p.posX, p.posY, this.state.currentKi)
          if (hasMoved) {
            this.state.steps.push(this._convertPoxToSgf(p.posX, p.posY, -this.state.currentKi))
            this.state.step ++
          }
          this.markPiece()
        }
        setTimeout(() => {
          if (hasMoved) {
            this.response(p.posX, p.posY, -this.state.currentKi)
          }
          this.topLayer.onmousemove = mousemoveEvent
          this.topLayer.addEventListener(clickEventName, clickEvent, false)
        }, 300)

      }

      this.topLayer.onmousemove = mousemoveEvent
      this.topLayer.addEventListener(clickEventName, clickEvent, false)

      this.drawBoard()
    }, 0)
  }

  markPiece() {
    let lastStep, il, jl
    if (this.state.steps.length > 0) {
      lastStep = this.state.steps[this.state.steps.length - 1]
      console.log(lastStep)

      il = LETTERS_SGF.indexOf(lastStep[2])
      jl = LETTERS_SGF.indexOf(lastStep[3])
    }

    for (let i = 0; i < this.state.grid; i++) {
      for (let j = 0; j < this.state.grid; j++) {
        const ki = this.state.puzzleArray[i][j]
        let {x, y} = this._getOffsetPos(i, j)

        if (lastStep != null && il != null && il != null) { if (i == il && j == jl) {
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

  drawBoard() {
    if (this._pieceCtx != null && this._boardCtx != null && this.props.puzzle != null) {
      this._pieceCtx.clearRect(0, 0, this.pieceLayer.width, this.pieceLayer.height)
      this._boardCtx.clearRect(0, 0, this.boardLayer.width, this.boardLayer.height)
      this._crossCtx.clearRect(0, 0, this.boardLayer.width, this.boardLayer.height)
      this.draw()
    }

    this.markPiece()
  }

  componentWillMount() {
    this.initPuzzleArray()
    this.drawBoardWithResize()
  }

  componentDidMount() {
    window.addEventListener('resize', this.drawBoardWithResize.bind(this))
    this.drawBoardWithResize()
  }

  componentUnmount() {
    window.removeEventListener('resize', this.drawBoardWithResize.bind(this))
  }

  componentDidUpdate(prevProps) {
    if (prevProps.puzzle !== this.props.puzzle) {
      this.initPuzzleArray()
      this.drawBoardWithResize()
    }
  }

  _convertCtxposToPos(x, y) {
    let posX, posY
    switch (this.state.direction) {
    case 1:
      posX = Math.round(x / this.state.size) - 1
      posY = Math.round(y / this.state.size) - 1
      break
    case 2:
      posX = Math.round(x / this.state.size) + (this.state.grid - this.state.maxhv) - 1
      posY = Math.round(y / this.state.size) - 1
      break
    case 3:
      posX = Math.round(x / this.state.size) + (this.state.grid - this.state.maxhv) - 1
      posY = Math.round(y / this.state.size) + (this.state.grid - this.state.minhv) - 1
      break
    case 4:
      posX = Math.round(x / this.state.size) - 1
      posY = Math.round(y / this.state.size) + (this.state.grid - this.state.minhv) - 1
      break
    }
    return {posX, posY}
  }

  _isPosInTheBoard(x, y) {
    switch (this.state.direction) {
    case 1:
      return x >= 0 &&
        x < this.state.horizontal &&
        y >= 0 &&
        y < this.state.verical
    case 2:
      return x >= this.state.grid - this.state.horizontal && 
        x < this.state.grid &&
        y >= 0 &&
        y < this.state.verical
    case 3:
      return x >= this.state.grid - this.state.horizontal &&
        x < this.state.grid &&
        y >= this.state.grid - this.state.verical &&
        y < this.state.verical
    case 4:
      return x >= 0 &&
        x < this.state.horizontal &&
        y >= this.state.grid - this.state.verical &&
        y < this.state.verical
    }
  }

  _convertPoxToSgf(x, y, ki) {
    let step = ''
    if (ki == 1) {
      step = `B[${LETTERS_SGF[x]}${LETTERS_SGF[y]}]`
    }
    else {
      step = `W[${LETTERS_SGF[x]}${LETTERS_SGF[y]}]`
    }
    return step
  }

  _getOffsetPos(x, y) {
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
    return {
      x: x - offsetH + 1,
      y: y - offsetV + 1
    }
  }

  _drawPiece(x, y, type, isMarked) {
    let piece = new Piece(
      x * this.state.size,
      y * this.state.size,
      this.state.size / 2 - 2,
      type,
      isMarked
    )
    piece.draw(this._pieceCtx)
  }

  _execPonnuki(i, j, ki) {
    let {liberty: libertyUp, recursionPath: recursionPathUp} = this.calcLiberty(i, j - 1, ki)
    let {liberty: libertyDown, recursionPath: recursionPathDown} = this.calcLiberty(i, j + 1, ki)
    let {liberty: libertyLeft, recursionPath: recursionPathLeft} = this.calcLiberty(i - 1, j, ki)
    let {liberty: libertyRight, recursionPath: recursionPathRight} = this.calcLiberty(i + 1, j, ki)
    if (libertyUp === 0) {
      recursionPathUp.forEach((i) => {
        let coord = i.split(',')
        this.state.puzzleArray[coord[0]][coord[1]] = 0
      })
    }
    if (libertyDown === 0) {
      recursionPathDown.forEach((i) => {
        let coord = i.split(',')
        this.state.puzzleArray[coord[0]][coord[1]] = 0
      })
    }
    if (libertyLeft === 0) {
      recursionPathLeft.forEach((i) => {
        let coord = i.split(',')
        this.state.puzzleArray[coord[0]][coord[1]] = 0
      })
    }
    if (libertyRight === 0) {
      recursionPathRight.forEach((i) => {
        let coord = i.split(',')
        this.state.puzzleArray[coord[0]][coord[1]] = 0
      })
    }
  }

  _calcLibertyCore(x, y, ki) {
    if (x >= 0 && x < this.state.grid && y >= 0 && y < this.state.grid) {
      if (this.state.puzzleArray[x][y] == ki && !this._recursionPath.includes(`${x},${y}`)) {
        this._recursionPath.push(`${x},${y}`)
        this._calcLibertyCore(x - 1, y, ki)
        this._calcLibertyCore(x + 1, y, ki)
        this._calcLibertyCore(x, y - 1, ki)
        this._calcLibertyCore(x, y + 1, ki)
      }
      else if(this.state.puzzleArray[x][y] == 0) {
        this._liberty++
      }
    }
  }

  _autofit(expandH = 2, expandV = 2) {
    const steps = this.props.puzzle.split(';')
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

    let setMaxMinHV = () => {
      this.setState({
        minhv: this.state.verical > this.state.horizontal ? this.state.horizontal : this.state.verical,
        maxhv: this.state.verical > this.state.horizontal ? this.state.verical : this.state.horizontal
      }, () => {
        if (this.state.isRatio1) {
          this.setState({
            horizontal: this.state.maxhv,
            verical: this.state.maxhv,
          })
        }
        this.state.size =  this.boardLayer.height / (this.state.maxhv + 1)
      })
    }

    if (medianH <= 10 && medianV <= 10) {
      this.setState({
        direction: 1,
        horizontal: rightmost + expandH > this.state.grid ? this.state.grid : rightmost + expandH,
        verical: bottommost + expandV > this.state.grid ? this.state.grid : bottommost + expandV
      }, setMaxMinHV)
    }
    else if (medianH > 10 && medianV <= 10) {
      this.setState({
        direction: 2,
        horizontal: this.state.grid - leftmost + 1 + expandH > this.state.grid ? this.state.grid : this.state.grid - leftmost + 1 + expandH,
        verical: bottommost + expandV > this.state.grid ? this.state.grid : bottommost + expandV
      }, setMaxMinHV)
    }
    else if (medianH > 10 && medianV > 10) {
      this.setState({
        direction: 3,
        horizontal: this.state.grid - leftmost + 1 + expandH > this.state.grid ? this.state.grid : this.state.grid - leftmost + 1 + expandH,
        verical: this.state.grid - bottommost + 1 + expandV > this.state.grid ? this.state.grid : this.state.grid - bottommost + 1 + expandV
      }, setMaxMinHV)
    }
    else {
      this.setState({
        direction: 4,
        horizontal: rightmost + expandH > this.state.grid ? this.state.grid : rightmost + expandH,
        verical: this.state.grid - bottommost + 1 + expandV > this.state.grid ? this.state.grid : this.state.grid - bottommost + 1 + expandV
      }, setMaxMinHV)
    }
  }
}


const styles = StyleSheet.create({

  boardCanvas: {
    position: 'absolute',
    height: '100%',
    width: '100%',
  },

  board: {
    display: 'flex',
    justifyContent: 'center',
    position: 'relative',
    height: '100%',
    width: '100%',
  },

  tipRight: {
    position: 'absolute',
    width: '300px',
    height: '300px',
    top: '50%',
    left: '50%',
    marginLeft: '-150px',
    marginTop: '-150px',
    fontSize: '300px',
    color: 'green',
    textAlign: 'center',
  },

  tipWrong: {
    position: 'absolute',
    width: '300px',
    height: '300px',
    top: '50%',
    left: '50%',
    marginLeft: '-150px',
    marginTop: '-150px',
    fontSize: '300px',
    color: 'red',
    textAlign: 'center',
  }
})

