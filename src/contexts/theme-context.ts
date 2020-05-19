import React from "react";

const ThemeContext = React.createContext({
  themes: [
    "black-and-white",
    "subdued-theme",
    "photorealistic-theme",
    "shell-stone",
    "walnut-theme",
    "flat-theme",
  ],
  theme: localStorage.getItem("theme") || "subdued-theme",
  changeTheme: (theme: string) => {},
});

export default ThemeContext;
