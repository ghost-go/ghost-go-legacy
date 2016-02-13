import Board from '../board.js'
import React from 'react';
import ReactDOM from 'react-dom';

let b = document.querySelector('.board-view')
ReactDOM.render(
 <div className="board">
 </div>
, b);

let boardContainer = document.querySelector('.board');
let board = new Board(boardContainer, 19, 30)
board.draw()
