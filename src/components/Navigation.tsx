import { useRef, useState } from "react";

import { Button } from "semantic-ui-react";

import Avatar from "react-avatar";
import { ReactSVG } from "react-svg";
import settings from "assets/images/settings.svg";

import { setTheme, setCoordinates, selectUI, openSignInSlice } from "slices";
import { useDispatch, useTypedSelector, useOutsideClick } from "utils";
import { Theme } from "gboard/GBan";
import { Switch } from "components/common";

const Navigation = () => {
  const dispatch = useDispatch();
  const [settingVisible, setSettingVisible] = useState(false);
  const { theme, coordinates } = useTypedSelector((state) => selectUI(state));
  const ref = useRef<HTMLDivElement>(null);

  useOutsideClick(ref, () => {
    if (settingVisible) {
      setSettingVisible(false);
    }
  });

  const handleThemeChange = (theme: Theme) => {
    dispatch(setTheme(theme));
  };

  return (
    <div className="flex flex-row justify-between">
      <div>&nbsp;</div>
      <div>&nbsp;</div>
      <div className="flex flex-row items-center">
        <div className="relative">
          <div
            className={`transition absolute cursor-pointer p-4
            bg-white z-50 top-6 right-8 shadow-lg rounded-sm w-36 text-base
            ${settingVisible ? "flex" : "opacity-0 pointer-events-none"}
          `}>
            <div
              ref={ref}
              className="origin-top-right absolute right-0 p-2 w-72 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="options-menu">
              <div className="p-1 font-semibold">Theme:</div>
              <div className="grid grid-cols-2" role="none">
                <span
                  onClick={() => {
                    handleThemeChange(Theme.BlackAndWhite);
                  }}
                  className={`menu-item-theme ${
                    theme === Theme.BlackAndWhite && "active"
                  }`}
                  role="menuitem">
                  Black&White
                </span>
                <span
                  onClick={() => {
                    handleThemeChange(Theme.Flat);
                  }}
                  className={`menu-item-theme ${
                    theme === Theme.Flat && "active"
                  }`}
                  role="menuitem">
                  Flat
                </span>
                <span
                  onClick={() => {
                    handleThemeChange(Theme.Subdued);
                  }}
                  className={`menu-item-theme ${
                    theme === Theme.Subdued && "active"
                  }
                `}
                  role="menuitem">
                  Subdued
                </span>
                <span
                  onClick={() => {
                    handleThemeChange(Theme.ShellStone);
                  }}
                  className={`menu-item-theme ${
                    theme === Theme.ShellStone && "active"
                  }`}
                  role="menuitem">
                  Shell
                </span>
                <span
                  onClick={() => {
                    handleThemeChange(Theme.SlateAndShell);
                  }}
                  className={`menu-item-theme ${
                    theme === Theme.SlateAndShell && "active"
                  }`}
                  role="menuitem">
                  SlateAndShell
                </span>
                <span
                  onClick={() => {
                    handleThemeChange(Theme.Walnut);
                  }}
                  className={`menu-item-theme ${
                    theme === Theme.Walnut && "active"
                  }`}
                  role="menuitem">
                  Walnut
                </span>
                <span
                  onClick={() => {
                    handleThemeChange(Theme.Photorealistic);
                  }}
                  className={`menu-item-theme ${
                    theme === Theme.Photorealistic && "active"
                  }`}
                  role="menuitem">
                  Photorealistic
                </span>
              </div>
              <Switch
                label="Show Coordinates: "
                onClick={() => {
                  dispatch(setCoordinates(!coordinates));
                }}
                checked={coordinates}
              />
            </div>
          </div>
          <div
            onClick={() => {
              setSettingVisible(!settingVisible);
            }}>
            <ReactSVG className="w-7 h-7 mr-4 cursor-pointer" src={settings} />
          </div>
        </div>
        <div>
          <Button
            color="black"
            onClick={() => {
              dispatch(openSignInSlice.actions.toggle());
            }}>
            Sign In
          </Button>
        </div>
      </div>
    </div>
  );
};
export default Navigation;
