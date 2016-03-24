import React, { Component, PropTypes } from 'react'
import Navigation from '../presentations/Navigation'
import { IntlProvider, FormattedMessage, addLocaleData } from 'react-intl'
import Board from '../presentations/Board'
import lang from '../components/lang'
import KifuTable from '../presentations/KifuTable'
import Pagination from '../presentations/Pagination'
import { connect } from 'react-redux'
import { fetchKifus } from '../actions/KifuActions'
import { Link } from 'react-router';
import { Router, Route, hashHistory, browserHistory } from 'react-router'

class Games extends Component {
  constructor(props) {
    super(props)
    this.state = {
      total: 11,
      current: 0,
      visablePage: 6
    }
    let { query } = this.props.location
    console.log(this.state.visablePage);
    this.props.dispatch(fetchKifus(query.page, query.per_page))

    this.handlePageChanged = this.handlePageChanged.bind(this)
  }

  handlePageChanged(newPage) {
    this.setState({ current: newPage }, () => {
      console.log(this.state)
      this.props.dispatch(fetchKifus(this.state.current + 1, 30))
    })
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
          <Pagination current={this.state.current}
                      total={this.state.total}
                      visiblePages={this.state.visablePage}
                      onPageChanged={this.handlePageChanged}
                      titles = {{
                        first: "First",
                        prev: "Prev",
                        prevSet: "<<<",
                        nextSet: ">>>",
                        next: "Next",
                        last: "Last",
                      }}
          />
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
