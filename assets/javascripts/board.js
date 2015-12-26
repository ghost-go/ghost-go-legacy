import Cross from './cross.js'
import Piece from './piece.js'
import Sgf from './sgf.js'

const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T']
const letters_sgf = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's']
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19].reverse()

export default class Board {
  constructor(el, grid, size) {
    let layer_width = size * 20
    let layer_height = size * 20
    let current_coord = 'None'
    let manual = []
    let step = 0
    let sgf = new Sgf({
    })

    let board_layer = document.createElement('canvas');
    board_layer.id = 'board_layer'
    board_layer.width = layer_width;
    board_layer.height = layer_height;
    board_layer.style.position = 'absolute'
    board_layer.style.left = 0
    board_layer.style.top = 0
    el.appendChild(board_layer)

    let cross_layer = document.createElement('canvas');
    cross_layer.id = 'cross_layer'
    cross_layer.width = layer_width;
    cross_layer.height = layer_height;
    cross_layer.style.position = 'absolute'
    cross_layer.style.left = 0
    cross_layer.style.top = 0
    el.appendChild(cross_layer)

    let piece_layer = document.createElement('canvas');
    piece_layer.id = 'piece_layer'
    piece_layer.width = layer_width
    piece_layer.height = layer_height
    piece_layer.style.position = 'absolute'
    piece_layer.style.left = 0
    piece_layer.style.top = 0
    el.appendChild(piece_layer)

    let top_layer = document.createElement('canvas');
    top_layer.id = 'top_layer'
    top_layer.width = layer_width
    top_layer.height = layer_height
    top_layer.style.position = 'absolute'
    top_layer.style.left = 0
    top_layer.style.top = 0
    top.onmousemove = (e) => {
      current_coord = this.convert_pos_to_coord(e.offsetX, e.offsetY, size)
      this.cross_ctx.clearRect(0, 0, layer_width, layer_height)
      this.show_cross(current_coord, '$ff0000')
    }
    top.onclick = (e) => {
      let coord = this.convert_pos_to_coord(e.offsetX, e.offsetY, size)
      let coord_sgf = this.convert_pos_to_sgf_coord(e.offsetX, e.offsetY, size)
      if (manual.includes(coord)) {
        console.log('该位置已有棋子')
      }
      else {
        step++
        manual.push(coord)
        if (step % 2 === 0) {
          document.getElementById('turn').innerHTML = '白'
          sgf.add(`;W[${coord_sgf}]`)
          this.move(coord, 'W')
        }
        else {
          document.getElementById('turn').innerHTML = '黑'
          sgf.add(`;B[${coord_sgf}]`)
          this.move(coord, 'B')
        }
      }
    }
    el.appendChild(top_layer)

    this.grid = grid || 19
    this.size = size || 25
    this.board_ctx = board_layer.getContext('2d')
    this.piece_ctx = piece_layer.getContext('2d')
    this.cross_ctx = cross_layer.getContext('2d')
    this.top_ctx = top_layer.getContext('2d')
    this.current_coord = coord
  }

  draw() {
    this.board_ctx.beginPath()
    for(let i = 1;i <= this.grid; i++) {
      this.board_ctx.moveTo(i * this.size, this.size)
      this.board_ctx.lineTo(i * this.size, this.grid * this.size)
      this.board_ctx.moveTo(this.size, i * this.size)
      this.board_ctx.lineTo(this.grid * this.size, i * this.size)
    }
    this.board_ctx.stroke()
    let dot_size = 3
    if (this.grid == 19) {
      [4, 16, 10].forEach((i) => {
        [4, 16, 10].forEach((j) => {
          this.board_ctx.beginPath()
          this.board_ctx.arc(this.size * i, this.size * j, dot_size, 0, 2 * Math.PI, true)
          this.board_ctx.fill()
        })
      });
    }
  }

  move(coord, type) {
    let results = this.convert_coord_to_pos(coord, this.size);
    let piece = new Piece()
    piece.x = results[0]
    piece.y = results[1]
    piece.size = this.size / 2 - 3
    piece.type = type
    piece.draw(this.piece_ctx)
  }

  convert_pos_to_coord(x, y, size) {
    let letter = letters[Math.round((x - this.size) / size)]
    let number = numbers[Math.round((y - this.size) / size)]
    return `${letter}${number}`
  }

  convert_pos_to_sgf_coord(x, y, size) {
    let letter = letters_sgf[Math.round((x - size) / size)]
    let number = letters_sgf[Math.round((y - size) / size)]
    return `${letter}${number}`
  }

  convert_coord_to_pos (coord, size) {
    let letter = coord.charAt(0)
    let number = coord.slice(1)
    let i = letters.indexOf(letter) + 1
    let j = numbers.indexOf(parseInt(number)) + 1
    let results = []
    results[0] = i * size
    results[1] = j * size
    return results
  }

  //convert_pos_to_nearest_pos() {
    //let letter = letters[Math.round((x - this.size) / size)]
    //let number = numbers[Math.round((y - this.size) / size)]

    //let i = letters.indexOf(letter) + 1
    //let j = numbers.indexOf(parseInt(number)) + 1

    //let results = []
    //results[0] = i * size
    //results[1] = j * size
    //return results
  //}

  show_cross(coord, color) {
    let results = this.convert_coord_to_pos(coord, this.size)
    let cross = new Cross()
    cross.x = results[0]
    cross.y = results[1]
    cross.size = 5
    cross.color = color
    cross.draw(this.cross_ctx)
  }

}

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


