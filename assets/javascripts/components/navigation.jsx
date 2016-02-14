import React from 'react';
import ReactDOM from 'react-dom';

require("../../stylesheets/navigation.scss");

ReactDOM.render(
  <div className="nav-container">
    <header className="nav-header">
      <a className="logo"></a>
    </header>

    <section className="nav-body">
      <div className="items clearfix">
        <a href="#">Games</a>
        <a href="#">Puzzles</a>
        <a href="#">Me</a>
        <a href="#">Help</a>
      </div>
    </section>

    <footer className="nav-footer">

    </footer>
  </div>
, document.querySelector('.navigation-view'));
