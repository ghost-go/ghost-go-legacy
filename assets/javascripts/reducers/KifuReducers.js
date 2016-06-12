import * as types from '../constants/ActionTypes'

export function kifus(state = {
  isFetching: false,
  isFailure: false,
  data: []
}, action) {
  switch (action.type) {
  case types.FETCH_KIFUS_REQUEST:
    return Object.assign({}, state, {
      isFetching: true,
      isFailure: false
    })
  case types.FETCH_KIFUS_SUCCESS:
    return Object.assign({}, state, {
      isFetching: false,
      isFailure: false,
      data: action.payload.data
    })
  case types.FETCH_KIFUS_FAILURE:
    return Object.assign({}, state, {
      isFetching: false,
      isFailure: true
    })
  default:
    return state
  }
}

export function kifu(state = {
  isFetching: false,
  isFailure: false,
  data: []
}, action) {
  switch (action.type) {
  case types.FETCH_KIFU_REQUEST:
    return Object.assign({}, state, {
      isFetching: true,
      isFailure: false
    })
  case types.FETCH_KIFU_SUCCESS:
    return Object.assign({}, state, {
      isFetching: false,
      isFailure: false,
      data: action.payload.data
    })
  case types.FETCH_KIFU_FAILURE:
    return Object.assign({}, state, {
      isFetching: false,
      isFailure: true
    })
  default:
    return state
  }
}
