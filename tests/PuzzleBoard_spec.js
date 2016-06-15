import PuzzleBoard from '../assets/javascripts/presentations/PuzzleBoard.js'
import React from 'react'
import ReactTestUtils from 'react-addons-test-utils'

describe('PuzzleBoard spec', () => {
  let component = ReactTestUtils.renderIntoDocument(
    <PuzzleBoard className="board"
                 puzzle={'B[rb];B[rc];B[qd];B[pd];B[oc];B[nc];B[lc];B[ra];W[sc];W[rd];W[re];W[qf];W[qc];W[pc];W[qb];W[qa];W[ob]'}
    />
  )
  let div = ReactTestUtils.scryRenderedDOMComponentsWithTag(
    component, 'div'
  )
  it ('PuzzleBoard should be initial and create', () => {
    expect(div).not.toBeNull()
  })

  it ('Puzzle should be shown on PuzzleBoard', () => {
    expect(div).not.toBeNull()
    expect(component.state.step).toEqual(component.props.puzzle.split(';').length)
    expect(component.state.horizontal).toEqual(13)
    expect(component.state.verical).toEqual(11)
  })

  it ('Piece can be moved on PuzzleBoard', () => {
  })

})
