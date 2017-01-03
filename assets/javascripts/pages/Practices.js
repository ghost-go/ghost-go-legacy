import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { Link } from 'react-router'

import mainStyles from '../styles/main'
import { fetchPracticeTemplates, fetchPractices } from '../actions/FetchActions'
import { postPractice, postPracticeTemplate } from '../actions/PostActions'

//material-ui
import { StyleSheet, css } from 'aphrodite'
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'
import Dialog from 'material-ui/Dialog'
import Divider from 'material-ui/Divider'

import RankRange from '../presentations/RankRange'

class Practices extends Component {

  state = {
    templateOpen: false,
    practiceOpen: false,
    life: 2,
    time: 10,
    templateName: 'TEMPLATE NAME 1',
    template_id: null,
    puzzleCount: 10,
    rankRange: '18k-10k',
  }

  constructor(props) {
    super(props)
    this.props.dispatch(fetchPracticeTemplates({ page: 1 }))
    this.props.dispatch(fetchPractices({ page: 1 }))
  }

  buildPractice(aaa) {

  }

  handleTemplateOpen() {
    this.setState({templateOpen: true})
  }

  handleTemplateClose() {
    this.setState({templateOpen: false})
  }

  handlePracticeOpen(id) {
    let template = _.find(this.props.templates.data, {id})
    this.setState({
      life: template.life,
      time: template.time,
      template_id: template.id,
      templateName: template.name,
      puzzleCount: template.puzzle_count,
      rankRange: template.rank_range,
      practiceOpen: true
    })
  }

  handlePracticeClose() {
    this.setState({practiceOpen: false})
  }

  handleCreatePracticeTemplate() {
    this.setState({templateOpen: true})
  }

  handleCreatePractice() {
    this.setState({practiceOpen: true})
  }

  handlePostPracticeTemplate() {
    const { auth } = this.props
    let profile = auth.getProfile()

    this.props.dispatch(postPracticeTemplate({
      name: this.state.templateName,
      template_type: 'approved',
      user_id: profile.user_id,
      life: this.state.life,
      time: this.state.time,
      puzzle_count: this.state.puzzleCount,
      rank_range: this.state.rankRange,
    })).then(() => {
      this.handleTemplateClose()
      this.props.dispatch(fetchPracticeTemplates({ page: 1 }))
    })
  }

  handlePostPractice() {
    const { auth } = this.props
    let profile = auth.getProfile()

    this.props.dispatch(postPractice({
      name: this.state.templateName,
      practice_type: 'approved',
      user_id: profile.user_id,
      practice_template_id: this.state.template_id,
      life: this.state.life,
      time: this.state.time,
      puzzle_count: this.state.puzzleCount,
      rank_range: this.state.rankRange,
    })).then(() => {
      let nextUrl = `/practices/${this.props.practice.data.id}`
      this.props.dispatch(push(nextUrl))
    })
  }

  handleRangeChange(range) {
    this.props.dispatch(setRangeFilter(range))
  }

  handlePuzzleCountChange(e) {
    this.setState({ puzzleCount: e.target.value })
  }

  handleTemplateNameChange(e) {
    this.setState({ templateName: e.target.value })
  }

  handleLifeCountChange(e) {
    this.setState({ puzzleCount: e.target.value })
  }

  handleTimeLeftChange(e) {
    this.setState({ puzzleCount: e.target.value })
  }

  render() {
    const templateActions = [
      <FlatButton
        onTouchTap={::this.handleTemplateClose}
        primary={true}
        label="Cancel"
      />,
      <FlatButton
        onTouchTap={::this.handlePostPracticeTemplate}
        primary={true}
        keyboardFocused={true}
        label="Create"
      />,
    ]
    const practiceActions = [
      <FlatButton
        onTouchTap={::this.handlePracticeClose}
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
    let templateList = []
    if (this.props.templates.data !== undefined && this.props.templates.data !== null) {
      this.props.templates.data.forEach((i) => {
        templateList.push(
          <Card key={i.id} className={css(styles.card)}
            onClick={this.handlePracticeOpen.bind(this, i.id)}
          >
            <CardMedia className={css(mainStyles.mainImg)} >
            </CardMedia>
            <CardActions>
              <h2>{i.name}</h2>
              <span>Rank Range: {i.rank_range}</span>
              <br />
              <span>Life: {i.life}</span>
              <br />
              <span>Time: {i.time}</span>
              <br />
              <span>Puzzle Count: {i.puzzle_count}</span>
            </CardActions>
          </Card>
        )
      })
    }
    return (
      <div className={css(mainStyles.mainContainer, styles.column)}>
        <div>
          <h2>Practice Template</h2>
          <div className={css(styles.cardContainer)}>
            { templateList }
          </div>
          <RaisedButton
            onTouchTap={::this.handleCreatePracticeTemplate}
            label="Create Practice Template"
            secondary={true}
          />
        </div>
        <Divider />
        <div className={css(styles.cardContainer)}>
          <h2>Practice</h2>
          <Divider />
          <RaisedButton
            onTouchTap={::this.handleCreatePractice}
            label="Create Practice"
            primary={true}
          />
        </div>
        <Dialog
          title="Create Practice Template"
          actions={templateActions}
          modal={false}
          open={this.state.templateOpen}
          onRequestClose={::this.handleTemplateClose}
          autoScrollBodyContent={true}
        >
          <TextField
            onChange={::this.handleTemplateNameChange}
            defaultValue="TEMPLATE NAME 1"
            hintText="TEMPLATE NAME"
            floatingLabelText="TEMPLATE NAME"
          />
          <br />
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
        <Dialog
          title="Create Practice"
          actions={practiceActions}
          modal={false}
          open={this.state.practiceOpen}
          onRequestClose={::this.handlePracticeClose}
          autoScrollBodyContent={true}
        >
          <TextField
            disabled={true}
            defaultValue={this.state.templateName}
            hintText="BASE TEMPLATE"
            floatingLabelText="BASE TEMPLATE NAME"
          />
          <br />
          <TextField
            onChange={::this.handlePuzzleCountChange}
            defaultValue={this.state.puzzleCount}
            hintText="TSUMEGO COUNT"
            floatingLabelText="TSUMEGO COUNT"
          />
          <br />
          <TextField
            onChange={::this.handleLifeCountChange}
            defaultValue={this.state.life}
            hintText="LIFE COUNT"
            floatingLabelText="LIFE COUNT"
          />
          <br />
          <TextField
            onChange={::this.handleTimeLeftChange}
            defaultValue={this.state.time}
            hintText="TIME LEFT"
            floatingLabelText="TIME LEFT"
          />
          <br />
          <RankRange rankRange={this.props.rangeFilter} handleRangeChange={this.handleRangeChange} ref='range' />
        </Dialog>
      </div>
    )
  }

}

const styles = StyleSheet.create({
  column: {
    flexDirection: 'column'
  },

  card: {
    cursor: 'pointer',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    flex: 'auto',
    margin: '0px 5px 20px 5px',
    ':hover': {
      backgroundColor: '#eee'
    },
  },

  cardContainer: {
    display: 'flex',
    flexDirection: 'row'
  }

})

function select(state) {
  return {
    templates: state.practiceTemplates,
    template: state.practiceTemplate,
    practices: state.practices,
    practice: state.practice,
    puzzles: state.puzzles,
    rangeFilter: state.rangeFilter
  }
}

export default connect(select)(Practices)
