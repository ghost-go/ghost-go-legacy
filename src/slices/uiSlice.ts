import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "slices";
import { Theme } from "gboard/GBan";

interface UIState {
  theme: Theme;
  coordinates: boolean;
  answer: any;
  answerMove: number;
}

const initialState: UIState = {
  theme: Theme.Flat,
  coordinates: false,
  answer: undefined,
  answerMove: 0,
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
    setAnswerMove: (state, action) => {
      state.answerMove = action.payload;
    },
    setAnswer: (state, action) => {
      state.answer = action.payload;
    },
    resetAnswer: (state) => {
      state.answer = initialState.answer;
    },
    resetAnswerMove: (state) => {
      state.answerMove = initialState.answerMove;
    },
  },
});

export const { setTheme, setCoordinates } = uiSlice.actions;

export const selectUI = (state: RootState) => state.ui;

export default uiSlice;
