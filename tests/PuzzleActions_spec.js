import * as actions from '../assets/javascripts/actions/PuzzleActions'
import * as types from '../assets/javascripts/constants/ActionTypes'

const middlewares = [ thunk ]

function mockStore(getState, expectedActions, done) {
  if (!Array.isArray(expectedActions)) {
    throw new Error('expectedActions should be an array of expected actions.')
  }
  if (typeof done !== 'undefined' && typeof done !== 'function') {
    throw new Error('done should either be undefined or function.')
  }

  function mockStoreWithoutMiddleware() {
    return {
      getState() {
        return typeof getState === 'function' ?
          getState() :
            getState
      },

      dispatch(action) {
        const expectedAction = expectedActions.shift()

        try {
          expect(action).toEqual(expectedAction)
          if (done && !expectedActions.length) {
            done()
          }
          return action
        } catch (e) {
          done(e)
        }
      }
    }
  }

  const mockStoreWithMiddleware = applyMiddleware(
    ...middlewares
  )(mockStoreWithoutMiddleware)

  return mockStoreWithMiddleware()
}

describe('async actions', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  it('creates FETCH_KIFUS_SUCCESS when fetching kifus has been done', (done) => {
    fetchMock.mock('http://api.ghost-go.com/v1/puzzles?page=1&per_page=1', [])

    const expectedActions = [
      {
        type: types.FETCH_KIFUS_REQUEST,
        payload: {
          page: 1,
          per_page: 1
        }
      },
      {
        type: types.FETCH_KIFUS_SUCCESS,
        payload: {
          page: 1,
          per_page: 1,
          data: []
        }
      }
    ]

    const store = mockStore({ kifus:[] }, expectedActions, done)
    store.dispatch(actions.fetchKifus(1, 1))

  })

  it('creates FETCH_KIFUS_FAILURE when fetching kifus has been failure', (done) => {
    fetchMock.reMock('http://api.ghost-go.com/v1/puzzles?page=1&per_page=1', 500)

    const expectedActions = [
      { type: types.FETCH_KIFUS_REQUEST, payload: {page: 1, per_page: 1}},
      { type: types.FETCH_KIFUS_FAILURE, payload: new SyntaxError('Unexpected end of input'), error: true }
    ]

    const store = mockStore({ kifus:[] }, expectedActions, done)
    store.dispatch(actions.fetchKifus(1, 1))
  })

  it('creates FETCH_KIFU_FAILURE when fetching kifu has been done by id', (done) => {
    fetchMock.reMock('http://api.ghost-go.com/v1/puzzles/1', { })

    const expectedActions = [
      { type: types.FETCH_KIFU_REQUEST, payload: {id: 1} },
      {
        type: types.FETCH_KIFU_SUCCESS, payload: {
          data: { }
        }
      }
    ]

    const store = mockStore({ kifus:[] }, expectedActions, done)
    store.dispatch(actions.fetchKifu(1))
  })

})
