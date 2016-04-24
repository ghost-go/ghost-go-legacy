import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router';

export default class Kifu extends Component {

  constructor(props) {
    super(props)

    this.redirectKifu = this.redirectKifu.bind(this)
  }


  redirectKifu() {
    window.location.href = `kifus/${this.props.id}`
  }

  render() {
    return(
      <tr>
        <td>
          <Link to={`/kifus/${this.props.id}`}>
            {this.props.created_at}
          </Link>
        </td>
        <td>
          <Link to={`/kifus/${this.props.id}`}>
            {this.props.title}
          </Link>
        </td>
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
