import { RootState } from "slices";
import { buildGenericReducer, JsonApiResponseType } from "utils/reducers";

export const {
  asyncThunk: fetchProfile,
  slice: profileSlice,
} = buildGenericReducer<JsonApiResponseType>({
  name: "fetchProfile",
  endpoint: "/profile",
});

export const {
  asyncThunk: fetchUser,
  slice: userSlice,
} = buildGenericReducer<any>({
  name: "users/fetchUser",
  endpoint: "/users/:id",
});

export const {
  asyncThunk: updateUser,
  slice: updatedUserSlice,
} = buildGenericReducer<any>({
  name: "users/updateUser",
  endpoint: "/users/:id",
  method: "PUT",
  errorCentralized: true,
});

export const selectUser = (state: RootState) => state.user;
