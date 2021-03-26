import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "slices";
import { Theme } from "gboard/GBan";

interface UIState {
  theme: Theme;
  coordinates: boolean;
  answer: any;
}

const initialState: UIState = {
  theme: Theme.Flat,
  coordinates: false,
  answer: undefined,
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
    setCoordinates: (state, action) => {
      state.coordinates = action.payload;
    },
  },
});

export const { setTheme, setCoordinates } = uiSlice.actions;

export const selectUI = (state: RootState) => state.ui;

export default uiSlice;
