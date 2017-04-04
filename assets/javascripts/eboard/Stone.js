export default class Stone {

  constructor(x, y, size, type, isMarked = false, theme = 'black-and-white', seed = 0.1) {
    this.x = x || 0
    this.y = y || 0
    this.size = size
    this.type = type
    this.isMarked = isMarked
    this.theme = theme
    this.seed = seed
  }

  draw(ctx) {
    if (this.type == 0) return
    if (this.theme === 'flat-theme') {
      let black = new Image()
      black.src = `/assets/themes/${this.theme}/black.svg`
      let white = new Image()
      white.src = `/assets/themes/${this.theme}/white.svg`
      black.onload = () => { }
      white.onload = () => { }
      ctx.drawImage(this.type === 1 ? black : white, this.x - this.size, this.y - this.size, this.size * 2, this.size * 2)
    } else if (this.theme === 'photorealistic-theme') {
      let black = new Image()
      black.src = `/assets/themes/${this.theme}/black.png`
      let white = new Image()
      white.src = `/assets/themes/${this.theme}/white.png`
      black.onload = () => { }
      white.onload = () => { }
      ctx.drawImage(this.type === 1 ? black : white, this.x - this.size, this.y - this.size, this.size * 2, this.size * 2)
    } else if (this.theme === 'shell-stone'){
      let black = new Image()
      black.src = `/assets/themes/${this.theme}/black.png`
      let white0 = new Image()
      white0.src = `/assets/themes/${this.theme}/white0.png`
      let white1 = new Image()
      white1.src = `/assets/themes/${this.theme}/white1.png`
      let white2 = new Image()
      white2.src = `/assets/themes/${this.theme}/white2.png`
      let white3 = new Image()
      white3.src = `/assets/themes/${this.theme}/white3.png`
      let white4 = new Image()
      white4.src = `/assets/themes/${this.theme}/white4.png`
      black.onload = () => { }
      white0.onload = () => { }
      white1.onload = () => { }
      white2.onload = () => { }
      white3.onload = () => { }
      white4.onload = () => { }
      ctx.drawImage(this.type === 1 ? black : white1, this.x - this.size, this.y - this.size, this.size * 2, this.size * 2)
    } else if (this.theme === 'slate-and-shell-theme'){

    } else if (this.theme === 'subdued-theme'){
      let black = new Image()
      black.src = `/assets/themes/${this.theme}/black.png`
      let white = new Image()
      white.src = `/assets/themes/${this.theme}/white.png`
      black.onload = () => { }
      white.onload = () => { }
      ctx.drawImage(this.type === 1 ? black : white, this.x - this.size, this.y - this.size, this.size * 2, this.size * 2)
    } else if (this.theme === 'walnut-theme'){
      let black = new Image()
      black.src = `/assets/themes/${this.theme}/black.png`
      let white = new Image()
      white.src = `/assets/themes/${this.theme}/white.png`
      black.onload = () => { }
      white.onload = () => { }
      ctx.drawImage(this.type === 1 ? black : white, this.x - this.size, this.y - this.size, this.size * 2, this.size * 2)
    } else {
      ctx.beginPath()
      ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI, true)
      ctx.lineWidth = 1
      ctx.strokeStyle = '#000'
      if (this.type == 1) {
        ctx.fillStyle = '#000'
      } else {
        ctx.fillStyle = '#fff'
      }
      ctx.fill()
      ctx.stroke()

      if (this.isMarked) {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size * 0.6, 0, 2 * Math.PI, true)
        ctx.lineWidth = 2
        if (this.type == 1) {
          ctx.strokeStyle = '#fff'
        }
        else {
          ctx.strokeStyle = '#000'
        }
        ctx.stroke()
        ctx.lineWidth = 1
        ctx.strokeStyle = '#000'
      }
    }
  }

  remove(ctx, size) {
    ctx.clearRect(this.x - size / 2, this.y - size / 2, size, size)
  }

}

