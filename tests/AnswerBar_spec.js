import React from 'react'
import ReactDOM from 'react-dom'
import ReactTestUtils from 'react-addons-test-utils'

import PuzzleBoard from '../assets/javascripts/presentations/PuzzleBoard.js'
import AnswerBar from '../assets/javascripts/presentations/AnswerBar'

import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

describe('AnswerBar spec', () => {

  let puzzleBoard = ReactTestUtils.renderIntoDocument(
    <PuzzleBoard className="board"
                 puzzle={'B[rb];B[rc];B[qd];B[pd];B[oc];B[nc];B[lc];B[ra];W[sc];W[rd];W[re];W[qf];W[qc];W[pc];W[qb];W[qa];W[ob]'}
    />
  )
  let div = ReactTestUtils.scryRenderedDOMComponentsWithTag(
    puzzleBoard, 'div'
  )

  let answerbar = ReactTestUtils.renderIntoDocument(
    <MuiThemeProvider muiTheme={getMuiTheme()}>
      <AnswerBar key={1}
                 id={12345}
                 steps={"B[jg];W[jh];B[hh];W[ig];B[hg]"}
                 total={5}
                 up={0}
                 down={0}
                 board={puzzleBoard}
      />
    </MuiThemeProvider>
  )

  let bar = ReactTestUtils.findRenderedComponentWithType(answerbar, AnswerBar)

  it ('answerbar component should be initial and create', () => {
    expect(div).not.toBeNull()
  })

  it ('answerbar first step', () => {
    let nextStep = ReactDOM.findDOMNode(bar.refs.nextStep)
    ReactTestUtils.Simulate.click(nextStep)
    ReactTestUtils.Simulate.click(nextStep)
    ReactTestUtils.Simulate.click(nextStep)

    let firstStep = ReactDOM.findDOMNode(bar.refs.firstStep)
    ReactTestUtils.Simulate.click(firstStep)
    expect(puzzleBoard.state.step).toEqual(17)
    expect(puzzleBoard.state._kifuArray[9][6]).toEqual(0)
  })

  it ('answerbar prev step', () => {
    let nextStep = ReactDOM.findDOMNode(bar.refs.nextStep)
    ReactTestUtils.Simulate.click(nextStep)
    ReactTestUtils.Simulate.click(nextStep)
    ReactTestUtils.Simulate.click(nextStep)

    let prevStep = ReactDOM.findDOMNode(bar.refs.prevStep)
    expect(puzzleBoard.state._kifuArray[7][7]).toEqual(1)
    ReactTestUtils.Simulate.click(prevStep)
    expect(puzzleBoard.state.step).toEqual(19)
    expect(puzzleBoard.state._kifuArray[7][7]).toEqual(0)
  })

  it ('answerbar do not prev step if answer has been move to first step', () => {
    let prevStep = ReactDOM.findDOMNode(bar.refs.prevStep)
    ReactTestUtils.Simulate.click(prevStep)
    expect(puzzleBoard.state.step).toEqual(17)
    expect(puzzleBoard.state._kifuArray[9][6]).toEqual(0)
  })

  it ('answerbar next step', () => {
    let nextStep = ReactDOM.findDOMNode(bar.refs.nextStep)
    ReactTestUtils.Simulate.click(nextStep)
    expect(puzzleBoard.state.step).toEqual(18)
    expect(puzzleBoard.state._kifuArray[9][6]).toEqual(1)
    ReactTestUtils.Simulate.click(nextStep)
    expect(puzzleBoard.state.step).toEqual(19)
    expect(puzzleBoard.state._kifuArray[9][7]).toEqual(-1)
  })

  it ('answerbar do not next step if answer has been move to last step', () => {
    let nextStep = ReactDOM.findDOMNode(bar.refs.nextStep)
    ReactTestUtils.Simulate.click(nextStep)
    ReactTestUtils.Simulate.click(nextStep)
    ReactTestUtils.Simulate.click(nextStep)
    ReactTestUtils.Simulate.click(nextStep)
    ReactTestUtils.Simulate.click(nextStep)
    ReactTestUtils.Simulate.click(nextStep)
    expect(puzzleBoard.state.step).toEqual(22)
    expect(puzzleBoard.state._kifuArray[7][6]).toEqual(1)
  })

  it ('answerbar last step', () => {
    let lastStep = ReactDOM.findDOMNode(bar.refs.lastStep)
    ReactTestUtils.Simulate.click(lastStep)
    expect(puzzleBoard.state.step).toEqual(22)
    expect(puzzleBoard.state._kifuArray[7][6]).toEqual(1)
  })

})
