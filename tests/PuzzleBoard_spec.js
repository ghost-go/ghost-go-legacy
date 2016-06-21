import React from 'react'
import ReactTestUtils from 'react-addons-test-utils'

import PuzzleBoard from '../assets/javascripts/presentations/PuzzleBoard.js'

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
    component.initPuzzleArray()
    expect(div).not.toBeNull()
    expect(component.state.horizontal).toEqual(13)
    expect(component.state.verical).toEqual(11)
    expect(component.state._puzzleArray[17][1]).toEqual(1)
    expect(component.state._puzzleArray[17][2]).toEqual(1)
    expect(component.state._puzzleArray[16][3]).toEqual(1)
    expect(component.state._puzzleArray[15][3]).toEqual(1)
    expect(component.state._puzzleArray[16][0]).toEqual(-1)
    expect(component.state._puzzleArray[14][1]).toEqual(-1)
  })

  it ('Piece can be moved on PuzzleBoard', () => {
  })

})
