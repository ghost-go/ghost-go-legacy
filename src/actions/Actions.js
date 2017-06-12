import { createAction } from 'redux-actions';

export const setPuzzleFilter = createAction('SET_PUZZLE_FILTER');
export const setKifuFilter = createAction('SET_KIFU_FILTER');
export const setRangeFilter = createAction('SET_RANGE_FILTER');
export const setTagFilter = createAction('SET_TAG_FILTER');
export const setDateRangeFilter = createAction('SET_DATE_RANGE_FILTER');
export const setUserRangeFilter = createAction('SET_USER_RANGE_FILTER');
export const setRecordTypeFilter = createAction('SET_RECORD_TYPE_FILTER');

export const setPracticePuzzleId = createAction('SET_PRACTICE_PUZZLE_ID');

export const setPracticeLife = createAction('SET_PRACTICE_LIFE');
export const setPracticeTimeLeft = createAction('SET_PRACTICE_TIME_LEFT');

export const addSteps = createAction('ADD_STEPS');
export const resetSteps = createAction('RESET_STEPS');
export const setCurrentAnswerId = createAction('SET_CURRENT_ANSWER_ID');
export const setCurrentMode = createAction('SET_CURRENT_MODE');
export const setTheme = createAction('SET_THEME');
export const setNextStoneType = createAction('SET_NEXT_STONE_TYPE_FILTER');
export const setToolbarHidden = createAction('SET_TOOLBAR_HIDDEN');
export const setBoardStates = createAction('SET_BOARD_STATES');
