import reduceReducers from 'reduce-reducers';

function updateObject(oldObject, newValues) {
  return Object.assign({}, oldObject, newValues);
}

// function updateItemInArray(array, itemId, updateItemCallback) {
  // const updatedItems = array.map(item => {
    // if(item.id !== itemId) {
      // return item
    // }

    // const updatedItem = updateItemCallback(item)
    // return updatedItem
  // })

  // return updatedItems
// }

function fetchRequest(state) {
  return { ...state, isFetching: true, isFailure: false };
}

function fetchSuccess(state, action) {
  return {
    ...state,
    isFetching: false,
    isFailure: false,
    data: action.payload.data,
  };
}

function fetchFailure(state, action) {
  return { ...state, isFetching: false, isFailure: true, errorInfo: action.payload };
}

function createReducer(initialState, handlers) {
  return function reducer(state = initialState, action) {
    if (Object.prototype.hasOwnProperty.call(handlers, action.type)) {
      return handlers[action.type](state, action);
    }
    return state;
  };
}


function buildFetchReducer(initialState, name = '') {
  const newInitialState = {
    ...initialState,
    isFetching: false,
    isFailure: false,
  };
  const handlers = {};
  handlers[`FETCH_${name}_REQUEST`] = fetchRequest;
  handlers[`FETCH_${name}_SUCCESS`] = fetchSuccess;
  handlers[`FETCH_${name}_FAILURE`] = fetchFailure;
  return createReducer(newInitialState, handlers);
}

function buildPostReducer(initialState, name = '') {
  const newInitialState = {
    ...initialState,
    isFetching: false,
    isFailure: false,
  };
  const handlers = {};
  handlers[`POST_${name}_REQUEST`] = fetchRequest;
  handlers[`POST_${name}_SUCCESS`] = fetchSuccess;
  handlers[`POST_${name}_FAILURE`] = fetchFailure;
  return createReducer(newInitialState, handlers);
}

function setPlainTextFilter(state, action) {
  return action.payload;
}

function setObjectFilter(state, action) {
  return updateObject(state, action.payload);
}

function setRangeFilter(state, action) {
  let text;
  if (action.payload.start === '18k' && action.payload.end === '9d') {
    text = 'all';
  } else {
    text = `${action.payload.start}-${action.payload.end}`;
  }
  return updateObject(state, { ...action.payload, text });
}

function setPracticePuzzleId(state, action) {
  return action.payload;
}

export const steps = createReducer([], {
  ADD_STEPS(state, action) {
    if (typeof (action.payload) === 'string') {
      return state.concat([action.payload]);
    }
    return state.concat(action.payload);
  },
  RESET_STEPS() {
    return [];
  },
});

export const currentMode = createReducer('answer', {
  SET_CURRENT_MODE(state, action) { return action.payload; },
});

export const currentAnswerId = createReducer(null, {
  SET_CURRENT_ANSWER_ID(state, action) { return action.payload; },
});

export const puzzles = buildFetchReducer({}, 'PUZZLES');
export const puzzle = reduceReducers(
  buildFetchReducer({
    data: {
      is_favorite: false,
      right_answers: [],
      wrong_answers: [],
      steps: '',
      rank: '18k',
      id: 0,
      whofirst: 'Black First',
      preview_img_r1: {
        x100: { url: '' },
        x200: { url: '' },
        x300: { url: '' },
        x400: { url: '' },
        x1000: { url: '' },
      },
    },
  }, 'PUZZLE'),
  buildFetchReducer({}, 'PUZZLE_NEXT'),
);

export const practices = buildFetchReducer({}, 'PRACTICES');
export const practice = reduceReducers(
  buildFetchReducer({}, 'PRACTICE'),
  buildPostReducer({}, 'PRACTICE'),
);

export const practiceRecord = reduceReducers(
  buildFetchReducer({}, 'PRACTICE_RECORD'),
  buildPostReducer({}, 'PRACTICE_RECORDS'),
);

export const practiceRecords = buildFetchReducer({}, 'PRACTICE_RECORDS');

export const practiceTemplates = buildFetchReducer({}, 'PRACTICE_TEMPLATES');
export const practiceTemplate = reduceReducers(
  buildFetchReducer({}, 'PRACTICE_TEMPLATE'),
  buildPostReducer({}, 'PRACTICE_TEMPLATE'),
);

export const puzzleRecords = buildFetchReducer({}, 'PUZZLE_RECORDS');
export const puzzleRecord = reduceReducers(
  buildFetchReducer({}, 'PUZZLE_RECORD'),
  buildPostReducer({}, 'PUZZLE_RECORD'),
);

export const dashboard = buildFetchReducer({ data: { total: 0, right: 0, wrong: 0 } }, 'DASHBOARD');
export const scoreboard = buildFetchReducer({
  data: {
    today: [],
    last7days: [],
    total: [],
  },
}, 'SCOREBOARD');

export const rating = buildPostReducer({}, 'RATING');
export const favorite = buildPostReducer({}, 'FAVORITE');
export const favorites = buildFetchReducer({}, 'FAVORITES');
export const kifus = buildFetchReducer({}, 'KIFUS');
export const kifu = buildFetchReducer({ data: {
  player_b: { en_name: 'John Doe' },
  player_w: { en_name: 'Jane Doe' },
  b_rank: 'None',
  w_rank: 'None',
  result: 'None',
  komi: 'None',
  short_date: 'None',
  steps: '',
} }, 'KIFU');

export const topPlayers = buildFetchReducer({}, 'TOP_PLAYERS');
export const puzzleFilter = createReducer({ start: '18k', end: '9d' }, { SET_PUZZLE_FILTER: setObjectFilter });
export const rangeFilter = createReducer({ start: '18k', end: '9d', text: 'all' }, { SET_RANGE_FILTER: setRangeFilter });
export const kifuFilter = createReducer('all', { SET_KIFU_FILTER: setPlainTextFilter });
export const tagFilter = createReducer('all', { SET_TAG_FILTER: setPlainTextFilter });
export const dateRangeFilter = createReducer('last7days', { SET_DATE_RANGE_FILTER: setPlainTextFilter });
export const userRangeFilter = createReducer('onlyme', { SET_USER_RANGE_FILTER: setPlainTextFilter });
export const recordTypeFilter = createReducer('all', { SET_RECORD_TYPE_FILTER: setPlainTextFilter });
export const nextStoneType = createReducer(0, { SET_NEXT_STONE_TYPE_FILTER: setPlainTextFilter });
export const toolbarHidden = createReducer(true, { SET_TOOLBAR_HIDDEN: setPlainTextFilter });
export const boardStates = createReducer({
  showCoordinate: true,
  mark: 'None',
}, { SET_BOARD_STATES: setObjectFilter });

export const practicePuzzleId = createReducer(null,
  { SET_PRACTICE_PUZZLE_ID: setPracticePuzzleId },
);
export const theme = createReducer(localStorage.getItem('theme') || 'black-and-white',
  { SET_THEME: setPlainTextFilter });
export const tags = buildFetchReducer({}, 'TAGS');