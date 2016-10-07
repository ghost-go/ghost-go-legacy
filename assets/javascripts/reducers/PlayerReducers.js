import * as types from '../constants/ActionTypes'

export function players(state = {
  isFetching: false,
  isFailure: false,
  data: []
}, action) {
  switch (action.type) {
  case 'FETCH_TOP_PLAYERS_REQUEST':
    return Object.assign({}, state, {
      data: action.payload
    })
  default:
    return state
  }
}
