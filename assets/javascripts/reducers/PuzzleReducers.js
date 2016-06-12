import * as types from '../constants/ActionTypes'
import { createAction, handleAction, handleActions } from 'redux-actions'

export function puzzles(state = {
  isFetching: false,
  isFailure: false,
  data: []
}, action) {
  switch (action.type) {
  case types.FETCH_PUZZLES_REQUEST:
    return Object.assign({}, state, {
      isFetching: true,
      isFailure: false
    })
  case types.FETCH_PUZZLES_SUCCESS:
    return Object.assign({}, state, {
      isFetching: false,
      isFailure: false,
      data: action.payload.data
    })
  case types.FETCH_PUZZLES_FAILURE:
    return Object.assign({}, state, {
      isFetching: false,
      isFailure: true
    })
  default:
    return state
  }
}


//export function puzzle(state = {
  //isFetching: false,
  //isFailure: false,
  //data: []
//}, action) {
  //switch (action.type) {
  //case types.FETCH_PUZZLE_REQUEST:
    //return Object.assign({}, state, {
      //isFetching: true,
      //isFailure: false
    //})
  //case types.FETCH_PUZZLE_SUCCESS:
    //return Object.assign({}, state, {
      //isFetching: false,
      //isFailure: false,
      //data: action.payload.data
    //})
  //case types.FETCH_PUZZLE_FAILURE:
    //return Object.assign({}, state, {
      //isFetching: false,
      //isFailure: true
    //})
  //default:
    //return state
  //}
//}
//

const puzzleInitState = {
  isFetching: false,
  isFailure: false,
  data: []
}

export const puzzle = handleActions({

  [types.FETCH_PUZZLE_REQUEST]: (state, action) => {
    return Object.assign({}, state, {
      isFetching: true
    })
  },

  [types.FETCH_PUZZLE_SUCCESS]: (state, action) => {
    return Object.assign({}, state, {
      isFetching: false,
      data: action.payload.data
    })
  },

  [types.FETCH_PUZZLE_FAILURE]: (state, action) => {
    return Object.assign({}, state, {
      isFailure: true,
    })
  }

}, puzzleInitState)
