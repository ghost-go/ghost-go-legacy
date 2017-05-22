Date.prototype.formattedDate = (pattern) => {
  let formattedDate = pattern.replace('yyyy', this.getFullYear().toString());
  let mm = (this.getMonth() + 1).toString();
  if (mm.length == 1) {
    mm = `0${mm}`;
  }
  formattedDate = formattedDate.replace('mm', mm);
  let dd = this.getDate().toString();
  if (dd.length == 1) {
    dd = `0${dd}`;
  }
  formattedDate = formattedDate.replace('dd', dd);
  return formattedDate;
};

export default class Sgf {
  constructor(options) {
    this.datetime = options.datetime || new Date();
    this.bname = options.bname || 'Black';
    this.wname = options.wname || 'White';
    this.brank = options.brank || '18k';
    this.wrank = options.wrank || '18k';
    this.size = options.size || 19;
    this.komi = options.komi || 6.5;
    this.rule = options.rule || 'japanese';
    this.result = options.result || '';
    this.header = [];
    this.header.push `(;FF[4]\n`;
    this.header.push `GM[1]\n`;
    this.header.push `DT[${this.datetime}]\n`;
    this.header.push `PB[${this.bname}]\n`;
    this.header.push `PW[${this.wname}]\n`;
    this.header.push `BR[${this.brank}]\n`;
    this.header.push `WR[${this.wrank}]\n`;
    this.header.push `CP[ghost-go.com]\n`;
    this.header.push `RE[${this.result}]\n`;
    this.header.push `SZ[${this.size}]\n`;
    this.header.push `KM[${this.komi}]\n`;
    this.header.push `RU[${this.rule}]\n`;

    this.kifu = [];
  }

  addHeader(txt) {
    this.header.push `${txt}\n`;
  }

  addKi(txt) {
    this.kifu.push `${txt}\n`;
  }

  output() {
    const d = new Date();
    const pattern = 'yyyy-mm-dd';
    const filename = `${d.formattedDate(pattern)}-${this.bname}-vs-${this.wname}.sgf`;
    const element = document.createElement('a');
    element.setAttribute('href', `data:text/plain;charset=utf-8,${encodeURIComponent(this.content.join(''))}`);
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }
}

