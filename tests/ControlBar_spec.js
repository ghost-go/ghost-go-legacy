import ControlBar from '../assets/javascripts/presentations/ControlBar'
import React from 'react'
import ReactTestUtils from 'react-addons-test-utils'

describe('create a board instance and initial', () => {
  it ('controlbar component should be initial', () => {
    let component = ReactTestUtils.renderIntoDocument(
      <ControlBar />
    )

    let div = ReactTestUtils.findRenderedDOMComponentWithTag(
      component, 'div'
    )

    expect(div.className).toEqual('control-bar')
    expect(div.querySelector('.move-control')).not.toBeNull()
    expect(div.querySelector('.fa-fast-backward')).not.toBeNull()
    expect(div.querySelector('.fa-backward')).not.toBeNull()
    expect(div.querySelector('.fa-step-backward')).not.toBeNull()
    expect(div.querySelector('.fa-play')).not.toBeNull()
    expect(div.querySelector('.fa-step-forward')).not.toBeNull()
    expect(div.querySelector('.fa-forward')).not.toBeNull()
    expect(div.querySelector('.fa-fast-forward')).not.toBeNull()
  })
})
