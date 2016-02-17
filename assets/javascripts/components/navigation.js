import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {FormattedMessage} from 'react-intl';
import { Link } from 'react-router';

require("../../stylesheets/navigation.scss");

export default class Navigation extends Component {

  render() {
    return (
      <div className="nav-container">
        <header className="nav-header">
          <a className="logo"></a>
        </header>

        <section className="nav-body">
          <div className="nav-body-wrap clearfix">
            <Link to="/games">
              <FormattedMessage
                id="app.nav.menu.games"
                defaultMessage="Games"
              />
            </Link>
            <Link to="/puzzles">
              <FormattedMessage
                id='app.nav.menu.puzzles'
                defaultMessage="Puzzles"
              />
            </Link>
            <Link to="/me">
              <FormattedMessage
                id='app.nav.menu.me'
                defaultMessage="Me"
              />
            </Link>
            <Link to="/Help">
              <FormattedMessage
                id='app.nav.menu.help'
                defaultMessage="Help"
              />
            </Link>
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

//const zhcnMessages = {
  //"app.nav.menu.games": "棋谱",
  //"app.nav.menu.puzzles": "死活题",
  //"app.nav.menu.me": "我的",
  //"app.nav.menu.help": "帮助",
//}

