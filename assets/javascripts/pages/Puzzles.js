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
import { fetchPuzzles } from '../actions/PuzzleActions'

//external component
import { StyleSheet, css } from 'aphrodite'

//language
import lang from '../components/lang'

class Puzzles extends Component {
  constructor(props) {
    super(props)
    this.state = {
      total: 11,
      current: 0,
      visablePage: 6
    }
    let { query } = this.props.location
    this.props.dispatch(fetchPuzzles(query.page))
    this.handlePageChanged = this.handlePageChanged.bind(this)
  }

  handlePageChanged(newPage) {
    this.setState({ current: newPage }, () => {
      this.props.dispatch(fetchKifus(this.state.current + 1))
    })
  }

  render() {
    const { puzzles } = this.props
    let puzzlesCards = []
    if (puzzles.data.length > 0) {
      puzzles.data.forEach((i) => {
        puzzlesCards.push(
          <Card className={css(styles.card)}>
            <CardMedia className={css(styles.previewImgWrapper)}>
              <img className={css(styles.previewImg)} src={i.preview_img_r1.preview_img_r1.x500.url} />
            </CardMedia>
            <CardTitle title="Card title" subtitle={`Ranking: ${i.ranking}`}/>
            <CardActions>
              <Link to={`/puzzles/${i.id}`}>
                <RaisedButton className={css(styles.button)} primary={true} label="Solve It" />
              </Link>
            </CardActions>
          </Card>
        )
      })
    }
    return (
      <Layout>
        <div className={css(styles.puzzlesContainer)}>
          <div className={css(styles.puzzlesLeft)}>
            <h1 className={css(styles.title)}>Puzzles Library</h1>
            <div className={css(styles.buttonGroup)}>
              <RaisedButton className={css(styles.button)} primary={true} label="See More" />
              <div className={css(styles.clearfix)}></div>
              <RaisedButton className={css(styles.button)} disabled={true} label="Create Puzzle(Not Open)" />
            </div>
            <Card expanded={true}>
              <CardHeader
                title="RANKING"
                actAsExpander={true}
                showExpandableButton={true}
              />
              <CardText expandable={true}>
                <ul>
                  <li>18k-10k</li>
                  <li>9k-5k</li>
                  <li>4k-1k</li>
                  <li>1d-3d</li>
                  <li>3d-6d</li>
                </ul>
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
        </div>
      </Layout>
    )
  }
}

const styles = StyleSheet.create({
  puzzlesContainer: {
    marginTop: '20px',
    backgroundColor: '#fff',
    padding: '20px 60px',
    width: '100vw',
    float: 'left',
  },

  title: {
    fontSize: '26px',
    lineHeight: '26px',
    fontWeight: '300',
    margin: '10px 0 35px',
    padding: '0'
  },

  puzzlesLeft: {
    width: '20vw',
    marginLeft: 0,
    float: 'left',
  },

  buttonGroup: {
    marginBottom: '30px'
  },

  button: {
    width: '100%',
    marginBottom: '15px',
  },

  puzzlesRight: {
    width: '75vw',
    marginLeft: '5vw',
    paddingTop: '10px',
    float: 'left',
  },

  card: {
    width: '20vw',
    margin: '0px 1.5vw 20px 1.5vw',
    float: 'left'
  },

  previewImgWrapper: {
    height: '20vw'
  },

  clearfix: {
    clear: 'both'
  }
})

function select(state) {
  console.log(state)
  return {
    puzzles: state.puzzles
  }
}

export default connect(select)(Puzzles)
