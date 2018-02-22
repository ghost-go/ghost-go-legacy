import reduceReducers from 'reduce-reducers';

function createReducer(initialState, handlers) {
  return function reducer(state = initialState, action) {
    if (Object.prototype.hasOwnProperty.call(handlers, action.type)) {
      return handlers[action.type](state, action);
    }
    return state;
  };
}

export const sidebarCollpase = createReducer({ sidebar: { collpased: false } }, {
  TOGGLE_SIDEBAR: state => ({ sidebar: { collpased: !state.sidebar.collpased } }),
  OPEN_SIDEBAR: () => ({ sidebar: { collpased: false } }),
  CLOSE_SIDEBAR: () => ({ sidebar: { collpased: true } }),
});

const uiReducers = reduceReducers(sidebarCollpase);

export default uiReducers;
