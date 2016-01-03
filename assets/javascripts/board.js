import Cross from './cross.js';
import Piece from './piece.js';
import Sgf from './sgf.js';

const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T'];
const letters_sgf = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's'];
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19].reverse();

export default class Board {
  constructor(el, grid, size) {
    this.grid = grid || 19;
    this.size = size || 25;
    this._layerWidth = this.size * 20;
    this._layerHeight = this.size * 20;
    this._kifuArray = [];

    let currentCoord = 'None'
    let currentTurn = 'None'
    let step = 0;
    let sgf = new Sgf({});
    let boardLayer = this.createLayer('board_layer', this._layerWidth, this._layerHeight);
    let crossLayer = this.createLayer('cross_layer', this._layerWidth, this._layerHeight);
    let pieceLayer = this.createLayer('piece_layer', this._layerWidth, this._layerHeight);
    let topLayer = this.createLayer('top_layer', this._layerWidth, this._layerHeight);;

    this._boardCtx = boardLayer.getContext('2d');
    this._pieceCtx = pieceLayer.getContext('2d');
    this._crossCtx = crossLayer.getContext('2d');
    this._topCtx = topLayer.getContext('2d');
    this.currentCoord = coord;
    this.currentTurn = currentTurn;

    while(this._kifuArray.push(new Array(19).fill(0)) < 19);

    el.appendChild(boardLayer, this._layerWidth, this._layerHeight);
    el.appendChild(crossLayer, this._layerWidth, this._layerHeight);
    el.appendChild(pieceLayer, this._layerWidth, this._layerHeight);
    topLayer.onmousemove = (e) => {;
      currentCoord = this.convertPosToCoord(e.offsetX, e.offsetY, size);
      this._crossCtx.clearRect(0, 0, this._layerWidth, this._layerHeight);
      this.showCross(currentCoord, '$ff0000');
    }
    topLayer.onclick = (e) => {
      let coord = this.convertPosToCoord(e.offsetX, e.offsetY, size);
      let coord_sgf = this.convertPosToSgfCoord(e.offsetX, e.offsetY, size);
      let {i, j} = this.convertCoordToIndex(coord);

      if (this._kifuArray[i][j] != 0) {
        console.log('该位置已有棋子');
      }
      else {
        this._liberty = 0;
        this._recursionPath = [];
        if (step % 2 === 0) {
          this._kifuArray[i][j] = -1;
          let {liberty, recursionPath} = this.calcLiberty(i, j, -1);
          if (liberty === 0) {
            this._kifuArray[i][j] = 0;
            console.log('此位置不能放棋子');
          }
          else {
            currentTurn = '1';
            sgf.addKi(`;W[${coord_sgf}]`);
            this.move(e.offsetX, e.offsetY, 'W');
            step++;
            let {liberty: libertyUp, recursionPath: recursionPathUp} = this.calcLiberty(i, j - 1, 1);
            let {liberty: libertyDown, recursionPath: recursionPathDown} = this.calcLiberty(i, j + 1, 1);
            let {liberty: libertyLeft, recursionPath: recursionPathLeft} = this.calcLiberty(i - 1, j, 1);
            let {liberty: libertyRight, recursionPath: recursionPathRight} = this.calcLiberty(i + 1, j, 1);
            console.log(`up: ${libertyUp}, down: ${libertyDown}, left: ${libertyLeft}, right: ${libertyRight}`);
            if (libertyUp === 0) {
              recursionPathUp.forEach((i) => {
                this.remove(i);
              });
            }
            if (libertyDown === 0) {
              recursionPathDown.forEach((i) => {
                this.remove(i);
              });
            }
            if (libertyLeft === 0) {
              recursionPathLeft.forEach((i) => {
                this.remove(i);
              });
            }
            if (libertyRight === 0) {
              recursionPathRight.forEach((i) => {
                this.remove(i);
              });
            }
          }
        }
        else {
          this._kifuArray[i][j] = 1;
          let {liberty, recursionPath} = this.calcLiberty(i, j, 1);
          if (liberty === 0) {
            console.log('此位置不能放棋子');
          }
          else {
            currentTurn = '-1';
            sgf.addKi(`;B[${coord_sgf}]`);
            this.move(e.offsetX, e.offsetY, 'B');
            step++;
            let {liberty: libertyUp, recursionPath: recursionPathUp} = this.calcLiberty(i, j - 1, -1);
            let {liberty: libertyDown, recursionPath: recursionPathDown} = this.calcLiberty(i, j + 1, -1);
            let {liberty: libertyLeft, recursionPath: recursionPathLeft} = this.calcLiberty(i - 1, j, -1);
            let {liberty: libertyRight, recursionPath: recursionPathRight} = this.calcLiberty(i + 1, j, -1);
            console.log(`up: ${libertyUp}, down: ${libertyDown}, left: ${libertyLeft}, right: ${libertyRight}`);
            if (libertyUp === 0) {
              recursionPathUp.forEach((i) => {
                this.remove(i);
              });
            }
            if (libertyDown === 0) {
              recursionPathDown.forEach((i) => {
                this.remove(i);
              });
            }
            if (libertyLeft === 0) {
              recursionPathLeft.forEach((i) => {
                this.remove(i);
              });
            }
            if (libertyRight === 0) {
              recursionPathRight.forEach((i) => {
                this.remove(i);
              });
            }
          }
        }
      }
    }
    el.appendChild(topLayer);

  }

  createLayer(layerName, layerWidth, layerHeight) {;
    let layer = document.createElement('canvas');
    layer.id = layerName;
    layer.width = layerWidth;
    layer.height = layerHeight;
    layer.style.position = 'absolute';
    layer.style.left = 0;
    layer.style.top = 0;
    return layer;
  }

  draw() {
    this._boardCtx.beginPath();
    for(let i = 1;i <= this.grid; i++) {;
      this._boardCtx.moveTo(i * this.size, this.size);
      this._boardCtx.lineTo(i * this.size, this.grid * this.size);
      this._boardCtx.moveTo(this.size, i * this.size);
      this._boardCtx.lineTo(this.grid * this.size, i * this.size);
    };
    this._boardCtx.stroke()
    let dot_size = 3;
    if (this.grid == 19) {
      [4, 16, 10].forEach((i) => {
        [4, 16, 10].forEach((j) => {
          this._boardCtx.beginPath()
          this._boardCtx.arc(this.size * i, this.size * j, dot_size, 0, 2 * Math.PI, true);
          this._boardCtx.fill();
        })
      })
    }
  }

  move(x, y, type) {
    let realPos = this.convertPosToRealPos(x, y);
    let piece = new Piece();
    piece.x = realPos.x;
    piece.y = realPos.y;
    piece.pieceSize = this.size / 2 - 3;
    piece.type = type;
    piece.draw(this._pieceCtx);
  }

  remove(coord) {
    let realPos = this.convertCoordToRealPos(coord);
    let {i, j} = this.convertCoordToIndex(coord);
    this._kifuArray[i][j] = 0;
    let piece = new Piece();
    piece.x = realPos.x;
    piece.y = realPos.y;
    piece.remove(this._pieceCtx, this.size);
  }

  convertPosToCoord(x, y) {;
    let letter = letters[Math.round((x - this.size) / this.size)];
    let number = numbers[Math.round((y - this.size) / this.size)];
    return `${letter}${number}`;
  }

  convertPosToSgfCoord(x, y, size) {
    let letter = letters_sgf[Math.round((x - size) / size)];
    let number = letters_sgf[Math.round((y - size) / size)];
    return `${letter}${number}`
  }

  convertCoordToPos(coord) {
    let results = [];
    let {i, j} = this.convertCoordToIndex(coord);
    results[0] = (i + 1) * this.size;
    results[1] = (j + 1) * this.size;
    return {
      x: results[0],
      y: results[1]
    };
  }

  convertPosToRealPos(x, y) {
    console.log(`x: ${x}, y: ${y}`);
    let letter = letters[Math.round((x - this.size) / this.size)];
    let number = numbers[Math.round((y - this.size) / this.size)];

    let results = [];
    let {i, j} = this.convertCoordToIndex(`${letter}${number}`);
    console.log(`rx: ${(i+1) * this.size}, ry: ${(j+1) * this.size}`);
    return {
      x: (i + 1) * this.size,
      y: (j + 1) * this.size
    }
  }

  convertCoordToRealPos(coord) {
    let pos = this.convertCoordToPos(coord);
    let realPos = this.convertPosToRealPos(pos.x, pos.y);
    return realPos;
  }

  convertCoordToIndex (coord) {
    let letter = coord.charAt(0);
    let number = coord.slice(1);
    let i = letters.indexOf(letter);
    let j = numbers.indexOf(parseInt(number));
    return {i, j};
  }

  calcBlackOrWhite(x, y) {
    return this._kifuArray[x][y];
  }

  _calcLibertyCore(x, y, ki) {
    if (x >= 0 && x < this.grid && y >= 0 && y < this.grid) {
      if (this._kifuArray[x][y] == ki && !this._recursionPath.includes(`${letters[x]}${numbers[y]}`)) {
        this._recursionPath.push(`${letters[x]}${numbers[y]}`);
        this._calcLibertyCore(x - 1, y, ki);
        this._calcLibertyCore(x + 1, y, ki);
        this._calcLibertyCore(x, y - 1, ki);
        this._calcLibertyCore(x, y + 1, ki);
      }
      else if(this._kifuArray[x][y] == 0) {
        this._liberty++;
      }
    }
  }

  calcLiberty(x, y, ki) {
    this._liberty = 0;
    this._recursionPath = [];
    if (x < 0 || y < 0) {
      return {
        liberty: 4,
        recursionPath: []
      }
    }
    if (this._kifuArray[x][y] == 0) {
      return {
        liberty: 4,
        recursionPath: []
      }
    }
    this._calcLibertyCore(x, y, ki);
    console.log(this._liberty);
    console.log(this._recursionPath);
    return {
      liberty: this._liberty,
      recursionPath: this._recursionPath
    }
  }

  showCross(coord, color) {
    let results = this.convertCoordToPos(coord, this.size);
    let cross = new Cross();
    cross.x = results[0];
    cross.y = results[1];
    cross.size = 5;
    cross.color = color;
    cross.draw(this._crossCtx);
  }
}
