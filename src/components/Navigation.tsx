import { useRef } from "react";

import { Button, Row, Col } from "antd";

import Avatar from "react-avatar";
import { Menu, Dropdown } from "antd";
import { ReactSVG } from "react-svg";
import settings from "assets/images/settings.svg";

import {
  toggleSettingMenu,
  closeSettingMenu,
  toggleUserMenu,
  closeUserMenu,
  setTheme,
  selectUI,
} from "slices";
import { useDispatch, useTypedSelector, useOutsideClick } from "utils";
import { Theme } from "gboard/GBan";

const Navigation = () => {
  const dispatch = useDispatch();
  const ref = useRef<HTMLDivElement>(null);
  const { settingMenuVisible, theme } = useTypedSelector((state) =>
    selectUI(state)
  );

  useOutsideClick(ref, () => {
    if (settingMenuVisible) {
      dispatch(closeSettingMenu());
    }
  });

  const menu = (
    <Menu>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="/dashboard">
          Dashboard
        </a>
      </Menu.Item>
      <Menu.Item>
        <span
          onClick={() => {
            // logout();
          }}>
          Logout
        </span>
      </Menu.Item>
    </Menu>
  );

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
            ${settingMenuVisible ? "flex" : "opacity-0 pointer-events-none"}
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
            </div>
          </div>
          <div
            onClick={() => {
              dispatch(toggleSettingMenu());
            }}>
            <ReactSVG className="w-7 h-7 mr-4 cursor-pointer" src={settings} />
          </div>
        </div>
        {/* <div
              className="origin-top-right absolute right-0 mt-1 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="options-menu">
              <div className="py-1" role="none">
                <span
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  role="menuitem">
                  Themes:
                </span>
                <span
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  role="menuitem">
                  Black&White
                </span>
                <span
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  role="menuitem">
                  License
                </span>
                <form method="POST" action="#" role="none">
                  <button
                    type="submit"
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    role="menuitem">
                    Sign out
                  </button>
                </form>
              </div> */}
        {true ? (
          <div className="user-profile dropdown login">
            <Dropdown overlay={menu}>
              <div
                className="ant-dropdown-link"
                onClick={(e) => e.preventDefault()}>
                <Avatar
                  name={"BAI"}
                  size="40"
                  round
                  color={"#000000"}
                  maxInitials={2}
                />
              </div>
            </Dropdown>
          </div>
        ) : (
          <div className="user-profile dropdown login">
            <Button
              onClick={() => {}}
              className="signin clearfix"
              type="primary">
              Sign up
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
export default Navigation;
