import { RootState } from "slices";
import { buildGenericReducer } from "../utils/reducers";

export const {
  asyncThunk: fetchPlayers,
  slice: playersSlice,
} = buildGenericReducer<any>({
  name: "players/fetchPlayers",
  endpoint: "/players",
});

export const selectPlayers = (state: RootState) => state.players;
