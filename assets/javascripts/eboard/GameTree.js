import { List, Map } from 'immutable'
export default class GameTree {
  constructor() {
    this.nodes = List()
    this.children = List()
    this.current = Map()
    this.parent = Map()
  }
}

