import React from 'react';
import ReactDOM from 'react-dom';

require("../../stylesheets/navigation.scss");

ReactDOM.render(
  <div className="nav-container">
    <header className="nav-header">
      <a className="logo"></a>
    </header>
  </div>
, document.querySelector('.navigation-view'));
