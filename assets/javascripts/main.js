import Sgf from './sgf.js'
import Piece from './piece.js'
import Board from './board.js'
import Cross from './cross.js'

let step = 0
let size = 20
let manual = []

//let board_layer = document.getElementById('board')
//board_layer.width = size * 20
//board_layer.height = size * 20
//let board_ctx = board_layer.getContext('2d')

let b = document.querySelector('.board')
let board = new Board(b)
board.draw()

let piece_layer = document.getElementById('piece')
piece_layer.width = size * 20
piece_layer.height = size * 20
let piece_ctx = piece_layer.getContext('2d')

let cross_layer = document.getElementById('cross')
cross_layer.width = size * 20
cross_layer.height = size * 20
let cross_ctx = cross_layer.getContext('2d')

let top_layer = document.getElementById('top')
top_layer.width = size * 20
top_layer.height = size * 20

let sgf = new Sgf({
  bname: '我是天才',
  wname: '我不是天才'
})

let top = document.getElementById('top');
top.onclick = (e) => {
  let coord = board.convert_pos_to_coord(e.offsetX, e.offsetY, size)
  let coord_sgf = board.convert_pos_to_sgf_coord(e.offsetX, e.offsetY, size)
  if (manual.includes(coord)) {
    console.log('该位置已有棋子')
  }
  else {
    step++
    manual.push(coord)
    if (step % 2 === 0) {
      document.getElementById('turn').innerHTML = '白'
      sgf.add(`;W[${coord_sgf}]`)
      board.move(piece_ctx , coord, 'W')
    }
    else {
      document.getElementById('turn').innerHTML = '黑'
      sgf.add(`;B[${coord_sgf}]`)
      board.move(piece_ctx , coord, 'B')
    }
  }
}

top.onmousemove = (e) => {
  let coord = board.convert_pos_to_coord(e.offsetX, e.offsetY, size)
  document.getElementById('coord').innerHTML = coord
  cross_ctx.clearRect(0, 0, cross_layer.width, cross_layer.height)
  board.show_cross(cross_ctx, coord, '$ff0000')
}

Date.prototype.formattedDate = (pattern) => {
  let formattedDate = pattern.replace('yyyy', this.getFullYear().toString())
  let mm = (this.getMonth() + 1).toString()
  if (mm.length == 1) {
    mm = '0' + mm
  }
  formattedDate = formattedDate.replace('mm', mm)
  dd = this.getDate().toString()
  if (dd.length == 1) {
    dd = '0' + dd
  }
  formattedDate = formattedDate.replace('dd', dd)
  return formattedDate
}

