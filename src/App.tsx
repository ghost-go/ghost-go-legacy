import React, { Component, Suspense } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Helmet from "react-helmet";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

import { Layout, Menu, Breadcrumb } from "antd";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

import Navigation from "./components/Navigation";
import Sidebar from "./components/Sidebar";
import Problems from "./containers/Problems";
import Problem from "./containers/Problem";
import Kifus from "./containers/Kifus";
import Kifu from "./containers/Kifu";
import Dashboard from "./containers/Dashboard";
import History from "./containers/History";
import Favorite from "./containers/Favorite";
// import { a1ToSGF } from './common/Helper';

import "./App.css";

class App extends Component {
  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <Router>
          <Helmet
            htmlAttributes={{ lang: "en", amp: undefined }}
            title="A modern website to learn Go,Weiqi,Baduk - beta"
            titleTemplate="GhostGo - %s"
          />
          <Layout style={{ minHeight: "100vh" }}>
            <Sidebar />
          </Layout>
          <Layout className="site-layout">
            <Navigation />
            <Content style={{ margin: "0 16px" }}>
              <div className="page-container">
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
                  <Route exact path="/problems" component={Problems} />}
                </Suspense>
                <Route exact path="/kifus" component={Kifus} />
                <Route path="/kifus/:id" component={Kifu} />
                <Route path="/problems/:id" component={Problem} />
                <Route path="/puzzles/:id" component={Problem} />
                <Route path="/records" component={History} />
                <Route path="/dashboard" component={Dashboard} />
                <Route path="/favorites" component={Favorite} />
              </div>
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
        </Router>
      </MuiThemeProvider>
    );
  }
}

export default App;
