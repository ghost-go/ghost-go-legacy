import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "slices";

interface UIState {
  problemFilterVisible: boolean;
  problemFilterLevel: string | null;
  problemFilterTags: string[];
}

const initialState: UIState = {
  problemFilterVisible: false,
  problemFilterLevel: null,
  problemFilterTags: [],
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
    setProblemFilterTags: (state, action) => {
      state.problemFilterTags = action.payload;
    },
    setProblemFilterLevel: (state, action) => {
      state.problemFilterLevel = action.payload;
    },
  },
});

export const {
  toggleProblemFilterVisible,
  openProblemFilterVisible,
  closeProblemFilterVisible,
  setProblemFilterTags,
  setProblemFilterLevel,
} = uiSlice.actions;

export const selectUI = (state: RootState) => state.ui;

export default uiSlice;
