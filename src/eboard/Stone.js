export default class Stone {
  constructor(x, y, size, type, isMarked = false, theme = 'black-and-white', seed = 0.1) {
    this.x = x || 0;
    this.y = y || 0;
    this.size = size;
    this.type = type;
    this.isMarked = isMarked;
    this.theme = theme;
    this.seed = seed;
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
    const black = new Image();
    const white = new Image();
    // TODO: Need refactor
    if (this.theme === 'flat-theme') {
      black.src = `/assets/themes/${this.theme}/black.svg`;
      white.src = `/assets/themes/${this.theme}/white.svg`;
      ctx.drawImage(
        this.type === 1 ? black : white,
        this.x - this.size,
        this.y - this.size,
        this.size * 2,
        this.size * 2,
      );
    } else if (this.theme === 'photorealistic-theme') {
      black.src = `/assets/themes/${this.theme}/black.png`;
      white.src = `/assets/themes/${this.theme}/white.png`;
      this.addShadow(ctx);
      ctx.drawImage(
        this.type === 1 ? black : white,
        this.x - this.size,
        this.y - this.size,
        this.size * 2,
        this.size * 2,
      );
      this.removeShadow(ctx);
    } else if (this.theme === 'shell-stone') {
      black.src = `/assets/themes/${this.theme}/black.png`;
      const white0 = new Image();
      white0.src = `/assets/themes/${this.theme}/white0.png`;
      const white1 = new Image();
      white1.src = `/assets/themes/${this.theme}/white1.png`;
      const white2 = new Image();
      white2.src = `/assets/themes/${this.theme}/white2.png`;
      const white3 = new Image();
      white3.src = `/assets/themes/${this.theme}/white3.png`;
      const white4 = new Image();
      white4.src = `/assets/themes/${this.theme}/white4.png`;
      this.addShadow(ctx);
      ctx.drawImage(
        this.type === 1 ? black : white1,
        this.x - this.size,
        this.y - this.size,
        this.size * 2,
        this.size * 2,
      );
      this.removeShadow(ctx);
    } else if (this.theme === 'slate-and-shell-theme') {
      // TODO: TBD
    } else if (this.theme === 'subdued-theme') {
      black.src = `/assets/themes/${this.theme}/black.png`;
      white.src = `/assets/themes/${this.theme}/white.png`;
      this.addShadow(ctx);
      ctx.drawImage(
        this.type === 1 ? black : white,
        this.x - this.size,
        this.y - this.size,
        this.size * 2,
        this.size * 2,
      );
      this.removeShadow(ctx);
    } else if (this.theme === 'walnut-theme') {
      black.src = `/assets/themes/${this.theme}/black.png`;
      white.src = `/assets/themes/${this.theme}/white.png`;
      this.addShadow(ctx);
      ctx.drawImage(
        this.type === 1 ? black : white,
        this.x - this.size,
        this.y - this.size,
        this.size * 2, this.size * 2,
      );
      this.removeShadow(ctx);
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

