import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

//material-ui
import { Link } from 'react-router'

import mainStyles from '../styles/main'
import { fetchPuzzles } from '../actions/FetchActions'

//external component
import { StyleSheet, css } from 'aphrodite'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'

class Practices extends Component {

  state = {

  }

  constructor(props) {
    super(props)
    this.props.dispatch(fetchPuzzles({
      page: 1,
      rank: '18k-10k'
    }))
  }

  buildPractice(aaa) {
    console.log(aaa)
  }

  render() {
    return (
      <div className={css(mainStyles.mainContainer)}>
        <Card
          key={'lv-1'} className={css(styles.card)}
          onClick={this.buildPractice.bind(this, {rank: '18k-10k'})}
        >
          <CardMedia className={css(mainStyles.mainImg)} >
          </CardMedia>
          <CardActions>
            <h1>Level 1</h1>
            <span>18k - 10k</span>
          </CardActions>
        </Card>
        <Card
          key={'lv-2'} className={css(styles.card)}
          onClick={this.buildPractice.bind(this, {rank: '10k-5k'})}
        >
          <CardMedia className={css(mainStyles.mainImg)} >
          </CardMedia>
          <CardActions className={css(styles.mainIntro)}>
            <h1>Level 2</h1>
            <span>10k - 5k</span>
          </CardActions>
        </Card>
        <Card
          key={'lv-3'} className={css(styles.card)}
          onClick={this.buildPractice.bind(this, {rank: '7k-3k'})}
        >
          <CardMedia className={css(mainStyles.mainImg)} >
          </CardMedia>
          <CardActions>
            <h1>Level 3</h1>
            <span>7k - 3k</span>
          </CardActions>
        </Card>
        <Card
          key={'lv-4'} className={css(styles.card)}
          onClick={this.buildPractice.bind(this, {rank: '5k-1k'})}
        >
          <CardMedia className={css(mainStyles.mainImg)} >
          </CardMedia>
          <CardActions>
            <h1>Level 4</h1>
            <span>5k - 1k</span>
          </CardActions>
        </Card>
        <Card
          key={'lv-5'} className={css(styles.card)}
          onClick={this.buildPractice.bind(this, {rank: '3k-1d'})}
        >
          <CardMedia className={css(mainStyles.mainImg)} >
          </CardMedia>
          <CardActions>
            <h1>Level 5</h1>
            <span>3k - 1d</span>
          </CardActions>
        </Card>
        <Card key={'lv-6'} className={css(styles.card)}>
          <CardMedia className={css(mainStyles.mainImg)} >
          </CardMedia>
          <CardActions>
            <h1>Level 6</h1>
            <span>1d - 3d</span>
          </CardActions>
        </Card>
      </div>
    )
  }

}

const styles = StyleSheet.create({
  card: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    flex: 'auto',
    margin: '0px 5px 20px 5px',
  },
})

function select(state) {
  return {
    puzzles: state.puzzles
  }
}

export default connect(select)(Practices)
