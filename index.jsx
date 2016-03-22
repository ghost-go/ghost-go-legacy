import React from 'react';
import ReactDOM from 'react-dom'
import { Router, Route, hashHistory } from 'react-router'
import {addLocaleData} from 'react-intl';
import zhLocaleData from 'react-intl/locale-data/zh';
import jaLocaleData from 'react-intl/locale-data/ja';
import koLocaleData from 'react-intl/locale-data/ko';

addLocaleData(zhLocaleData);
addLocaleData(jaLocaleData);
addLocaleData(koLocaleData);

//if ('ReactIntlLocaleData' in window) {
    //Object.keys(ReactIntlLocaleData).forEach((lang) => {
        //addLocaleData(ReactIntlLocaleData[lang]);
    //});
//}
//
//if (__DEV__) {
  //require('./assets/javascripts/constants/dev.js');
//}

//if (__PRO__) {
  //require('./assets/javascripts/constants/pro.js');
//}

require("./assets/stylesheets/base.scss");
require("./assets/stylesheets/home.scss");
require("./assets/stylesheets/navigation.scss");
require('./assets/javascripts/main.js');
require('./assets/javascripts/routes.js');
//require('./assets/javascripts/components/board.js');

//ReactDOM.render(<div>Hello World</div>, document.body)
