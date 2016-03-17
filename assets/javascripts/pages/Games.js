import React from 'react';
import Navigation from '../components/navigation';
import {IntlProvider, FormattedMessage, addLocaleData} from 'react-intl';
import Board from '../components/board';
import lang from '../components/lang';
import KifuTable from '../presentations/KifuTable';

export default React.createClass({
  render() {

    return (
      <IntlProvider locale={lang.locale} messages={lang.messages}>
        <div>
          <Navigation />
          <h1>
              <FormattedMessage
                id='app.nav.menu.games'
                defaultMessage="Games"
              />
          </h1>
          <KifuTable kifus={[{
            date: '2016-4-7',
            title: 'title',
            black: 'black',
            white: 'white',
            result: 'result',
          }, {
            date: '2016-4-8',
            title: 'title2',
            black: 'black2',
            white: 'white2',
            result: 'result2',
          }
          ]} />
          <Board className="board" grid="19" size="30" />
        </div>
      </IntlProvider>
    )
  }
});
