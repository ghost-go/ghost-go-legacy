import * as types from '../constants/ActionTypes'
//import fetch from 'isomorphic-fetch'

export function selectKifus(page) {
  return {
    type: types.SELECT_KIFUS,
    page
  }
}

export function invalidateKifus(page) {
  return {
    type: types.INVALIDATE_KIFUS,
    page
  }
}

export function fetchKifusRequest(page, per_page) {
  return {
    type: types.FETCH_KIFUS_REQUEST,
    page,
    per_page
  }
}

export function fetchKifusSuccess(page, per_page, body) {
  return {
    type: types.FETCH_KIFUS_SUCCESS,
    page: page,
    per_page: per_page,
    data: body
  }
}

export function fetchKifusFailure(page, per_page) {
  return {
    type: types.FETCH_KIFUS_FAILURE,
    page,
    per_page
  }

}

export function fetchKifus(page, per_page) {
  return dispatch => {
    dispatch(fetchKifusRequest(page, per_page))
    //let url = `${API_AdDDRESS}/v1/kifu?page=1&per_page=10`;
    let url = `http://api.ghost-go.com/v1/kifu?page=${page}&per_page=${per_page}`;
    console.log(url);
    return fetch(url)
      .then(res => res.json())
      .then(json => dispatch(fetchKifusSuccess(page, per_page, json)))
      .catch(ex => dispatch(fetchKifusFailure(ex)))
  }
}

