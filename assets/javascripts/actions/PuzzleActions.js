import * as config from '../constants/Config'
import { createAction, createActions, handleAction, handleActions } from 'redux-actions'
import URI from 'urijs'
import URITemplate from 'urijs/src/URITemplate'

export const {
  fetchPuzzlesRequest,
  fetchPuzzlesSuccess,
  fetchPuzzlesFailure
} = createActions(
  'FETCH_PUZZLES_REQUEST',
  'FETCH_PUZZLES_SUCCESS',
  'FETCH_PUZZLES_FAILURE'
)

export const {
  fetchPuzzleRequest,
  fetchPuzzleSuccess,
  fetchPuzzleFailure
} = createActions(
  'FETCH_PUZZLE_REQUEST',
  'FETCH_PUZZLE_SUCCESS',
  'FETCH_PUZZLE_FAILURE'
)

export const { fetchPuzzleNextRequest } = createActions('FETCH_PUZZLE_NEXT_REQUEST')

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

export function fetchPuzzleNext(range) {
  return dispatch => {
    let url = URI(`${config.API_DOMAIN}/v1/puzzles/next?range=${range}`)
    fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    }).then(function(res){
      return (res.json())
    }).then(function(json) {
      if (json == null) {
        alert('No next puzzle')
      }
      else {
        window.location.replace(`${config.APP_DOMAIN}/puzzles/${json.id}?range=${range}`)
      }
    })
  }
}
