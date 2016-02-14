import React from 'react';
import ReactDOM from 'react-dom';

require("../../stylesheets/navigation.scss");

ReactDOM.render(
  <div className="nav-container">
    <header className="nav-header">
      <a className="logo"></a>
    </header>

    <section className="nav-body">
      <div className="nav-body-wrap clearfix">
        <a href="#">Games</a>
        <a href="#">Puzzles</a>
        <a href="#">Me</a>
        <a href="#">Help</a>
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
, document.querySelector('.navigation-view'));
