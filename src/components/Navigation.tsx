import React, { useContext } from "react";

import BoardToolbar from "./BoardToolbar";
import SignInModal from "./modal/SignInModal";
import SignUpModal from "./modal/SignUpModal";

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
  selectUI,
} from "slices";
import { useDispatch, useTypedSelector } from "utils";

const Navigation = () => {
  const dispatch = useDispatch();
  const ui = useTypedSelector((state) => selectUI(state));
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

  return (
    <div className="flex flex-row justify-between">
      <div>&nbsp;</div>
      <div>&nbsp;</div>
      <div className="flex flex-row items-center">
        <div className="relative">
          <div
            className={`transition absolute cursor-pointer p-4
            bg-white z-50 top-6 right-8 shadow-lg rounded-sm w-36 text-base
            ${ui.settingMenuVisible ? "flex" : "opacity-0 pointer-events-none"}
          `}>
            <div
              className="origin-top-right absolute right-0 mt-1 p-2 w-64 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="options-menu">
              <div className="p-1">THEMES:</div>
              <div className="grid grid-cols-2" role="none">
                <span
                  className={`menu-item-theme ${
                    ui.theme === "Black&White" && "active"
                  }`}
                  role="menuitem">
                  Black&White
                </span>
                <span
                  className={`menu-item-theme ${
                    ui.theme === "Subdued" && "active"
                  }
                `}
                  role="menuitem">
                  Subdued
                </span>
                <span className="menu-item-theme" role="menuitem">
                  Shell
                </span>
                <span className="menu-item-theme" role="menuitem">
                  Walnet
                </span>
                <span className="menu-item-theme" role="menuitem">
                  Photorealistic
                </span>
              </div>
            </div>
          </div>
          <ReactSVG
            className="w-7 h-7 mr-4 cursor-pointer"
            src={settings}
            onClick={() => {
              dispatch(toggleSettingMenu());
            }}
          />
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
