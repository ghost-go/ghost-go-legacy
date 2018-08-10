import { createAction } from 'redux-actions';
import URI from 'urijs';
import * as config from '../common/Config';

function buildPostData(name = '', api = '', version = config.API_VERSION) {
  const postDataRequest = createAction(`POST_${name}_REQUEST`);
  const postDataSuccess = createAction(`POST_${name}_SUCCESS`);
  const postDataFailure = createAction(`POST_${name}_FAILURE`);

  return params => (dispatch) => {
    dispatch(postDataRequest(params));
    const url = URI(`${config.API_DOMAIN}/${version}/${api}`);
    const headerV1 = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    const headerV2 = {
      Accept: 'application/vnd.api+json',
      'Content-Type': 'application/vnd.api+json',
    };

    return fetch(url, {
      method: 'POST',
      headers: version === 'v2' ? headerV2 : headerV1,
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
export const postGenmove = buildPostData('GEN_MOVE', 'genmove', 'v2');
