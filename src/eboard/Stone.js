import _ from 'lodash';
import { THEME, MATERIALS } from '../common/Go';

export default class Stone {
  constructor(x, y, size, type, isMarked = false, theme = 'black-and-white') {
    this.x = x || 0;
    this.y = y || 0;
    this.size = size;
    this.type = type;
    this.isMarked = isMarked;
    this.theme = theme;
    this.materials = MATERIALS[_.camelCase(this.theme)];
  }

  static addShadow(ctx) {
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;
    ctx.shadowColor = '#555';
    ctx.shadowBlur = 10;
  }

  static removeShadow(ctx) {
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.shadowColor = 'black';
    ctx.shadowBlur = 0;
  }

  draw(ctx) {
    if (this.type === 0) return;

    if (THEME[_.camelCase(this.theme)].stoneShadow) Stone.addShadow(ctx);
    if (this.materials.black.length > 0 || this.materials.white.length > 0) {
      ctx.drawImage(
        this.type === 1 ? this.materials.black[0] : this.materials.white[0],
        this.x - this.size,
        this.y - this.size,
        this.size * 2,
        this.size * 2,
      );
    } else {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI, true);
      ctx.lineWidth = 1;
      ctx.strokeStyle = '#000';
      if (this.type === 1) {
        ctx.fillStyle = '#000';
      } else {
        ctx.fillStyle = '#fff';
      }
      ctx.fill();
      ctx.stroke();
    }
    if (THEME[_.camelCase(this.theme)].stoneShadow) Stone.removeShadow(ctx);

    if (this.isMarked) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size * 0.6, 0, 2 * Math.PI, true);
      ctx.lineWidth = 2;
      if (this.type === 1) {
        ctx.strokeStyle = '#fff';
      } else {
        ctx.strokeStyle = '#000';
      }
      ctx.stroke();
      ctx.lineWidth = 1;
      ctx.strokeStyle = '#000';
    }
  }

  remove(ctx, size) {
    ctx.clearRect(this.x - (size / 2), this.y - (size / 2), size, size);
  }
}

