import * as types from '../constants/ActionTypes'
import * as config from '../constants/Config'
import { createAction, handleAction, handleActions } from 'redux-actions'
import URI from 'urijs'
import URITemplate from 'urijs/src/URITemplate'

export const { postRating } = createActions('POST_RATING')
