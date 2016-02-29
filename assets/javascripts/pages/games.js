import React from 'react';
import Navigation from '../components/navigation.js';
import {IntlProvider, FormattedMessage, addLocaleData} from 'react-intl';
import Board from '../components/board.js';

export default React.createClass({
  render() {
    //const zhcnMessages = {
      //"app.nav.menu.games": "棋谱",
      //"app.nav.menu.puzzles": "死活题",
      //"app.nav.menu.me": "我的",
      //"app.nav.menu.help": "帮助",
    //}

    return (
      <IntlProvider>
      {/* <IntlProvider locale='zh-CN' messages={zhcnMessages}> */}
        <div>
          <Navigation />
          <h1>Games</h1>
          <Board className="board" grid="19" size="28" />
        </div>
      </IntlProvider>
    )
  }
});
