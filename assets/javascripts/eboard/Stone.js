export default class Stone {

  constructor(x, y, size, type) {
    this.x = x || 0
    this.y = y || 0
    this.size = size
    this.type = type
  }

  draw(ctx) {
    if (this.type == 0) return
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI, true)
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
      ctx.arc(this.x, this.y, this.size * 0.6, 0, 2 * Math.PI, true)
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

  remove(ctx, size) {
    ctx.clearRect(this.x - size / 2, this.y - size / 2, size, size)
  }

}

