import * as types from '../constants/ActionTypes'
import * as config from '../constants/Config'
import { createAction, handleAction, handleActions } from 'redux-actions'
import URI from 'urijs'
import URITemplate from 'urijs/src/URITemplate'

export const fetchKifusRequest = createAction(types.FETCH_KIFUS_REQUEST)
export const fetchKifusSuccess = createAction(types.FETCH_KIFUS_SUCCESS)
export const fetchKifusFailure = createAction(types.FETCH_KIFUS_FAILURE)

export const fetchKifuRequest = createAction(types.FETCH_KIFU_REQUEST)
export const fetchKifuSuccess = createAction(types.FETCH_KIFU_SUCCESS)
export const fetchKifuFailure = createAction(types.FETCH_KIFU_FAILURE)

export function fetchKifus(params) {
  return dispatch => {
    dispatch(fetchKifusRequest(params))
    let url = URI(`${config.API_DOMAIN}/v1/kifus`)
    url = url.query(params)

    return fetch(url)
      .then(res => res.json())
      .then(data => dispatch(fetchKifusSuccess({data})))
      .catch(ex => dispatch(fetchKifusFailure(ex)))
  }
}

export function fetchKifu(id) {
  return dispatch => {
    dispatch(fetchKifuRequest({id}))
    let url = `${config.API_DOMAIN}/v1/kifus/${id}`
    return fetch(url)
      .then(res => res.json())
      .then(data => dispatch(fetchKifuSuccess({data})))
      .catch(ex => dispatch(fetchKifuFailure(ex)))
  }
}
