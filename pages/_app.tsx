import React, {Suspense, useState, useContext, useEffect} from 'react';
import {Provider} from 'react-redux';
import ReactModal from 'react-modal';
import {PersistGate} from 'redux-persist/integration/react';
import {QueryParamProvider} from 'use-query-params';
import {Helmet} from 'react-helmet';
import {BackTop, Spin} from 'antd';

import Navigation from 'components/Navigation';
import {store, persistor} from 'utils';
import SignInModal from 'components/modal/SignInModal';
import SignUpModal from 'components/modal/SignUpModal';
import Sidebar from 'components/Sidebar';
import {ToastContainer} from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import 'tailwindcss/tailwind.css';
import 'semantic-ui-css/semantic.min.css';
import 'stylesheets/index.css';

ReactModal.setAppElement('body');

const App = ({Component, pageProps}: {Component: any; pageProps: any}) => {
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
        <QueryParamProvider>
          <Helmet
            htmlAttributes={{lang: 'en', amp: undefined}}
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
                <div className={'lg:block lg:py-4 lg:px-4 hidden bg-white'}>
                  <Navigation />
                </div>
                <Component {...pageProps} />
                {/* <Footer style={{ textAlign: "center" }}>
                    Copyright © 2020 GhostGo. All rights reserved.
                  </Footer> */}
              </div>
            </div>
          </div>
        </QueryParamProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
