import React, { Component, PropTypes } from 'react'
import { IntlProvider, FormattedMessage, addLocaleData } from 'react-intl'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Router, Route, hashHistory, browserHistory } from 'react-router'
import lang from '../components/lang'

import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import Layout from './Layout'

import { fetchPuzzle } from '../actions/PuzzleActions'

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import Toggle from 'material-ui/Toggle'
import Paper from 'material-ui/Paper'
import { Table, TableBody, TableRow, TableRowColumn } from 'material-ui/Table'
import { StyleSheet, css } from 'aphrodite'

class Home extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Layout>
        <h1> </h1>
      </Layout>
    )
  }
}

const styles = StyleSheet.create({

})

function select(state) {
  return {
    puzzle: state.puzzle
  }
}

export default connect(select)(Home)
