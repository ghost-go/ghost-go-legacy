import React, { Component, PropTypes } from 'react'
import Navigation from '../presentations/Navigation'
import { IntlProvider, FormattedMessage, addLocaleData } from 'react-intl'
import Board from '../presentations/Board'
import lang from '../components/lang'
import KifuTable from '../presentations/KifuTable'
import { connect } from 'react-redux'
import { fetchKifus } from '../actions/KifuActions'

class Games extends Component {
  constructor(props) {
    super(props)
    this.props.dispatch(fetchKifus(1, 30))
  }

  render() {
    const { kifus } = this.props
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
          <KifuTable kifus={ kifus.data } />
          <Board className="board" grid="19" size="30" />
        </div>
      </IntlProvider>
    )
  }

}

function select(state) {
  return {
    kifus: state.kifus
  }
}

export default connect(select)(Games)
