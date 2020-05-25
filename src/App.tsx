import React, { Suspense, useState, useContext, useEffect } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Layout, BackTop } from "antd";

import Navigation from "./components/Navigation";
import Sidebar from "./components/Sidebar";
import Problems from "./pages/Problems";
import Problem from "./pages/Problem";
import Kifus from "./pages/Kifus";
import Kifu from "./pages/Kifu";
import Dashboard from "./pages/Dashboard";
import History from "./pages/Records";
import Favorite from "./pages/Favorite";
// import { a1ToSGF } from './common/Helper';

import "./stylesheets/App.less";
import "./stylesheets/App.scss";
import ThemeContext from "./contexts/theme-context";
import AuthContext from "./contexts/auth-context";
import UIContext from "./contexts/ui-context";

import { SigninUserTypes } from "./common/types";
import { ApolloProvider } from "@apollo/client";
import { client } from "./common/Auth";
import { getSiginUser } from "./common/utils";

const { Header, Content, Footer } = Layout;

const App = () => {
  const themeContext = useContext(ThemeContext);
  const uiContext = useContext(UIContext);
  const [theme, setTheme] = useState(themeContext.theme);
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );
  const [signinUser, setSigninUser] = useState<SigninUserTypes | null>(
    getSiginUser()
  );
  const [signInModalVisible, setSignInModalVisible] = useState(
    uiContext.signInModalVisible
  );
  const [signUpModalVisible, setSignUpModalVisible] = useState(
    uiContext.signUpModalVisible
  );
  const [sidebarCollapsed, setSidebarCollapsed] = useState(
    uiContext.sidebarCollapsed
  );

  useEffect(() => {
    if (token) localStorage.setItem("token", token);
  }, [token]);

  const changeTheme = (e: any) => {
    localStorage.setItem("theme", e.key);
    setTheme(e.key);
  };

  const logout = async () => {
    setSigninUser(null);
    setToken(null);
    const url = "/api/logout";
    await fetch(url, { method: "POST", credentials: "include" });
    localStorage.setItem("logout", Date.now().toString());
    localStorage.removeItem("token");
    localStorage.removeItem("signinUser");
  };

  const syncLogout = (event: any) => {
    if (event.key === "logout") {
      localStorage.removeItem("token");
      localStorage.removeItem("signinUser");
      setToken(null);
      setSigninUser(null);
    }
  };

  useEffect(() => {
    window.addEventListener("storage", syncLogout);
  }, []);

  return (
    <UIContext.Provider
      value={{
        signInModalVisible,
        signUpModalVisible,
        sidebarCollapsed,
        setSignInModalVisible,
        setSignUpModalVisible,
        setSidebarCollapsed,
      }}
    >
      <AuthContext.Provider
        value={{
          token,
          signinUser,
          setToken,
          setSigninUser,
          logout,
        }}
      >
        <ThemeContext.Provider value={{ ...themeContext, theme, changeTheme }}>
          <ApolloProvider client={client}>
            <Router>
              <Helmet
                htmlAttributes={{ lang: "en", amp: undefined }}
                title="A modern website to learn Go,Weiqi,Baduk - beta"
                titleTemplate="GhostGo - %s"
              />
              <Layout style={{ minHeight: "100vh" }}>
                <BackTop />
                <Sidebar />
                <Layout className="site-layout">
                  <Header className="header">
                    <Navigation />
                  </Header>
                  <Content className="container">
                    <Route
                      exact
                      path="/"
                      component={() => <Redirect to="/problems" />}
                    />
                    <Route exact path="/" component={Problems} />
                    <Suspense
                      fallback={
                        <div className="loading">
                          <i className="fa fa-spinner fa-pulse fa-fw" />
                        </div>
                      }
                    >
                      <Route exact path="/puzzles" component={Problems} />
                      <Route exact path="/problems" component={Problems} />
                    </Suspense>
                    <Route exact path="/kifus" component={Kifus} />
                    <Route path="/kifus/:id" component={Kifu} />
                    <Route path="/problems/:id" component={Problem} />
                    <Route path="/puzzles/:id" component={Problem} />
                    <Route path="/records" component={History} />
                    <Route path="/dashboard" component={Dashboard} />
                    <Route path="/favorites" component={Favorite} />
                  </Content>
                  <Footer>
                    <div className="footer">
                      <span>Source Code:</span>
                      <a href="https://github.com/happybai/ghost-go">
                        https://github.com/happybai/ghost-go
                      </a>
                      &nbsp;&nbsp;&nbsp;
                      <a href="http://www.w3.org/html/logo/">
                        <img
                          src="https://www.w3.org/html/logo/badge/html5-badge-h-solo.png"
                          width="24"
                          height="25"
                          alt="HTML5 Powered"
                          title="HTML5 Powered"
                        />
                      </a>
                    </div>
                  </Footer>
                </Layout>
              </Layout>
            </Router>
          </ApolloProvider>
        </ThemeContext.Provider>
      </AuthContext.Provider>
    </UIContext.Provider>
  );
};

export default App;
