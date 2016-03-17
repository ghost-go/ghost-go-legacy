import React from 'react';
import Navigation from '../components/navigation.js';
import {IntlProvider, FormattedMessage, addLocaleData} from 'react-intl';
import lang from '../components/lang.js';

export default React.createClass({
  render() {
    return (
      <div>
        <IntlProvider locale={lang.locale} messages={lang.messages}>
          <Navigation />
        </IntlProvider>
        <div>Puzzles</div>
      </div>
    )
  }
});

