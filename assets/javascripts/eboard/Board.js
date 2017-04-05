import _ from 'lodash'
import showKi from './BoardCore'
import Stone from './Stone'
import { LETTERS_SGF } from '../constants/Go'

export default class Board {
  constructor(width = 19, height = 19, theme = 'walnut-theme', material = {}, arrangement = []) {
    this.width = width
    this.height = height
    this.theme = theme
    if (arrangement == undefined || arrangement.length === 0) {
      this.arrangement = _.chunk(new Array(this.width * this.height).fill(0), this.width)
    }
    this.material = material
  }

  move(steps) {
    this.arrangement = showKi(this.arrangement, steps)
    this.lastStone = steps[steps.length - 1]
  }

  render(canvas) {
    let ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    this.renderBoard(canvas, ctx)
    this.renderStones(canvas, ctx)
  }

  renderBoard(canvas, ctx) {
    let size = canvas.width / (this.width + 1)
    if (this.theme === 'black-and-white') {
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
      ctx.lineTo(i * size, this.width * size)
      ctx.moveTo(size, i * size)
      ctx.lineTo(this.width * size, i * size)
    }
    ctx.stroke()
    if (this.width == 19) {
      [4, 16, 10].forEach((i) => {
        [4, 16, 10].forEach((j) => {
          ctx.beginPath()
          ctx.arc(size * i, size * j, size / 10, 0, 2 * Math.PI, true)
          ctx.fillStyle = 'black'
          ctx.fill()
        })
      })
    }
  }

  renderStones(canvas, ctx) {
    let il, jl
    if (this.lastStone !== undefined) {
      il = LETTERS_SGF.indexOf(this.lastStone[2])
      jl = LETTERS_SGF.indexOf(this.lastStone[3])
    }
    let size = canvas.width / (this.width + 1)
    for (let i = 0; i < this.width; i++) {
      for (let j = 0; j < this.height; j++) {
        let piece = new Stone(
          (i + 1) * size,
          (j + 1) * size,
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
