import * as config from '../constants/Config'
import { createAction, createActions, handleAction, handleActions } from 'redux-actions'
import URI from 'urijs'
import URITemplate from 'urijs/src/URITemplate'

function buildFetchData(name = '', api = '') {
  const fetchDataRequest = createAction(`FETCH_${name}_REQUEST`)
  const fetchDataSuccess = createAction(`FETCH_${name}_SUCCESS`)
  const fetchDataFailure = createAction(`FETCH_${name}_FAILURE`)

  return (params) => {
    return dispatch => {
      dispatch(fetchDataRequest(params))
      let url = URI(`${config.API_DOMAIN}/${api}`)
      let templates = api.match(/#{.*}/i)
      if (templates === null) {
        url = url.query(params)
      } else {
        templates.forEach((t) => {
          url = URI(url.toString().replace(t, params[t.match(/#{(.*)}/i)[1]]))
        })
        if (params['query'] !== undefined) {
          url = url.query(params['query'])
        }
      }

      return fetch(url)
        .then(res => res.json())
        .then(data => dispatch(fetchDataSuccess({data})))
        .catch(ex => dispatch(fetchDataFailure(ex)))
    }
  }
}

export const fetchKifus = buildFetchData('KIFUS', 'v1/kifus')
export const fetchPuzzles = buildFetchData('PUZZLES', 'v1/puzzles')

export const fetchKifu = buildFetchData('KIFU', 'v1/kifus/#{id}')
export const fetchPuzzle = buildFetchData('PUZZLE', 'v1/puzzles/#{id}')
export const fetchPuzzleNext = buildFetchData('PUZZLE_NEXT', 'v1/puzzles/next')

export const fetchTopPlayers = buildFetchData('TOP_PLAYERS', 'v1/players/top')
