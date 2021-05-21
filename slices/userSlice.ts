import { RootState } from "slices";
import { buildGenericReducer, JsonApiResponseType } from "utils/reducers";

export const { asyncThunk: fetchUser, slice: userSlice } =
  buildGenericReducer<any>({
    name: "users/fetchUser",
    endpoint: "/users/:id",
  });

export const { asyncThunk: updateUser, slice: updatedUserSlice } =
  buildGenericReducer<any>({
    name: "users/updateUser",
    endpoint: "/users/:id",
    method: "PUT",
    options: {
      errorCentralized: true,
    },
  });

export const selectUser = (state: RootState) => state.user;
