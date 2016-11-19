//import * as actions from '../assets/javascripts/actions/PuzzleActions'
//import * as types from '../assets/javascripts/constants/ActionTypes'
//import * as config from '../assets/javascripts/constants/Config'
//import { applyMiddleware } from 'redux'
//import thunk from 'redux-thunk'
//import nock from 'nock'
//import fetchMock from 'fetch-mock'

//const middlewares = [ thunk ]

//function mockStore(getState, expectedActions, done) {
  //if (!Array.isArray(expectedActions)) {
    //throw new Error('expectedActions should be an array of expected actions.')
  //}
  //if (typeof done !== 'undefined' && typeof done !== 'function') {
    //throw new Error('done should either be undefined or function.')
  //}

  //function mockStoreWithoutMiddleware() {
    //return {
      //getState() {
        //return typeof getState === 'function' ?
          //getState() :
            //getState
      //},

      //dispatch(action) {
        //const expectedAction = expectedActions.shift()

        //try {
          //expect(action).toEqual(expectedAction)
          //if (done && !expectedActions.length) {
            //done()
          //}
          //return action
        //} catch (e) {
          //done(e)
        //}
      //}
    //}
  //}

  //const mockStoreWithMiddleware = applyMiddleware(
    //...middlewares
  //)(mockStoreWithoutMiddleware)

  //return mockStoreWithMiddleware()
//}

//describe('Puzzles async actions', () => {
  //afterEach(() => {
    //nock.cleanAll()
  //})

  //it('creates FETCH_PUZZLES_SUCCESS when fetching puzzles has been done', (done) => {
    //fetchMock.mock('/v1/puzzles?page=1&per_page=1', [{
      //total_page: 10,
      //total: 95,
      //data: [{
        //id: 1,
        //number: 'Q-38948',
        //name: '一点忠告',
        //steps: 'B[oc];B[nb];B[mb];B[qb];B[pa];B[pc];W[lb];W[lc];W[mc];W[nd];W[od];W[pd];W[qc];W[rc];W[rb]',
        //description: '',
        //rank: '7K',
        //user_id: 1,
        //created_at: '2016-05-21 16:40:00',
        //updated_at: '2016-05-21 16:40:00',
        //type: null,
        //answer_type: null,
        //puzzle_type: null
      //}, {
        //id: 2,
        //number: 'Q-38948',
        //name: '一点忠告',
        //steps: 'B[oc];B[nb];B[mb];B[qb];B[pa];B[pc];W[lb];W[lc];W[mc];W[nd];W[od];W[pd];W[qc];W[rc];W[rb]',
        //description: '',
        //rank: '7K',
        //user_id: 1,
        //created_at: '2016-05-21 16:40:00',
        //updated_at: '2016-05-21 16:40:00',
        //type: null,
        //answer_type: null,
        //puzzle_type: null
      //}]
    //}])

    //const expectedActions = [
      //{
        //type: types.FETCH_PUZZLES_REQUEST,
        //payload: {
          //page: 1,
          //per_page: 1
        //}
      //},
      //{
        //type: types.FETCH_PUZZLES_SUCCESS,
        //payload: {
          //page: 1,
          //per_page: 1,
          //data: [{
            //total_page: 10,
            //total: 95,
            //data: [{
              //id: 1,
              //number: 'Q-38948',
              //name: '一点忠告',
              //steps: 'B[oc];B[nb];B[mb];B[qb];B[pa];B[pc];W[lb];W[lc];W[mc];W[nd];W[od];W[pd];W[qc];W[rc];W[rb]',
              //description: '',
              //rank: '7K',
              //user_id: 1,
              //created_at: '2016-05-21 16:40:00',
              //updated_at: '2016-05-21 16:40:00',
              //type: null,
              //answer_type: null,
              //puzzle_type: null
            //}, {
              //id: 2,
              //number: 'Q-38948',
              //name: '一点忠告',
              //steps: 'B[oc];B[nb];B[mb];B[qb];B[pa];B[pc];W[lb];W[lc];W[mc];W[nd];W[od];W[pd];W[qc];W[rc];W[rb]',
              //description: '',
              //rank: '7K',
              //user_id: 1,
              //created_at: '2016-05-21 16:40:00',
              //updated_at: '2016-05-21 16:40:00',
              //type: null,
              //answer_type: null,
              //puzzle_type: null
            //}]
          //}]
        //}
      //}
    //]

    //const store = mockStore({ puzzles:[] }, expectedActions, done)
    //store.dispatch(actions.fetchPuzzles({page: 1, per_page: 1}))

  //})

  //it('creates FETCH_PUZZLES_FAILURE when fetching puzzles has been failure', (done) => {
    //fetchMock.reMock('/v1/puzzles?page=1&per_page=1', 500)

    //const expectedActions = [
      //{
        //type: types.FETCH_PUZZLES_REQUEST,
        //payload: {page: 1, per_page: 1}
      //},
      //{
        //type: types.FETCH_PUZZLES_FAILURE,
        //payload: new SyntaxError('Unexpected end of input'),
        //error: true
      //}
    //]

    //const store = mockStore({ puzzles:[] }, expectedActions, done)
    //store.dispatch(actions.fetchPuzzles({page: 1, per_page: 1}))
  //})

  //it('creates FETCH_PUZZLE_FAILURE when fetching puzzle has been done by id', (done) => {
    //fetchMock.reMock(`${config.API_DOMAIN}/v1/puzzles/1`, { })

    //const expectedActions = [
      //{ type: types.FETCH_PUZZLE_REQUEST, payload: {id: 1} },
      //{
        //type: types.FETCH_PUZZLE_SUCCESS, payload: {
          //data: { }
        //}
      //}
    //]

    //const store = mockStore({ puzzles:[] }, expectedActions, done)
    //store.dispatch(actions.fetchPuzzle(1))
  //})

//})
