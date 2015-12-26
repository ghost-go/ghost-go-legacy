import Sgf from './sgf.js'
import Piece from './piece.js'
import Board from './board.js'
import Cross from './cross.js'

let b = document.querySelector('.board')
let board = new Board(b, 19, 30)
board.draw()
