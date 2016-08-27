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

//internal component
import Layout from './Layout'
import Navigation from '../presentations/Navigation'
import { fetchPuzzles } from '../actions/PuzzleActions'

//external component
import { StyleSheet, css } from 'aphrodite'

//language
//import lang from '../components/lang'

class Puzzles extends Component {
  constructor(props) {
    super(props)
    this.state = {
      total: 11,
      current: 0,
      visablePage: 6,
      rankingFilter: 'all',
      tipsOpen: false,
      isLoading: false,
    }
    let { query } = this.props.location
    this.props.dispatch(fetchPuzzles({
      page: query.page,
      ranking: query.ranking
    }))
    this.handlePageChanged = this.handlePageChanged.bind(this)
    this.handleSeeMore = this.handleSeeMore.bind(this)
  }

  handlePageChanged(newPage) {
    this.setState({ current: newPage }, () => {
      this.props.dispatch(fetchKifus(this.state.current + 1))
    })
  }

  handleSeeMore(ranking) {
    this.setState({ rankingFilter: ranking }, () => {
      let { query } = this.props.location
      this.props.dispatch(fetchPuzzles({
        page: query.page,
        ranking: ranking
      }))
    })
  }

  handleTips() {
    this.setState({
      tipsOpen: true
    })
  }

  render() {
    const { puzzles } = this.props

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
              subtitle={`Ranking: ${i.ranking}`}
            />
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
          <h1 className={css(styles.title)}>Puzzles Library</h1>
          <div className={css(styles.buttonGroup)}>
            <RaisedButton onClick={this.handleSeeMore} className={css(styles.button)} primary={true} label="See More" />
            {
              //<div className={css(styles.clearfix)}></div>
              //<RaisedButton onClick={this.handleTips} className={css(styles.button)} disabled={true} label="Create Puzzle" />
            }
          </div>
          <Card expanded={true}>
            <CardHeader
              title="RANKING"
              actAsExpander={true}
              showExpandableButton={true}
            />
            <CardText expandable={true}>
              <FlatButton
                backgroundColor={ this.state.rankingFilter == 'all' ? 'rgb(235, 235, 235)' : '' }
                onClick={this.handleSeeMore.bind(this, 'all')}
                className={css(styles.button)}
                style={{textAlign: 'left'}} label="all" />
              <FlatButton
                backgroundColor={ this.state.rankingFilter == '18k-10k' ? 'rgb(235, 235, 235)' : '' }
                onClick={this.handleSeeMore.bind(this, '18k-10k')}
                className={css(styles.button)}
                style={{textAlign: 'left'}} label={
                  puzzles.data == null ?  '18k-10k' :
                    `18k-10k (${puzzles.data.ranking_18k_10k_count}) `
                } />
              <FlatButton
                backgroundColor={ this.state.rankingFilter == '9k-5k' ? 'rgb(235, 235, 235)' : '' }
                onClick={this.handleSeeMore.bind(this, '9k-5k')} className={css(styles.button)}
                style={{textAlign: 'left'}} label={
                  puzzles.data == null ?  '9k-5k' :
                    `9k-5k (${puzzles.data.ranking_9k_5k_count}) `
                } />
              <FlatButton
                backgroundColor={ this.state.rankingFilter == '4k-1k' ? 'rgb(235, 235, 235)' : '' }
                onClick={this.handleSeeMore.bind(this, '4k-1k')} className={css(styles.button)}
                style={{textAlign: 'left'}} label={
                  puzzles.data == null ?  '4k-1k' :
                    `4k-1k (${puzzles.data.ranking_4k_1k_count}) `
                } />
              <FlatButton
                backgroundColor={ this.state.rankingFilter == '1d-3d' ? 'rgb(235, 235, 235)' : '' }
                onClick={this.handleSeeMore.bind(this, '1d-3d')} className={css(styles.button)}
                style={{textAlign: 'left'}} label={
                  puzzles.data == null ?  '1d-3d' :
                    `1d-3d (${puzzles.data.ranking_1d_3d_count}) `
                } />
              <FlatButton
                backgroundColor={ this.state.rankingFilter == '4d-6d' ? 'rgb(235, 235, 235)' : '' }
                onClick={this.handleSeeMore.bind(this, '4d-6d')} className={css(styles.button)}
                style={{textAlign: 'left'}} label={
                  puzzles.data == null ?  '4d-6d' :
                    `4d-6d (${puzzles.data.ranking_4d_6d_count}) `
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
  }

})

function select(state) {
  return {
    puzzles: state.puzzles
  }
}

export default connect(select)(Puzzles)
