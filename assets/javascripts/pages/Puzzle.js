import React, { Component, PropTypes } from 'react'
import { IntlProvider, FormattedMessage, addLocaleData } from 'react-intl'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Router, Route, hashHistory, browserHistory } from 'react-router'
//import lang from '../components/lang'

import PuzzleBoard from '../presentations/PuzzleBoard'
import ControlBar from '../presentations/ControlBar'
import SVGIcon from '../presentations/SVGIcon'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import Layout from './Layout'
import AnswerBar from '../presentations/AnswerBar'
import Drawer from 'material-ui/Drawer'
import Rating from 'react-rating'

import { fetchPuzzle } from '../actions/PuzzleActions'

//material-ui
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import Toggle from 'material-ui/Toggle'
import Paper from 'material-ui/Paper'
import { Table, TableBody, TableRow, TableRowColumn } from 'material-ui/Table'
import Dialog from 'material-ui/Dialog'
import Snackbar from 'material-ui/Snackbar'

import * as config from '../constants/Config'
import URI from 'urijs'

import { StyleSheet, css } from 'aphrodite'

class Puzzle extends Component {

  constructor(props) {
    super(props)
    let { id } = this.props.params
    this.props.dispatch(fetchPuzzle(id))
    this.state = {
      answersExpanded: true,
      commentsOpen: false,
      rightTipOpen: false,
      wrongTipOpen: false
    }
    this.handleCommentsToggle = this.handleCommentsToggle.bind(this)
    this.handleRightTipOpen = this.handleRightTipOpen.bind(this)
    this.handleWrongTipOpen = this.handleWrongTipOpen.bind(this)
    this.handleReset = this.handleReset.bind(this)
    this.handleAnswersToggle = this.handleAnswersToggle.bind(this)
  }

  handleAnswersToggle(event, toggle) {
    this.setState({answersExpanded: toggle})
  }

  handleCommentsToggle() {
    this.setState({commentsOpen: !this.state.commentsOpen})
  }

  handleRightTipOpen() {
    this.refs.board.handleRightTipOpen()
  }

  handleWrongTipOpen() {
    this.refs.board.handleWrongTipOpen()
    setTimeout(() => { this.handleReset() }, 2000)
  }

  handleClose() {
    this.setState({open: false})
  }

  handleReset() {
    this.refs.board.handleTipsReset()
    this.refs.board.reset()
  }

  handleRatingChange(rate) {
    const { auth } = this.props
    let profile = auth.getProfile()
    console.log(profile)
    if (auth.loggedIn()) {
      let { id } = this.props.params
      let url = URI(`${config.API_DOMAIN}/v1/ratings`)
      fetch(url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          rating: {
            ratable_id: id,
            ratable_type: 'Puzzle',
            rating: rate,
            user_id: profile.user_id,
          }
        })
      }).then(function(res){
        return (res.json())
      }).then(function(json) {
        console.log('json', json)
        console.log(json.message)
        if (json.message != null) {
          alert(json.message)
        }
        else {
          alert('Thank you for your rating!')
        }
      })
    }
    else {
      auth.login()
    }
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
    const { auth } = this.props
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
              <Rating initialRate={puzzle.data.rating} onChange={this.handleRatingChange.bind(this)}
                empty={<SVGIcon className={css(styles.ratingIcon)} href="#icon-star-empty" />}
                full={<SVGIcon className={css(styles.ratingIcon)} href="#icon-star-full" />}
              />
            </CardActions>
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
            {
              //<CardText>
                //<Toggle
                  //toggled={this.state.answersExpanded}
                  //className={css(styles.toggle)}
                  //label="Answers"
                  //onToggle={this.handleAnswersToggle}
                ///>
              //</CardText>
            }
            <CardText className={css(styles.answersContainer)} expandable={!this.state.answersExpanded}>
              <CardHeader
                title="Right Answers"
                actAsExpander={true}
                showExpandableButton={true}
              />
              {rightAnswers}
              <CardHeader
                title="Wrong Answers"
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
    )
  }
}

const styles = StyleSheet.create({

  btnComments: {
    float: 'right'
  },

  puzzlePage: {
    display: 'flex',
    justifyContent: 'space-around'
  },

  puzzleContainer: {
    display: 'flex',
    flex: '0 0 auto',
    height: '110vh',
    padding: '10px 5px 10px 10px',
  },

  puzzleInfo: {
    flex: '0 1 auto',
    padding: '10px 10px 10px 5px',
    flexGrow: '1'
  },

  toggle: {
    fontSize: '14px',
    maxWidth: '150'
  },

  ratingIcon: {
    width: 28,
    height: 28
  },

  tipRight: {
    position: 'absolute',
    fontSize: '300px',
    left: 250,
    top: 180,
    color: 'green',
    textAlign: 'center'
  },

  tipWrong: {
    position: 'absolute',
    fontSize: '300px',
    left: 250,
    top: 180,
    color: 'red',
    textAlign: 'center'
  }

})

function select(state) {
  return {
    puzzle: state.puzzle
  }
}

export default connect(select)(Puzzle)
