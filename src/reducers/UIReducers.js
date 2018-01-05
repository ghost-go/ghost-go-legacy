import reduceReducers from 'reduce-reducers';

function createReducer(initialState, handlers) {
  return function reducer(state = initialState, action) {
    if (Object.prototype.hasOwnProperty.call(handlers, action.type)) {
      return handlers[action.type](state, action);
    }
    return state;
  };
}

export const sidebarCollpase = createReducer({ sidebar: { collpase: false } }, {
  TOGGLE_SIDEBAR: state => ({ sidebar: { collpase: !state.sidebar.collpase } }),
  OPEN_SIDEBAR: () => ({ sidebar: { collpase: true } }),
  CLOSE_SIDEBAR: () => ({ sidebar: { collpase: false } }),
});

const uiReducers = reduceReducers(sidebarCollpase);

export default uiReducers;
