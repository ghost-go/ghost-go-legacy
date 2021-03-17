import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "slices";
import { Theme } from "gboard/GBan";

interface UIState {
  problemFilterVisible: boolean;
  kifuFilterVisible: boolean;
  settingMenuVisible: boolean;
  userMenuVisible: boolean;
  theme: Theme;
}

const initialState: UIState = {
  problemFilterVisible: false,
  kifuFilterVisible: true,
  settingMenuVisible: false,
  userMenuVisible: false,
  theme: Theme.Flat,
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleSettingMenu: (state) => {
      state.settingMenuVisible = !state.settingMenuVisible;
    },
    closeSettingMenu: (state) => {
      state.settingMenuVisible = false;
    },
    toggleUserMenu: (state) => {
      state.userMenuVisible = !state.userMenuVisible;
    },
    closeUserMenu: (state) => {
      state.userMenuVisible = false;
    },
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
  toggleSettingMenu,
  closeSettingMenu,
  toggleUserMenu,
  closeUserMenu,
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
