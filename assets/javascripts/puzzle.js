import Piece from './components/piece.js'

const LETTERS_SGF = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's']
const NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19].reverse()

class PuzzleBoardPreviewImageMaker {

  constructor(steps) {

    this.steps = steps.split(';')
    this.pieceLayer = document.querySelector('#board_layer')
    this.boardLayer = document.querySelector('#piece_layer')
    this.preview = document.querySelector('#preview')

    this.pieceLayer.width = 1024
    this.pieceLayer.height = 1024
    this.boardLayer.width = 1024
    this.boardLayer.height = 1024
    this.preview.width = 1024
    this.preview.height = 1024

    this._pieceCtx = this.pieceLayer.getContext('2d')
    this._boardCtx = this.boardLayer.getContext('2d')
    this._previewCtx = this.preview.getContext('2d')

    this.state = {
      grid: 19,
      size: 1024 / 19,
      horizontal: 19,
      verical: 19,
      autofit: true,
      direction: 0,
      revert: false,
      dotSize: 3,
      _puzzleArray: [],
      currentKi: 0,
      step: 0,
      steps: steps,
      expandH: 2,
      expandV: 2,
    }

    this.clearKifuArray()
    this.initPuzzleArray()
    this.state.minhv = this.state.verical > this.state.horizontal ? this.state.horizontal : this.state.verical
    this.state.maxhv = this.state.verical > this.state.horizontal ? this.state.verical : this.state.horizontal
    this.state.maxhv = this.state.verical > this.state.horizontal ? this.state.verical : this.state.horizontal

    this._autofit()
    this.drawBoard()

    this._previewCtx.fillStyle = '#fff'
    this._previewCtx.fillRect(0, 0, 1024, 1024)
    this._previewCtx.drawImage(this.boardLayer, 0, 0)
    this._previewCtx.drawImage(this.pieceLayer, 0, 0)

    let {cropTop, cropBottom, cropLeft, cropRight} = this.removeBlanks(this._previewCtx, this.preview, this.preview.width, this.preview.height)
    console.log({cropTop, cropBottom, cropLeft, cropRight})
    cropTop -= this.state.size / 2
    cropBottom += this.state.size / 2
    cropLeft -= this.state.size / 2
    cropRight += this.state.size / 2


    let previewImg = document.querySelector('#previewImg')
    let previewImgCtx = previewImg.getContext('2d')

    let cropWidth = cropRight - cropLeft
    let cropHeight = cropBottom - cropTop
    //this._previewCtx.drawImage(this.preview, cropLeft, cropTop, cropWidth, cropHeight, 0, 0, cropWidth, cropHeight)

    previewImg.width = cropWidth
    previewImg.height = cropHeight
    previewImgCtx.drawImage(this.preview, cropLeft, cropTop, cropWidth, cropHeight, 0, 0, cropWidth, cropHeight)


  }

  getBase64() {
    return this.boardLayer.toDataURL()
  }

  initPuzzleArray() {
    this.clearKifuArray()
    let newArray = this.state._puzzleArray.slice()
    this.steps.forEach((str) => {
      const ki = str[0] === 'B' ? 1 : -1
      const pos = /\[(.*)\]/.exec(str)[1]
      const x = LETTERS_SGF.indexOf(pos[0])
      const y = LETTERS_SGF.indexOf(pos[1])
      newArray[x][y] = ki
      this.state._puzzleArray = newArray
    })
  }

  clearKifuArray() {
    this.state._puzzleArray = []
    while(this.state._puzzleArray.push(new Array(19).fill(0)) < 19) { }
  }

  draw() {
    this._boardCtx.beginPath()

    if (this.state.revert && this.state.puzzle != null) {
      this.state.puzzle = this.state.puzzle.replace(/B/g, 'X')
      this.state.puzzle = this.state.puzzle.replace(/W/g, 'B')
      this.state.puzzle = this.state.puzzle.replace(/X/g, 'W')
    }

    if (this.state.autofit) {
      this._autofit(this.state.expandH, this.state.expandV)
    }

    let size = this.state.size
    let grid = this.state.grid

    switch (this.state.direction) {
    case 1:
      for (let i = 1;i <= this.state.horizontal; i++) {
        this._boardCtx.moveTo(i * size, size)
        this._boardCtx.lineTo(i * size, this.state.verical * size)
      }
      for (let i = 1;i <= this.state.verical; i++) {
        this._boardCtx.moveTo(size, i * size)
        this._boardCtx.lineTo(this.state.horizontal * size, i * size)
      }
      break
    case 2:
      for (let i = 1;i <= this.state.horizontal; i++) {
        this._boardCtx.moveTo((this.state.maxhv - i + 1) * size, size)
        this._boardCtx.lineTo((this.state.maxhv - i + 1) * size, this.state.verical * size)
      }
      for (let i = 1;i <= this.state.verical; i++) {
        this._boardCtx.moveTo(this.state.maxhv * size, i * size)
        this._boardCtx.lineTo((this.state.maxhv - this.state.horizontal + 1) * size, i * size)
      }
      break
    case 3:
      for (let i = 1;i <= this.state.horizontal; i++) {
        this._boardCtx.moveTo((this.state.maxhv - i + 1) * size, (this.state.maxhv - this.state.verical + 1) * size)
        this._boardCtx.lineTo((this.state.maxhv - i + 1) * size, this.state.maxhv * size)
      }
      for (let i = 1;i <= this.state.verical; i++) {
        this._boardCtx.moveTo(this.state.maxhv * size, (this.state.maxhv - this.state.verical + i) * size)
        this._boardCtx.lineTo((this.state.maxhv - this.state.horizontal + 1) * size, (this.state.maxhv - this.state.verical + i) * size)
      }
      break
    case 4:
      for (let i = 1;i <= this.state.horizontal; i++) {
        this._boardCtx.moveTo(i * size, (this.state.maxhv - this.state.verical + 1) * size)
        this._boardCtx.lineTo(i * size, this.state.maxhv * size)
      }
      for (let i = 1;i <= this.state.verical; i++) {
        this._boardCtx.moveTo(size, (this.state.maxhv - this.state.verical + i) * size)
        this._boardCtx.lineTo(this.state.horizontal * size, (this.state.maxhv - this.state.verical + i) * size)
      }
      break
    }
    this._boardCtx.stroke()

    ;[4, 16, 10].forEach((i) => {
      [4, 16, 10].forEach((j) => {
        switch (this.state.direction) {
        case 1:
          if (i < this.state.horizontal && j < this.state.verical) {
            this._boardCtx.beginPath()
            this._boardCtx.arc(size * i, size * j, this.state.dotSize, 0, 2 * Math.PI, true)
            this._boardCtx.fill()
          }
          break
        case 2:
          if (i < this.state.horizontal && j < this.state.verical) {
            this._boardCtx.beginPath()
            this._boardCtx.arc(size * (this.state.maxhv - i + 1), size * j, this.state.dotSize, 0, 2 * Math.PI, true)
            this._boardCtx.fill()
          }
          break
        case 3:
          if (i < this.state.horizontal && j < this.state.verical) {
            this._boardCtx.beginPath()
            this._boardCtx.arc(size * (this.state.maxhv - i + 1), size * (this.state.maxhv - j + 1), this.state.dotSize, 0, 2 * Math.PI, true)
            this._boardCtx.fill()
          }
          break
        case 4:
          if (i < this.state.horizontal && j < this.state.verical) {
            this._boardCtx.beginPath()
            this._boardCtx.arc(size * i, size * (this.state.maxhv - j + 1), this.state.dotSize, 0, 2 * Math.PI, true)
            this._boardCtx.fill()
          }
          break
        }
      })
    })
  }

  drawBoard() {
    if (this._pieceCtx != null && this._boardCtx != null) {
      this._pieceCtx.clearRect(0, 0, this.pieceLayer.width, this.pieceLayer.height)
      this._boardCtx.clearRect(0, 0, this.boardLayer.width, this.boardLayer.height)
      this.draw()

      for (let i = 0; i < this.state.grid; i++) {
        for (let j = 0; j < this.state.grid; j++) {
          const ki = this.state._puzzleArray[i][j]
          let {x, y} = this._getOffsetPos(i, j)
          this._drawPiece(x, y, ki)
        }
      }
    }
  }


  removeBlanks(context, canvas, imgWidth, imgHeight) {
    let imageData = context.getImageData(0, 0, canvas.width, canvas.height)
    let data = imageData.data
    let getRBG = (x, y) => {
      return {
        red:   data[(imgWidth*y + x) * 4],
        green: data[(imgWidth*y + x) * 4 + 1],
        blue:  data[(imgWidth*y + x) * 4 + 2]
      }
    }

    let isWhite = (rgb) => {
      return rgb.red == 255 && rgb.green == 255 && rgb.blue == 255
    }

    let scanY = (fromTop) => {
      let offset = fromTop ? 1 : -1
      for(let y = fromTop ? 0 : imgHeight - 1; fromTop ? (y < imgHeight) : (y > -1); y += offset) {
        for(var x = 0; x < imgWidth; x++) {
          if (!isWhite(getRBG(x, y))) {
            return y
          }
        }
      }
      return null
    }
    let scanX = function (fromLeft) {
      var offset = fromLeft? 1 : -1
      for(var x = fromLeft ? 0 : imgWidth - 1; fromLeft ? (x < imgWidth) : (x > -1); x += offset) {
        for(var y = 0; y < imgHeight; y++) {
          if (!isWhite(getRBG(x, y))) {
            return x
          }
        }
      }
      return null
    }

    let cropTop = scanY(true)
    let cropBottom = scanY(false)
    let cropLeft = scanX(true)
    let cropRight = scanX(false)
    return {cropTop, cropBottom, cropLeft, cropRight}
  }

  _autofit(expandH = 2, expandV = 2) {
    let leftmost = 26
    let rightmost = 0
    let topmost = 26
    let bottommost = 0
    this.steps.forEach((i) => {
      const x = LETTERS_SGF.indexOf(i[2])
      const y = LETTERS_SGF.indexOf(i[3])
      if (x < leftmost)
        leftmost = x
      if (x > rightmost)
        rightmost = x
      if (y < topmost)
        topmost = y
      if (y > bottommost)
        bottommost = y
    })
    leftmost++
    rightmost++
    topmost++
    bottommost++

    const medianH = (leftmost + rightmost) / 2
    const medianV = (topmost + bottommost) / 2

    let setMaxMinHV = () => {
      this.state.minhv = this.state.verical > this.state.horizontal ? this.state.horizontal : this.state.verical
      this.state.mashv = this.state.verical > this.state.horizontal ? this.state.verical : this.state.horizontal
      this.state.size =  1024 / (this.state.maxhv + 1)
    }

    if (medianH <= 10 && medianV <= 10) {
      this.state.direction = 1
      this.state.horizontal = rightmost + expandH > this.state.grid ? this.state.grid : rightmost + expandH
      this.state.verical =  bottommost + expandV > this.state.grid ? this.state.grid : bottommost + expandV
      setMaxMinHV()
    }
    else if (medianH > 10 && medianV <= 10) {
      this.state.direction = 2
      this.state.horizontal = this.state.grid - leftmost + 1 + expandH > this.state.grid ? this.state.grid : this.state.grid - leftmost + 1 + expandH
      this.state.verical = bottommost + expandV > this.state.grid ? this.state.grid : bottommost + expandV
      setMaxMinHV()
    }
    else if (medianH > 10 && medianV > 10) {
      this.state.direction = 3
      this.state.horizontal = this.state.grid - leftmost + 1 + expandH > this.state.grid ? this.state.grid : this.state.grid - leftmost + 1 + expandH
      this.state.verical = this.state.grid - bottommost + 1 + expandV > this.state.grid ? this.state.grid : this.state.grid - bottommost + 1 + expandV
      setMaxMinHV()
    }
    else {
      this.state.direction = 4
      this.state.horizontal = rightmost + expandH > this.state.grid ? this.state.grid : rightmost + expandH
      this.state.verical = this.state.grid - bottommost + 1 + expandV > this.state.grid ? this.state.grid : this.state.grid - bottommost + 1 + expandV
      setMaxMinHV()
    }
  }

  _getOffsetPos(x, y) {
    let offsetH = 0
    let offsetV = 0
    switch(this.state.direction) {
    case 1:
      break
    case 2:
      offsetH = this.state.grid - this.state.maxhv
      break
    case 3:
      offsetH = this.state.grid - this.state.maxhv
      offsetV = this.state.grid - this.state.maxhv
      break
    case 4:
      offsetV = this.state.grid - this.state.maxhv
      break
    }
    return {
      x: x - offsetH + 1,
      y: y - offsetV + 1
    }
  }

  _drawPiece(x, y, type, isCurrent) {
    let piece = new Piece()
    piece.x = x * this.state.size
    piece.y = y * this.state.size
    piece.pieceSize = this.state.size / 2 - 3
    piece.type = type
    piece.isCurrent = isCurrent
    piece.draw(this._pieceCtx)
  }

}


function getQueryString(name) {
  let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
  let r = window.location.search.substr(1).match(reg)
  if (r != null) return unescape(r[2])
  return null
}

let steps = getQueryString('steps')
var puzzleMaker = new PuzzleBoardPreviewImageMaker(steps)
