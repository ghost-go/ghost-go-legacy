export default class Piece {
  constructor(x, y, size, type) {
    this.x = x || 0
    this.y = y || 0
    this.size = size || 1
    this.type = type || 'B'
  }

  draw(ctx) {
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI, true)
    ctx.lineWidth = 1
    if (this.type == 'B')
      ctx.fillStyle = '#000000'
    else
      ctx.fillStyle = '#ffffff'
    ctx.fill()
    ctx.stroke()
  }
}
