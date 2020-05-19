import React, { useState, useEffect } from "react";
import _ from "lodash";
import { NavLink } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import { Layout, Menu, Breadcrumb } from "antd";
import {
  BookOutlined,
  ReadOutlined,
  DashboardOutlined,
} from "@ant-design/icons";

import { authData } from "../common/types";
import { updateUi } from "../common/utils";

const { Sider } = Layout;
const { SubMenu } = Menu;

const routeKeyMap : any = {
  "/dashboard": "dashboard",
  "/problems": "problems",
  "/kifus": "kifus",
}

const GET_SIDEBAR_INFO = gql`
  {
    ui @client
    settings @client
    auth @client
  }
`;

const Sidebar = () => {
  const { data } = useQuery(GET_SIDEBAR_INFO);

  const [settings, setSettings] = useState();
  const [ui, setUi] = useState({
    collapsed: false,
  });

  const [auth, setAuth]: [authData, any] = useState({
    signinUser: null,
  });

  useEffect(() => {
    if (!data) return;
    setSettings(data.settings);
    setUi(data.ui);
    setAuth(data.auth);
  }, [data]);

  return (
    <Sider
      collapsible
      width={200}
      // collapsedWidth={60}
      collapsed={ui.collapsed}
      onCollapse={() => {
        updateUi({ collapsed: !ui.collapsed });
      }}
    >
      <div className="logo">GhostGo</div>
      <Menu
        theme="dark"
        defaultSelectedKeys={[routeKeyMap[window.location.pathname]]}
        mode="inline"
      >
        {auth.signinUser ? (
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

// const Sidebar = () => {
//   const { data } = useQuery(GET_SIDEBAR_INFO);

//   const [settings, setSettings] = useState({});
//   const [ui, setUi] = useState({});
//   const [auth, setAuth]: [authData, any] = useState({
//     signinUser: null,
//   });

//   useEffect(() => {
//     if (!data) return;
//     setSettings(data.settings);
//     setUi(data.ui);
//     setAuth(data.auth);
//   }, [data]);

//   return (
//     <div
//       style={{ marginLeft: "0px" }}
//       id="page-sidebar"
//       className="rm-transition"
//     >
//       <div id="sidebar-menu">
//         <ul className="sf-js-enabled sf-arrows">
//           {auth.signinUser ? (
//             <div>
//               <div className="divider-header">Dashboard</div>
//               <li>
//                 <NavLink activeClassName="active" to="/dashboard">
//                   <i className="fa fa-tachometer" /> <span>Dashboard</span>
//                 </NavLink>
//               </li>
//               <li className="divider" />
//             </div>
//           ) : null}
//           <div className="divider-header">Resources</div>
//           <li>
//             <NavLink activeClassName="active" to="/problems">
//               <i className="fa fa-puzzle-piece" /> <span>Problem Library</span>
//             </NavLink>
//           </li>
//           <li>
//             <NavLink activeClassName="active" to="/kifus">
//               <i className="fa fa-book" /> <span>Kifu Library</span>
//             </NavLink>
//           </li>
//           {auth.signinUser ? (
//             <div>
//               <li>
//                 <NavLink activeClassName="active" to="/favorites">
//                   <i className="fa fa-heart" />
//                   <span>Favorites</span>
//                 </NavLink>
//               </li>
//               <li className="divider" />
//               <div className="divider-header">Others</div>
//               <li>
//                 <NavLink activeClassName="active" to="/records">
//                   <i className="fa fa-history" /> <span>Records</span>
//                 </NavLink>
//               </li>
//             </div>
//           ) : null}
//         </ul>
//       </div>
//     </div>
//   );
// };

export default Sidebar;
