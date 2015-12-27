import Cross from './cross.js';
import Piece from './piece.js';
import Sgf from './sgf.js';

const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T'];
const letters_sgf = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's'];
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19].reverse();

export default class Board {
  constructor(el, grid, size) {
    let layerWidth = size * 20;
    let layerHeight = size * 20;
    let currentCoord = 'None'
    let currentTurn = 'None'
    let step = 0;
    let sgf = new Sgf({});
    let boardLayer = this.createLayer('board_layer', layerWidth, layerHeight);
    let crossLayer = this.createLayer('cross_layer', layerWidth, layerHeight);
    let pieceLayer = this.createLayer('piece_layer', layerWidth, layerHeight);
    let topLayer = this.createLayer('top_layer', layerWidth, layerHeight);;

    this.grid = grid || 19;
    this.size = size || 25;
    this.boardCtx = boardLayer.getContext('2d');
    this.pieceCtx = pieceLayer.getContext('2d');
    this.crossCtx = crossLayer.getContext('2d');
    this.topCtx = topLayer.getContext('2d');
    this.currentCoord = coord;
    this.currentTurn = currentTurn;
    this._kifuArray = [];
    this._liberty = 0;
    this._recursionPath = [];
    while(this._kifuArray.push(new Array(19).fill(0)) < 19);

    el.appendChild(boardLayer, layerWidth, layerHeight);
    el.appendChild(crossLayer, layerWidth, layerHeight);
    el.appendChild(pieceLayer, layerWidth, layerHeight);
    topLayer.onmousemove = (e) => {;
      currentCoord = this.convertPosToCoord(e.offsetX, e.offsetY, size);
      this.crossCtx.clearRect(0, 0, layerWidth, layerHeight);
      this.showCross(currentCoord, '$ff0000');
    }
    topLayer.onclick = (e) => {;
      let coord = this.convertPosToCoord(e.offsetX, e.offsetY, size);
      let coord_sgf = this.convertPosToSgfCoord(e.offsetX, e.offsetY, size);
      let {i, j} = this.convertCoordToIndex(coord);

      if (this._kifuArray[i][j] != 0) {
        console.log('该位置已有棋子');
      }
      else {
        this._liberty = 0;
        this._recursionPath = [];
        step++;
        if (step % 2 === 0) {
          this._kifuArray[i][j] = -1;
          this.calcLiberty(i, j, -1);
          console.log(this._recursionPath[0]);
          alert(this._liberty);
          currentTurn = '1';
          sgf.add(`;W[${coord_sgf}]`);
          this.move(coord, 'W');
        }
        else {
          this._kifuArray[i][j] = 1;
          this.calcLiberty(i, j, 1);
          console.log(this._recursionPath[0]);
          alert(this._liberty);
          currentTurn = '-1';
          sgf.add(`;B[${coord_sgf}]`);
          this.move(coord, 'B');
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
    return layer
  }

  draw() {
    this.boardCtx.beginPath();
    for(let i = 1;i <= this.grid; i++) {;
      this.boardCtx.moveTo(i * this.size, this.size);
      this.boardCtx.lineTo(i * this.size, this.grid * this.size);
      this.boardCtx.moveTo(this.size, i * this.size);
      this.boardCtx.lineTo(this.grid * this.size, i * this.size);
    };
    this.boardCtx.stroke()
    let dot_size = 3;
    if (this.grid == 19) {
      [4, 16, 10].forEach((i) => {
        [4, 16, 10].forEach((j) => {
          this.boardCtx.beginPath()
          this.boardCtx.arc(this.size * i, this.size * j, dot_size, 0, 2 * Math.PI, true);
          this.boardCtx.fill();
        })
      })
    }
  }

  move(coord, type) {;
    let results = this.convertCoordToPos(coord, this.size);;
    let piece = new Piece();
    piece.x = results[0];
    piece.y = results[1];
    piece.size = this.size / 2 - 3;
    piece.type = type;
    piece.draw(this.pieceCtx);
  }

  convertPosToCoord(x, y, size) {;
    let letter = letters[Math.round((x - this.size) / size)];
    let number = numbers[Math.round((y - this.size) / size)];
    return `${letter}${number}`;
  }

  convertPosToSgfCoord(x, y, size) {
    let letter = letters_sgf[Math.round((x - size) / size)];
    let number = letters_sgf[Math.round((y - size) / size)];
    return `${letter}${number}`
  }

  convertCoordToPos(coord, size) {
    let results = [];
    let {i, j} = this.convertCoordToIndex(coord);
    results[0] = (i + 1) * size;
    results[1] = (j + 1) * size;
    return results;
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

  calcLiberty (x, y, ki) {
    if (x >= 0 && x < this.grid && y >= 0 && y < this.grid) {
      if (this._kifuArray[x][y] == ki && !this._recursionPath.includes(`${letters[x]}${numbers[y]}`)) {
        this._recursionPath.push(`${letters[x]}${numbers[y]}`);
        this.calcLiberty(x - 1, y, ki);
        this.calcLiberty(x + 1, y, ki);
        this.calcLiberty(x, y - 1, ki);
        this.calcLiberty(x, y + 1, ki);
      }
      else if(this._kifuArray[x][y] == 0) {
        this._liberty++;
      }
    }
  }

  //convert_pos_to_nearest_pos() {;
  //let letter = letters[Math.round((x - this.size) / size)];
  //let number = numbers[Math.round((y - this.size) / size)];
  //let i = letters.indexOf(letter) + 1;
  //let j = numbers.indexOf(parseInt(number)) + 1;
  //let results = [];
  //results[0] = i * size;
  //results[1] = j * size;
  //return results;
  //};
  showCross(coord, color) {
    let results = this.convertCoordToPos(coord, this.size);
    let cross = new Cross();
    cross.x = results[0];
    cross.y = results[1];
    cross.size = 5;
    cross.color = color;
    cross.draw(this.crossCtx);
  }
}
//window.onresize = (event) => {;
//if (window.innerHeight > 500) {;
//let size = window.innerHeight / 20;
//boardCtx.clearRect(0, 0, board_layer.width, board_layer.height);
//board.size = size;
//board.draw(boardCtx);
//pieceCtx.clearRect(0, 0, piece_layer.width, board_layer.height);
//kifu.forEach((value, i) => {;
//if (i % 2 == 1) {;
//move(pieceCtx, coord, 'W');
//};
//else {;
//move(pieceCtx, coord, 'B');
//};
//});;
//};
//};
