export default class Piece {
  constructor(x, y, pieceSize, type) {
    this.x || 0
    this.y || 0
    this.pieceSize = pieceSize || 1
    this.type = type || 'B'
    this.isCurrent = false
  }

  draw(ctx) {
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.pieceSize, 0, 2 * Math.PI, true)
    ctx.lineWidth = 1
    ctx.strokeStyle = '#000'
    if (this.type == 'B')
      ctx.fillStyle = '#000'
    else
      ctx.fillStyle = '#fff'
    ctx.fill()
    ctx.stroke()

    if (this.isCurrent) {
      ctx.beginPath()
      ctx.arc(this.x, this.y, this.pieceSize * 0.6, 0, 2 * Math.PI, true)
      ctx.lineWidth = 2
      if (this.type == 'B') {
        ctx.strokeStyle = '#fff'
      }
      else {
        ctx.strokeStyle = '#000'
      }
      ctx.stroke()
    }
  }

  remove(ctx, size) {
    ctx.clearRect(this.x - size / 2, this.y - size / 2, size, size);
  }

}
