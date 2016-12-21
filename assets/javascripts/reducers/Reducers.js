import { combineReducers } from 'redux'
import reduceReducers from 'reduce-reducers'

function updateObject(oldObject, newValues) {
  return Object.assign({}, oldObject, newValues);
}

function updateItemInArray(array, itemId, updateItemCallback) {
  const updatedItems = array.map(item => {
    if(item.id !== itemId) {
      return item;
    }

    const updatedItem = updateItemCallback(item);
    return updatedItem;
  });

  return updatedItems;
}

function buildFetchReducer(initialState, name = '') {
  initialState = {...initialState,
    isFetching: false,
    isFailure: false,
  }
  let handlers = {}
  handlers[`FETCH_${name}_REQUEST`] = fetchRequest
  handlers[`FETCH_${name}_SUCCESS`] = fetchSuccess
  handlers[`FETCH_${name}_FAILURE`] = fetchFailure
  return createReducer(initialState, handlers)
}

function buildPostReducer(initialState, name = '') {
  initialState = {...initialState,
    isFetching: false,
    isFailure: false,
  }
  let handlers = {}
  handlers[`POST_${name}_REQUEST`] = fetchRequest
  handlers[`POST_${name}_SUCCESS`] = fetchSuccess
  handlers[`POST_${name}_FAILURE`] = fetchFailure
  return createReducer(initialState, handlers)
}

function createReducer(initialState, handlers) {
  return function reducer(state = initialState, action) {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action)
    } else {
      return state
    }
  }
}


function fetchRequest(state, action) {
  return {...state, isFetching: true, isFailure: false}
}

function fetchSuccess(state, action) {
  return {
    ...state,
    isFetching: false,
    isFailure: false,
    data: action.payload.data
  }
}

function fetchFailure(state, action) {
  return {...state, isFetching: false, isFailure: true, errorInfo: action.payload}
}

function setKifuFilter(state, action) {
  return action.payload
}

function setPuzzleFilter(state, action) {
  return updateObject(state, action.payload)
}

function setRangeFilter(state, action) {
  return updateObject(state, action.payload)
}

function setPracticePuzzleId(state, action) {
  return action.payload
}

export const puzzles = buildFetchReducer({}, 'PUZZLES')
export const puzzle = reduceReducers(
  buildFetchReducer({}, 'PUZZLE'),
  buildFetchReducer({}, 'PUZZLE_NEXT')
)
export const practice = buildFetchReducer({}, 'PRACTICE')
export const puzzleRecords = reduceReducers(
  buildFetchReducer({}, 'PUZZLE_RECORDS'),
  buildPostReducer({}, 'PUZZLE_RECORDS')
)
export const rating = buildPostReducer({}, 'RATING')
export const kifus = buildFetchReducer({}, 'KIFUS')
export const kifu = buildFetchReducer({}, 'KIFU')
export const topPlayers = buildFetchReducer({}, 'TOP_PLAYERS')
export const puzzleFilter = createReducer({start: '18k', end: '9d'}, { 'SET_PUZZLE_FILTER': setPuzzleFilter })
export const rangeFilter = createReducer({start: '18k', end: '9d'}, { 'SET_RANGE_FILTER': setRangeFilter })
export const kifuFilter = createReducer('all', { 'SET_KIFU_FILTER': setKifuFilter })
export const practicePuzzleId = createReducer(null, { 'SET_PRACTICE_PUZZLE_ID': setPracticePuzzleId })
