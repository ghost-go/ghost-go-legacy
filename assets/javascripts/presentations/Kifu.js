import React, { Component, PropTypes } from 'react'

export default class Kifu extends Component {
  render() {
    return(
      <tr>
        <td>{this.props.date}</td>
        <td>{this.props.title}</td>
        <td>{this.props.b_name}</td>
        <td>{this.props.w_name}</td>
        <td>{this.props.result}</td>
      </tr>
    )
  }
}

Kifu.propTypes = {
  date: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  b_name: PropTypes.string.isRequired,
  w_name: PropTypes.string.isRequired,
  result: PropTypes.string.isRequired,
}
