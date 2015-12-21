'use strict'
let React = require('react');

module.exports = React.createClass({
  displayName: 'Board',
  render: () => {
    return (
      <div className="board">
        <canvas className="layer" id="board"></canvas>
        <canvas className="layer" id="cross"></canvas>
        <canvas className="layer" id="piece"></canvas>
        <canvas className="layer" id="top"></canvas>
        <div id="coord"></div>
        <div id="turn"></div>
      </div>
    );
  }
})
