import { List, Map } from 'immutable'
export default class GameTree {
  constructor() {
    this.nodes = List()
    this.children = List()
    this.current = Map()
    this.parent = Map()
  }

  loadFromSgf() {
    
  }

  getRoot(tree) {
    while (tree.parent != null) tree = tree.parent
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

