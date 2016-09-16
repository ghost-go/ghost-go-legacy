export default class Piece {

  constructor(x, y, pieceSize, type, isMarked) {
    this.x = x || 0
    this.y = y || 0
    this.pieceSize = pieceSize || 1
    this.type = type || 0
    this.isMarked = isMarked || false
    this.draw = this.draw.bind(this)
  }

  draw(ctx) {
    if (ctx != null) {
      if (this.type == 0) {
        ctx.clearRect(this.x - this.pieceSize,
                      this.y - this.pieceSize,
                      this.x + this.pieceSize,
                      this.y + this.pieceSize)
      }
      else {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.pieceSize, 0, 2 * Math.PI, true)
        ctx.lineWidth = 1
        ctx.strokeStyle = '#000'
        if (this.type == 1)
          ctx.fillStyle = '#000'
        else
          ctx.fillStyle = '#fff'
        ctx.fill()
        ctx.stroke()

        if (this.isMarked) {
          ctx.beginPath()
          ctx.arc(this.x, this.y, this.pieceSize * 0.6, 0, 2 * Math.PI, true)
          ctx.lineWidth = 2
          if (this.type == 1) {
            ctx.strokeStyle = '#fff'
          }
          else {
            ctx.strokeStyle = '#000'
          }
          ctx.stroke()
        }
      }
    }
  }

  remove(ctx, size) {
    ctx.clearRect(this.x - size / 2, this.y - size / 2, size, size)
  }

}
