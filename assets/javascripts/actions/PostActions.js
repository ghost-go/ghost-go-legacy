import * as config from '../constants/Config'
import { createAction, createActions, handleAction, handleActions } from 'redux-actions'
import URI from 'urijs'
import URITemplate from 'urijs/src/URITemplate'

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

export const postPuzzleRecord = buildPostData('PUZZLE_RECORD', 'v1/puzzle_records')
