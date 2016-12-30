import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

//material-ui
import { Link } from 'react-router'

import mainStyles from '../styles/main'
import { fetchPuzzles } from '../actions/FetchActions'
import { postPractice } from '../actions/PostActions'

//external component
import { StyleSheet, css } from 'aphrodite'
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'
import Dialog from 'material-ui/Dialog'

import RankRange from '../presentations/RankRange'

class Practices extends Component {

  state = {
    open: false,
    life: 2,
    time: 10,
    puzzleCount: 10,
    rankRange: '18k-10k',
  }

  constructor(props) {
    super(props)
    this.props.dispatch(fetchPuzzles({
      page: 1,
      rank: '18k-10k'
    }))
  }

  buildPractice(aaa) {

  }

  handleOpen() {
    this.setState({open: true})
  }

  handleClose() {
    this.setState({open: false})
  }

  handleCreatePractice() {
    this.setState({open: true})
  }

  handlePostPractice() {
    const { auth } = this.props
    let profile = auth.getProfile()

    this.props.dispatch(postPractice({
      practice_type: 'approved',
      user_id: profile.user_id,
      life: this.state.life,
      time: this.state.time,
      puzzle_count: this.state.puzzleCount,
      rank_range: this.state.rankRange,
    }))
  }

  handleRangeChange(range) {
    this.props.dispatch(setRangeFilter(range))
  }

  handlePuzzleCountChange(e) {
    console.log(this.state)
    this.setState({ puzzleCount: e.target.value })
  }

  handleLifeCountChange(e) {
    this.setState({ puzzleCount: e.target.value })
  }

  handleTimeLeftChange(e) {
    this.setState({ puzzleCount: e.target.value })
  }

  render() {
    const actions = [
      <FlatButton
        onTouchTap={::this.handleClose}
        primary={true}
        label="Cancel"
      />,
      <FlatButton
        onTouchTap={::this.handlePostPractice}
        primary={true}
        keyboardFocused={true}
        label="Create"
      />,
    ]
    return (
      <div className={css(mainStyles.mainContainer)}>
        <RaisedButton
          onTouchTap={::this.handleCreatePractice}
          label="Create Practice"
          primary={true}
        />
        <Dialog
          title="Create Practice"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={::this.handleClose}
          autoScrollBodyContent={true}
        >
          <TextField
            onChange={::this.handlePuzzleCountChange}
            defaultValue="10"
            hintText="TSUMEGO COUNT"
            floatingLabelText="TSUMEGO COUNT"
          />
          <br />
          <TextField
            onChange={::this.handleLifeCountChange}
            defaultValue="1"
            hintText="LIFE COUNT"
            floatingLabelText="LIFE COUNT"
          />
          <br />
          <TextField
            onChange={::this.handleTimeLeftChange}
            defaultValue="10"
            hintText="TIME LEFT"
            floatingLabelText="TIME LEFT"
          />
          <br />
          <RankRange rankRange={this.props.rangeFilter} handleRangeChange={this.handleRangeChange} ref='range' />
        </Dialog>
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
    puzzles: state.puzzles,
    rangeFilter: state.rangeFilter
  }
}

export default connect(select)(Practices)
