import React, { Component, PropTypes } from 'react'
import Navigation from '../presentations/Navigation'
import { IntlProvider, FormattedMessage, addLocaleData } from 'react-intl'
import Board from '../presentations/Board'
import lang from '../components/lang'
import { connect } from 'react-redux'
import { fetchKifus } from '../actions/KifuActions'
import { Link } from 'react-router';
import { Router, Route, hashHistory, browserHistory } from 'react-router'

class Games extends Component {
  constructor(props) {
    super(props)
    this.state = {
      kifu: null
    }
    let { query } = this.props.location
    this.props.dispatch(fetchKifus(query.page, query.per_page))

    this.handlePageChanged = this.handlePageChanged.bind(this)
  }

  render() {
    const { kifus } = this.props
    return (
      <Board className="board" grid="19" size="30" />
    )
  }

}
