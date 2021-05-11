import React, { Suspense, useState, useContext, useEffect } from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import ReactModal from "react-modal";
import { PersistGate } from "redux-persist/integration/react";
import { QueryParamProvider } from "use-query-params";
import { Helmet } from "react-helmet";
import { BackTop, Spin } from "antd";

import Problems from "./pages/Problems";
import Problem from "./pages/Problem";
import Kifus from "./pages/Kifus";
import Kifu from "./pages/Kifu";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Viewed from "./pages/Viewed";
// import RecentRecords from "./pages/RecentRecords";
// import MostWrongRecords from "./pages/MostWrongRecords";
// import { a1ToSGF } from './common/Helper';

import Navigation from "components/Navigation";
import { store, persistor } from "utils";
import SignInModal from "components/modal/SignInModal";
import SignUpModal from "components/modal/SignUpModal";
import Sidebar from "components/Sidebar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ReactModal.setAppElement("body");

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
              title="Interactive Go Problem/Kifu Database"
              titleTemplate="GhostGo - %s"
            />
            <ToastContainer />
            <SignInModal />
            <SignUpModal />
            <div className="flex flex-row">
              <div className="lg:flex flex-col lg:flex-row lg:min-h-screen w-full">
                <Sidebar />
                <div className="flex-1">
                  <div className={"lg:block lg:py-4 lg:px-4 hidden bg-white"}>
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
                    <Route path="/statistics" component={Dashboard} />
                    <Route path="/profile" component={Profile} />
                    <Route path="/viewed" component={Viewed} />
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
