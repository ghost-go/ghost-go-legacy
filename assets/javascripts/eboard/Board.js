import _ from 'lodash'
import showKi from './BoardCore'
import Stone from './Stone'

export default class Board {
  constructor(width = 19, height = 19, arrangement = []) {
    this.width = width
    this.height = height
    if (arrangement == undefined || arrangement.length === 0) {
      this.arrangement = _.chunk(new Array(this.width * this.height).fill(0), this.width)
    }
  }

  move(steps) {
    this.arrangement = showKi(this.arrangement, steps)
  }

  render(canvas) {
    let ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    this.renderBoard(canvas, ctx)
    this.renderStones(canvas, ctx)
  }

  renderBoard(canvas, ctx) {
    let size = canvas.width / (this.width + 1)
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
    let size = canvas.width / (this.width + 1)
    for (let i = 0; i < this.width; i++) {
      for (let j = 0; j < this.height; j++) {
        let piece = new Stone(
          (i + 1) * size,
          (j + 1) * size,
          size / 2 - 2,
          this.arrangement[i][j]
        )
        piece.draw(ctx)
      }
    }
  }

}
