import _ from 'lodash'
import showKi from './BoardCore'
import Stone from './Stone'
import { LETTERS_SGF } from '../constants/Go'

export default class Board {
  constructor(width = 19, height = 19, autofit = false, theme = 'walnut-theme', material = {}, arrangement = []) {
    this.width = width
    this.height = height
    this.theme = theme
    this.autofit = autofit
    this.quadrant = 0
    if (arrangement == undefined || arrangement.length === 0) {
      this.arrangement = _.chunk(new Array(361).fill(0), 19)
    }
    this.material = material
  }

  move(steps) {
    this.arrangement = showKi(this.arrangement, steps)
    if (this.autofit) {
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
      this.leftmost = _.min(iArray)
      this.rightmost = _.max(iArray)
      this.topmost = _.min(jArray)
      this.bottommost = _.max(jArray)
      this.leftmost = this.leftmost - expand > 0 ? this.leftmost - expand : 0
      this.rightmost = this.rightmost + expand > 19 ? 19 : this.rightmost + expand
      this.topmost = this.topmost - expand > 0 ? this.leftmost - expand : 0
      this.bottommost = this.bottommost + expand > 19 ? 19 : this.bottommost + expand

      this.maxhv = _.max([this.rightmost - this.leftmost, this.bottommost - this.topmost])
      this.maxhv = this.maxhv > 19 ? 19 : this.maxhv
      this.width =  this.maxhv
      this.height = this.maxhv
      //this.horizontal = this.rightmost - this.leftmost
      //this.verical = this.bottommost - this.topmost
    }

    this.lastStone = steps[steps.length - 1]
  }

  render(canvas) {
    let ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    this.renderBoard(canvas, ctx)
    this.renderStones(canvas, ctx)
  }

  renderBoard(canvas, ctx) {
    let size = canvas.width / (_.max([this.width, this.height]) + 1)
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
      ctx.moveTo(i * size, size)
      ctx.lineTo(i * size, this.height * size)
    }
    for(let i = 1;i <= this.height; i++) {
      ctx.moveTo(size, i * size)
      ctx.lineTo(this.width * size, i * size)
    }
    ctx.stroke()
    ;[4, 16, 10].forEach((i) => {
      [4, 16, 10].forEach((j) => {
        if (i < this.leftmost && i > this.rightmost && j > this.topmost && j < this.bottommost) {
          ctx.beginPath()
          ctx.arc(size * i, size * j, size / 10, 0, 2 * Math.PI, true)
          ctx.fillStyle = 'black'
          ctx.fill()
        }
      })
    })
  }

  renderStones(canvas, ctx) {
    let il, jl
    if (this.lastStone !== undefined) {
      il = LETTERS_SGF.indexOf(this.lastStone[2])
      jl = LETTERS_SGF.indexOf(this.lastStone[3])
    }
    let size = canvas.width / (this.width + 1)
    let offsetX = this.rightmost > this.maxhv ? this.rightmost - this.maxhv : 0
    let offsetY = this.bottommost > this.maxhv ? this.bottommost - this.maxhv : 0

    for (let i = 0; i < 19; i++) {
      for (let j = 0; j < 19; j++) {
        let piece = new Stone(
          ((i + 1) - offsetX) * size,
          ((j + 1) - offsetY) * size,
          size / 2 - 2,
          this.arrangement[i][j],
          il === i && jl === j,
          this.theme,
          i * j % 5
        )
        piece.draw(ctx)
      }
    }
  }

}
