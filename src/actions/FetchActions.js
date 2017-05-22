import { createAction } from 'redux-actions';
import URI from 'urijs';
import * as config from '../constants/Config';

function buildFetchData(name = '', api = '') {
  const fetchDataRequest = createAction(`FETCH_${name}_REQUEST`);
  const fetchDataSuccess = createAction(`FETCH_${name}_SUCCESS`);
  const fetchDataFailure = createAction(`FETCH_${name}_FAILURE`);

  return params => (dispatch) => {
    dispatch(fetchDataRequest(params));
    let url = URI(`${config.API_DOMAIN}/${config.API_VERSION}/${api}`);
    const templates = api.match(/:.*/i);
    if (templates === null) {
      url = url.query(params);
    } else {
      templates.forEach((t) => {
        url = URI(url.toString().replace(t, params[t.match(/:(.*)/i)[1]]));
      });
      if (params.query !== undefined) {
        url = url.query(params.query);
      }
    }

    return fetch(url)
        .then(res => res.json())
        .then(data => dispatch(fetchDataSuccess({ data })))
        .catch(ex => dispatch(fetchDataFailure(ex)));
  };
}

export const fetchKifus = buildFetchData('KIFUS', 'kifus');
export const fetchPuzzles = buildFetchData('PUZZLES', 'puzzles');
export const fetchPuzzleRecords = buildFetchData('PUZZLE_RECORDS', 'puzzle_records');
export const fetchDashboard = buildFetchData('DASHBOARD', 'puzzle_records/dashboard');
export const fetchPractices = buildFetchData('PRACTICES', 'practices');
export const fetchPracticeTemplates = buildFetchData('PRACTICE_TEMPLATES', 'practice_templates');
export const fetchPracticeRecord = buildFetchData('PRACTICE_RECORD', 'practice_records/:id');

export const fetchKifu = buildFetchData('KIFU', 'kifus/:id');
export const fetchPuzzle = buildFetchData('PUZZLE', 'puzzles/:id');
export const fetchPuzzleNext = buildFetchData('PUZZLE_NEXT', 'puzzles/next');

export const fetchTopPlayers = buildFetchData('TOP_PLAYERS', 'players/top');
export const fetchPractice = buildFetchData('PRACTICE', 'practices/:id');
export const fetchPracticeTemplate = buildFetchData('PRACTICE_TEMPLATE', 'practice_templates/:id');

export const fetchTags = buildFetchData('TAGS', 'tags');
export const fetchFavorites = buildFetchData('FAVORITES', 'favorites');
