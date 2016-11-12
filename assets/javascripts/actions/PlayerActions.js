import * as config from '../constants/Config'
import { createAction, createActions, handleAction, handleActions } from 'redux-actions'
import URI from 'urijs'
import URITemplate from 'urijs/src/URITemplate'

//export const fetchTopPlayersRequest = createAction('FETCH_TOP_PLAYERS_REQUEST')

export const {
  fetchTopPlayersRequest,
  fetchTopPlayersSuccess,
  fetchTopPlayersFailure
} = createActions(
  'FETCH_TOP_PLAYERS_REQUEST',
  'FETCH_TOP_PLAYERS_SUCCESS',
  'FETCH_TOP_PLAYERS_FAILURE'
)

export function fetchTopPlayers(params) {
  return dispatch => {
    dispatch(fetchTopPlayersRequest(params))
    let url = URI(`${config.API_DOMAIN}/v1/players/top`)
    url = url.query(params)

    return fetch(url)
      .then(res => res.json())
      .then(data => dispatch(fetchTopPlayersSuccess({data})))
      .catch(ex => dispatch(fetchTopPlayersFailure(ex)))
  }

  //return dispatch => {
    //let url = URI(`${config.API_DOMAIN}/v1/players/top`)
    //return fetch(url, {
      //method: 'GET',
      //headers: {
        //'Accept': 'application/json',
        //'Content-Type': 'application/json'
      //},
    //})
      //.then(res => res.json())
      //.then(data => dispatch(fetchTopPlayersRequest(data)))
  //}
}
