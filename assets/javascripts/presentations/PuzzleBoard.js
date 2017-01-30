import React, {Component, PropTypes} from 'react'
import _ from 'lodash'
import { LETTERS_SGF, GRID, DOT_SIZE, EXPAND_H, EXPAND_V, RESPONSE_TIME } from '../constants/Go'
import Piece from '../components/piece'
import Sgf from '../components/sgf'
import Cross from '../components/cross'

import { StyleSheet, css } from 'aphrodite'

export default class PuzzleBoard extends Component {

  static propTypes = {
    puzzle: PropTypes.object.isRequired,
    currentMode: PropTypes.string.isRequired,
    handleRight: PropTypes.func.isRequired,
    handleWrong: PropTypes.func.isRequired,
    afterClickEvent: PropTypes.func,
    addSteps: PropTypes.func,
    resetSteps: PropTypes.func,
    setCurrentMode: PropTypes.func,
    steps: PropTypes.array,
  }

  static childContextTypes = {
    muiTheme: React.PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      sgf: new Sgf({}),
      horizontal: 19,
      verical: 19,
      autofit: true,
      direction: 0,
      revert: false,
      puzzleArray: _.chunk(new Array(361).fill(0), 19),
      currentKi: 0,
      isRatio1: true,
      rightTipOpen: false,
      wrongTipOpen: false,
    }
    this.size = 0
    this.reset = this.reset.bind(this)
    this.drawBoardWithResize = this.drawBoardWithResize.bind(this)
    this.props.resetSteps()
  }

  handleRightTipOpen() {
    this.setState({ rightTipOpen: true, wrongTipOpen: false })
  }

  handleWrongTipOpen() {
    this.setState({ wrongTipOpen: true, rightTipOpen: false })
  }

  handleTipsReset() {
    this.setState({ wrongTipOpen: false, rightTipOpen: false })
  }

  move(step) {
    const x = LETTERS_SGF.indexOf(step[2])
    const y = LETTERS_SGF.indexOf(step[3])
    const ki = step[0] == 'B' ? 1 : -1
    let array = _.clone(this.state.puzzleArray)
    if (this.canMove(array, x, y, ki)) {
      array[x][y] = ki
      this.setState({
        puzzleArray: this.execPonnuki(array, x, y, -ki)
      }, () => {
        this.drawBoard()
      })
      return true
    }
    return false
  }

  reset() {
    let currentKi = this.props.puzzle.whofirst == 'Black First' ? 1 : -1
    this.setState({currentKi: currentKi}, () => {
      this.initPuzzleArray()
      this.props.resetSteps()
      this.drawBoard()
    })
  }

  initPuzzleArray() {
    this.setState({puzzleArray: _.chunk(new Array(361).fill(0), 19)}, () => {
      let steps = this.props.puzzle.steps.split(';')
      let newArray = this.state.puzzleArray.slice()
      steps.forEach((str) => {
        const ki = str[0] === 'B' ? 1 : -1
        const pos = /\[(.*)\]/.exec(str)[1]
        const x = LETTERS_SGF.indexOf(pos[0])
        const y = LETTERS_SGF.indexOf(pos[1])
        newArray[x][y] = ki
      })
      this.setState({
        puzzleArray: newArray
      }, () => {
        this.moveSteps(this.props.steps)
      })
    })
  }

  moveSteps(steps) {
    steps.forEach((str) => {
      this.move(str)
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
      this._autofit(EXPAND_H, EXPAND_V)
    }

    let size = this.size

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
            this._boardCtx.arc(size * i, size * j, DOT_SIZE, 0, 2 * Math.PI, true)
            this._boardCtx.fill()
          }
          break
        case 2:
          if (i < this.state.horizontal && j < this.state.verical) {
            this._boardCtx.beginPath()
            this._boardCtx.arc(size * (this.state.maxhv - i + 1), size * j, DOT_SIZE, 0, 2 * Math.PI, true)
            this._boardCtx.fill()
          }
          break
        case 3:
          if (i < this.state.horizontal && j < this.state.verical) {
            this._boardCtx.beginPath()
            this._boardCtx.arc(size * (this.state.maxhv - i + 1), size * (this.state.maxhv - j + 1), DOT_SIZE, 0, 2 * Math.PI, true)
            this._boardCtx.fill()
          }
          break
        case 4:
          if (i < this.state.horizontal && j < this.state.verical) {
            this._boardCtx.beginPath()
            this._boardCtx.arc(size * i, size * (this.state.maxhv - j + 1), DOT_SIZE, 0, 2 * Math.PI, true)
            this._boardCtx.fill()
          }
          break
        }
      })
    })
  }

  canMove(array, i, j, ki) {
    let newArray = _.cloneDeep(array)
    if (newArray[i][j] !== 0) {
      console.log(newArray[i][j])
      console.log('This place has been used')
      return false
    }

    newArray[i][j] = ki
    let { liberty } = this.calcLiberty(newArray, i, j, ki)
    if (this.canPonnuki(newArray, i, j, -ki)) {
      console.log('canPonnuki true')
      return true
    }
    if (this.canPonnuki(newArray, i, j, ki)) {
      console.log('canPonnuki false')
      return false
    }
    if (liberty === 0) {
      console.log('no liberty')
      return false
    }
    return true
  }

  calcLiberty(array, x, y, ki) {
    this._liberty = 0
    this._recursionPath = []

    if (x < 0 || y < 0 || x > GRID - 1 || y > GRID - 1) {
      return {
        liberty: 4,
        recursionPath: []
      }
    }

    if (array[x][y] == 0) {
      return {
        liberty: 4,
        recursionPath: []
      }
    }
    this._calcLibertyCore(array, x, y, ki)
    return {
      liberty: this._liberty,
      recursionPath: this._recursionPath
    }
  }

  canPonnuki(array, i, j, ki) {
    let {liberty: libertyUp, recursionPath: recursionPathUp} = this.calcLiberty(array, i, j - 1, ki)
    let {liberty: libertyDown, recursionPath: recursionPathDown} = this.calcLiberty(array, i, j + 1, ki)
    let {liberty: libertyLeft, recursionPath: recursionPathLeft} = this.calcLiberty(array, i - 1, j, ki)
    let {liberty: libertyRight, recursionPath: recursionPathRight} = this.calcLiberty(array, i + 1, j, ki)
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
    cross.x = x * this.size
    cross.y = y * this.size
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
    let rights = []
    let wrongs = []
    this.props.puzzle.right_answers.forEach((i) => {
      if (i.steps.indexOf(this.props.steps.join(';')) == 0) {
        rights.push(i)
      }
    })
    this.props.puzzle.wrong_answers.forEach((i) => {
      if (i.steps.indexOf(this.props.steps.join(';')) == 0) {
        wrongs.push(i)
      }
    })

    if (rights.length > 0) {
      const i = Math.floor(Math.random() * rights.length)
      let stepsStr = this.props.steps.join(';')
      if (rights[i].steps === stepsStr) {
        this.props.handleRight()
      }
      else {
        const step = rights[i].steps.split(';')[this.props.steps.length]
        this.props.addSteps(step)
        let stepsStr = this.props.steps.join(';')
        if (rights[i].steps === stepsStr) {
          this.props.handleRight()
        }
      }
    }
    else if (wrongs.length > 0) {
      const i = Math.floor(Math.random() * wrongs.length)
      let stepsStr = this.props.steps.join(';')
      if (wrongs[i].steps === stepsStr) {
        this.props.handleWrong()
      }
      else {
        const step = wrongs[i].steps.split(';')[this.props.steps.length]
        this.props.addSteps(step)
        let stepsStr = this.props.steps.join(';')
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
            e.touches[0].pageY - this.size
          )
        } else {
          p = this._convertCtxposToPos(e.offsetX, e.offsetY)
        }
        let hasMoved = false
        if (this._isPosInTheBoard(p.posX, p.posY)) {
          let step = this._convertPosToSgf(p.posX, p.posY, this.state.currentKi)
          hasMoved = this.move(step)
          if (hasMoved) {
            this.setState({currentKi: -this.state.currentKi}, () => {
              this.props.addSteps(step)
              this.topLayer.onmousemove = () => false
              this.topLayer.removeEventListener('mousemove', mousemoveEvent, false)
              this.topLayer.removeEventListener(clickEventName, clickEvent, false)
              setTimeout(() => {
                if (this.props.currentMode !== 'research') {
                  this.response()
                }
                this.topLayer.onmousemove = mousemoveEvent
                this.topLayer.addEventListener(clickEventName, clickEvent, false)
              }, RESPONSE_TIME)
            })
          }
          this.markPiece()
        }
      }

      this.topLayer.onmousemove = mousemoveEvent
      this.topLayer.addEventListener(clickEventName, clickEvent, false)

      this.drawBoard()
    }, 0)
  }

  markPiece() {
    let lastStep, il, jl
    if (this.props.steps.length > 0) {
      lastStep = this.props.steps[this.props.steps.length - 1]

      il = LETTERS_SGF.indexOf(lastStep[2])
      jl = LETTERS_SGF.indexOf(lastStep[3])
    }

    for (let i = 0; i < GRID; i++) {
      for (let j = 0; j < GRID; j++) {
        const ki = this.state.puzzleArray[i][j]
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

  drawBoard() {
    if (this._pieceCtx != null && this._boardCtx != null && this.props.puzzle != null) {
      this._pieceCtx.clearRect(0, 0, this.pieceLayer.width, this.pieceLayer.height)
      this._boardCtx.clearRect(0, 0, this.boardLayer.width, this.boardLayer.height)
      this._crossCtx.clearRect(0, 0, this.boardLayer.width, this.boardLayer.height)
      this.draw()
    }
    this.markPiece()
  }

  componentDidMount() {
    window.addEventListener('resize', this.drawBoardWithResize.bind(this))
    this.drawBoardWithResize()
  }

  componentUnmount() {
    window.removeEventListener('resize', this.drawBoardWithResize.bind(this))
  }

  componentDidUpdate(prevProps) {
    if (this.state.currentKi === 0) {
      let currentKi = this.props.puzzle.whofirst == 'Black First' ? 1 : -1
      this.setState({currentKi: currentKi})
    }

    if ((prevProps.puzzle !== this.props.puzzle) || (prevProps.steps !== this.props.steps)) {
      this.initPuzzleArray()
      this.drawBoardWithResize()
    }

  }

  _convertCtxposToPos(x, y) {
    let posX, posY
    switch (this.state.direction) {
    case 1:
      posX = Math.round(x / this.size) - 1
      posY = Math.round(y / this.size) - 1
      break
    case 2:
      posX = Math.round(x / this.size) + (GRID - this.state.maxhv) - 1
      posY = Math.round(y / this.size) - 1
      break
    case 3:
      posX = Math.round(x / this.size) + (GRID - this.state.maxhv) - 1
      posY = Math.round(y / this.size) + (GRID - this.state.minhv) - 1
      break
    case 4:
      posX = Math.round(x / this.size) - 1
      posY = Math.round(y / this.size) + (GRID - this.state.minhv) - 1
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
      return x >= GRID - this.state.horizontal && 
        x < GRID &&
        y >= 0 &&
        y < this.state.verical
    case 3:
      return x >= GRID - this.state.horizontal &&
        x < GRID &&
        y >= GRID - this.state.verical &&
        y < this.state.verical
    case 4:
      return x >= 0 &&
        x < this.state.horizontal &&
        y >= GRID - this.state.verical &&
        y < this.state.verical
    }
  }

  _convertPosToSgf(x, y, ki) {
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

  execPonnuki(array, i, j, ki) {
    let {liberty: libertyUp, recursionPath: recursionPathUp} = this.calcLiberty(array, i, j - 1, ki)
    let {liberty: libertyDown, recursionPath: recursionPathDown} = this.calcLiberty(array, i, j + 1, ki)
    let {liberty: libertyLeft, recursionPath: recursionPathLeft} = this.calcLiberty(array, i - 1, j, ki)
    let {liberty: libertyRight, recursionPath: recursionPathRight} = this.calcLiberty(array, i + 1, j, ki)
    if (libertyUp === 0) {
      recursionPathUp.forEach((i) => {
        let coord = i.split(',')
        array[coord[0]][coord[1]] = 0
      })
    }
    if (libertyDown === 0) {
      recursionPathDown.forEach((i) => {
        let coord = i.split(',')
        array[coord[0]][coord[1]] = 0
      })
    }
    if (libertyLeft === 0) {
      recursionPathLeft.forEach((i) => {
        let coord = i.split(',')
        array[coord[0]][coord[1]] = 0
      })
    }
    if (libertyRight === 0) {
      recursionPathRight.forEach((i) => {
        let coord = i.split(',')
        array[coord[0]][coord[1]] = 0
      })
    }
    return array
  }

  _calcLibertyCore(array, x, y, ki) {
    if (x >= 0 && x < GRID && y >= 0 && y < GRID) {
      if (array[x][y] == ki && !this._recursionPath.includes(`${x},${y}`)) {
        this._recursionPath.push(`${x},${y}`)
        this._calcLibertyCore(array, x - 1, y, ki)
        this._calcLibertyCore(array, x + 1, y, ki)
        this._calcLibertyCore(array, x, y - 1, ki)
        this._calcLibertyCore(array, x, y + 1, ki)
      }
      else if(array[x][y] == 0) {
        this._liberty++
      }
    }
  }

  _autofit(expandH = 2, expandV = 2) {
    let steps = this.props.puzzle.steps.split(';')
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
        this.size = this.boardLayer.height / (this.state.maxhv + 1)
      })
    }

    if (medianH <= 10 && medianV <= 10) {
      this.setState({
        direction: 1,
        horizontal: rightmost + expandH > GRID ? GRID : rightmost + expandH,
        verical: bottommost + expandV > GRID ? GRID : bottommost + expandV
      }, setMaxMinHV)
    }
    else if (medianH > 10 && medianV <= 10) {
      this.setState({
        direction: 2,
        horizontal: GRID - leftmost + 1 + expandH > GRID ? GRID : GRID - leftmost + 1 + expandH,
        verical: bottommost + expandV > GRID ? GRID : bottommost + expandV
      }, setMaxMinHV)
    }
    else if (medianH > 10 && medianV > 10) {
      this.setState({
        direction: 3,
        horizontal: GRID - leftmost + 1 + expandH > GRID ? GRID : GRID - leftmost + 1 + expandH,
        verical: GRID - bottommost + 1 + expandV > GRID ? GRID : GRID - bottommost + 1 + expandV
      }, setMaxMinHV)
    }
    else {
      this.setState({
        direction: 4,
        horizontal: rightmost + expandH > GRID ? GRID : rightmost + expandH,
        verical: GRID - bottommost + 1 + expandV > GRID ? GRID : GRID - bottommost + 1 + expandV
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

