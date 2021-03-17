import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "slices";
import { Theme } from "gboard/GBan";

interface UIState {
  problemFilterVisible: boolean;
  kifuFilterVisible: boolean;
  theme: Theme;
}

const initialState: UIState = {
  problemFilterVisible: false,
  kifuFilterVisible: true,
  theme: Theme.Flat,
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleProblemFilterVisible: (state) => {
      state.problemFilterVisible = !state.problemFilterVisible;
    },
    openProblemFilterVisible: (state) => {
      state.problemFilterVisible = true;
    },
    closeProblemFilterVisible: (state) => {
      state.problemFilterVisible = false;
    },
    toggleKifuFilterVisible: (state) => {
      state.kifuFilterVisible = !state.kifuFilterVisible;
    },
    openKifuFilterVisible: (state) => {
      state.kifuFilterVisible = true;
    },
    closeKifuFilterVisible: (state) => {
      state.kifuFilterVisible = false;
    },
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
  },
});

export const {
  toggleProblemFilterVisible,
  openProblemFilterVisible,
  closeProblemFilterVisible,
  toggleKifuFilterVisible,
  openKifuFilterVisible,
  closeKifuFilterVisible,
  setTheme,
} = uiSlice.actions;

export const selectUI = (state: RootState) => state.ui;

export default uiSlice;
