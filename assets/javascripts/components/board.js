import BoardComponent from '../board.js'
import React, {Component} from 'react';
import ReactDOM from 'react-dom';

export default class Board extends Component {

  render() {
    return (
      <div className="board" ref="board">
      </div>
    )
  }

  componentDidMount() {
    let board = new BoardComponent(this.refs.board, 19, 30)
    board.draw()
  }

}
