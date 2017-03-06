import React, { Component, PropTypes as T } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import Helmet from 'react-helmet'
import _ from 'lodash'

import PuzzleBoard from '../presentations/PuzzleBoard'
import PuzzlePanel from '../presentations/PuzzlePanel'
import FlatButton from 'material-ui/FlatButton'

import { fetchPuzzle, fetchPuzzleNext } from '../actions/FetchActions'
import { postPuzzleRecord } from '../actions/PostActions'
import {
  setCurrentMode,
  setRangeFilter,
  addSteps,
  resetSteps,
  setCurrentAnswerId
} from '../actions/Actions'

//material-ui
import Dialog from 'material-ui/Dialog'

class Puzzle extends Component {

  static propTypes = {
    puzzle: T.object.isRequired,
    auth: T.object.isRequired,
    dispatch: T.func.isRequired,
    rangeFilter: T.object.isRequired,
    params: T.object.isRequired,
    expanded: T.bool.isRequired,
    steps: T.array.isRequired,
    currentMode: T.string.isRequired,
    currentAnswerId: T.number,
  }

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
    let { id } = this.props.params
    this.props.dispatch(fetchPuzzle({id}))
    //this.is a workaround for fix share issue
    try {
      window.addthis.layers.refresh()
    } catch (ex) {
    }
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
      <div style={{marginLeft: this.props.expanded === true ? '235px' : '50px'}} className='page-container'>

        <Helmet
          title={`Tsumego P-${puzzle.data.id}`}
          meta={[
            {'property': 'fb:app_id', 'content': '160543744369895'},
            {'property': 'og:type', 'content': 'article'},
            {'property': 'og:title', 'content': `Tsumego P-${puzzle.data.id}`},
            {'property': 'og:description', 'content': ''},
            {'property': 'og:image', 'content': puzzle.data.preview_img_r1.x500.url},
            {'name': 'twitter:card', 'content': 'summary_large_image'},
            {'name': 'twitter:site', 'content': '@happybyronbai'},
            {'name': 'twitter:title', 'content': `Tsumego P-${puzzle.data.id}`},
            {'name': 'twitter:description', 'content': ''},
            {'name': 'twitter:image', 'content': puzzle.data.preview_img_r1.x500.url},
          ]}
        />
        <Dialog
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          {this.state.ratingInfo}
        </Dialog>
        <div className='puzzle-board'>
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
        </div>
        <div className='puzzle-panel'>
          <PuzzlePanel
            showNext={true}
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
        <div className='clearfix'></div>
      </div>)
  }
}

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
