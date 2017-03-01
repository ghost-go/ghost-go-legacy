import * as config from '../constants/Config'
import { createAction } from 'redux-actions'
import URI from 'urijs'

function buildPostData(name = '', api = '') {
  const postDataRequest = createAction(`POST_${name}_REQUEST`)
  const postDataSuccess = createAction(`POST_${name}_SUCCESS`)
  const postDataFailure = createAction(`POST_${name}_FAILURE`)

  return (params) => {
    return dispatch => {
      dispatch(postDataRequest(params))
      let url = URI(`${config.API_DOMAIN}/${api}`)

      return fetch(url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(params)
      }).then(res => res.json())
        .then(data => dispatch(postDataSuccess({data})))
        .catch(ex => dispatch(postDataFailure(ex)))
    }
  }
}

export const postPuzzleRecord = buildPostData('PUZZLE_RECORD', `${config.API_VERSION}/puzzle_records`)
export const postRating = buildPostData('RATING', `${config.API_VERSION}/ratings`)
export const postPractice = buildPostData('PRACTICE', `${config.API_VERSION}/practices`)
export const postPracticeRecord = buildPostData('PRACTICE_RECORD', `${config.API_VERSION}/practice_records`)
export const postPracticeTemplate = buildPostData('PRACTICE_TEMPLATE', `${config.API_VERSION}/practice_templates`)
