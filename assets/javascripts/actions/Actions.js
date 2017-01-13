import { createAction } from 'redux-actions'

export const setPuzzleFilter = createAction('SET_PUZZLE_FILTER')
export const setKifuFilter = createAction('SET_KIFU_FILTER')
export const setRangeFilter = createAction('SET_RANGE_FILTER')

export const setPracticePuzzleId = createAction('SET_PRACTICE_PUZZLE_ID')

export const setPracticeLife = createAction('SET_PRACTICE_LIFE')
export const setPracticeTimeLeft = createAction('SET_PRACTICE_TIME_LEFT')
