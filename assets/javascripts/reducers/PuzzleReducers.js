import * as types from '../constants/ActionTypes'

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
    }); case types.FETCH_PUZZLES_SUCCESS:
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

export function puzzle(state = {
  isFetching: false,
  isFailure: false,
  data: []
}, action) {
  switch (action.type) {
  case types.FETCH_PUZZLE_REQUEST:
    return Object.assign({}, state, {
      isFetching: true,
      isFailure: false
    })
  case types.FETCH_PUZZLE_SUCCESS:
    return Object.assign({}, state, {
      isFetching: false,
      isFailure: false,
      data: action.payload.data
    })
  case types.FETCH_PUZZLE_FAILURE:
    return Object.assign({}, state, {
      isFetching: false,
      isFailure: true
    })
  default:
    return state
  }
}
