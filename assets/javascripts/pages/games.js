import React from 'react';
import Navigation from '../components/navigation.js';
import {IntlProvider, FormattedMessage, addLocaleData} from 'react-intl';
import Board from '../components/board.js';
import lang from '../components/lang.js';

export default React.createClass({
  render() {
    //const zhcnMessages = {
      //"app.nav.menu.games": "棋谱",
      //"app.nav.menu.puzzles": "死活题",
      //"app.nav.menu.me": "我的",
      //"app.nav.menu.help": "帮助",
    //}

    return (
      <IntlProvider locale={lang.locale} messages={lang.messages}>
        <div>
          <Navigation />
          <h1>Games</h1>
          <Board className="board" grid="19" size="28" />
        </div>
      </IntlProvider>
    )
  }
});
