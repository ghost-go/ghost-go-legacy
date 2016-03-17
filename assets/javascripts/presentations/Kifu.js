import React, { Component, PropTypes } from 'react'

export default class Kifu extends Component {
  render() {
    return(
      <tr>
        <td>{this.props.date}</td>
        <td>{this.props.title}</td>
        <td>{this.props.black}</td>
        <td>{this.props.white}</td>
        <td>{this.props.result}</td>
      </tr>
    )
  }
}

Kifu.propTypes = {
  date: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  black: PropTypes.string.isRequired,
  white: PropTypes.string.isRequired,
  result: PropTypes.string.isRequired,
}
