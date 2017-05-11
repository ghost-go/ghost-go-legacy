export default class Cross {
  constructor(x, y, size, color) {
    this.x = x || 0;
    this.y = y || 0;
    this.size = size || 5;
    this.color = color || '$000000';
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.moveTo(this.x - this.size, this.y - this.size);
    ctx.lineTo(this.x + this.size, this.y + this.size);
    ctx.moveTo(this.x - this.size, this.y + this.size);
    ctx.lineTo(this.x + this.size, this.y - this.size);
    ctx.stroke();
  }
}
