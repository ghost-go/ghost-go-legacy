import reduceReducers from 'reduce-reducers'

function updateObject(oldObject, newValues) {
  return Object.assign({}, oldObject, newValues)
}

//function updateItemInArray(array, itemId, updateItemCallback) {
  //const updatedItems = array.map(item => {
    //if(item.id !== itemId) {
      //return item
    //}

    //const updatedItem = updateItemCallback(item)
    //return updatedItem
  //})

  //return updatedItems
//}

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


function fetchRequest(state) {
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

function setGenernalFilter(state, action) {
  return action.payload
}

function setPuzzleFilter(state, action) {
  return updateObject(state, action.payload)
}

function setRangeFilter(state, action) {
  let text
  if (action.payload.start === '18k' && action.payload.end === '9d') {
    text = 'all'
  } else {
    text = `${action.payload.start}-${action.payload.end}`
  }
  return updateObject(state, {...action.payload, text: text})
}

function setPracticePuzzleId(state, action) {
  return action.payload
}

export const steps = createReducer([], {
  'ADD_STEPS': function(state, action) {
    if (typeof(action.payload) === 'string') {
      return state.concat([action.payload])
    } else {
      return state.concat(action.payload)
    }
  },
  'RESET_STEPS': function() {
    return []
  }
})

export const currentMode = createReducer('answer', {
  'SET_CURRENT_MODE': (state, action) => { return action.payload }
})

export const currentAnswerId = createReducer(null, {
  'SET_CURRENT_ANSWER_ID': (state, action) => { return action.payload }
})

export const puzzles = buildFetchReducer({}, 'PUZZLES')
export const puzzle = reduceReducers(
  buildFetchReducer({}, 'PUZZLE'),
  buildFetchReducer({}, 'PUZZLE_NEXT')
)

export const practices = buildFetchReducer({}, 'PRACTICES')
export const practice = reduceReducers(
  buildFetchReducer({}, 'PRACTICE'),
  buildPostReducer({}, 'PRACTICE')
)

export const practiceRecord = reduceReducers(
  buildFetchReducer({}, 'PRACTICE_RECORD'),
  buildPostReducer({}, 'PRACTICE_RECORDS')
)

export const practiceRecords = buildFetchReducer({}, 'PRACTICE_RECORDS')

export const practiceTemplates = buildFetchReducer({}, 'PRACTICE_TEMPLATES')
export const practiceTemplate = reduceReducers(
  buildFetchReducer({}, 'PRACTICE_TEMPLATE'),
  buildPostReducer({}, 'PRACTICE_TEMPLATE')
)

export const puzzleRecords = buildFetchReducer({}, 'PUZZLE_RECORDS')
export const puzzleRecord = reduceReducers(
  buildFetchReducer({}, 'PUZZLE_RECORD'),
  buildPostReducer({}, 'PUZZLE_RECORD')
)

export const dashboard = buildFetchReducer({data: {total: 0, right: 0, wrong: 0}}, 'DASHBOARD')

export const rating = buildPostReducer({}, 'RATING')
export const favorite = buildPostReducer({}, 'FAVORITE')
export const kifus = buildFetchReducer({}, 'KIFUS')
export const kifu = buildFetchReducer({}, 'KIFU')
export const topPlayers = buildFetchReducer({}, 'TOP_PLAYERS')
export const puzzleFilter = createReducer({start: '18k', end: '9d'}, { 'SET_PUZZLE_FILTER': setPuzzleFilter })
export const rangeFilter = createReducer({start: '18k', end: '9d', text: 'all'}, { 'SET_RANGE_FILTER': setRangeFilter })
export const kifuFilter = createReducer('all', { 'SET_KIFU_FILTER': setGenernalFilter})
export const tagFilter = createReducer('all', { 'SET_TAG_FILTER': setGenernalFilter})
export const dateRangeFilter = createReducer('last7days', { 'SET_DATE_RANGE_FILTER': setGenernalFilter})
export const userRangeFilter = createReducer('onlyme', { 'SET_USER_RANGE_FILTER': setGenernalFilter})
export const recordTypeFilter = createReducer('all', { 'SET_RECORD_TYPE_FILTER': setGenernalFilter})
export const practicePuzzleId = createReducer(null, { 'SET_PRACTICE_PUZZLE_ID': setPracticePuzzleId })
export const tags = buildFetchReducer({}, 'TAGS')
