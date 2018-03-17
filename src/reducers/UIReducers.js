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
  dashboardFilter: { open: false },
}, {
  TOGGLE_SIDEBAR: state => ({ ...state, sidebar: { collpased: !state.sidebar.collpased } }),
  OPEN_SIDEBAR: state => ({ ...state, sidebar: { collpased: false } }),
  CLOSE_SIDEBAR: state => ({ ...state, sidebar: { collpased: true } }),
  TOGGLE_PUZZLE_FILTER: state => ({ ...state, puzzleFilter: { open: !state.puzzleFilter.open } }),
  OPEN_PUZZLE_FILTER: state => ({ ...state, puzzleFilter: { open: true } }),
  CLOSE_PUZZLE_FILTER: state => ({ ...state, puzzleFilter: { open: false } }),
  TOGGLE_KIFU_FILTER: state => ({ ...state, kifuFilter: { open: !state.kifuFilter.open } }),
  OPEN_KIFU_FILTER: state => ({ ...state, kifuFilter: { open: true } }),
  CLOSE_KIFU_FILTER: state => ({ ...state, kifuFilter: { open: false } }),
  TOGGLE_DASHBOARD_FILTER: state => (
    { ...state, dashboardFilter: { open: !state.dashboardFilter.open } }),
  OPEN_DASHBOARD_FILTER: state => ({ ...state, dashboardFilter: { open: true } }),
  CLOSE_DASHBOARD_FILTER: state => ({ ...state, dashboardFilter: { open: false } }),
});

const uiReducers = reduceReducers(sidebarCollpase);

export default uiReducers;
