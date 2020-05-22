import React, { useContext } from "react";

import BoardToolbar from "./BoardToolbar";
import SignInModal from "./modal/SignInModal";

import { Button, Row, Col } from "antd";

import Avatar from "react-avatar";
import { Menu, Dropdown } from "antd";
import UIContext from "../contexts/ui-context";
import AuthContext from "../contexts/auth-context";

const Navigation = () => {
  const { signinUser, logout } = useContext(AuthContext);
  const { setSignInModalVisible } = useContext(UIContext);

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
          {signinUser ? (
            <div className="user-profile dropdown login">
              <Dropdown overlay={menu}>
                <div
                  className="ant-dropdown-link"
                  onClick={(e) => e.preventDefault()}
                >
                  <Avatar name={signinUser!.name} size="40" round />
                </div>
              </Dropdown>
            </div>
          ) : (
            <div className="user-profile dropdown login">
              <Button
                onClick={setSignInModalVisible.bind(null, true)}
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
