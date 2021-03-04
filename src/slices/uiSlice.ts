import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "slices";

interface UIState {
  problemFilterVisible: boolean;
  kifuFilterVisible: boolean;
}

const initialState: UIState = {
  problemFilterVisible: false,
  kifuFilterVisible: false,
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
  },
});

export const {
  toggleProblemFilterVisible,
  openProblemFilterVisible,
  closeProblemFilterVisible,
  toggleKifuFilterVisible,
  openKifuFilterVisible,
  closeKifuFilterVisible,
} = uiSlice.actions;

export const selectUI = (state: RootState) => state.ui;

export default uiSlice;
