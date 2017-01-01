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

export const fetchKifus = buildFetchData('KIFUS', `${config.API_VERSION}/kifus`)
export const fetchPuzzles = buildFetchData('PUZZLES', `${config.API_VERSION}/puzzles`)
export const fetchPuzzleRecords = buildFetchData('PUZZLE_RECORDS', `${config.API_VERSION}/puzzle_records`)
export const fetchPractices = buildFetchData('PRACTICES', `${config.API_VERSION}/practices`)

export const fetchKifu = buildFetchData('KIFU', `${config.API_VERSION}/kifus/#{id}`)
export const fetchPuzzle = buildFetchData('PUZZLE', `${config.API_VERSION}/puzzles/#{id}`)
export const fetchPuzzleNext = buildFetchData('PUZZLE_NEXT', `${config.API_VERSION}/puzzles/next`)

export const fetchTopPlayers = buildFetchData('TOP_PLAYERS', `${config.API_VERSION}/players/top`)
export const fetchPractice = buildFetchData('PRACTICE', `${config.API_VERSION}/practices/#{id}`)
