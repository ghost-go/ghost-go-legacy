import _ from 'lodash';
import showKi from './BoardCore';
import Stone from './Stone';
import Cursor from './Cursor';
import {
  LETTERS_SGF,
  LETTERS,
  BLANK_ARRAY,
  MATERIALS,
  NUMBERS,
} from '../common/Constants';

export default class SgfBoard {
  constructor(args) {
    this.width = args.width || 19;
    this.height = args.height || 19;
    this.theme = args.theme || 'black-and-white';
    this.autofit = args.autofit || false;
    this.editable = args.editable || false;
    this.nextStoneType = args.nextStoneType || 1;
    this.boardStates = args.boardStates || {};
    if (args.arrangement === undefined || args.arrangement.length === 0) {
      this.arrangement = BLANK_ARRAY;
    }
    this.initStones = [];
    this.addStep = args.addStep;
    this.removeStep = args.removeStep;
    this.canvas = args.canvas;
    this.sgf = args.sgf || `
       (;FF[4]GM[1]SZ[19]
       GN[Copyright goproblems.com]
       PB[Black]
       HA[0]
       PW[White]
       KM[5.5]
       DT[1999-07-21]
       TM[1800]
       RU[Japanese]
       ;AW[bb][cb][cc][cd][de][df][cg][ch][dh][ai][bi][ci]
       AB[ba][ab][ac][bc][bd][be][cf][bg][bh]
       C[Black to play and live.]
       (;B[af];W[ah]
       (;B[ce];W[ag]C[only one eye this way])
       (;B[ag];W[ce]))
       (;B[ah];W[af]
       (;B[ae];W[bf];B[ag];W[bf]
       (;B[af];W[ce]C[oops! you can't take this stone])
       (;B[ce];W[af];B[bg]C[RIGHT black plays under the stones and lives]))
       (;B[bf];W[ae]))
       (;B[ae];W[ag]))
    `;
    this.setNextStoneType = args.setNextStoneType;
    this.showCoordinate = args.showCoordinate || false;
    this.movedStones = args.movedStones || [];

    this.materials = MATERIALS[_.camelCase(this.theme)];
    this.offsetX = 0;
    this.offsetY = 0;
    this.lastNode = this.root;
    this.maxhv = 19;
  }

  addStones() {
    let AB = [];
    let AW = [];
    AB = /\[.*\]/.exec(/(AB.*?)[A-Z|\n|\r]/mg.exec(this.sgf)[1]);
    if (AB) {
      AB = AB[0]
        .split('][')
        .map(n => `B[${n.replace('[', '').replace(']', '')}]`);
    } else {
      AB = [];
    }
    AW = /\[.*\]/.exec(/(AW.*?)[A-Z|\n|\r]/mg.exec(this.sgf)[1]);
    if (AW) {
      AW = AW[0]
        .split('][')
        .map(n => `W[${n.replace('[', '').replace(']', '')}]`);
    } else {
      AW = [];
    }

    const { arrangement } = showKi(this.arrangement, AB.concat(AW), false);
    this.arrangement = arrangement;
    if (this.autofit) {
      this.fitBoard();
    }
  }

  moveStones() {
    const { arrangement } = showKi(this.arrangement, this.movedStones, true);
    this.arrangement = arrangement;
    if (this.autofit) {
      this.fitBoard();
    }
  }

  fitBoard() {
    const iArray = [];
    const jArray = [];
    for (let i = 0; i < 19; i++) {
      for (let j = 0; j < 19; j++) {
        if (this.arrangement[i][j] !== 0) {
          iArray.push(i);
          jArray.push(j);
        }
      }
    }
    const expand = 3;
    this.leftmost = _.min(iArray) - expand > 0 ? _.min(iArray) - expand : 0;
    this.rightmost = _.max(iArray) + expand > 19 ? 19 : _.max(iArray) + expand;
    this.topmost = _.min(jArray) - expand > 0 ? _.min(jArray) - expand : 0;
    this.bottommost = _.max(jArray) + expand > 19 ? 19 : _.max(jArray) + expand;

    this.maxhv = _.max([this.rightmost - this.leftmost, this.bottommost - this.topmost]);
    this.maxhv = this.maxhv > 19 ? 19 : this.maxhv;
    this.width = this.maxhv;
    this.height = this.maxhv;
    this.offsetX = this.rightmost > this.maxhv ? this.rightmost - this.maxhv : 0;
    this.offsetY = this.bottommost > this.maxhv ? this.bottommost - this.maxhv : 0;
  }

  render() {
    console.log('render');
    this.size = this.canvas.width / (_.max([this.width, this.height]) + 1);
    const ctx = this.canvas.getContext('2d');
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.renderBoard(ctx);
    this.renderStones(this.canvas, ctx);
    this.renderCoordinate(ctx);
    if (this.editable) {
      this.renderCursor(ctx);
      this.canvas.onclick = (e) => {
        const x = (Math.round(e.offsetX / this.size) + this.offsetX) - 1;
        const y = (Math.round(e.offsetY / this.size) + this.offsetY) - 1;
        const currentStone = this.arrangement[x][y];
        const type = this.nextStoneType === 1 ? 'B' : 'W';
        const currentType = currentStone === 1 ? 'B' : 'W';
        const step = `${type}[${LETTERS_SGF[x]}${LETTERS_SGF[y]}]`;
        const currentStep = `${currentType}[${LETTERS_SGF[x]}${LETTERS_SGF[y]}]`;
        const { hasMoved } = showKi(this.arrangement, [step]);
        if (this.boardStates.clear && !hasMoved) {
          this.removeStep(currentStep);
        } else if (hasMoved) {
          this.addStep(step);
        }
      };
    }
  }

  renderBoard(ctx) {
    this.size = this.canvas.width / (_.max([this.width, this.height]) + 1);

    const shadowStyle = '5px 5px 5px #999999';
    if (this.theme === 'black-and-white') {
      this.canvas.style.boxShadow = '0px 0px 0px #000000';
    } else if (this.theme === 'flat-theme') {
      this.canvas.style.boxShadow = shadowStyle;
      ctx.fillStyle = '#ECB55A';
      ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    } else {
      this.canvas.style.boxShadow = shadowStyle;
      const pattern = ctx.createPattern(this.materials.board[0], 'repeat');
      ctx.fillStyle = pattern;
      ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
    ctx.beginPath();
    for (let i = 1; i <= this.width; i++) {
      ctx.moveTo(i * this.size, this.size);
      ctx.lineTo(i * this.size, this.height * this.size);
    }
    for (let i = 1; i <= this.height; i++) {
      ctx.moveTo(this.size, i * this.size);
      ctx.lineTo(this.width * this.size, i * this.size);
    }

    ctx.stroke();
    const dotSize = this.size / 12;
    [4, 16, 10].forEach((i) => {
      [4, 16, 10].forEach((j) => {
        ctx.beginPath();
        if (this.autofit && ((i - this.offsetX) > 1 &&
          (j - this.offsetY) > 1) &&
          (i - this.offsetX) < this.maxhv &&
          (j - this.offsetY) < this.maxhv) {
          ctx.arc(
            (i - this.offsetX) * this.size,
            (j - this.offsetY) * this.size,
            dotSize,
            0,
            2 * Math.PI,
            true,
          );
        } else if (!this.autofit) {
          ctx.arc(i * this.size, j * this.size, dotSize, 0, 2 * Math.PI, true);
        }
        ctx.fillStyle = 'black';
        ctx.fill();
      });
    });
  }

  renderStones(canvas, ctx) {
    this.arrangement = BLANK_ARRAY;
    this.addStones();
    this.moveStones();
    this.size = canvas.width / (_.max([this.width, this.height]) + 1);

    let coordX = 0;
    let coordY = 0;
    for (let i = 0; i < 19; i++) {
      for (let j = 0; j < 19; j++) {
        if (this.autofit) {
          coordX = ((i + 1) - this.offsetX) * this.size;
          coordY = ((j + 1) - this.offsetY) * this.size;
        } else {
          coordX = (i + 1) * this.size;
          coordY = (j + 1) * this.size;
        }
        const stone = new Stone(
          coordX,
          coordY,
          (this.size / 2) - 2,
          this.arrangement[i][j],
          false,
          this.theme,
          (i * j) % 5,
        );
        stone.draw(ctx);
      }
    }
  }

  renderCursor(ctx) {
    this.canvas.onmousemove = (e) => {
      const roundedOffsetX = Math.round(e.offsetX / this.size);
      const roundedOffsetY = Math.round(e.offsetY / this.size);
      if (roundedOffsetX > 0 &&
        roundedOffsetY > 0 &&
        roundedOffsetX <= this.maxhv &&
        roundedOffsetY <= this.maxhv
      ) {
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.renderBoard(ctx);
        const cursor = new Cursor();
        cursor.x = roundedOffsetX * this.size;
        cursor.y = roundedOffsetY * this.size;
        if (this.boardStates.clear) {
          cursor.type = 0;
        } else {
          cursor.type = this.nextStoneType;
        }
        cursor.size = this.size / 3;
        cursor.draw(ctx);
        this.renderStones(this.canvas, ctx);
        this.renderCoordinate(ctx);
      }
    };
  }

  renderCoordinate(ctx) {
    if (this.showCoordinate) {
      ctx.fillStyle = '#000000';
      ctx.font = `bold ${this.size / 2.8}px Helvetica`;
      let letters = [];
      let numbers = [];
      if (this.leftmost + this.rightmost < 10 && this.topmost + this.bottommost < 10) {
        letters = LETTERS.slice(0, this.maxhv);
        numbers = NUMBERS.slice(0, this.maxhv);
      } else if (this.leftmost + this.rightmost >= 10 && this.topmost + this.bottommost < 10) {
        letters = LETTERS.slice(LETTERS.length - this.maxhv, LETTERS.length);
        numbers = NUMBERS.slice(0, this.maxhv);
      } else if (this.leftmost + this.rightmost < 10 && this.topmost + this.bottommost >= 10) {
        letters = LETTERS.slice(0, this.maxhv);
        numbers = NUMBERS.slice(LETTERS.length - this.maxhv, LETTERS.length);
      } else {
        letters = LETTERS.slice(LETTERS.length - this.maxhv, LETTERS.length);
        numbers = NUMBERS.slice(LETTERS.length - this.maxhv, LETTERS.length);
      }

      letters.forEach((l, index) => {
        ctx.fillText(l,
          (this.size * (index + 1)) - (this.size / 8),
          this.size / 2,
        );
      });
      numbers.forEach((l, index) => {
        if (index < this.maxhv) {
          if (l >= 10) {
            ctx.fillText(l,
              this.size / 6,
              (this.size * (index + 1)) + (this.size / 5),
            );
          } else {
            ctx.fillText(l,
              this.size / 4,
              (this.size * (index + 1)) + (this.size / 5),
            );
          }
        }
      });
    }
  }
}
