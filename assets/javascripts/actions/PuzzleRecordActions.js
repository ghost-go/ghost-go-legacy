import * as types from '../constants/ActionTypes'
import * as config from '../constants/Config'
import { createAction, handleAction, handleActions } from 'redux-actions'
import URI from 'urijs'
import URITemplate from 'urijs/src/URITemplate'

export function addPuzzleRecord(params) {

  console.log(params)
  return dispatch => {
    let url = URI(`${config.API_DOMAIN}/v1/puzzle_records`)
    return fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        puzzle_record: {
          user_id: params.user_id,
          record_type: params.record_type,
          puzzle_id: params.puzzle_id,
          steps: params.steps,
        }
      })
    })
  }

}
