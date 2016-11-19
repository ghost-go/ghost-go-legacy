import {puzzles, puzzle} from '../assets/javascripts/reducers/PuzzleReducers.js'
import * as types from '../assets/javascripts/constants/ActionTypes'

describe('puzzles reducers', () => {

  it('should return initial state', () => {
    expect( puzzles(undefined, {}) )
    .toEqual({
      isFetching: false,
      isFailure: false,
      data: null
    })
  })

  it('isFetching should be true when request has been send request', () => {
    expect( puzzles([], {
      type: types.FETCH_PUZZLES_REQUEST,
      payload: {
        page: 1,
        per_page: 1
      }
    }) ).toEqual({
      isFetching: true,
      isFailure: false,
    })
  })

  it('isFailure should be false when request has been send successfully', () => {
    expect( puzzles({
      isFetching: false,
      isFailure: false,
    }, {
      type: types.FETCH_PUZZLES_SUCCESS,
      payload: {
        page: 1,
        per_page: 1,
        data: [{
          total_page: 10,
          total: 95,
          data: [{
            id: 1,
            number: 'Q-38948',
            name: '一点忠告',
            steps: 'B[oc];B[nb];B[mb];B[qb];B[pa];B[pc];W[lb];W[lc];W[mc];W[nd];W[od];W[pd];W[qc];W[rc];W[rb]',
            description: '',
            rank: '7K',
            user_id: 1,
            created_at: '2016-05-21 16:40:00',
            updated_at: '2016-05-21 16:40:00',
            type: null,
            answer_type: null,
            puzzle_type: null
          }, {
            id: 2,
            number: 'Q-38948',
            name: '一点忠告',
            steps: 'B[oc];B[nb];B[mb];B[qb];B[pa];B[pc];W[lb];W[lc];W[mc];W[nd];W[od];W[pd];W[qc];W[rc];W[rb]',
            description: '',
            rank: '7K',
            user_id: 1,
            created_at: '2016-05-21 16:40:00',
            updated_at: '2016-05-21 16:40:00',
            type: null,
            answer_type: null,
            puzzle_type: null
          }]
        }]
      }
    }) )
    .toEqual({
      isFetching: false,
      isFailure: false,
      data: [{
        total_page: 10,
        total: 95,
        data: [{
          id: 1,
          number: 'Q-38948',
          name: '一点忠告',
          steps: 'B[oc];B[nb];B[mb];B[qb];B[pa];B[pc];W[lb];W[lc];W[mc];W[nd];W[od];W[pd];W[qc];W[rc];W[rb]',
          description: '',
          rank: '7K',
          user_id: 1,
          created_at: '2016-05-21 16:40:00',
          updated_at: '2016-05-21 16:40:00',
          type: null,
          answer_type: null,
          puzzle_type: null
        }, {
          id: 2,
          number: 'Q-38948',
          name: '一点忠告',
          steps: 'B[oc];B[nb];B[mb];B[qb];B[pa];B[pc];W[lb];W[lc];W[mc];W[nd];W[od];W[pd];W[qc];W[rc];W[rb]',
          description: '',
          rank: '7K',
          user_id: 1,
          created_at: '2016-05-21 16:40:00',
          updated_at: '2016-05-21 16:40:00',
          type: null,
          answer_type: null,
          puzzle_type: null
        }]
      }]
    })
  })

  it('isFailure should be true when request has been send failure', () => {
    expect( puzzles({
      isFetching: false,
      isFailure: false,
    }, {
      type: types.FETCH_PUZZLES_FAILURE,
    }) )
    .toEqual({
      isFetching: false,
      isFailure: true,
    })
  })

})
