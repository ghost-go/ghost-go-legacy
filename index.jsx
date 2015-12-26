import React from 'react';
import ReactDOM from 'react-dom'
require("./assets/stylesheets/home.scss");

require('./assets/javascripts/board.js');
require('./assets/javascripts/sgf.js');

ReactDOM.render(<div>Hello World</div>, document.getElementById('content'))
