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
import Snackbar from 'material-ui/Snackbar'
import IconButton from 'material-ui/IconButton'
import Rating from 'react-rating'

//internal component
import Layout from './Layout'
import Navigation from '../presentations/Navigation'
import SVGIcon from '../presentations/SVGIcon'
import { fetchPuzzles } from '../actions/FetchActions'
import { setPuzzleFilter, setRangeFilter } from '../actions/FilterActions'
import RankRange from '../presentations/RankRange'

//external component
import { StyleSheet, css } from 'aphrodite'

//language
//import lang from '../components/lang'

class Puzzles extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tipsOpen: false,
      isLoading: false,
    }
    let { query } = this.props.location
    this.props.dispatch(fetchPuzzles({
      page: query.page,
      rank: query.rank
    }))
    this.handlePageChanged = this.handlePageChanged.bind(this)
    this.handleSeeMore = this.handleSeeMore.bind(this)
  }

  handlePageChanged(newPage) {
    this.setState({ current: newPage }, () => {
      this.props.dispatch(fetchKifus(this.state.current + 1))
    })
  }

  handleSeeMore(rank) {
    let range = []
    if (rank === 'all') {
      range = ['18k', '9d']
    } else {
      range = rank.split('-')
    }
    this.props.dispatch(setPuzzleFilter({start: range[0], end: range[1] }|| this.props.puzzleFilter))
    this.props.dispatch(setRangeFilter({start: range[0], end: range[1] }|| this.props.rangeFilter))
    this.props.dispatch(fetchPuzzles({
      rank: rank || this.props.puzzleFilter,
    }))
  }

  handleTips() {
    this.setState({
      tipsOpen: true
    })
  }

  render() {
    const { puzzles } = this.props

    let range = this.props.puzzleFilter['start'] + '-' + this.props.puzzleFilter['end']
    let puzzlesCards = []
    if (!puzzles.isFetching && puzzles.data != null && puzzles.data.puzzles.length > 0) {
      puzzles.data.puzzles.forEach((i) => {
        puzzlesCards.push(
          <Card key={i.id} className={css(styles.card)}>
            <CardMedia
              className={css(styles.puzzleImg)}
            >
              <Link to={`/puzzles/${i.id}`}>
                <img className={css(styles.previewImg)} src={i.preview_img_r1.preview_img_r1.x500.url} />
              </Link>
            </CardMedia>
            <CardTitle
              className={css(styles.puzzleTitle)}
              title={i.whofirst}
              subtitle={`Rank: ${i.rank}`}
            />
            <CardActions>
              <Rating initialRate={parseFloat(i.rating)} readonly={true}
                empty={<SVGIcon className={css(styles.ratingIcon)} href="#icon-star-empty" />}
                full={<SVGIcon className={css(styles.ratingIcon)} href="#icon-star-full" />}
              />
              <span>{`${i.right_count} right / ${i.wrong_count} wrong`}</span>
            </CardActions>
            <CardActions
              className={css(styles.puzzleActions)}
            >
              <Link to={`/puzzles/${i.id}`}>
                <RaisedButton className={css(styles.button)} primary={true} label="Solve It" />
              </Link>
            </CardActions>
          </Card>
        )
      })
    }
    else {
      puzzlesCards =
        <div className={css(styles.loading)}>
          <i className="fa fa-spinner fa-pulse fa-fw"></i>
        </div>
    }
    return (
      <div className={css(styles.puzzlesContainer)}>
        <div className={css(styles.puzzlesLeft)}>
          <h1 className={css(styles.title)}>Tsumego Library</h1>
          <div className={css(styles.buttonGroup)}>
            <RaisedButton onClick={this.handleSeeMore.bind(this, null)} className={css(styles.button)} primary={true} label="See More" />
          </div>
          <Card expanded={true}>
            <CardHeader
              title="RANKS"
              actAsExpander={true}
              showExpandableButton={true}
            />
            <CardText expandable={true}>
              <FlatButton
                backgroundColor={ range == '18k-9d' ? 'rgb(235, 235, 235)' : '' }
                onClick={this.handleSeeMore.bind(this, 'all')}
                className={css(styles.button)}
                style={{textAlign: 'left'}} label="all" />
              <FlatButton
                backgroundColor={ range == '18k-10k' ? 'rgb(235, 235, 235)' : '' }
                onClick={this.handleSeeMore.bind(this, '18k-10k')}
                className={css(styles.button)}
                style={{textAlign: 'left'}} label={
                  puzzles.data == null ?  '18k-10k' :
                    `18k-10k (${puzzles.data.rank_18k_10k_count}) `
                } />
              <FlatButton
                backgroundColor={ range == '9k-5k' ? 'rgb(235, 235, 235)' : '' }
                onClick={this.handleSeeMore.bind(this, '9k-5k')} className={css(styles.button)}
                style={{textAlign: 'left'}} label={
                  puzzles.data == null ?  '9k-5k' :
                    `9k-5k (${puzzles.data.rank_9k_5k_count}) `
                } />
              <FlatButton
                backgroundColor={ range == '4k-1k' ? 'rgb(235, 235, 235)' : '' }
                onClick={this.handleSeeMore.bind(this, '4k-1k')} className={css(styles.button)}
                style={{textAlign: 'left'}} label={
                  puzzles.data == null ?  '4k-1k' :
                    `4k-1k (${puzzles.data.rank_4k_1k_count}) `
                } />
              <FlatButton
                backgroundColor={ range == '1d-3d' ? 'rgb(235, 235, 235)' : '' }
                onClick={this.handleSeeMore.bind(this, '1d-3d')} className={css(styles.button)}
                style={{textAlign: 'left'}} label={
                  puzzles.data == null ?  '1d-3d' :
                    `1d-3d (${puzzles.data.rank_1d_3d_count}) `
                } />
              <FlatButton
                backgroundColor={ range == '4d-6d' ? 'rgb(235, 235, 235)' : '' }
                onClick={this.handleSeeMore.bind(this, '4d-6d')} className={css(styles.button)}
                style={{textAlign: 'left'}} label={
                  puzzles.data == null ?  '4d-6d' :
                    `4d-6d (${puzzles.data.rank_4d_6d_count}) `
                } />
            </CardText>
          </Card>
          <Card expanded={true}>
            <CardHeader
              title="TAGS"
              actAsExpander={true}
              showExpandableButton={true}
            />
            <CardText expandable={true}>
              No Tags(Not Open)
            </CardText>
          </Card>
        </div>
        <div className={css(styles.puzzlesRight)}>
          { puzzlesCards }
        </div>
        <Snackbar
          open={this.state.tipsOpen}
          message={'This function is not OPEN'}
          autoHideDuration={5000}
          bodyStyle={{
            backgroundColor: 'black',
            fontSize: '20px'
          }}
        />
      </div>
    )
  }
}

const styles = StyleSheet.create({
  puzzlesContainer: {
    display: 'flex',
    marginTop: '20px',
    backgroundColor: '#fff',
    padding: '20px',
  },

  puzzlesLeft: {
    display: 'flex',
    flexFlow: 'column nowrap',
    flex: '0 0 230px'
  },

  puzzlesRight: {
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
    marginBottom: '30px'
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

  puzzleImg: {
    flex: '1 1 auto',
    justifyContent: 'space-between',
  },

  puzzleTitle: {
    flex: '1 1 auto',
    justifyContent: 'space-between',
  },

  previewImg: {
    width: '100%'
  },

  puzzleActions: {
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

  ratingIcon: {
    width: 28,
    height: 28
  }

})

function select(state) {
  return {
    puzzles: state.puzzles,
    puzzleFilter: state.puzzleFilter,
    rangeFilter: state.rangeFilter,
  }
}

export default connect(select)(Puzzles)
