import React, { Suspense, useState, useContext, useEffect } from "react";
import { Provider } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  useLocation,
} from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { QueryParamProvider } from "use-query-params";
import { Helmet } from "react-helmet";
import { BackTop, Spin } from "antd";

import Navigation from "./components/Navigation";
import Problems from "./pages/Problems";
import Problem from "./pages/Problem";
import Kifus from "./pages/Kifus";
import Kifu from "./pages/Kifu";
// import Dashboard from "./pages/Dashboard";
// import RecentRecords from "./pages/RecentRecords";
// import MostWrongRecords from "./pages/MostWrongRecords";
// import { a1ToSGF } from './common/Helper';

import { SidebarItem } from "./components/common";

import "./App.less";
import logo from "assets/images/logo.png";
import { store, persistor } from "utils";

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
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <QueryParamProvider ReactRouterRoute={Route}>
            <Helmet
              htmlAttributes={{ lang: "en", amp: undefined }}
              title="A modern website to learn Go,Weiqi,Baduk - beta"
              titleTemplate="GhostGo - %s"
            />
            <div className="flex flex-row">
              <div className="lg:flex flex-col lg:flex-row lg:min-h-screen w-full">
                <div className="flex flex-col w-full lg:w-64 text-gray-700 bg-white flex-shrink-0">
                  <div className="flex-shrink-0 lg:px-5 flex flex-row items-center px-3 py-5">
                    <img
                      className="w-8 h-8 lg:w-10 lg:h-10"
                      src={logo}
                      alt="logo"
                    />
                    <a
                      href="/"
                      className="ml-2 text-2xl font-semibold tracking-wider text-gray-900 rounded-sm focus:outline-none focus:shadow-outline">
                      GhostGo
                    </a>
                  </div>
                  <nav className="flex-grow lg:block lg:px-4 lg:pb-0 lg:overflow-y-auto hidden">
                    <div className="block px-1 py-1 mt-1 text-sm font-semibold text-gray-400">
                      RESOURCES
                    </div>
                    <SidebarItem to="/problems">Problems</SidebarItem>
                    <SidebarItem to="/kifus">Kifus</SidebarItem>
                  </nav>
                </div>
                <div className="flex-1">
                  <BackTop />
                  <div className={"lg:block lg:py-4 lg:px-4 hidden"}>
                    <Navigation />
                  </div>
                  <Route
                    exact
                    path="/"
                    component={() => <Redirect to="/problems" />}
                  />
                  <Route exact path="/" component={Problems} />
                  <Suspense fallback={<Spin />}>
                    {/* <Route exact path="/puzzles" component={Problems} /> */}
                    <Route exact path="/problems" component={Problems} />
                    <Route exact path="/kifus" component={Kifus} />
                    <Route path="/kifus/:id" component={Kifu} />
                    <Route path="/problems/:id" component={Problem} />
                    {/*<Route path="/puzzles/:id" component={Problem} />
                  <Route path="/recents" component={RecentRecords} />
                  <Route path="/mostwrongs" component={MostWrongRecords} />
                  <Route path="/dashboard" component={Dashboard} /> */}
                  </Suspense>
                  {/* <Footer style={{ textAlign: "center" }}>
                    Copyright © 2020 GhostGo. All rights reserved.
                  </Footer> */}
                </div>
              </div>
            </div>
          </QueryParamProvider>
        </Router>
      </PersistGate>
    </Provider>
  );
};

export default App;
