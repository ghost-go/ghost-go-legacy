export default class Cursor {
  constructor(x, y, size, color, type) {
    this.x = x || 0;
    this.y = y || 0;
    this.size = size || 5;
    this.color = color || '#000000';
    this.type = type;
  }

  draw(ctx) {
    if (this.type === 1) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI, true);
      ctx.lineWidth = 1;
      ctx.strokeStyle = '#000';
      ctx.globalAlpha = 0.6;
      ctx.fillStyle = '#000';
      ctx.fill();
      ctx.stroke();
      ctx.globalAlpha = 1;
    } else if (this.type === -1) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI, true);
      ctx.lineWidth = 1;
      ctx.strokeStyle = '#FFF';
      ctx.globalAlpha = 0.6;
      ctx.fillStyle = '#FFF';
      ctx.fill();
      ctx.stroke();
      ctx.globalAlpha = 1;
    } else {
      ctx.beginPath();
      ctx.lineWidth = 1;
      ctx.moveTo(this.x - this.size, this.y - this.size);
      ctx.lineTo(this.x + this.size, this.y + this.size);
      ctx.moveTo(this.x - this.size, this.y + this.size);
      ctx.lineTo(this.x + this.size, this.y - this.size);
      ctx.stroke();
    }
  }
}
