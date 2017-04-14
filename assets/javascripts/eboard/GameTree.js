import { List, Map } from 'immutable'
import { TreeModel } from 'tree-model'

export default class GameTree extends TreeModel {

  constructor() {
    super(null)
  }

  loadFromSinaSgf(data) {

    //const regex = /(.*)/g
    ////let m
    //let dataArray = regex.exec(data)[0].split(';')
    //let rootData = dataArray[0]
    //let root = this.getRoot(this)
    //root.current = Map({
      //te: /TE\[(.*?)\]/g.exec(rootData)[1],
      //rd: /RD\[(.*?)\]/g.exec(rootData)[1],
      //pc: /PC\[(.*?)\]/g.exec(rootData)[1],
      //tm: /TM\[(.*?)\]/g.exec(rootData)[1],
      //lt: /LT\[(.*?)\]/g.exec(rootData)[1],
      //lc: /LC\[(.*?)\]/g.exec(rootData)[1],
      //ko: /KO\[(.*?)\]/g.exec(rootData)[1],
      //re: /RE\[(.*?)\]/g.exec(rootData)[1],
      //pb: /PB\[(.*?)\]/g.exec(rootData)[1],
      //br: /BR\[(.*?)\]/g.exec(rootData)[1],
      //pw: /PW\[(.*?)\]/g.exec(rootData)[1],
      //wr: /WR\[(.*?)\]/g.exec(rootData)[1],
      //gk: /GK\[(.*?)\]/g.exec(rootData)[1],
      //tc: /TC\[(.*?)\]/g.exec(rootData)[1],
    //})

    //while ((m = regex.exec(data)) !== null) {
      //// This is necessary to avoid infinite loops with zero-width matches
      //if (m.index === regex.lastIndex) {
        //regex.lastIndex++
      //}
      //// The result can be accessed through the `m`-variable.
      //m.forEach((match, groupIndex) => {
        //console.log(match)
        ////rootData = data.split(';')[0]
        ////root.set('node', Map({
          ////title: rootData
        ////}))
      //})
    //}
  }

  getRoot(tree) {
    while (!tree.parent.isEmpty()) tree = tree.parent
    return tree
  }

  getHeight() {
  }

  getDepth() {
  }

  getLevel() {
  }

  getDegree() {
  }

  getSiblings() {
  }

  toSgf() {
  }

}

