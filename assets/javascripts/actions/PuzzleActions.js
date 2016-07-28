import * as types from '../constants/ActionTypes'
import * as config from '../constants/Config'
import { createAction, handleAction, handleActions } from 'redux-actions'
import URI from 'urijs'
import URITemplate from 'urijs/src/URITemplate'

export const fetchPuzzlesRequest = createAction(types.FETCH_PUZZLES_REQUEST)
export const fetchPuzzlesSuccess = createAction(types.FETCH_PUZZLES_SUCCESS)
export const fetchPuzzlesFailure = createAction(types.FETCH_PUZZLES_FAILURE)

export const fetchPuzzleRequest = createAction(types.FETCH_PUZZLE_REQUEST)
export const fetchPuzzleSuccess = createAction(types.FETCH_PUZZLE_SUCCESS)
export const fetchPuzzleFailure = createAction(types.FETCH_PUZZLE_FAILURE)

export function fetchPuzzles(params) {
  return dispatch => {
    dispatch(fetchPuzzlesRequest(params))
    let url = URI(`${config.API_DOMAIN}/v1/puzzles`)
    url = url.query(params)

    return fetch(url)
      .then(res => res.json())
      .then(data => dispatch(fetchPuzzlesSuccess({data})))
      .catch(ex => dispatch(fetchPuzzlesFailure(ex)))
  }
}

export function fetchPuzzle(id) {
  return dispatch => {
    dispatch(fetchPuzzleRequest({id}))
    let url = `${config.API_DOMAIN}/v1/puzzles/${id}`
    return fetch(url)
      .then(res => res.json())
      .then(data => dispatch(fetchPuzzleSuccess({data})))
      .catch(ex => dispatch(fetchPuzzleFailure(ex)))
  }
}
