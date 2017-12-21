import { createAction } from 'redux-actions';
import URI from 'urijs';
import * as config from '../constants/Config';

function buildPostData(name = '', api = '') {
  const postDataRequest = createAction(`POST_${name}_REQUEST`);
  const postDataSuccess = createAction(`POST_${name}_SUCCESS`);
  const postDataFailure = createAction(`POST_${name}_FAILURE`);

  return params => (dispatch) => {
    dispatch(postDataRequest(params));
    const url = URI(`${config.API_DOMAIN}/${config.API_VERSION}/${api}`);

    return fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    }).then(res => res.json())
      .then(data => dispatch(postDataSuccess({ data })))
      .catch(ex => dispatch(postDataFailure(ex)));
  };
}

export const postPuzzleRecord = buildPostData('PUZZLE_RECORD', 'puzzle_records');
export const postRating = buildPostData('RATING', 'ratings');
export const postFavorite = buildPostData('FAVORITE', 'likes');
export const postPractice = buildPostData('PRACTICE', 'practices');
export const postPracticeRecord = buildPostData('PRACTICE_RECORD', 'practice_records');
export const postPracticeTemplate = buildPostData('PRACTICE_TEMPLATE', 'practice_templates');
