import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router';

import { TableRow, TableRowColumn } from 'material-ui/Table';

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
      <TableRow>
        <TableRowColumn>
          <Link to={`/kifus/${this.props.id}`}>
            {this.props.created_at}
          </Link>
        </TableRowColumn>
        <TableRowColumn>
          <Link to={`/kifus/${this.props.id}`}>
            {this.props.title}
          </Link>
        </TableRowColumn>
        <TableRowColumn>{this.props.b_name}</TableRowColumn>
        <TableRowColumn>{this.props.w_name}</TableRowColumn>
        <TableRowColumn>{this.props.result}</TableRowColumn>
      </TableRow>
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
