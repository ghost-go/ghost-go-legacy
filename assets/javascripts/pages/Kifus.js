//react
import React, { Component, PropTypes } from 'react'
import { IntlProvider, FormattedMessage, addLocaleData } from 'react-intl'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import ReactPaginate from 'react-paginate'
import { push } from 'react-router-redux'
import { Router, Route, hashHistory, browserHistory } from 'react-router'
import {Dropdown, Glyphicon} from 'react-bootstrap'

//material-ui
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'

//internal component
import Layout from './Layout'
import { fetchKifus, fetchTopPlayers } from '../actions/FetchActions'
import { setKifuFilter } from '../actions/Actions'

//external component
import { StyleSheet, css } from 'aphrodite'

//language
//import lang from '../components/lang'

class Kifus extends Component {

  static propTypes = {
    kifus: React.PropTypes.object.isRequired,
    players: React.PropTypes.object.isRequired,
  }

  state = {
    isLoading: false,
    filterOpen: false,
  }

  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
    }
    let { query } = this.props.location
    this.props.dispatch(fetchKifus({
      page: query.page,
      player: this.state.playerFilter,
      per_page: 20,
    }))
    this.props.dispatch(fetchTopPlayers(10))
    this.getRecordData()

    this.handleSeeMore = this.handleSeeMore.bind(this)
  }

  handleToggle() {
    this.setState({filterOpen: !this.state.filterOpen})
  }

  getRecordData(page = 1) {
    this.props.dispatch(fetchKifus({ page: page}))
  }

  handlePageClick(data) {
    let page = data.selected + 1
    this.getRecordData(page)
    this.props.dispatch(push(`/kifus?page=${page}`))
  }

  handlePageChanged(newPage) {
    this.setState({ current: newPage }, () => {
      this.props.dispatch(fetchKifus(this.state.current + 1))
    })
  }

  handleSeeMore(player) {
    this.setState({filterOpen: false})
    this.props.dispatch(setKifuFilter(player || this.props.kifuFilter))
    this.props.dispatch(fetchKifus({
      player: player || this.props.kifuFilter
    }))
  }

  render() {
    const { kifus, players } = this.props
    if (_.isNil(kifus) || _.isNil(players.data)) return null
    let playerItems = []
    let kifuCards = []
    let pagination, page = 0
    let { query } = this.props.location
    if (query && query.page) {
      page = parseInt(query.page - 1)
    }
    if (players.data !== undefined) {
      players.data.forEach((i) => {
        playerItems.push(
          <FlatButton
            key={i.id}
            backgroundColor={ this.props.kifuFilter === i.en_name ? 'rgb(235, 235, 235)' : '' }
            onClick={this.handleSeeMore.bind(this, i.en_name)}
            className={css(styles.button)}
            style={{textAlign: 'left'}} label={`${i.en_name}(${i.grading})`} />
        )
      })
    }
    if (this.props.kifus.data !== undefined) {
      let pageCount = this.props.kifus.data.total_pages
      if (pageCount > 1) {
        pagination = <ReactPaginate initialPage={page}
                                    previousLabel={'previous'}
                                    nextLabel={'next'}
                                    breakLabel={<a href="">...</a>}
                                    breakClassName={'break-me'}
                                    pageCount={pageCount}
                                    marginPagesDisplayed={2}
                                    pageRangeDisplayed={5}
                                    onPageChange={::this.handlePageClick}
                                    containerClassName={'pagination'}
                                    subContainerClassName={'pages pagination'}
                                    activeClassName={'active'} />
      }
    }
    if (!kifus.isFetching && kifus.data != null) {
      kifus.data.data.forEach((i) => {
        kifuCards.push(
          <div key={i.id} className='kifu-card'>
            <Link to={`/kifus/${i.id}`}>
              <img src={i.preview_img.x300.url} />
            </Link>
            <div className='kifu-info'>
              <span>{i.player_b.en_name} <b>VS</b> {i.player_w.en_name}</span>
              <br />
              <span>{`Result: ${i.result}`}</span>
              <br />
              <span>{`Date: ${i.short_date}`}</span>
            </div>
          </div>
        )
      })
    }
    else {
      kifuCards =
        <div className={css(styles.loading)}>
          <i className="fa fa-spinner fa-pulse fa-fw"></i>
        </div>
    }
    return (
      <div style={{marginLeft: this.props.expanded === true ? '235px' : '50px'}} className="page-container">
        <div className="page-nav">
          <Dropdown id="filterMenu" title="filter-menu" className="filter" open={this.state.filterOpen} onToggle={::this.handleToggle}>
            <Dropdown.Toggle>
              <Glyphicon className="filter-icon" glyph="filter" />
            </Dropdown.Toggle>
            <Dropdown.Menu className="super-colors">
              <div className="popover-title">Player</div>
              <div className="popover-content">
                <ul className="tags">
                  <li className="tag" onClick={this.handleSeeMore.bind(this, 'all')}>all</li>
                  {
                    players.data.map((player) => <li key={player.id} className="tag" onClick={this.handleSeeMore.bind(this, player.en_name)}>{player.en_name}</li>)
                  }
                </ul>
              </div>
            </Dropdown.Menu>
          </Dropdown>
          <ul className="page-subnav">
            <li><a title="Player: xxx">{`Player: ${this.props.kifuFilter}`}</a></li>
          </ul>
        </div>
        <div className={css(styles.puzzleContent)}>
          { kifuCards }
        </div>
        <div>
          { pagination }
        </div>
      </div>
    )
  }

}

const styles = StyleSheet.create({

  loading: {
    fontSize: '100px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    margin: '0 auto',
  },

})


function select(state) {
  return {
    kifus: state.kifus,
    players: state.players,
    kifuFilter: state.kifuFilter
  }
}

export default connect(select)(Kifus)
