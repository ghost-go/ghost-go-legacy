import React from 'react';
import Navigation from '../presentations/Navigation';
import { IntlProvider, FormattedMessage, addLocaleData } from 'react-intl';
import lang from '../components/lang';

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

