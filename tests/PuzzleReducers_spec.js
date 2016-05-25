import {kifus, kifu} from '../assets/javascripts/reducers/KifuReducers.js'
import * as types from '../assets/javascripts/constants/ActionTypes'

describe('puzzles reducers', () => {

  it('should return initial state', () => {
    expect( kifus(undefined, {}) )
    .toEqual({
      isFetching: false,
      isFailure: false,
      data: []
    })
  })

  it('isFetching should be false when request has been send request', () => {
    expect( kifus([], {
      type: types.FETCH_KIFUS_REQUEST,
      payload: {
        page: 1,
        per_page: 1
      }
    }) ).toEqual({
      isFetching: true,
      isFailure: false,
      data: []
    })
  })

  it('isFailure should be false when request has been send successfully', () => {
    expect( kifus({
      isFetching: false,
      isFailure: false,
      data: []
    }, {
      type: types.FETCH_KIFUS_SUCCESS,
      payload: {
        page: 1,
        per_page: 1
      }
    }) )
    .toEqual({
      isFetching: false,
      isFailure: false,
      data: [{
        'id': '1',
      }]
    })
  })

  it('isFailure should be true when request has been send failure', () => {
    expect( kifus({
      isFetching: false,
      isFailure: false,
      data: []
    }, {
      type: types.FETCH_KIFUS_FAILURE,
    }) )
    .toEqual({
      isFetching: false,
      isFailure: true,
      data: null
    })
  })

})
