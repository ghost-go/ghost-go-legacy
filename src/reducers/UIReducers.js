import reduceReducers from 'reduce-reducers';
import AuthService from '../common/AuthService';

function createReducer(initialState, handlers) {
  return function reducer(state = initialState, action) {
    if (Object.prototype.hasOwnProperty.call(handlers, action.type)) {
      return handlers[action.type](state, action);
    }
    return state;
  };
}

const AUTH0_CLIENT_ID = 'GydWO2877MMcpteCqgQEWSFGqtQOCiP5';
const AUTH0_DOMAIN = 'ghostgo.auth0.com';

export const sidebarCollpase = createReducer({
  auth: new AuthService(AUTH0_CLIENT_ID, AUTH0_DOMAIN),
  sidebar: { collpased: false },
  puzzleFilter: { open: false },
  kifuFilter: { open: false },
}, {
  TOGGLE_SIDEBAR: state => ({ sidebar: { collpased: !state.sidebar.collpased } }),
  OPEN_SIDEBAR: () => ({ sidebar: { collpased: false } }),
  CLOSE_SIDEBAR: () => ({ sidebar: { collpased: true } }),
  TOGGLE_PUZZLE_FILTER: state => ({ puzzleFilter: { open: !state.puzzleFilter.open } }),
  OPEN_PUZZLE_FILTER: () => ({ puzzleFilter: { open: true } }),
  CLOSE_PUZZLE_FILTER: () => ({ puzzleFilter: { open: false } }),
  TOGGLE_KIFU_FILTER: state => ({ kifuFilter: { open: !state.kifuFilter.open } }),
  OPEN_KIFU_FILTER: () => ({ kifuFilter: { open: true } }),
  CLOSE_KIFU_FILTER: () => ({ kifuFilter: { open: false } }),
});

const uiReducers = reduceReducers(sidebarCollpase);

export default uiReducers;
