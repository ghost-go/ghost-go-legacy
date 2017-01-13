//react
import React, { Component, PropTypes } from 'react'
import { IntlProvider, FormattedMessage, addLocaleData } from 'react-intl'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Router, Route, hashHistory, browserHistory } from 'react-router'

//material-ui
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'

//internal component
import Layout from './Layout'
import Navigation from '../presentations/Navigation'
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

  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
    }
    let { query } = this.props.location
    this.props.dispatch(fetchKifus({
      page: query.page,
      player: this.state.playerFilter,
      per_page: 24,
    }))
    this.props.dispatch(fetchTopPlayers(10))

    this.handlePageChanged = this.handlePageChanged.bind(this)
    this.handleSeeMore = this.handleSeeMore.bind(this)
  }

  handlePageChanged(newPage) {
    this.setState({ current: newPage }, () => {
      this.props.dispatch(fetchKifus(this.state.current + 1))
    })
  }

  handleSeeMore(player) {
    this.props.dispatch(setKifuFilter(player || this.props.kifuFilter))
    this.props.dispatch(fetchKifus({
      player: player || this.props.kifuFilter
    }))
  }

  render() {
    const { kifus, players } = this.props
    let playerItems = []
    let kifuCards = []
    if (players.data !== undefined) {
      players.data.forEach((i) => {
        console.log(i.en_name)
        console.log(this.props.kifuFilter)
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
    if (!kifus.isFetching && kifus.data != null && kifus.data.length > 0) {
      kifus.data.forEach((i) => {
        kifuCards.push(
          <Card key={i.id} className={css(styles.card)}>
            <CardMedia
              className={css(styles.kifuImg)}
            >
              <Link to={`/kifus/${i.id}`}>
                <img className={css(styles.previewImg)} src={i.preview_img.x500.url} />
              </Link>
            </CardMedia>
            <CardActions className={css(styles.kifuIntro)}>
              <span className={css(styles.kifuIntroSpan)}>{`${i.player_b.en_name}(${i.b_rank})`}</span>
              <span className={css(styles.kifuIntroSpan, styles.versus)}>VS</span>
              <span className={css(styles.kifuIntroSpan)}>{`${i.player_w.en_name}(${i.w_rank})`}</span>
            </CardActions>
            <CardActions>
              <span>{`Result: ${i.result}`}</span>
            </CardActions>
            <CardActions>
              <span>{`Date: ${i.short_date}`}</span>
            </CardActions>
            <CardActions
              className={css(styles.kifuActions)}
            >
              <Link to={`/kifus/${i.id}`}>
                <RaisedButton className={css(styles.button)} primary={true} label="Review" />
              </Link>
            </CardActions>
          </Card>
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
      <div className={css(styles.kifusContainer)}>
        <div className={css(styles.kifusLeft)}>
          <h1 className={css(styles.title)}>Kifu Library</h1>
          <div className={css(styles.buttonGroup)}>
            <RaisedButton onClick={this.handleSeeMore.bind(this, null)} className={css(styles.button)} primary={true} label="See More" />
          </div>
          <Card expanded={true}>
            <CardHeader
              title="PLAYER"
              actAsExpander={true}
              showExpandableButton={true}
            />
            <CardText expandable={true}>
              <FlatButton
                backgroundColor={ this.props.kifuFilter == 'all' ? 'rgb(235, 235, 235)' : '' }
                onClick={this.handleSeeMore.bind(this, 'all')}
                className={css(styles.button)}
                style={{textAlign: 'left'}} label="all" />
              { playerItems }
            </CardText>
          </Card>
          <Card expanded={true}>
          </Card>
        </div>
        <div className={css(styles.kifusRight)}>
          { kifuCards }
        </div>
      </div>
    )
  }

}

const styles = StyleSheet.create({
  kifusContainer: {
    display: 'flex',
    marginTop: '20px',
    backgroundColor: '#fff',
    padding: '20px',
  },

  kifusLeft: {
    display: 'flex',
    flexFlow: 'column nowrap',
    flex: '0 0 230px'
  },

  kifusRight: {
    display: 'flex',
    flex: 'auto',
    flexFlow: 'row wrap',
    paddingTop: '10px',
    marginLeft: '10px',
  },

  title: {
    fontSize: '26px',
    lineHeight: '26px',
    fontWeight: '300',
    margin: '10px 0 35px',
    padding: '0'
  },

  chooseLevel: {
    fontSize: '22px',
    lineHeight: '22px',
    fontWeight: '300',
    marginTop: '10px',
  },

  buttonGroup: {
    marginBottom: '20px'
  },

  button: {
    width: '100%',
    marginBottom: '15px',
  },

  card: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    flex: '1 1 250px',
    width: '250px',
    margin: '0px 1.5vw 20px 1.5vw',
  },

  kifuImg: {
    flex: '1 1 auto',
    justifyContent: 'space-between',
  },

  kifuTitle: {
    flex: '1 1 auto',
    justifyContent: 'space-between',
  },

  kifuIntro: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  kifuIntroSpan: {
    flex: '0 1 45%',
  },

  versus: {
    flex: '1 1 10%',
    fontWeight: 'bold',
    fontSize: '16px'
  },

  previewImg: {
    width: '100%'
  },

  kifuActions: {
    height: '50px',
    flex: '1 1 auto',
    justifyContent: 'space-between',
  },

  loading: {
    fontSize: '100px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    margin: '0 auto',
  },

  tip: {
    position: 'absolute',
    zIndex: '100',
    padding: '20',
    fontSize: '30px',
    left: '50px',
    top: '65px',
    color: 'red'
  },

  ratingIcon: {
    width: 28,
    height: 28
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
