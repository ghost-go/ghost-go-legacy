import { createAction } from "redux-actions";
import URI from "urijs";
import * as config from "../common/Config";

function buildFetchData(name = "", api = "") {
  const fetchDataRequest = createAction(`FETCH_${name}_REQUEST`);
  const fetchDataSuccess = createAction(`FETCH_${name}_SUCCESS`);
  const fetchDataFailure = createAction(`FETCH_${name}_FAILURE`);

  return (params) => (dispatch) => {
    dispatch(fetchDataRequest(params));
    let url = URI(`${config.API_DOMAIN}/${config.API_VERSION}/${api}`);
    const templates = api.match(/:[A-Za-z0-9]*/g);
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
      .then((res) => res.json())
      .then((data) => dispatch(fetchDataSuccess({ data })))
      .catch((ex) => dispatch(fetchDataFailure(ex)));
  };
}

export const fetchPuzzleRecords = buildFetchData(
  "PUZZLE_RECORDS",
  "puzzle_records"
);
export const fetchDashboard = buildFetchData("DASHBOARD", "dashboard");
export const fetchPuzzle = buildFetchData("PUZZLE", "puzzles/:id");
export const fetchFavorites = buildFetchData("FAVORITES", "favorites");
