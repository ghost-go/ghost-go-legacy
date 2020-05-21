import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { Layout, Menu } from "antd";
import {
  BookOutlined,
  ReadOutlined,
  DashboardOutlined,
} from "@ant-design/icons";

import UIContext from "../contexts/ui-context";
import AuthContext from "../contexts/auth-context";

const { Sider } = Layout;
// const { SubMenu } = Menu;

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
      <div className="logo">GhostGo</div>
      <Menu
        theme="dark"
        defaultSelectedKeys={[routeKeyMap[window.location.pathname]]}
        mode="inline"
      >
        {signinUser ? (
          <Menu.Item key="dashboard">
            <NavLink to="/dashboard">
              <DashboardOutlined />
              <span>Dashboard</span>
            </NavLink>
          </Menu.Item>
        ) : null}
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
      </Menu>
    </Sider>
  );
};

export default Sidebar;
