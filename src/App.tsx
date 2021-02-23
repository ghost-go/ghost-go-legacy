import React, { Suspense, useState, useContext, useEffect } from "react";
import { Provider } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Link,
} from "react-router-dom";
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { Helmet } from "react-helmet";
import { Layout, BackTop, Spin, Image } from "antd";

import Navigation from "./components/Navigation";
import Problems from "./pages/Problems";
import Problem from "./pages/Problem";
import Kifus from "./pages/Kifus";
import Kifu from "./pages/Kifu";
import Dashboard from "./pages/Dashboard";
import RecentRecords from "./pages/RecentRecords";
import MostWrongRecords from "./pages/MostWrongRecords";
// import { a1ToSGF } from './common/Helper';

import { SidebarItem } from "./components";

import "./App.less";
import logo from "assets/images/logo.png";
import { store } from "utils";

const App = () => {
  // useEffect(() => {
  //   if (token) localStorage.setItem("token", token);
  // }, [token]);

  // const logout = async () => {
  //   setSigninUser(null);
  //   setToken(null);
  //   const url = "/api/logout";
  //   await fetch(url, { method: "POST", credentials: "include" });
  //   localStorage.setItem("logout", Date.now().toString());
  //   localStorage.removeItem("token");
  //   localStorage.removeItem("signinUser");
  // };

  // const syncLogout = (event: any) => {
  //   if (event.key === "logout") {
  //     localStorage.removeItem("token");
  //     localStorage.removeItem("signinUser");
  //     setToken(null);
  //     setSigninUser(null);
  //   }
  // };

  // useEffect(() => {
  //   window.addEventListener("storage", syncLogout);
  // }, []);

  return (
    <Provider store={store}>
      <Router>
        <Helmet
          htmlAttributes={{ lang: "en", amp: undefined }}
          title="A modern website to learn Go,Weiqi,Baduk - beta"
          titleTemplate="GhostGo - %s"
        />
        <div className="flex flex-row">
          <div className="md:flex flex-col md:flex-row md:min-h-screen w-full">
            <div className="flex flex-col w-full md:w-64 text-gray-700 bg-white dark-mode:text-gray-200 dark-mode:bg-gray-800 flex-shrink-0">
              <div className="flex-shrink-0 px-6 py-5 flex flex-row items-center">
                <img width={40} height={40} src={logo} alt="logo" />
                <a
                  href="/"
                  className="ml-2 text-2xl font-semibold tracking-wider text-gray-900 rounded-sm dark-mode:text-white focus:outline-none focus:shadow-outline">
                  GhostGo
                </a>
                {/* <button className="rounded-sm md:hidden rounded-sm focus:outline-none focus:shadow-outline">
                        <svg
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          className="w-6 h-6">
                          <path
                            fillRule="evenodd"
                            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
                            clipRule="evenodd"></path>
                          <path
                            fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"></path>
                        </svg>
                      </button> */}
              </div>
              <nav className="flex-grow md:block px-4 pb-4 md:pb-0 md:overflow-y-auto">
                <div className="block px-1 py-1 mt-1 text-sm font-semibold text-gray-400 dark-mode:bg-gray-700 dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline">
                  RESOURCES
                </div>
                <SidebarItem to="/problems" active={true}>
                  Problems
                </SidebarItem>
                <SidebarItem to="/kifus">Kifus</SidebarItem>
              </nav>
            </div>
            <div className="flex-1">
              <BackTop />
              <div className={"py-4 px-4"}>
                <Navigation />
              </div>
              <Route
                exact
                path="/"
                component={() => <Redirect to="/problems" />}
              />
              <Route exact path="/" component={Problems} />
              <Suspense fallback={<Spin />}>
                <Route exact path="/puzzles" component={Problems} />
                <Route exact path="/problems" component={Problems} />
                <Route exact path="/kifus" component={Kifus} />
                <Route path="/kifus/:id" component={Kifu} />
                <Route path="/problems/:id" component={Problem} />
                <Route path="/puzzles/:id" component={Problem} />
                <Route path="/recents" component={RecentRecords} />
                <Route path="/mostwrongs" component={MostWrongRecords} />
                <Route path="/dashboard" component={Dashboard} />
              </Suspense>
              {/* <Footer style={{ textAlign: "center" }}>
                    Copyright © 2020 GhostGo. All rights reserved.
                  </Footer> */}
            </div>
          </div>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
