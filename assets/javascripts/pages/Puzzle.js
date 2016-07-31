import React, { Component, PropTypes } from 'react'
import { IntlProvider, FormattedMessage, addLocaleData } from 'react-intl'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Router, Route, hashHistory, browserHistory } from 'react-router'
//import lang from '../components/lang'

import PuzzleBoard from '../presentations/PuzzleBoard'
import ControlBar from '../presentations/ControlBar'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import Layout from './Layout'
import AnswerBar from '../presentations/AnswerBar'
import Drawer from 'material-ui/Drawer'

import { fetchPuzzle } from '../actions/PuzzleActions'

//material-ui
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import Toggle from 'material-ui/Toggle'
import Paper from 'material-ui/Paper'
import { Table, TableBody, TableRow, TableRowColumn } from 'material-ui/Table'
import Dialog from 'material-ui/Dialog'
import Snackbar from 'material-ui/Snackbar'

import { StyleSheet, css } from 'aphrodite'

class Puzzle extends Component {
  constructor(props) {
    super(props)
    let { id } = this.props.params
    this.state = {
      answersExpanded: false,
      commentsOpen: false,
      rightTipOpen: false,
      wrongTipOpen: false
    }
    this.props.dispatch(fetchPuzzle(id))
    this.handleAnswersToggle = this.handleAnswersToggle.bind(this)
    this.handleCommentsToggle = this.handleCommentsToggle.bind(this)
    this.handleRightTipOpen = this.handleRightTipOpen.bind(this)
    this.handleWrongTipOpen = this.handleWrongTipOpen.bind(this)
    this.handleReset = this.handleReset.bind(this)
    this.handleUndo = this.handleUndo.bind(this)
  }

  handleAnswersToggle(event, toggle) {
    this.setState({answersExpanded: toggle})
  }

  handleCommentsToggle() {
    this.setState({commentsOpen: !this.state.commentsOpen})
  }

  handleRightTipOpen() {
    this.setState({
      rightTipOpen: true,
      wrongTipOpen: false,
    })
  }

  handleWrongTipOpen() {
    this.setState({
      wrongTipOpen: true,
      rightTipOpen: false
    }, () => {
      setTimeout(() => { this.handleReset() }, 2000)
    })
  }

  handleClose() {
    this.setState({open: false})
  }

  handleReset() {
    this.refs.board.reset()
  }

  handleUndo() {

  }

  render() {
    //<RaisedButton
      //label="Comments"
      //className={css(styles.btnComments)}
      //primary={true}
      //onTouchTap={this.handleCommentsToggle}
    ///>
    //<CardText>
      //<Toggle className={css(styles.toggle)} label="Research Mode"></Toggle>
    //</CardText>
    const { puzzle } = this.props
    let rightAnswers = []
    let wrongAnswers = []
    let answers = puzzle.data.right_answers + puzzle.data.wrong_answers
    if (puzzle != null && puzzle.data != null && puzzle.data.right_answers != null && puzzle.data.wrong_answers != null) {

      puzzle.data.right_answers.forEach((i) => {
        rightAnswers.push(<AnswerBar board={this.refs.board} key={i.id} id={i.id} steps={i.steps} current={0} total={i.steps_count} up={0} down={0} />)
      })
      puzzle.data.wrong_answers.forEach((i) => {
        wrongAnswers.push(<AnswerBar board={this.refs.board} key={i.id} id={i.id} steps={i.steps} current={0} total={i.steps_count} up={0} down={0} />)
      })

    }

    return (
      <div className={css(styles.puzzlePage)}>
        <div className={css(styles.puzzleContainer)}>
          <div className={css(styles.puzzleBoard)}>
            <PuzzleBoard className="board"
                   whofirst={puzzle.data.whofirst}
                   puzzle={puzzle.data.steps}
                   right_answers={puzzle.data.right_answers}
                   wrong_answers={puzzle.data.wrong_answers}
                   answers={puzzle.data.answers}
                   handleRight={this.handleRightTipOpen}
                   handleWrong={this.handleWrongTipOpen}
                   ref="board" />
          </div>
        </div>
        <div className={css(styles.puzzleInfo)}>
          <Card>
            <CardTitle title={`${puzzle.data.whofirst} ${puzzle.data.ranking}`} />
            <CardText>
              <div>
                <strong>Number: </strong>
                {`P-${puzzle.data.id}`}
              </div>
            </CardText>
            <CardActions style={{padding: '14px'}}>
              {
                /*
                <RaisedButton
                  onClick={this.handleUndo}
                  label="Undo"
                  secondary={true}
                />*/
              }
              <RaisedButton
                onClick={this.handleReset}
                label="Reset"
                primary={true}
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
        <Snackbar
          open={this.state.rightTipOpen}
          message={'THAT\'S RIGHT!!'}
          autoHideDuration={8000}
          onRequestClose={this.handleRequestClose}
          bodyStyle={{
            backgroundColor: 'green',
            fontSize: '18px'
          }}
        />
        <Snackbar
          open={this.state.wrongTipOpen}
          message={'THAT\'S WRONG!!'}
          autoHideDuration={5000}
          onRequestClose={this.handleRequestClose}
          bodyStyle={{
            backgroundColor: 'black',
            fontSize: '18px'
          }}
        />
      </div>
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
