import * as types from '../constants/ActionTypes'
import { createAction, handleAction, handleActions } from 'redux-actions'
//import fetch from 'isomorphic-fetch'

export const selectKifus = createAction(types.SELECT_KIFUS)
export const invalidateKifus = createAction(types.INVALIDATE_KIFUS)
export const fetchKifusRequest = createAction(types.FETCH_KIFUS_REQUEST)
export const fetchKifusSuccess = createAction(types.FETCH_KIFUS_SUCCESS)
export const fetchKifusFailure = createAction(types.FETCH_KIFUS_FAILURE)

export function fetchKifus(page, per_page) {
  return dispatch => {
    dispatch(fetchKifusRequest({page, per_page}))
    //let url = `${API_AdDDRESS}/v1/kifu?page=1&per_page=10`;
    let url = `http://api.ghost-go.com/v1/kifu?page=${page}&per_page=${per_page}`;
    console.log(url);
    return fetch(url)
      .then(res => res.json())
      .then(data => dispatch(fetchKifusSuccess({page, per_page, data})))
      .catch(ex => dispatch(fetchKifusFailure(ex)))
  }
}

