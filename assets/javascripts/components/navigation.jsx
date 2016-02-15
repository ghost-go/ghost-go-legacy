import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {IntlProvider, FormattedMessage, addLocaleData} from 'react-intl';

require("../../stylesheets/navigation.scss");

//if ('ReactIntlLocaleData' in window) {
    //Object.keys(ReactIntlLocaleData).forEach((lang) => {
        //addLocaleData(ReactIntlLocaleData[lang]);
    //});
//}

class Navigation extends Component {

  render() {
    return (
      <div className="nav-container">
        <header className="nav-header">
          <a className="logo"></a>
        </header>

        <section className="nav-body">
          <div className="nav-body-wrap clearfix">
            <a href="#">
              <FormattedMessage
                id="app.nav.menu.games"
                defaultMessage="Games"
              />
            </a>
            <a href="#">
              <FormattedMessage
                id='app.nav.menu.puzzles'
                defaultMessage="Puzzles"
              />
            </a>
            <a href="#">
              <FormattedMessage
                id='app.nav.menu.me'
                defaultMessage="Me"
              />
            </a>
            <a href="#">
              <FormattedMessage
                id='app.nav.menu.help'
                defaultMessage="Help"
              />
            </a>
          </div>
        </section>

        <footer className="nav-footer">
          <div className="nav-footer-wrap">
            <a href="#">
              <i className="fa fa-search"></i>
            </a>
          </div>
          <div className="nav-footer-wrap nav-question">
            <a href="#">
              <i className="fa fa-question-circle"></i>
            </a>
          </div>
        </footer>
      </div>
    )
  }
}

const zhcnMessages = {
  "app.nav.menu.games": "棋谱",
  "app.nav.menu.puzzles": "死活题",
  "app.nav.menu.me": "我的",
  "app.nav.menu.help": "帮助",
}

ReactDOM.render(
  <IntlProvider locale='zh-CN' messages={zhcnMessages}>
    <Navigation />
  </IntlProvider>
, document.querySelector('.navigation-view'));
