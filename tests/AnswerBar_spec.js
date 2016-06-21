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
                 puzzle={'B[qa];B[qb];B[pb];B[pc];B[pd];B[pe];B[qf];B[rf];B[sf];B[ra];W[rb];W[sc];W[qc];W[qd];W[qe];W[re];W[se];W[sd];W[pf];W[pg];W[rh]'}
    />
  )

  let div = ReactTestUtils.scryRenderedDOMComponentsWithTag(
    puzzleBoard, 'div'
  )

  let answerbar = ReactTestUtils.renderIntoDocument(
    <MuiThemeProvider muiTheme={getMuiTheme()}>
      <AnswerBar key={1}
                 id={12345}
                 steps={"B[rc];W[rd];B[sa];W[qg];B[sb]"}
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
    let firstStep = ReactDOM.findDOMNode(bar.refs.firstStep)
    ReactTestUtils.Simulate.click(firstStep)

    let nextStep = ReactDOM.findDOMNode(bar.refs.nextStep)
    ReactTestUtils.Simulate.click(nextStep)
    ReactTestUtils.Simulate.click(nextStep)
    ReactTestUtils.Simulate.click(nextStep)

    ReactTestUtils.Simulate.click(firstStep)
    expect(bar.state.current).toEqual(0)
    expect(puzzleBoard.state._puzzleArray[17][2]).toEqual(0)
  })

  it ('answerbar prev step', () => {
    let firstStep = ReactDOM.findDOMNode(bar.refs.firstStep)
    ReactTestUtils.Simulate.click(firstStep)

    let nextStep = ReactDOM.findDOMNode(bar.refs.nextStep)
    ReactTestUtils.Simulate.click(nextStep)
    ReactTestUtils.Simulate.click(nextStep)
    ReactTestUtils.Simulate.click(nextStep)

    let prevStep = ReactDOM.findDOMNode(bar.refs.prevStep)
    expect(puzzleBoard.state._puzzleArray[18][0]).toEqual(1)
    ReactTestUtils.Simulate.click(prevStep)
    expect(bar.state.current).toEqual(2)
    expect(puzzleBoard.state._puzzleArray[18][0]).toEqual(0)
  })

  it ('answerbar do not prev step if answer has been move to first step', () => {
    let firstStep = ReactDOM.findDOMNode(bar.refs.firstStep)
    ReactTestUtils.Simulate.click(firstStep)

    let prevStep = ReactDOM.findDOMNode(bar.refs.prevStep)
    ReactTestUtils.Simulate.click(prevStep)
    expect(bar.state.current).toEqual(0)
    expect(puzzleBoard.state._puzzleArray[17][2]).toEqual(0)
  })

  it ('answerbar next step', () => {
    let firstStep = ReactDOM.findDOMNode(bar.refs.firstStep)
    ReactTestUtils.Simulate.click(firstStep)

    let nextStep = ReactDOM.findDOMNode(bar.refs.nextStep)
    ReactTestUtils.Simulate.click(nextStep)
    expect(bar.state.current).toEqual(1)
    expect(puzzleBoard.state._puzzleArray[17][2]).toEqual(1)
    ReactTestUtils.Simulate.click(nextStep)
    expect(bar.state.current).toEqual(2)
    expect(puzzleBoard.state._puzzleArray[17][3]).toEqual(-1)
  })

  it ('answerbar do not next step if answer has been move to last step', () => {
    let firstStep = ReactDOM.findDOMNode(bar.refs.firstStep)
    ReactTestUtils.Simulate.click(firstStep)

    let nextStep = ReactDOM.findDOMNode(bar.refs.nextStep)
    ReactTestUtils.Simulate.click(nextStep)
    ReactTestUtils.Simulate.click(nextStep)
    ReactTestUtils.Simulate.click(nextStep)
    ReactTestUtils.Simulate.click(nextStep)
    ReactTestUtils.Simulate.click(nextStep)
    ReactTestUtils.Simulate.click(nextStep)
    expect(bar.state.current).toEqual(5)
    expect(puzzleBoard.state._puzzleArray[18][1]).toEqual(1)
  })

  it ('answerbar last step', () => {
    let firstStep = ReactDOM.findDOMNode(bar.refs.firstStep)
    ReactTestUtils.Simulate.click(firstStep)

    let lastStep = ReactDOM.findDOMNode(bar.refs.lastStep)
    ReactTestUtils.Simulate.click(lastStep)
    expect(bar.state.current).toEqual(5)
    expect(puzzleBoard.state._puzzleArray[18][1]).toEqual(1)
  })

})
