import React, {Suspense, useState, useContext, useEffect} from 'react';
import {Provider} from 'react-redux';
import ReactModal from 'react-modal';
import {QueryParamProvider} from 'components/basic/QueryParamProvider';
import Head from 'next/head';

import Navigation from 'components/Navigation';
import {store} from 'utils/store';
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
      <QueryParamProvider>
        <Head>
          <title>GhostGo</title>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1"
          />
        </Head>
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
    </Provider>
  );
};

export default App;
