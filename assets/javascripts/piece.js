export default class Piece {
  constructor(x, y, pieceSize, type) {
    this.x || 0;
    this.y || 0;
    this.pieceSize = pieceSize || 1;
    this.type = type || 'B';
  }

  draw(ctx) {
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.pieceSize, 0, 2 * Math.PI, true)
    ctx.lineWidth = 1
    if (this.type == 'B')
      ctx.fillStyle = '#000000'
    else
      ctx.fillStyle = '#ffffff'
    ctx.fill()
    ctx.stroke()
  }

  remove(ctx) {
    this._ctx.clearRect(x - size, y - size, x + size, y + size);
  }

}
