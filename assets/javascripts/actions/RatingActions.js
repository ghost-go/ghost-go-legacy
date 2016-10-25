import * as types from '../constants/ActionTypes'
import * as config from '../constants/Config'
import { createAction, handleAction, handleActions } from 'redux-actions'
import URI from 'urijs'
import URITemplate from 'urijs/src/URITemplate'

export function addRating(params) {

  return dispatch => {
    let url = URI(`${config.API_DOMAIN}/v1/ratings`)
    return fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        rating: {
          ratable_id: params.id,
          ratable_type: 'Puzzle',
          rating: params.rating,
          user_id: params.user_id,
        }
      })
    }).then(function(res){
      return (res.json())
    }).then(function(json) {
      if (json.message != null) {
        alert(json.message)
      }
      else {
        alert('Thank you for your rating!')
      }
    })
  }

}
