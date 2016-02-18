import React from 'react';
import ReactDOM from 'react-dom'
import { Router, Route, hashHistory } from 'react-router'

require("./assets/stylesheets/base.scss");
require("./assets/stylesheets/home.scss");
require("./assets/stylesheets/navigation.scss");
require('./assets/javascripts/main.js');
require('./assets/javascripts/routes.js');
//require('./assets/javascripts/components/board.js');

//ReactDOM.render(<div>Hello World</div>, document.body)
if ('ReactIntlLocaleData' in window) {
    Object.keys(ReactIntlLocaleData).forEach((lang) => {
        addLocaleData(ReactIntlLocaleData[lang]);
    });
}
