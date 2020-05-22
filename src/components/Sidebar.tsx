import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { Layout, Menu } from "antd";
import {
  BookOutlined,
  ReadOutlined,
  HeartOutlined,
  DashboardOutlined,
  HistoryOutlined,
} from "@ant-design/icons";
import styled from "styled-components";

import UIContext from "../contexts/ui-context";
import AuthContext from "../contexts/auth-context";

const { Sider } = Layout;
// const { SubMenu } = Menu;

const Divider = styled.div`
  display: inline-block;
  margin: 20px 0px 20px 10px;
  font-size: 12px;
  opacity: 0.3;

  &.collapsed {
    width: 100%;
    font-size: 10px;
    text-align: center;
    margin: 20px 0px 10px 0px;
    transition: font-size 0.3s ease-in-out;
  }
`;

const Logo = styled.div`
  padding: 20px;
  color: #fff;

  &.collapsed {
    transition: all 0.3s ease-in-out;
    padding: 10px;
  }
`;

const routeKeyMap: any = {
  "/dashboard": "dashboard",
  "/": "problems",
  "/problems": "problems",
  "/kifus": "kifus",
};

const Sidebar = () => {
  const { sidebarCollapsed, setSidebarCollapsed } = useContext(UIContext);
  const { signinUser } = useContext(AuthContext);

  return (
    <Sider
      collapsible
      width={200}
      // collapsedWidth={60}
      collapsed={sidebarCollapsed}
      onCollapse={setSidebarCollapsed.bind(null, !sidebarCollapsed)}
    >
      <Logo className={sidebarCollapsed ? "collapsed" : ""}>GhostGo</Logo>
      <Menu
        theme="dark"
        defaultSelectedKeys={[routeKeyMap[window.location.pathname]]}
        mode="inline"
      >
        {signinUser && (
          <Divider className={sidebarCollapsed ? "collapsed" : ""}>
            DASHBOARD
          </Divider>
        )}
        {signinUser && (
          <Menu.Item key="dashboard">
            <NavLink to="/dashboard">
              <DashboardOutlined />
              <span>Dashboard</span>
            </NavLink>
          </Menu.Item>
        )}
        <Divider className={sidebarCollapsed ? "collapsed" : ""}>
          RESOURCES
        </Divider>
        <Menu.Item key="problems">
          <NavLink to="/problems">
            <ReadOutlined />
            <span>Problems</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="kifus">
          <NavLink to="/kifus">
            <BookOutlined />
            <span>Kifus</span>
          </NavLink>
        </Menu.Item>
        {signinUser && (
          <Divider className={sidebarCollapsed ? "collapsed" : ""}>
            OTHERS
          </Divider>
        )}
        {signinUser && (
          <Menu.Item key="favorites">
            <NavLink to="/favorites">
              <HeartOutlined />
              <span>Favorites</span>
            </NavLink>
          </Menu.Item>
        )}
        {signinUser && (
          <Menu.Item key="records">
            <NavLink to="/records">
              <HistoryOutlined />
              <span>Records</span>
            </NavLink>
          </Menu.Item>
        )}
      </Menu>
    </Sider>
  );
};

export default Sidebar;
