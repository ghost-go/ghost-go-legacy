import React, { Component, PropTypes } from 'react'
import { IntlProvider, FormattedMessage, addLocaleData } from 'react-intl'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Router, Route, hashHistory, browserHistory } from 'react-router'
import lang from '../components/lang'

import PuzzleBoard from '../presentations/PuzzleBoard'
import ControlBar from '../presentations/ControlBar'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import Layout from './Layout'
import AnswerBar from '../presentations/AnswerBar'
import Drawer from 'material-ui/Drawer'

import { fetchPuzzle } from '../actions/PuzzleActions'

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import Toggle from 'material-ui/Toggle'
import Paper from 'material-ui/Paper'
import { Table, TableBody, TableRow, TableRowColumn } from 'material-ui/Table'

import { StyleSheet, css } from 'aphrodite'

class Puzzle extends Component {
  constructor(props) {
    super(props)
    let { id } = this.props.params
    this.state = {
      answersExpanded: false,
      commentsOpen: false
    }
    this.props.dispatch(fetchPuzzle(id))
    this.handleAnswersToggle = this.handleAnswersToggle.bind(this)
    this.handleCommentsToggle = this.handleCommentsToggle.bind(this)
  }

  handleAnswersToggle(event, toggle) {
    this.setState({answersExpanded: toggle})
  }

  handleCommentsToggle() {
    this.setState({commentsOpen: !this.state.commentsOpen})
  }

  render() {
    const { puzzle } = this.props
    let rightAnswers = []
    let wrongAnswers = []
    if (puzzle != null && puzzle.data != null && puzzle.data.right_answers != null && puzzle.data.wrong_answers != null) {

      puzzle.data.right_answers.forEach((i) => {
        rightAnswers.push(<AnswerBar key={i.id} id={i.number} steps={i.steps} current={0} total={i.steps_count} up={0} down={0} />)
      })
      puzzle.data.wrong_answers.forEach((i) => {
        wrongAnswers.push(<AnswerBar key={i.id} id={i.number} steps={i.steps} current={0} total={i.steps_count} up={0} down={0} />)
      })

    }

    return (
      <Layout>
        <div className={css(styles.puzzlePage)}>
          <div className={css(styles.puzzleContainer)}>
            <div className={css(styles.puzzleBoard)}>
              <PuzzleBoard className="board"
                     puzzle={puzzle.data.steps}
                     ref="board" />
            </div>
          </div>
          <div className={css(styles.puzzleInfo)}>
            <Card>
              <CardTitle title={puzzle.data.name} />
              <CardText>
                <div>
                  <strong>Number: </strong>
                  {puzzle.data.number} right/wrong: 10/20
                </div>
                <br />
                <div>{puzzle.data.description}</div>
              </CardText>
              <CardText>
                <Toggle className={css(styles.toggle)} label="Research Mode"></Toggle>
              </CardText>
              <CardActions>
                <RaisedButton label="Undo" />
                <RaisedButton label="Reset" />
                <RaisedButton
                  label="Comments"
                  className={css(styles.btnComments)}
                  primary={true}
                  onTouchTap={this.handleCommentsToggle}
                />
              </CardActions>
              <CardText>
                <Toggle
                  toggled={this.state.answersExpanded}
                  className={css(styles.toggle)}
                  label="Answers"
                  onToggle={this.handleAnswersToggle}
                />
              </CardText>
              <CardText className={css(styles.answersContainer)} expandable={!this.state.answersExpanded}>
                <CardHeader
                  title="Correct Answer"
                  actAsExpander={true}
                  showExpandableButton={true}
                />
                {rightAnswers}
                <CardHeader
                  title="Wrong Answer"
                  actAsExpander={true}
                  showExpandableButton={true}
                />
                {wrongAnswers}
              </CardText>
            </Card>
            <Drawer docked={true} width={350} open={this.state.commentsOpen} openSecondary={true}>
            </Drawer>
          </div>
        </div>
      </Layout>
    )
  }
}

const styles = StyleSheet.create({

  answersContainer: {
    padding: 0
  },

  btnComments: {
    float: 'right'
  },

  puzzlePage: {
    display: 'flex'
  },

  puzzleContainer: {
    height: 'calc(100vh - 50px)',
    display: 'flex'
  },

  puzzleBoard: {
    marginTop: '10px',
    marginLeft: '30px',
    flex: '1',
    order: '-1'
  },

  puzzleInfo: {
    padding: '10px 10px',
    flexGrow: '1'
  },

  toggle: {
    fontSize: '14px',
    maxWidth: '150'
  }


})

function select(state) {
  return {
    puzzle: state.puzzle
  }
}

export default connect(select)(Puzzle)
