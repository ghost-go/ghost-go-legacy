import * as config from '../constants/Config'
import { createAction, createActions, handleAction, handleActions } from 'redux-actions'
import URI from 'urijs'
import URITemplate from 'urijs/src/URITemplate'

export const { fetchPuzzleNextRequest } = createActions('FETCH_PUZZLE_NEXT_REQUEST')

export function fetchPuzzleNext(range) {
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
      console.log(json)
      return json
    }
  })
}
