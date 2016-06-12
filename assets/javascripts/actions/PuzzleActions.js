import * as types from '../constants/ActionTypes'
import { createAction, handleAction, handleActions } from 'redux-actions'

export const fetchPuzzlesRequest = createAction(types.FETCH_PUZZLES_REQUEST)
export const fetchPuzzlesSuccess = createAction(types.FETCH_PUZZLES_SUCCESS)
export const fetchPuzzlesFailure = createAction(types.FETCH_PUZZLES_FAILURE)

export const fetchPuzzleRequest = createAction(types.FETCH_PUZZLE_REQUEST)
export const fetchPuzzleSuccess = createAction(types.FETCH_PUZZLE_SUCCESS)
export const fetchPuzzleFailure = createAction(types.FETCH_PUZZLE_FAILURE)

export function fetchPuzzles(page, per_page) {
  return dispatch => {
    dispatch(fetchPuzzlesRequest({page, per_page}))
    let url = `http://api.ghost-go.com/v1/puzzles?page=${page}`
    if (per_page != null) {
      url = `${url}&per_page=${per_page}`
    }

    return fetch(url)
      .then(res => res.json())
      .then(data => dispatch(fetchPuzzlesSuccess({page, per_page, data})))
      .catch(ex => dispatch(fetchPuzzlesFailure(ex)))
  }
}

export function fetchPuzzle(id) {
  return dispatch => {
    dispatch(fetchPuzzleRequest({id}))
    let url = `http://api.ghost-go.com/v1/puzzles/${id}`
    //let url = `http://localhost:3000/v1/puzzles/${id}`
    return fetch(url)
      .then(res => res.json())
      .then(data => dispatch(fetchPuzzleSuccess({data})))
      .catch(ex => dispatch(fetchPuzzleFailure(ex)))
  }
}
