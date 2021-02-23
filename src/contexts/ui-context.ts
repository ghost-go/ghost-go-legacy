import React from "react";

interface UIContextTypes {
  sidebarCollapsed: boolean;
  signInModalVisible: boolean;
  signUpModalVisible: boolean;
  setSignInModalVisible: (value: boolean) => void;
  setSignUpModalVisible: (value: boolean) => void;
  setSidebarCollapsed: (value: boolean) => void;
}

const UIContext = React.createContext<UIContextTypes>({
  sidebarCollapsed: false,
  signInModalVisible: false,
  signUpModalVisible: false,
  setSignInModalVisible: (value: boolean) => {},
  setSignUpModalVisible: (value: boolean) => {},
  setSidebarCollapsed: (value: boolean) => {},
});

export default UIContext;
