import React, { useContext } from "react";

import BoardToolbar from "./BoardToolbar";
import SignInModal from "./modal/SignInModal";
import SignUpModal from "./modal/SignUpModal";

import { Button, Row, Col } from "antd";

import Avatar from "react-avatar";
import { Menu, Dropdown } from "antd";

const Navigation = () => {
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
    <div id="page-header">
      <Row>
        <Col flex="auto">{/* <BoardToolbar /> */}</Col>
        <Col flex="100px" style={{ textAlign: "right" }}>
          {/* {signinUser ? ( */}
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
        </Col>
      </Row>
      {/* <SignInModal />
      <SignUpModal /> */}
    </div>
  );
};
export default Navigation;
