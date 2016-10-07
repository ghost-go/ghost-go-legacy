import * as config from '../constants/Config'
import { createAction, createActions, handleAction, handleActions } from 'redux-actions'
import URI from 'urijs'
import URITemplate from 'urijs/src/URITemplate'

export const fetchTopPlayersRequest = createAction('FETCH_TOP_PLAYERS_REQUEST')

export function fetchTopPlayers(params) {
  return dispatch => {
    let url = URI(`${config.API_DOMAIN}/v1/players/top`)
    return fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
      .then(res => res.json())
      .then(data => dispatch(fetchTopPlayersRequest(data)))
  }
}
