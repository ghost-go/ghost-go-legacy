'use strict'

import Sgf from './sgf.js'

const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T']
const letters_sgf = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's']
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19].reverse()

//class Sgf {
  //constructor(options) {
    //this.datetime = options.datetime || new Date()
    //this.bname = options.bname || 'Black'
    //this.wname = options.wname || 'White'
    //this.brank = options.brank || '18k'
    //this.wrank = options.wrank || '18k'
    //this.size = options.size || 19
    //this.komi = options.komi || 6.5
    //this.rule = options.rule || 'japanese'
    //this.result = options.result || ''
    //this.content = []
    //this.content.push `(;FF[4]\n`
    //this.content.push `GM[1]\n`
    //this.content.push `DT[${this.datetime}]\n`
    //this.content.push `PB[${this.bname}]\n`
    //this.content.push `PW[${this.wname}]\n`
    //this.content.push `BR[${this.brank}]\n`
    //this.content.push `WR[${this.wrank}]\n`
    //this.content.push `CP[ghost-go.com]\n`
    //this.content.push `RE[${this.result}]\n`
    //this.content.push `SZ[${this.size}]\n`
    //this.content.push `KM[${this.komi}]\n`
    //this.content.push `RU[${this.rule}]\n`
  //}

  //add(txt) {
    //this.content.push `${txt}\n`
  //}

  //output() {
    //let d = new Date()
    //let pattern = 'yyyy-mm-dd'
    //let filename = `${d.formattedDate(pattern)}-${this.bname}-vs-${this.wname}.sgf`
    //let element = document.createElement('a');
    //element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(this.content.join('')))
    //element.setAttribute('download', filename)
    //element.style.display = 'none'
    //document.body.appendChild(element)
    //element.click()
    //document.body.removeChild(element)
  //}
//}

class Piece {
  constructor(x, y, size, type) {
    this.x = x || 0
    this.y = y || 0
    this.size = size || 1
    this.type = type || 'B'
  }

  draw(ctx) {
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI, true)
    ctx.lineWidth = 1
    if (this.type == 'B')
      ctx.fillStyle = '#000000'
    else
      ctx.fillStyle = '#ffffff'
    ctx.fill()
    ctx.stroke()
  }
}


class Board {
  constructor(ctx, grid, size) {
    this.grid = grid || 19
    this.size = size || 25
    this.ctx = ctx
  }

  draw() {
    this.ctx.beginPath()
    for(let i = 1;i <= this.grid; i++) {
      this.ctx.moveTo(i * this.size, this.size)
      this.ctx.lineTo(i * this.size, this.grid * this.size)
      this.ctx.moveTo(this.size, i * this.size)
      this.ctx.lineTo(this.grid * this.size, i * this.size)
    }
    this.ctx.stroke()
    let dot_size = 3
    if (this.grid == 19) {
      [4, 16, 10].forEach((i) => {
        [4, 16, 10].forEach((j) => {
          this.ctx.beginPath()
          this.ctx.arc(this.size * i, this.size * j, dot_size, 0, 2 * Math.PI, true)
          this.ctx.fill()
        })
      });
    }
  }
}

class Cross {
  constructor(x, y, size, color) {
    this.x = x || 0
    this.y = y || 0
    this.size = size || 5
    this.color = color || '$000000'
  }

  draw(ctx) {
    ctx.beginPath()
    ctx.lineWidth = 2
    ctx.moveTo(this.x - this.size, this.y - this.size)
    ctx.lineTo(this.x + this.size, this.y + this.size)
    ctx.moveTo(this.x - this.size, this.y + this.size)
    ctx.lineTo(this.x + this.size, this.y - this.size)
    ctx.stroke()
  }
}

const size = 30
let step = 0
let manual = []

//window.onresize = (event) => {
  //if (window.innerHeight > 500) {
    //let size = window.innerHeight / 20
    //board_ctx.clearRect(0, 0, board_layer.width, board_layer.height)
    //board.size = size
    //board.draw(board_ctx)
    //piece_ctx.clearRect(0, 0, piece_layer.width, board_layer.height)
    //manual.forEach((value, i) => {
      //if (i % 2 == 1) {
        //move(piece_ctx, coord, 'W')
      //}
      //else {
        //move(piece_ctx, coord, 'B')
      //}
    //});
  //}
//}

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

function convert_pos_to_coord(x, y, size) {
  let letter = letters[Math.round((x - size) / size)]
  let number = numbers[Math.round((y - size) / size)]
  return `${letter}${number}`
}

function convert_pos_to_sgf_coord(x, y, size) {
  let letter = letters_sgf[Math.round((x - size) / size)]
  let number = letters_sgf[Math.round((y - size) / size)]
  return `${letter}${number}`
}

function convert_coord_to_pos (coord, size) {
  let letter = coord.charAt(0)
  let number = coord.slice(1)
  let i = letters.indexOf(letter) + 1
  let j = numbers.indexOf(parseInt(number)) + 1
  let results = []
  results[0] = i * size
  results[1] = j * size
  return results
}

function move(ctx, coord, type) {

  let results = convert_coord_to_pos(coord, size);
  let piece = new Piece()
  piece.x = results[0]
  piece.y = results[1]
  piece.size = size / 2 - 3
  piece.type = type
  piece.draw(ctx)
}

function show_cross(ctx, coord, color) {
  let results = convert_coord_to_pos(coord, size)
  let cross = new Cross()
  cross.x = results[0]
  cross.y = results[1]
  cross.size = 5
  cross.color = color
  cross.draw(ctx)
}


let board_layer = document.getElementById('board')
board_layer.width = size * 20
board_layer.height = size * 20
let board_ctx = board_layer.getContext('2d')

let board = new Board(board_ctx)
board.size = size
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
  let coord = convert_pos_to_coord(e.offsetX, e.offsetY, size)
  let coord_sgf = convert_pos_to_sgf_coord(e.offsetX, e.offsetY, size)
  if (manual.includes(coord)) {
    console.log('该位置已有棋子')
  }
  else {
    step++
    manual.push(coord)
    if (step % 2 === 0) {
      document.getElementById('turn').innerHTML = '白'
      sgf.add(`;W[${coord_sgf}]`)
      move(piece_ctx , coord, 'W')
    }
    else {
      document.getElementById('turn').innerHTML = '黑'
      sgf.add(`;B[${coord_sgf}]`)
      move(piece_ctx , coord, 'B')
    }
  }
}

top.onmousemove = (e) => {
  let coord = convert_pos_to_coord(e.offsetX, e.offsetY, size)
  document.getElementById('coord').innerHTML = coord
  cross_ctx.clearRect(0, 0, cross_layer.width, cross_layer.height)
  show_cross(cross_ctx, coord, '$ff0000')
}


