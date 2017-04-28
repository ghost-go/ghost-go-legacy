import _ from 'lodash'
import showKi from './BoardCore'
import Stone from './Stone'
import Cross from './Cross'
import { CoordsToTree, LETTERS_SGF, BLANK_ARRAY } from '../constants/Go'

export default class Board {
  constructor(args) {
    this.width = args.width || 19
    this.height = args.height || 19
    this.theme = args.theme || 'black-and-white'
    this.autofit = args.autofit || false
    this.editable = args.editable || false
    this.nextStoneType = args.nextStoneType || 1
    if (args.arrangement == undefined || args.arrangement.length === 0) {
      this.arrangement = BLANK_ARRAY
    }
    this.material = args.material
    this.initStones = []
    this.afterMove = args.afterMove
  }

  setStones(root, execPonnuki = true) {
    this.arrangement = BLANK_ARRAY
    this.root = root
    let stones = []
    root.walk((node) => {
      if (node.model.coord) {
        stones.push(node.model.coord)
        if (!node.hasChildren()) {
          this.lastNode = node
        }
      }
    })
    stones = _.without(stones, '')
    let { arrangement } = showKi(this.arrangement, stones, execPonnuki)
    this.arrangement = arrangement
    if (this.autofit) {
      this.fitBoard()
    }
  }

  getArrangement() {
    return this.arrangement
  }

  getTree() {
    return this.root
  }

  fitBoard() {
    let iArray = []
    let jArray = []
    for (let i = 0; i < 19; i++) {
      for (let j = 0; j < 19; j++) {
        if (this.arrangement[i][j] !== 0) {
          iArray.push(i)
          jArray.push(j)
        }
      }
    }
    let expand = 3
    this.leftmost = _.min(iArray) - expand > 0 ? _.min(iArray) - expand : 0
    this.rightmost = _.max(iArray) + expand > 19 ? 19 : _.max(iArray) + expand
    this.topmost = _.min(jArray) - expand > 0 ? _.min(jArray) - expand : 0
    this.bottommost = _.max(jArray) + expand > 19 ? 19 : _.max(jArray) + expand

    this.maxhv = _.max([this.rightmost - this.leftmost, this.bottommost - this.topmost])
    this.maxhv = this.maxhv > 19 ? 19 : this.maxhv
    this.width = this.height = this.maxhv
    this.offsetX = this.rightmost > this.maxhv ? this.rightmost - this.maxhv : 0
    this.offsetY = this.bottommost > this.maxhv ? this.bottommost - this.maxhv : 0
  }

  render(canvas) {
    this.size = canvas.width / (_.max([this.width, this.height]) + 1)
    let ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    this.renderBoard(canvas, ctx)
    this.renderStones(canvas, ctx)
    if (this.editable) {
      this.renderCursor(canvas, ctx)
      canvas.onclick = (e) => {
        let x = Math.round(e.offsetX / this.size) + this.offsetX - 1
        let y = Math.round(e.offsetY / this.size) + this.offsetY - 1
        let type = this.nextStoneType === 1 ? 'B' : 'W'
        let step = `${type}[${LETTERS_SGF[x]}${LETTERS_SGF[y]}]`
        let node = CoordsToTree([step])
        let { hasMoved } = showKi(this.arrangement, [step])
        if (hasMoved) {
          this.lastNode.addChild(node.children[0])
          this.nextStoneType = -this.nextStoneType
          this.setStones(this.root)
          ctx.clearRect(0, 0, canvas.width, canvas.height)
          this.renderBoard(canvas, ctx)
          this.renderStones(canvas, ctx)
          if (this.afterMove) {
            this.afterMove(step)
          }
        }
      }
    }
  }

  renderBoard(canvas, ctx) {
    this.size = canvas.width / (_.max([this.width, this.height]) + 1)
    if (this.theme === 'black-and-white') {
      //TODO: blablabla
    } else if (this.theme === 'walnut-theme') {
      let pattern = ctx.createPattern(this.material[`/assets/themes/${this.theme}/board.jpg`], 'repeat')
      ctx.fillStyle = pattern
      ctx.fillRect(0, 0, canvas.width, canvas.height)
    } else if (this.theme === 'flat-theme') {
      ctx.fillStyle = '#ECB55A'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
    } else {
      let pattern = ctx.createPattern(this.material[`/assets/themes/${this.theme}/board.png`], 'repeat')
      ctx.fillStyle = pattern
      ctx.fillRect(0, 0, canvas.width, canvas.height)
    }
    ctx.beginPath()
    for(let i = 1;i <= this.width; i++) {
      ctx.moveTo(i * this.size, this.size)
      ctx.lineTo(i * this.size, this.height * this.size)
    }
    for(let i = 1;i <= this.height; i++) {
      ctx.moveTo(this.size, i * this.size)
      ctx.lineTo(this.width * this.size, i * this.size)
    }
    ctx.stroke()
    let dotSize = this.size / 12
    ;[4, 16, 10].forEach((i) => {
      [4, 16, 10].forEach((j) => {
        ctx.beginPath()
        if (this.autofit && ((i - this.offsetX) > 1 && (j - this.offsetY) > 1) && (i - this.offsetX) < this.maxhv && (j - this.offsetY) < this.maxhv) {
          ctx.arc((i - this.offsetX) * this.size, (j - this.offsetY) * this.size, dotSize, 0, 2 * Math.PI, true)
        } else if(!this.autofit) {
          ctx.arc(i * this.size, j * this.size, dotSize, 0, 2 * Math.PI, true)
        }
        ctx.fillStyle = 'black'
        ctx.fill()
      })
    })
  }

  renderStones(canvas, ctx) {
    let il, jl
    this.size = canvas.width / (_.max([this.width, this.height]) + 1)
    if (this.lastNode !== undefined) {
      il = LETTERS_SGF.indexOf(this.lastNode.model.coord[2])
      jl = LETTERS_SGF.indexOf(this.lastNode.model.coord[3])
    }

    let coordX = 0, coordY = 0
    for (let i = 0; i < 19; i++) {
      for (let j = 0; j < 19; j++) {
        if(this.autofit) {
          coordX = ((i + 1) - this.offsetX) * this.size
          coordY = ((j + 1) - this.offsetY) * this.size
        } else {
          coordX = (i + 1) * this.size
          coordY = (j + 1) * this.size
        }
        let stone = new Stone(
          coordX,
          coordY,
          this.size / 2 - 2,
          this.arrangement[i][j],
          il === i && jl === j,
          this.theme,
          i * j % 5
        )
        stone.draw(ctx)
      }
    }
  }

  renderCursor(canvas, ctx) {
    canvas.onmousemove = (e) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      this.renderBoard(canvas, ctx)
      let cross = new Cross()
      cross.x = Math.round(e.offsetX / this.size) * this.size
      cross.y = Math.round(e.offsetY / this.size) * this.size
      cross.size = this.size / 6
      cross.color = '#ff0000'
      cross.draw(ctx)
      this.renderStones(canvas, ctx)
    }
  }
}
