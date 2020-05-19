import React, { useState, useEffect } from "react";

import BoardToolbar from "./BoardToolbar";
import SignInModal from "./modal/SignInModal";

import { Button, Row, Col } from "antd";
import { gql, useQuery } from "@apollo/client";

import Avatar from "react-avatar";
import { Menu, Dropdown } from "antd";
import { authData } from "../common/types";
import { updateUi } from "../common/utils";
import { logout } from "../common/Auth";

const GET_NAV_INFO = gql`
  {
    ui @client
    settings @client
    auth @client
  }
`;

const Navigation = () => {
  const { data } = useQuery(GET_NAV_INFO);

  // const [settings, setSettings] = useState({});
  // const [ui, setUi] = useState({});
  const [auth, setAuth]: [authData, any] = useState({
    signinUser: null,
  });

  useEffect(() => {
    if (!data) return;
    // setSettings(data.settings);
    // setUi(data.ui);
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
        <span
          onClick={() => {
            logout();
          }}
        >
          Logout
        </span>
      </Menu.Item>
    </Menu>
  );

  return (
    <div id="page-header">
      <Row>
        <Col flex="auto">
          <BoardToolbar />
        </Col>
        <Col flex="100px" style={{ textAlign: "right" }}>
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
        </Col>
      </Row>
      <SignInModal></SignInModal>
    </div>
  );
};
export default Navigation;
