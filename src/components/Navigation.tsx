import React, { useState, useEffect } from "react";
import _ from "lodash";
import { Link } from "react-router-dom";

import BoardToolbar from "./BoardToolbar";
import SignInModal from "./modal/SignInModal";

import { Button } from "antd";
import "antd/dist/antd.css";
import { updateUi } from "../common/utils";
import { gql, useQuery } from "@apollo/client";

import Avatar from "react-avatar";
import { Menu, Dropdown } from "antd";
import { authData } from "../common/types";

const GET_NAV_INFO = gql`
  {
    ui @client
    settings @client
    auth @client
  }
`;

const Navigation = () => {
  const { data } = useQuery(GET_NAV_INFO);

  const [settings, setSettings] = useState({});
  const [ui, setUi] = useState({});
  const [auth, setAuth]: [authData, any] = useState({
    signinUser: null,
  });

  useEffect(() => {
    if (!data) return;
    setSettings(data.settings);
    setUi(data.ui);
    setAuth(data.auth);
    console.log("auth", data.auth);
  }, [data]);

  const menu = (
    <Menu>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="/dashboard">
          Dashboard
        </a>
      </Menu.Item>
      <Menu.Item>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="http://www.taobao.com/"
        >
          Logout
        </a>
      </Menu.Item>
    </Menu>
  );

  return (
    <div id="page-header">
      <div id="sidebar-search" />
      <div className="theme">
        <BoardToolbar />
      </div>
      {auth.signinUser ? (
        <div className="user-profile dropdown login">
          <Dropdown overlay={menu}>
            <div
              className="ant-dropdown-link"
              onClick={(e) => e.preventDefault()}
            >
              <Avatar name={auth.signinUser!.user.name} size="40" round />
            </div>
          </Dropdown>
        </div>
      ) : (
        <div className="user-profile dropdown login">
          <Button
            onClick={() => {
              updateUi({ signInModalVisible: true });
            }}
            className="signin clearfix"
            type="primary"
          >
            Sign in
          </Button>
        </div>
      )}
      <SignInModal></SignInModal>
    </div>
  );
};
export default Navigation;
