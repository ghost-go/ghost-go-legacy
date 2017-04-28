import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import { CoordsToTree, RESPONSE_TIME } from '../constants/Go'

import PuzzlePanel from '../presentations/PuzzlePanel'
import FlatButton from 'material-ui/FlatButton'
import Board from '../eboard/Board'

import { fetchPuzzle, fetchPuzzleNext } from '../actions/FetchActions'
import { postPuzzleRecord } from '../actions/PostActions'
import {
  setCurrentMode,
  setRangeFilter,
  addSteps,
  resetSteps, setCurrentAnswerId } from '../actions/Actions'

//material-ui
import Dialog from 'material-ui/Dialog'

import { StyleSheet, css } from 'aphrodite'

class Puzzle extends Component {

  static propTypes = {
    puzzle: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    rangeFilter: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
    steps: PropTypes.array.isRequired,
    currentMode: PropTypes.string.isRequired,
    currentAnswerId: PropTypes.number,
    theme: PropTypes.string.isRequired,
    themeMaterial: PropTypes.object.isRequired,
  }

  static contextTypes = {
    auth: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props)

    this.state = { open: false,
      answersExpanded: true,
      commentsOpen: false,
      rightTipOpen: false,
      wrongTipOpen: false,
      researchMode: true,
    }
    this.handleCommentsToggle = this.handleCommentsToggle.bind(this)
    this.handleRight = this.handleRight.bind(this)
    this.handleWrong = this.handleWrong.bind(this)
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

  handleRight() {
    const { auth } = this.context
    let profile = auth.getProfile()
    this.props.dispatch(postPuzzleRecord({
      puzzle_id: this.props.puzzle.data.id,
      user_id: profile.user_id,
      record_type: 'right'
    }))

    this.setState({ rightTipOpen: true, wrongTipOpen: false })
  }

  handleWrong() {
    const { auth } = this.context
    let profile = auth.getProfile()
    this.props.dispatch(postPuzzleRecord({
      puzzle_id: this.props.puzzle.data.id,
      user_id: profile.user_id,
      record_type: 'wrong'
    }))

    this.setState({ wrongTipOpen: true, rightTipOpen: false })
    setTimeout(() => { this.handleReset() }, 2000)
  }

  handleClose() {
    this.setState({open: false})
  }

  handleOpen() {
    this.setState({open: true})
    this.resetSteps()
  }

  handleReset() {
    this.setState({ wrongTipOpen: false, rightTipOpen: false })
    this.resetSteps()
  }

  handleNext() {
    let range = this.props.rangeFilter.start + '-' + this.props.rangeFilter.end
    this.props.dispatch(fetchPuzzleNext({range: range})).then(() => {
      let nextUrl = `/puzzles/${this.props.puzzle.data.id}?range=${range}`
      this.props.dispatch(push(nextUrl))
      this.setCurrentMode('answer')
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
    const { auth } = this.context
    let profile = auth.getProfile()
    this.props.dispatch(fetchPuzzle({id, query: {user_id: profile.user_id}}))
    let boardWidth = 0
    if (screen.width > screen.height) {
      boardWidth = window.innerHeight - 60
    } else {
      boardWidth = window.innerWidth
    }
    this.boardLayer.width = this.boardLayer.height = boardWidth
  }

  componentDidUpdate() {
    const { puzzle, steps } = this.props

    let board = new Board({
      autofit: true,
      theme: this.props.theme,
      material: this.props.themeMaterial,
      editable: true,
      nextStoneType: puzzle.data.whofirst === 'Black First' ? 1 : -1,
      afterMove: (step) => {
        this.props.dispatch(addSteps(step))
        setTimeout(() => {
          if (this.props.currentMode !== 'research') {
            this.response()
          }
        }, this.props.currentMode === 'research' ? 0 : RESPONSE_TIME)
      },
    })

    board.setStones(CoordsToTree(puzzle.data.steps.split(';').concat(steps)), true)
    board.render(this.boardLayer)
  }

  response() {
    let rights = []
    let wrongs = []
    this.props.puzzle.data.right_answers.forEach((i) => {
      if (i.steps.indexOf(this.props.steps.join(';')) == 0) {
        rights.push(i)
      }
    })
    this.props.puzzle.data.wrong_answers.forEach((i) => {
      if (i.steps.indexOf(this.props.steps.join(';')) == 0) {
        wrongs.push(i)
      }
    })

    if (rights.length > 0) {
      const i = Math.floor(Math.random() * rights.length)
      let stepsStr = this.props.steps.join(';')
      if (rights[i].steps === stepsStr) {
        this.handleRight()
      }
      else {
        const step = rights[i].steps.split(';')[this.props.steps.length]
        this.props.dispatch(addSteps(step))
        let stepsStr = this.props.steps.join(';')
        if (rights[i].steps === stepsStr) {
          this.handleRight()
        }
      }
    }
    else if (wrongs.length > 0) {
      const i = Math.floor(Math.random() * wrongs.length)
      let stepsStr = this.props.steps.join(';')
      if (wrongs[i].steps === stepsStr) {
        this.handleWrong()
      }
      else {
        const step = wrongs[i].steps.split(';')[this.props.steps.length]
        this.props.dispatch(addSteps(step))
        let stepsStr = this.props.steps.join(';')
        if (wrongs[i].steps === stepsStr) {
          this.handleWrong()
        }
      }
    }
    else {
      this.handleWrong()
    }
  }

  render() {
    const { puzzle } = this.props

    const actions = [
      <FlatButton
        label="OK"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleClose}
      />
    ]

    return (
      <div>
        <Dialog
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          {this.state.ratingInfo}
        </Dialog>
        <div className='puzzle-board'>
          {
            this.state.rightTipOpen ?
              <div ref="tipRight" className={css(styles.tipRight)}>
                <i className="zmdi zmdi-check"></i>
              </div>
            : null
          }
          {
            this.state.wrongTipOpen ?
              <div ref="tipWrong" className={css(styles.tipWrong)}>
                <i className="zmdi zmdi-close"></i>
              </div>
                : null
          }
          <canvas id="puzzle_layer" ref={(elem) => { this.boardLayer = elem }}></canvas>
          {/*
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
          */}
        </div>
        <div className='puzzle-panel'>
          <PuzzlePanel
            {...this.props}
            showNext={true}
            puzzle={puzzle.data}
            handleRangeChange={this.handleRangeChange}
            handleNext={::this.handleNext}
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
    theme: state.theme,
    themeMaterial: state.themeMaterial,
  }
}

const styles = StyleSheet.create({
  tipRight: {
    position: 'absolute',
    width: '300px',
    height: '300px', top: '50%',
    left: '50%',
    marginLeft: '-150px',
    marginTop: '-150px',
    fontSize: '300px',
    color: 'green',
    textAlign: 'center',
  },

  tipWrong: {
    position: 'absolute',
    width: '300px',
    height: '300px',
    top: '50%',
    left: '50%',
    marginLeft: '-150px',
    marginTop: '-150px',
    fontSize: '300px',
    color: 'red',
    textAlign: 'center',
  }
})

export default connect(select)(Puzzle)
