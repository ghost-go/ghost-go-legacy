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

export default class Sgf {
  constructor(options) {
    this.datetime = options.datetime || new Date()
    this.bname = options.bname || 'Black'
    this.wname = options.wname || 'White'
    this.brank = options.brank || '18k'
    this.wrank = options.wrank || '18k'
    this.size = options.size || 19
    this.komi = options.komi || 6.5
    this.rule = options.rule || 'japanese'
    this.result = options.result || ''
    this.content = []
    this.content.push `(;FF[4]\n`
    this.content.push `GM[1]\n`
    this.content.push `DT[${this.datetime}]\n`
    this.content.push `PB[${this.bname}]\n`
    this.content.push `PW[${this.wname}]\n`
    this.content.push `BR[${this.brank}]\n`
    this.content.push `WR[${this.wrank}]\n`
    this.content.push `CP[ghost-go.com]\n`
    this.content.push `RE[${this.result}]\n`
    this.content.push `SZ[${this.size}]\n`
    this.content.push `KM[${this.komi}]\n`
    this.content.push `RU[${this.rule}]\n`
  }

  add(txt) {
    this.content.push `${txt}\n`
  }

  output() {
    let d = new Date()
    let pattern = 'yyyy-mm-dd'
    let filename = `${d.formattedDate(pattern)}-${this.bname}-vs-${this.wname}.sgf`
    let element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(this.content.join('')))
    element.setAttribute('download', filename)
    element.style.display = 'none'
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }
}

