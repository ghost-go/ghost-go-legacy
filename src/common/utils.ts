import gql from "graphql-tag";
import _ from "lodash";
import { cache } from "./ApolloClient";

const GET_SETTINGS = gql`
  {
    settings @client
  }
`;

interface SettingVars {
  name: string;
  value: any;
}

const GET_MOVES = gql`
  {
    moves @client
  }
`;

export const updateSettings = (obj: Array<SettingVars>) => {
  const query: any = cache.readQuery({ query: GET_SETTINGS });
  const settings = _.cloneDeep(query.settings);
  obj.forEach((i: { name: string; value: any }) => {
    if (i.name in settings) {
      settings[i.name] = i.value;
    } else {
      console.error(`key '${i.name}' not in the settings object`);
    }
  });
  cache.writeQuery({
    query: GET_SETTINGS,
    data: { settings },
  });
};

export const addMoves = (moves: Array<string>) => {
  const query: any = cache.readQuery({ query: GET_MOVES });
  const res = query.moves.concat(moves);
  cache.writeQuery({
    query: GET_MOVES,
    data: { moves: res },
  });
  return res;
};

export const clearMoves = () => {
  cache.writeQuery({
    query: GET_MOVES,
    data: { moves: [] },
  });
};
