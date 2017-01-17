import React, { Component, PropTypes } from 'react'
import { IntlProvider, FormattedMessage, addLocaleData } from 'react-intl'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Router, Route, hashHistory, browserHistory } from 'react-router'
import { push } from 'react-router-redux'
import Helmet from 'react-helmet' //import lang from '../components/lang'

import PuzzleBoard from '../presentations/PuzzleBoard'
import ControlBar from '../presentations/ControlBar'
import PuzzlePanel from '../presentations/PuzzlePanel'
import SVGIcon from '../presentations/SVGIcon'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import Layout from './Layout'
import AnswerBar from '../presentations/AnswerBar'
import Rating from 'react-rating'

import { fetchPuzzle, fetchPuzzleNext } from '../actions/FetchActions'
import { postPuzzleRecord, postRating } from '../actions/PostActions'
import {
  setCurrentMode,
  setRangeFilter,
  addSteps,
  resetSteps,
  setCurrentAnswerId
} from '../actions/Actions'

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
      open: false,
      answersExpanded: true,
      commentsOpen: false,
      rightTipOpen: false,
      wrongTipOpen: false,
      researchMode: true,
    }
    this.handleCommentsToggle = this.handleCommentsToggle.bind(this)
    this.handleRightTipOpen = this.handleRightTipOpen.bind(this)
    this.handleWrongTipOpen = this.handleWrongTipOpen.bind(this)
    this.handleReset = this.handleReset.bind(this)
    this.handleAnswersToggle = this.handleAnswersToggle.bind(this)
    this.handleResearchMode = this.handleResearchMode.bind(this)
    this.handleNext = this.handleNext.bind(this)
    this.handleRangeChange = this.handleRangeChange.bind(this)
    this.handleOpen = this.handleOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }

  handleAnswersToggle(event, toggle) {
    this.setState({answersExpanded: toggle})
  }

  handleCommentsToggle() {
    this.setState({commentsOpen: !this.state.commentsOpen})
  }

  handleResearchMode() {
    this.setState({researchMode: !this.state.researchMode})
  }

  handleRightTipOpen() {
    const { auth } = this.props
    let profile = auth.getProfile()
    this.props.dispatch(postPuzzleRecord({
      puzzle_id: this.props.puzzle.data.id,
      user_id: profile.user_id,
      record_type: 'right'
    }))

    this.refs.board.handleRightTipOpen()
  }

  handleWrongTipOpen() {
    const { auth } = this.props
    let profile = auth.getProfile()
    this.props.dispatch(postPuzzleRecord({
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

  handleOpen() {
    this.setState({open: true})
  }

  handleReset() {
    this.refs.board.handleTipsReset()
    this.refs.board.reset()
  }


  handleNext() {
    let range = this.props.rangeFilter.start + '-' + this.props.rangeFilter.end
    this.props.dispatch(fetchPuzzleNext({range: range})).then(() => {
      let nextUrl = `/puzzles/${this.props.puzzle.data.id}?range=${range}`
      this.props.dispatch(push(nextUrl))
      this.handleReset()
    })
  }

  handleRangeChange(range) {
    this.props.dispatch(setRangeFilter(range))
  }

  addSteps(step) {
    this.props.dispatch(addSteps(step))
  }

  setCurrentMode(mode) {
    this.props.dispatch(setCurrentMode(mode))
  }

  resetSteps() {
    this.props.dispatch(resetSteps())
  }

  setCurrentAnswerId(id) {
    this.props.dispatch(setCurrentAnswerId(id))
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
    })
  }

  render() {
    const { puzzle } = this.props
    if (puzzle === undefined || puzzle['data'] === undefined) return null

    const actions = [
      <FlatButton
        label="OK"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleClose}
      />
    ]

    return (
      <div className={css(styles.puzzlePage)}>
        <Dialog
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          {this.state.ratingInfo}
        </Dialog>
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
          <Paper className={css(styles.puzzleBoard)}>
            <PuzzleBoard
              className="board"
              steps={this.props.steps}
              addSteps={::this.addSteps}
              resetSteps={::this.resetSteps}
              puzzle={puzzle.data}
              handleRight={this.handleRightTipOpen}
              handleWrong={this.handleWrongTipOpen}
              currentMode={this.props.currentMode}
              setCurrentMode={::this.setCurrentMode}
              ref="board"
            />
          </Paper>
        </div>
        <div className={css(styles.puzzleInfo)}>
          <PuzzlePanel
            puzzle={this.props.puzzle.data}
            handleRangeChange={this.handleRangeChange}
            handleNext={this.handleNext}
            rangeFilter={this.props.rangeFilter}
            handleReset={::this.handleReset}
            addSteps={::this.addSteps}
            resetSteps={::this.resetSteps}
            setCurrentAnswerId={::this.setCurrentAnswerId}
            setCurrentMode={::this.setCurrentMode}
            currentMode={this.props.currentMode}
            currentAnswerId={this.props.currentAnswerId}
            steps={this.props.steps}
          />
        </div>
      </div>)
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

  puzzleBoard: {
    margin: '0 10px 0 10px',
    flex: '1 1 auto',
    width: 'calc(100vmin)',
    height: 'calc(100vmin)',
    '@media (max-width: 992px)': {
      margin: '10px 0 10px 0',
    },
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
    rangeFilter: state.rangeFilter,
    steps: state.steps,
    currentAnswerId: state.currentAnswerId,
    currentMode: state.currentMode,
  }
}

export default connect(select)(Puzzle)
