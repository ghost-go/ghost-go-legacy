import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { LETTERS, LETTERS_SGF, NUMBERS } from '../constants/Go'
import Piece from '../components/piece'
import Sgf from '../components/sgf'
import Cross from '../components/cross'

export default class Board extends Component {
  constructor(props) {
    super(props)
    this.grid = 19
    this.sgf = new Sgf({});
    this.currentCoord = 'None';
    this.currentTurn = 1;
    this.step = 1;
  }

  clearKifuArray() {
    this._kifuArray = [];
    while(this._kifuArray.push(new Array(19).fill(0)) < 19);
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
          this._boardCtx.beginPath();
          this._boardCtx.arc(this.size * i, this.size * j, dot_size, 0, 2 * Math.PI, true);
          this._boardCtx.fill();
        })
      })
    }
  }

  canMove(i, j, ki) {
    if (this._kifuArray[i][j] != 0) {
      return false;
    }

    this._kifuArray[i][j] = ki;
    let {liberty, recursionPath} = this.calcLiberty(i, j, ki);
    if (this.canPonnuki(i, j, -ki)) {
      this._kifuArray[i][j] = 0;
      return true;
    }
    if (this.canPonnuki(i, j, ki)) {
      this._kifuArray[i][j] = 0;
      return false;
    }
    if (liberty === 0) {
      this._kifuArray[i][j] = 0;
      console.log('此位置不能放棋子');
      return false;
    }
    this._kifuArray[i][j] = 0;
    return true;
  }

  move(x, y, type) {
    let realPos = this.convertPosToRealPos(x, y);
    let coord_sgf = this.convertPosToSgfCoord(x, y, this.size);

    let piece = new Piece();

    let typeStr = '';
    if (type === 1) {
      typeStr = 'B';
    }
    else {
      typeStr = 'W';
    }

    piece.x = realPos.x;
    piece.y = realPos.y;
    piece.pieceSize = this.size / 2 - 3;
    piece.type = typeStr;
    piece.draw(this._pieceCtx);

    this.sgf.addKi(`;${typeStr}[${coord_sgf}]`);
    this.step++;
    this.currentTurn = -this.currentTurn;
  }

  removePiece(coord) {
    let realPos = this.convertCoordToRealPos(coord);
    let {i, j} = this.convertCoordToIndex(coord);
    this._kifuArray[i][j] = 0;
    let piece = new Piece();
    piece.x = realPos.x;
    piece.y = realPos.y;
    piece.remove(this._pieceCtx, this.size);
  }

  convertPosToCoord(x, y) {;
    let letter = LETTERS[Math.round((x - this.size) / this.size)];
    let number = NUMBERS[Math.round((y - this.size) / this.size)];
    return `${letter}${number}`;
  }

  convertPosToSgfCoord(x, y, size) {
    let letter = LETTERS_SGF[Math.round((x - size) / size)];
    let number = LETTERS_SGF[Math.round((y - size) / size)];
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
    let letter = LETTERS[Math.round((x - this.size) / this.size)];
    let number = NUMBERS[Math.round((y - this.size) / this.size)];

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
    let i = LETTERS.indexOf(letter);
    let j = NUMBERS.indexOf(parseInt(number));
    return {i, j};
  }

  convertIndexToCoord(i, j) {
    return `${LETTERS[i]}${NUMBERS[j]}`;
  }

  calcBlackOrWhite(x, y) {
    return this._kifuArray[x][y];
  }

  _calcLibertyCore(x, y, ki) {
    if (x >= 0 && x < this.grid && y >= 0 && y < this.grid) {
      if (this._kifuArray[x][y] == ki && !this._recursionPath.includes(`${LETTERS[x]}${NUMBERS[y]}`)) {
        this._recursionPath.push(`${LETTERS[x]}${NUMBERS[y]}`);
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

    if (x < 0 || y < 0 || x > this.grid - 1 || y > this.grid - 1) {
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

  execPonnuki(i, j, ki) {
    let {liberty: libertyUp, recursionPath: recursionPathUp} = this.calcLiberty(i, j - 1, ki);
    let {liberty: libertyDown, recursionPath: recursionPathDown} = this.calcLiberty(i, j + 1, ki);
    let {liberty: libertyLeft, recursionPath: recursionPathLeft} = this.calcLiberty(i - 1, j, ki);
    let {liberty: libertyRight, recursionPath: recursionPathRight} = this.calcLiberty(i + 1, j, ki);
    console.log(`up: ${libertyUp}, down: ${libertyDown}, left: ${libertyLeft}, right: ${libertyRight}`);
    if (libertyUp === 0) {
      recursionPathUp.forEach((i) => {
        this.removePiece(i);
      });
    }
    if (libertyDown === 0) {
      recursionPathDown.forEach((i) => {
        this.removePiece(i);
      });
    }
    if (libertyLeft === 0) {
      recursionPathLeft.forEach((i) => {
        this.removePiece(i);
      });
    }
    if (libertyRight === 0) {
      recursionPathRight.forEach((i) => {
        this.removePiece(i);
      });
    }
  }

  canPonnuki(i, j, ki) {
    let {liberty: libertyUp, recursionPath: recursionPathUp} = this.calcLiberty(i, j - 1, ki);
    let {liberty: libertyDown, recursionPath: recursionPathDown} = this.calcLiberty(i, j + 1, ki);
    let {liberty: libertyLeft, recursionPath: recursionPathLeft} = this.calcLiberty(i - 1, j, ki);
    let {liberty: libertyRight, recursionPath: recursionPathRight} = this.calcLiberty(i + 1, j, ki);
    console.log(`canup: ${libertyUp}, candown: ${libertyDown}, canleft: ${libertyLeft}, canright: ${libertyRight}`);
    if (libertyUp === 0 && recursionPathUp.length > 0) {
      return true;
    }
    if (libertyDown === 0 && recursionPathDown.length > 0) {
      return true;
    }
    if (libertyLeft === 0 && recursionPathLeft.length > 0) {
      return true;
    }
    if (libertyRight === 0 && recursionPathRight.length > 0) {
      return true;
    }
    //let coord = this.convertIndexToCoord(i, j);
    //console.log(`coord: ${coord}`);
    //console.log(`recursionPathUp: ${recursionPathUp}, recursionPathDown: ${recursionPathDown}, recursionPathLeft: ${recursionPathLeft}, recursionPathDown: ${recursionPathDown}`);
    return false;
  }

  showCross(coord, color) {
    let results = this.convertCoordToPos(coord, this.size);
    let cross = new Cross();
    cross.x = results.x;
    cross.y = results.y;
    cross.size = 5;
    cross.color = color;
    cross.draw(this._crossCtx);
  }

  render() {
    console.log(this.props.kifu)
    return (
      <div className="board" width="100%" ref="board">
        <canvas id="board_layer" ref={(ref) => this.boardLayer = ref}></canvas>
        {(() => {
          if (this.props.editable === 'true') {
            return <canvas id= "cross_layer" ref={(ref) => this.crossLayer = ref}></canvas>
          }
        })()}
        <canvas id="piece_layer" ref="piece_layer" ref={(ref) => this.pieceLayer = ref}></canvas>
        {(() => {
          if (this.props.editable === 'true') {
            return <canvas id= "top_layer" ref="top_layer" ref={(ref) => this.topLayer = ref}></canvas>
          }
        })()}
      </div>
    )
  }

  componentDidMount() {
    let boardWidth = this.refs.board.offsetWidth;
    this.size =  this.refs.board.offsetWidth / 20
    this._boardCtx = this.boardLayer.getContext('2d')
    this._pieceCtx = this.pieceLayer.getContext('2d')
    this.refs.board.style.height = boardWidth + 'px'
    this.boardLayer.width
    = this.boardLayer.height
    = this.pieceLayer.width
    = this.pieceLayer.height
    = boardWidth
    this.boardLayer.style.position
    = this.pieceLayer.style.position
    = 'absolute';
    if (this.props.editable === 'true') {
      this._crossCtx = this.crossLayer.getContext('2d')
      this.topLayer.width
      = this.topLayer.height
      = this.crossLayer.width
      = this.crossLayer.height
      = boardWidth
      this.topLayer.style.position
      = this.crossLayer.style.position
      = 'absolute';


      this.topLayer.onmousemove = (e) => {;
        this.currentCoord = this.convertPosToCoord(e.offsetX, e.offsetY, this.size);
        this._crossCtx.clearRect(0, 0, this.crossLayer.width, this.crossLayer.height);
        this.showCross(this.currentCoord, '#ff0000');
      }

      this.topLayer.onclick = (e) => {
        let coord = this.convertPosToCoord(e.offsetX, e.offsetY, this.size);
        let {i, j} = this.convertCoordToIndex(coord);

        this._liberty = 0;
        this._recursionPath = [];
        if (this.canMove(i, j, this.currentTurn)) {
          this._kifuArray[i][j] = this.currentTurn;
          this.move(e.offsetX, e.offsetY, this.currentTurn);
          this.execPonnuki(i, j, this.currentTurn);
        }
      }
    }
    this.clearKifuArray()
    this.draw()
  }

}
