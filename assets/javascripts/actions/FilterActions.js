import { createAction } from 'redux-actions';
import { fetchKifus, fetchPuzzles } from './FetchActions'

export const setPuzzleFilter = createAction('SET_PUZZLE_FILTER')
export const setKifuFilter = createAction('SET_KIFU_FILTER')
