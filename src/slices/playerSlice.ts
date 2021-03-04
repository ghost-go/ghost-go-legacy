import { RootState } from "slices";
import { buildGenericReducer } from "../utils/reducers";

export const {
  asyncThunk: fetchPlayers,
  slice: playersSlice,
} = buildGenericReducer<any>("players/fetchPlayers", "/players");

export const selectPlayers = (state: RootState) => state.players;
