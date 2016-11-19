import React, { Component, PropTypes } from 'react'
import { IntlProvider, FormattedMessage, addLocaleData } from 'react-intl'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Router, Route, hashHistory, browserHistory } from 'react-router'
import { push } from 'react-router-redux'
import Helmet from "react-helmet";
//import lang from '../components/lang'

import PuzzleBoard from '../presentations/PuzzleBoard'
import ControlBar from '../presentations/ControlBar'
import SVGIcon from '../presentations/SVGIcon'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import Layout from './Layout'
import AnswerBar from '../presentations/AnswerBar'
import Rating from 'react-rating'

import { fetchPuzzleNext } from '../actions/FetchActions'
import { fetchPuzzle } from '../actions/FetchActions'
import { addRating } from '../actions/RatingActions'
import { addPuzzleRecord } from '../actions/PuzzleRecordActions'
import { setRangeFilter } from '../actions/FilterActions'

//material-ui
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import Toggle from 'material-ui/Toggle'
import Paper from 'material-ui/Paper'
import { Table, TableBody, TableRow, TableRowColumn } from 'material-ui/Table'
import Dialog from 'material-ui/Dialog'
import Snackbar from 'material-ui/Snackbar'
import Drawer from 'material-ui/Drawer'
import RankRange from '../presentations/RankRange'

import * as config from '../constants/Config'
import URI from 'urijs'

import { StyleSheet, css } from 'aphrodite'

class Puzzle extends Component {

  constructor(props) {
    super(props)

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
    this.handleNext = this.handleNext.bind(this)
    this.handleRangeChange = this.handleRangeChange.bind(this)
  }

  handleAnswersToggle(event, toggle) {
    this.setState({answersExpanded: toggle})
  }

  handleCommentsToggle() {
    this.setState({commentsOpen: !this.state.commentsOpen})
  }

  handleRightTipOpen() {
    const { auth } = this.props
    let profile = auth.getProfile()
    this.props.dispatch(addPuzzleRecord({
      puzzle_id: this.props.puzzle.data.id,
      user_id: profile.user_id,
      record_type: 'right'
    }))

    this.refs.board.handleRightTipOpen()
  }

  handleWrongTipOpen() {
    const { auth } = this.props
    let profile = auth.getProfile()
    this.props.dispatch(addPuzzleRecord({
      puzzle_id: this.props.puzzle.data.id,
      user_id: profile.user_id,
      record_type: 'wrong'
    }))

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


  handleNext() {
    this.props.dispatch(fetchPuzzleNext({range: this.props.rangeFilter.start + '-' + this.props.rangeFilter.end}))

    //let self = this
    //let url = URI(`${config.API_DOMAIN}/v1/puzzles/next?range=${this.props.rangeFilter}`)
    //fetch(url, {
      //method: 'GET',
      //headers: {
        //'Accept': 'application/json',
        //'Content-Type': 'application/json'
      //},
    //}).then(function(res){
      //return (res.json())
    //}).then(function(json) {
      //if (json == null) {
        //alert('No next puzzle')
      //}
      //else {
        //let nextUrl = `/puzzles/${json.id}?range=${this.props.rangeFilter}`
        //self.props.dispatch(push(nextUrl))
        //self.props.dispatch(fetchPuzzle({id: json.id}))
        //self.refs.board.handleTipsReset()
      //}
    //})
  }

  handleRatingChange(rate) {
    const { auth } = this.props
    let profile = auth.getProfile()
    if (auth.loggedIn()) {
      let { id } = this.props.params
      this.props.dispatch(addRating({
        id: id,
        rating: rate,
        user_id: profile.user_id
      }))
    } else {
      auth.login()
    }
  }

  handleRangeChange(range) {
    this.props.dispatch(setRangeFilter(range))
  }

  componentDidMount() {
    setTimeout(() => {
      let { id } = this.props.params
      this.props.dispatch(fetchPuzzle({id}))
      let addthisScript = document.createElement('script');
      addthisScript.setAttribute('src', '//s7.addthis.com/js/300/addthis_widget.js#pubid=ra-5818445a7b592e4c')
      if (document.body) document.body.appendChild(addthisScript)
      let addthisConfig = document.createElement('script');
      addthisConfig.innerHTML = `
        var addthis_config = addthis_config || {};
        addthis_config.data_track_addressbar = false;
        addthis_config.data_track_clickback = false;
      `
      if (document.body) document.body.appendChild(addthisConfig)
    });
  }

  render() {
    const { puzzle } = this.props
    if (puzzle['data'] === undefined) return null
    const { auth } = this.props
    let rightAnswers = []
    let wrongAnswers = []
    let answers = []
    if (puzzle != null && puzzle.data != null && puzzle.data.right_answers != null && puzzle.data.wrong_answers != null) {
      answers = puzzle.data.right_answers + puzzle.data.wrong_answers
      puzzle.data.right_answers.forEach((i) => {
        rightAnswers.push(<AnswerBar board={this.refs.board} key={i.id} id={i.id} steps={i.steps} current={0} total={i.steps_count} up={0} down={0} />)
      })
      puzzle.data.wrong_answers.forEach((i) => {
        wrongAnswers.push(<AnswerBar board={this.refs.board} key={i.id} id={i.id} steps={i.steps} current={0} total={i.steps_count} up={0} down={0} />)
      })
    }

    return (
      <div className={css(styles.puzzlePage)}>
        {
          //<Helmet
            //meta={[
                //{"property": "fb:app_id", "content": "160543744369895"},
                //{"property": "og:type", "content": "article"},
                //{"property": "og:title", "content": `Tsumego practice P-${puzzle.data.id}`},
                //{"property": "og:description", "content": "Try to do it!"},
                //{"property": "og:image", "content": puzzle.data.preview_img_r1 != null ? puzzle.data.preview_img_r1.preview_img_r1.x500.url : ''},
                //{"name": "twitter:card", "content": "summary_large_image"},
                //{"name": "twitter:site", "content": "@happybyronbai"},
                //{"name": "twitter:title", "content": `Tsumego practice P-${puzzle.data.id}`},
                //{"name": "twitter:description", "content": "Try to do it!"},
                //{"name": "twitter:image", "content": puzzle.data.preview_img_r1 != null ? puzzle.data.preview_img_r1.preview_img_r1.x500.url : ''},
            //]}
          ///>
        }
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
            <CardTitle title={`${puzzle.data.whofirst} ${puzzle.data.rank}`} />
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
              <RaisedButton
                onClick={this.handleReset}
                label="Reset"
                primary={true}
              />
              <RaisedButton
                onClick={this.handleNext.bind(this)}
                label="Next Tsumego"
                secondary={true}
              />
              <RankRange rankRange={this.props.rangeFilter} handleRangeChange={this.handleRangeChange} ref='range' />
            </CardActions>
            <CardActions>
              <div className="addthis_inline_share_toolbox"></div>
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
            <div className={css(styles.answersContainer)}>
              <CardText style={{padding: 0}} expandable={!this.state.answersExpanded}>
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
            </div>
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
    padding: '10px',
    display: 'flex',
    '@media (max-width: 992px)': {
      padding: '0px',
      flexDirection: 'column',
    }
  },

  puzzleContainer: {
    display: 'flex',
  },

  answersContainer: {
    padding: '16px 0px',
    '@media screen and (max-aspect-ratio: 4/3)': {
      padding: '0px'
    },
  },

  puzzleBoard: {
    margin: '0 10px 0 10px',
    '@media (max-width: 992px)': {
      margin: '10px 0 10px 0',
    },
    flex: 'auto',
  },

  puzzleInfo: {
    flex: 'auto',
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
    puzzle: state.puzzle,
    rangeFilter: state.rangeFilter
  }
}

export default connect(select)(Puzzle)
