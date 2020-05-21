import React from "react";
import { SigninUserTypes } from "../common/types";

interface AuthContextTypes {
  token: string | null;
  signinUser: SigninUserTypes | null;
  setToken: (token: string | null) => void;
  setSigninUser: (user: SigninUserTypes) => void;
  logout: () => void;
}

const AuthContext = React.createContext<AuthContextTypes>({
  token: null,
  signinUser: null,
  setToken: (string: string | null) => {},
  setSigninUser: (user: SigninUserTypes) => {},
  logout: () => {},
});

export default AuthContext;
