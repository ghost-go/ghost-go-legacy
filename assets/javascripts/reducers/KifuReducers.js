import * as types from '../constants/ActionTypes'

export default function kifus(state = {
  isFetching: false,
  isFailure: false,
  data: []
}, action) {
  switch (action.type) {
    case types.FETCH_KIFUS_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        isFailure: false
      });
    case types.FETCH_KIFUS_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isFailure: false,
        data: action.data
      });
    case types.FETCH_KIFUS_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        isFailure: true
      });
    default:
      return state;
  }
}
